import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  SecurityContext,
  signal,
  viewChild,
} from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { actionMenuPositions, GActionMenu, GActionMenuItem } from '../action-menu/action-menu';
import { trackControlInvalid } from '../core/control-invalid';
import { GIcon } from '../icon/icon';
import {
  gIconAlignCenter,
  gIconAlignLeft,
  gIconAlignRight,
  gIconCode,
  gIconLink,
  gIconList,
  gIconListChecks,
  gIconListOrdered,
  gIconMoreHorizontal,
  gIconRedo,
  gIconStrikethrough,
  gIconSubscript,
  gIconSuperscript,
  gIconTable,
  gIconTextColor,
  gIconUndo,
  gIconUnlink,
} from '../icon/icons';
import {
  activeAlign,
  activeBlock,
  activeLink,
  activeMarks,
  activeTaskList,
  applyCommand,
  applyStyledCommand,
  insertTable,
  insertTaskList,
  safeLinkUrl,
  TASK_DONE_CLASS,
  TASK_LIST_CLASS,
  toggleInlineCode,
} from './rte-commands';

// Đếm để mỗi editor trên trang có id mô tả a11y riêng.
let hintCounter = 0;

// Trình soạn RICH-TEXT (Angular-only, 0 thư viện ngoài). Bề mặt là contenteditable; định dạng áp qua
// lớp lệnh `rte-commands` — file DUY NHẤT chạm `document.execCommand` (đọc phần chú thích ở đó để
// biết vì sao một API deprecated vẫn là lựa chọn đúng: chỉ nó giữ được undo stack + IME của trình
// duyệt). Trạng thái toolbar (đang đậm? đang ở H2? căn lề nào?) dò bằng Selection/Range API TIÊU
// CHUẨN, không dùng queryCommandState/queryCommandValue.
//
// IME-safe: KHÔNG ghi innerHTML trở lại lúc gõ (chỉ đọc khi input); chỉ đồng bộ ngược khi giá trị đổi
// từ ngoài (writeValue). Dán mặc định = plain-text; `pasteMode="html"` thì giữ định dạng nhưng
// SANITIZE trước. Toolbar theo chuẩn ARIA toolbar: một điểm dừng Tab duy nhất, ←/→ chuyển nút.
@Component({
  selector: 'g-rich-text-editor',
  imports: [GIcon, GActionMenu, CdkConnectedOverlay, CdkTrapFocus],
  template: `
    <div class="g-rte" [class.g-rte--disabled]="isDisabled()" [class.g-rte--invalid]="invalid()">
      <div
        #toolbar
        class="g-rte__toolbar"
        role="toolbar"
        aria-label="Định dạng"
        tabindex="-1"
        (keydown)="onToolbarKeydown($event)"
        (focusin)="onToolbarFocusIn($event)"
      >
        <button
          type="button"
          class="g-rte__btn"
          aria-label="Hoàn tác"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="exec('undo')"
        >
          <g-icon [icon]="iconUndo" size="sm" />
        </button>
        <button
          type="button"
          class="g-rte__btn"
          aria-label="Làm lại"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="exec('redo')"
        >
          <g-icon [icon]="iconRedo" size="sm" />
        </button>
        <span class="g-rte__sep"></span>

        <!-- Chọn kiểu khối: dùng lại GActionMenu. Giữ selection bằng cách chặn mousedown (không cho
             contenteditable mất focus) rồi khôi phục range trước khi áp lệnh. -->
        <span class="g-rte__menu g-rte__menu--label" (mousedown)="saveSelection()">
          <g-action-menu
            variant="label"
            label="Text styles"
            [items]="blockItems"
            placement="bottom-left"
            (action)="onBlock($event)"
          />
        </span>
        <span class="g-rte__sep"></span>

        @for (m of marks; track m.cmd) {
          <button
            type="button"
            class="g-rte__btn"
            [class.g-rte__btn--active]="active().has(m.cmd)"
            [attr.aria-label]="m.title"
            [attr.aria-pressed]="active().has(m.cmd)"
            [style]="m.style"
            [disabled]="isDisabled()"
            (mousedown)="$event.preventDefault()"
            (click)="toggleMark(m.cmd)"
          >
            {{ m.label }}
          </button>
        }

        <!-- Định dạng ít dùng hơn gộp vào một dropdown cho toolbar đỡ chật. -->
        <span class="g-rte__menu" (mousedown)="saveSelection()">
          <g-action-menu
            label="Định dạng khác"
            [icon]="iconMore"
            [items]="extraFormats"
            placement="bottom-left"
            (action)="onExtraFormat($event)"
          />
        </span>

        <button
          #colorTrigger
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="colorOpen()"
          aria-label="Màu chữ"
          aria-haspopup="true"
          [attr.aria-expanded]="colorOpen()"
          [disabled]="isDisabled()"
          (mousedown)="saveSelection(); $event.preventDefault()"
          (click)="toggleColor()"
        >
          <g-icon [icon]="iconTextColor" size="sm" />
        </button>
        <ng-template
          cdkConnectedOverlay
          [cdkConnectedOverlayOrigin]="colorTriggerRef()!"
          [cdkConnectedOverlayOpen]="colorOpen()"
          [cdkConnectedOverlayPositions]="menuPositions"
          cdkConnectedOverlayHasBackdrop
          cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
          (backdropClick)="closeColor()"
          (detach)="closeColor()"
        >
          <div
            class="g-rte__colors"
            role="group"
            aria-label="Màu chữ"
            tabindex="-1"
            cdkTrapFocus
            [cdkTrapFocusAutoCapture]="true"
            (keydown.escape)="closeColor()"
          >
            @for (c of colors; track c.value) {
              <button
                type="button"
                class="g-rte__swatch"
                [class.g-rte__swatch--reset]="c.value === 'inherit'"
                [style.color]="c.value"
                [attr.aria-label]="c.label"
                [attr.title]="c.label"
                (click)="applyColor(c.value)"
              ></button>
            }
          </div>
        </ng-template>
        <span class="g-rte__sep"></span>

        <span class="g-rte__menu" (mousedown)="saveSelection()">
          <g-action-menu
            label="Kiểu danh sách"
            [icon]="iconList"
            [items]="listItems"
            placement="bottom-left"
            (action)="onList($event)"
          />
        </span>
        <span class="g-rte__sep"></span>

        @for (a of aligns; track a.cmd) {
          <button
            type="button"
            class="g-rte__btn"
            [class.g-rte__btn--active]="align() === a.value"
            [attr.aria-label]="a.title"
            [attr.aria-pressed]="align() === a.value"
            [disabled]="isDisabled()"
            (mousedown)="$event.preventDefault()"
            (click)="exec(a.cmd)"
          >
            <g-icon [icon]="a.icon" size="sm" />
          </button>
        }
        <span class="g-rte__sep"></span>

        <button
          #linkTrigger
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="panel() === 'link'"
          aria-label="Chèn liên kết"
          aria-haspopup="true"
          [attr.aria-expanded]="panel() === 'link'"
          [disabled]="isDisabled()"
          (mousedown)="saveSelection(); $event.preventDefault()"
          (click)="openLink()"
        >
          <g-icon [icon]="iconLink" size="sm" />
        </button>
        <ng-template
          cdkConnectedOverlay
          [cdkConnectedOverlayOrigin]="linkTriggerRef()!"
          [cdkConnectedOverlayOpen]="panel() === 'link'"
          [cdkConnectedOverlayPositions]="menuPositions"
          cdkConnectedOverlayHasBackdrop
          cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
          (backdropClick)="closePanel()"
          (detach)="closePanel()"
        >
          <!-- Không bật autoCapture: nó luôn nhảy vào ô ĐẦU, trong khi ta muốn con trỏ vào ô còn
               trống (thường là Địa chỉ khi chữ đã lấy từ đoạn bôi đen). Focus do effect đặt. -->
          <div class="g-rte__pop" cdkTrapFocus>
            <label class="g-rte__field">
              <span>Văn bản hiển thị</span>
              <input
                #linkText
                type="text"
                class="g-rte__input"
                placeholder="Tên hiển thị (bỏ trống = dùng địa chỉ)"
                (keydown.enter)="applyLink(linkText.value, linkUrl.value)"
                (keydown.escape)="closePanel()"
              />
            </label>
            <label class="g-rte__field">
              <span>Địa chỉ</span>
              <input
                #linkUrl
                type="url"
                class="g-rte__input"
                placeholder="https://vi-du.com"
                [attr.aria-invalid]="linkError() || null"
                [class.g-rte__input--invalid]="linkError()"
                (keydown.enter)="applyLink(linkText.value, linkUrl.value)"
                (keydown.escape)="closePanel()"
              />
            </label>
            @if (linkError()) {
              <span class="g-rte__err">Chỉ nhận http, https, mailto hoặc tel.</span>
            }
            <div class="g-rte__pop-actions">
              <button
                type="button"
                class="g-rte__btn"
                (click)="applyLink(linkText.value, linkUrl.value)"
              >
                Áp dụng
              </button>
              <button type="button" class="g-rte__btn" (click)="closePanel()">Huỷ</button>
            </div>
          </div>
        </ng-template>
        <button
          type="button"
          class="g-rte__btn"
          aria-label="Bỏ liên kết"
          [disabled]="isDisabled() || !active().has('link')"
          (mousedown)="$event.preventDefault()"
          (click)="removeLink()"
        >
          <g-icon [icon]="iconUnlink" size="sm" />
        </button>
        <button
          #tableTrigger
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="panel() === 'table'"
          aria-label="Chèn bảng"
          aria-haspopup="true"
          [attr.aria-expanded]="panel() === 'table'"
          [disabled]="isDisabled()"
          (mousedown)="saveSelection(); $event.preventDefault()"
          (click)="togglePanel('table')"
        >
          <g-icon [icon]="iconTable" size="sm" />
        </button>
        <ng-template
          cdkConnectedOverlay
          [cdkConnectedOverlayOrigin]="tableTriggerRef()!"
          [cdkConnectedOverlayOpen]="panel() === 'table'"
          [cdkConnectedOverlayPositions]="menuPositions"
          cdkConnectedOverlayHasBackdrop
          cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
          (backdropClick)="closePanel()"
          (detach)="closePanel()"
        >
          <div class="g-rte__pop" cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
            <div class="g-rte__pop-row">
              <label class="g-rte__field">
                <span>Hàng</span>
                <input
                  #rowsInput
                  type="number"
                  class="g-rte__input g-rte__input--num"
                  min="1"
                  max="20"
                  value="3"
                  (keydown.escape)="closePanel()"
                />
              </label>
              <label class="g-rte__field">
                <span>Cột</span>
                <input
                  #colsInput
                  type="number"
                  class="g-rte__input g-rte__input--num"
                  min="1"
                  max="10"
                  value="3"
                  (keydown.escape)="closePanel()"
                />
              </label>
            </div>
            <div class="g-rte__pop-actions">
              <button
                type="button"
                class="g-rte__btn"
                (click)="applyTable(rowsInput.value, colsInput.value)"
              >
                Chèn bảng
              </button>
              <button type="button" class="g-rte__btn" (click)="closePanel()">Huỷ</button>
            </div>
          </div>
        </ng-template>
        <span class="g-rte__sep"></span>

        <button
          type="button"
          class="g-rte__btn"
          aria-label="Xoá định dạng"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="exec('removeFormat')"
        >
          T&#818;x&#818;
        </button>
      </div>

      <div
        #editable
        class="g-rte__body"
        [attr.contenteditable]="isDisabled() ? 'false' : 'true'"
        [attr.data-placeholder]="placeholder()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-invalid]="invalid() || null"
        [attr.aria-describedby]="hintId"
        role="textbox"
        aria-multiline="true"
        [attr.tabindex]="isDisabled() ? -1 : 0"
        [style.min-height.px]="minHeight()"
        (input)="onInput()"
        (keydown)="onEditableKeydown($event)"
        (click)="onEditableClick($event)"
        (paste)="onPaste($event)"
        (keyup)="updateActive()"
        (mouseup)="updateActive()"
        (blur)="onTouchedFn()"
      ></div>

      <!-- Nói rõ quy ước phím cho screen reader: Tab bị dùng để thụt lề nên cần lối thoát riêng. -->
      <span class="cdk-visually-hidden" [id]="hintId">
        Tab để thụt lề, Shift+Tab để lùi ra. Nhấn Escape rồi Tab để rời khỏi vùng soạn.
      </span>
    </div>
  `,
  styleUrl: './rich-text-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-rich-text-editor' },
})
export class GRichTextEditor implements ControlValueAccessor, OnInit {
  readonly value = model('');
  readonly minHeight = input(160);
  readonly placeholder = input('Nhập nội dung…');
  readonly ariaLabel = input('Trình soạn văn bản');
  readonly disabled = input(false, { transform: booleanAttribute });
  // Dán: 'text' = bỏ hết định dạng (mặc định, tránh rác từ Word/web); 'html' = giữ định dạng nhưng
  // đi qua sanitizer của Angular trước.
  readonly pasteMode = input<'text' | 'html'>('text');

  protected readonly marks = [
    { cmd: 'bold', label: 'B', title: 'Đậm', style: 'font-weight:700' },
    { cmd: 'italic', label: 'I', title: 'Nghiêng', style: 'font-style:italic' },
    { cmd: 'underline', label: 'U', title: 'Gạch dưới', style: 'text-decoration:underline' },
  ];
  protected readonly aligns = [
    { cmd: 'justifyLeft', value: 'left', title: 'Căn trái', icon: gIconAlignLeft },
    { cmd: 'justifyCenter', value: 'center', title: 'Căn giữa', icon: gIconAlignCenter },
    { cmd: 'justifyRight', value: 'right', title: 'Căn phải', icon: gIconAlignRight },
  ];
  protected readonly blockItems: GActionMenuItem[] = [
    { label: 'Normal text', value: 'p' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
    { label: 'Heading 6', value: 'h6' },
    { label: 'Quote', value: 'blockquote' },
    { label: 'Code block', value: 'pre' },
  ];
  // Định dạng ít dùng, gộp vào một dropdown. Đây là các định dạng TRONG DÒNG — nhãn "Inline code" để
  // khỏi lẫn với "Code block" (kiểu KHỐI, nằm ở Text styles). 'code' không có lệnh execCommand nên
  // xử lý riêng.
  protected readonly extraFormats: GActionMenuItem[] = [
    { label: 'Strikethrough', value: 'strikeThrough', icon: gIconStrikethrough },
    { label: 'Inline code', value: 'code', icon: gIconCode },
    { label: 'Subscript', value: 'subscript', icon: gIconSubscript },
    { label: 'Superscript', value: 'superscript', icon: gIconSuperscript },
  ];
  // Kiểu danh sách. 'task' (ô đánh dấu) không có lệnh execCommand nên xử lý riêng.
  protected readonly listItems: GActionMenuItem[] = [
    { label: 'Bulleted list', value: 'insertUnorderedList', icon: gIconList },
    { label: 'Numbered list', value: 'insertOrderedList', icon: gIconListOrdered },
    { label: 'Checkbox list', value: 'task', icon: gIconListChecks },
  ];
  // Bảng màu chữ: các tông trung tính đọc được trên CẢ nền sáng lẫn tối (giá trị được ghi thẳng vào
  // HTML nên không đổi theo theme). 'inherit' = trả về màu chữ mặc định của theme.
  protected readonly colors = [
    { label: 'Mặc định', value: 'inherit' },
    { label: 'Đỏ', value: '#e11d48' },
    { label: 'Cam', value: '#ea580c' },
    { label: 'Vàng', value: '#ca8a04' },
    { label: 'Xanh lá', value: '#16a34a' },
    { label: 'Xanh ngọc', value: '#0891b2' },
    { label: 'Xanh dương', value: '#2563eb' },
    { label: 'Tím', value: '#7c3aed' },
    { label: 'Xám', value: '#6b7280' },
  ];
  protected readonly iconUndo = gIconUndo;
  protected readonly iconRedo = gIconRedo;
  protected readonly iconLink = gIconLink;
  protected readonly iconUnlink = gIconUnlink;
  protected readonly iconMore = gIconMoreHorizontal;
  protected readonly iconTextColor = gIconTextColor;
  protected readonly iconTable = gIconTable;
  protected readonly iconList = gIconList;
  protected readonly hintId = `g-rte-hint-${++hintCounter}`;

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly invalid = signal(false);
  protected readonly active = signal<ReadonlySet<string>>(new Set());
  protected readonly block = signal('');
  protected readonly align = signal('');
  // Khay phụ hiện dưới toolbar: nhập URL hoặc kích thước bảng (bảng màu là dropdown riêng).
  protected readonly panel = signal<'none' | 'link' | 'table'>('none');
  protected readonly colorOpen = signal(false);
  // Dùng lại thứ tự vị trí của GActionMenu: xổ dưới-trái, tự lật khi sát mép viewport.
  protected readonly menuPositions = actionMenuPositions('bottom-left');
  protected readonly linkError = signal(false);
  private onChange: (v: string) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;
  // HTML nội bộ vừa commit từ thao tác gõ/định dạng — để phân biệt "echo của chính mình" với giá trị
  // đổi từ NGOÀI (writeValue/[(value)]) trong effect đồng bộ ngược.
  private lastInternal = '';
  // Range lưu tạm khi focus rời vùng soạn (mở menu khối, gõ vào ô URL) để áp lệnh đúng chỗ cũ.
  private savedRange: Range | null = null;
  // Mark vừa bật/tắt tại con trỏ RỖNG: DOM chưa có gì để dò, nên nhớ tay cho tới khi gõ/di chuyển.
  private pendingMarks = new Set<string>();
  private pendingAt: { node: Node; offset: number } | null = null;
  // Giá trị điền sẵn cho hai ô của popover liên kết (địa chỉ + chữ hiển thị).
  private linkDraft = '';
  private textDraft = '';
  // Vừa bấm Esc → lần Tab kế tiếp KHÔNG thụt lề mà rời khỏi vùng soạn (lối thoát bàn phím).
  private tabExits = false;

  private readonly editable = viewChild<ElementRef<HTMLElement>>('editable');
  private readonly toolbar = viewChild<ElementRef<HTMLElement>>('toolbar');
  private readonly linkUrlInput = viewChild<ElementRef<HTMLInputElement>>('linkUrl');
  private readonly linkTextInput = viewChild<ElementRef<HTMLInputElement>>('linkText');
  protected readonly colorTriggerRef = viewChild<ElementRef<HTMLButtonElement>>('colorTrigger');
  protected readonly linkTriggerRef = viewChild<ElementRef<HTMLButtonElement>>('linkTrigger');
  protected readonly tableTriggerRef = viewChild<ElementRef<HTMLButtonElement>>('tableTrigger');

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    // Đồng bộ ngược value → DOM CHỈ khi đổi từ NGOÀI. Lúc gõ (v === lastInternal) thì bỏ qua để không
    // ghi đè innerHTML → giữ IME + con trỏ. Giá trị ngoài (có thể là HTML KHÔNG tin cậy) được SANITIZE
    // (giữ tag định dạng, loại <script>/handler) trước khi render — an toàn XSS.
    effect(() => {
      const v = this.value();
      const el = this.editable()?.nativeElement;
      if (!el || v === this.lastInternal) return;
      const clean = this.sanitizer.sanitize(SecurityContext.HTML, v) ?? '';
      if (el.innerHTML !== clean) {
        el.innerHTML = clean;
        this.lastInternal = clean;
      }
    });
    // Popover liên kết vừa hiện ra thì điền sẵn hai ô và đặt con trỏ vào ô cần gõ nhất — viewChild là
    // signal nên effect này chạy đúng lúc phần tử xuất hiện trong DOM.
    effect(() => {
      if (this.panel() !== 'link') return;
      const urlInput = this.linkUrlInput()?.nativeElement;
      const textInput = this.linkTextInput()?.nativeElement;
      if (!urlInput || !textInput) return;
      urlInput.value = this.linkDraft;
      textInput.value = this.textDraft;
      // Đã có sẵn chữ (bôi đen hoặc sửa link cũ) thì việc còn lại là nhập địa chỉ.
      const target = textInput.value ? urlInput : textInput;
      target.focus();
      target.select();
    });
    afterNextRender(() => {
      // Cập nhật trạng thái nút khi con trỏ di chuyển trong vùng soạn.
      const onSel = () => this.updateActive();
      document.addEventListener('selectionchange', onSel);
      this.destroyRef.onDestroy(() => document.removeEventListener('selectionchange', onSel));
      // ARIA toolbar: chỉ nút đầu là điểm dừng Tab, các nút còn lại đi bằng ←/→.
      this.setRoving(0);
    });
  }

  ngOnInit(): void {
    trackControlInvalid(this.ngControl, this.destroyRef, this.invalid);
  }

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  private commit(): void {
    const html = this.editable()?.nativeElement.innerHTML ?? '';
    this.lastInternal = html;
    this.value.set(html);
    this.onChange(html);
  }

  protected onInput(): void {
    this.clearPending();
    this.commit();
    this.updateActive();
  }

  protected onPaste(e: ClipboardEvent): void {
    e.preventDefault();
    const data = e.clipboardData;
    if (this.pasteMode() === 'html') {
      // Giữ định dạng nhưng LỌC trước: HTML từ clipboard là nguồn không tin cậy (copy từ web bất kỳ).
      const raw = data?.getData('text/html') || data?.getData('text/plain') || '';
      const clean = this.sanitizer.sanitize(SecurityContext.HTML, raw) ?? '';
      applyCommand('insertHTML', clean);
    } else {
      applyCommand('insertText', data?.getData('text/plain') ?? '');
    }
    this.commit();
    this.updateActive();
  }

  /** Chạy một lệnh trên vùng soạn: khôi phục con trỏ → áp lệnh → commit giá trị → cập nhật nút. */
  protected exec(command: string, argument?: string): void {
    if (this.isDisabled()) return;
    this.restoreSelection();
    applyCommand(command, argument);
    this.commit();
    this.updateActive();
  }

  protected toggleMark(command: string): void {
    const sel = document.getSelection();
    // Con trỏ rỗng: trình duyệt bật "định dạng chờ" nhưng DOM chưa đổi → nhớ tay để nút vẫn sáng.
    if (sel?.isCollapsed && sel.focusNode) {
      if (this.pendingMarks.has(command)) this.pendingMarks.delete(command);
      else this.pendingMarks.add(command);
      this.pendingAt = { node: sel.focusNode, offset: sel.focusOffset };
    }
    this.exec(command);
  }

  protected onBlock(item: GActionMenuItem): void {
    // Chạy sau khi GActionMenu trả focus về trigger của nó, để restoreSelection() giành lại focus.
    queueMicrotask(() => {
      const el = this.editable()?.nativeElement;
      if (!el) return;
      const current = activeBlock(el);
      this.exec('formatBlock', `<${current === item.value ? 'p' : item.value}>`);
    });
  }

  // ----- Định dạng khác (Code / Subscript / Superscript) ----------------------------------------

  protected onExtraFormat(item: GActionMenuItem): void {
    // Như onBlock: đợi GActionMenu trả focus rồi mới giành lại con trỏ trong vùng soạn.
    queueMicrotask(() => {
      if (item.value !== 'code') {
        this.toggleMark(item.value);
        return;
      }
      const el = this.editable()?.nativeElement;
      if (this.isDisabled() || !el) return;
      this.restoreSelection();
      toggleInlineCode(el);
      this.commit();
      this.updateActive();
    });
  }

  /**
   * Đổi kiểu danh sách. Ba kiểu chuyển qua lại được, nhưng phải gỡ kiểu cũ trước: Chrome KHÔNG cho
   * `insertHTML` một `<ul>` chồng lên danh sách đang có (quy tắc lồng danh sách), nên muốn sang
   * checklist thì tắt danh sách hiện tại trước đã.
   */
  protected onList(item: GActionMenuItem): void {
    queueMicrotask(() => {
      const el = this.editable()?.nativeElement;
      if (this.isDisabled() || !el) return;
      this.restoreSelection();
      const taskList = activeTaskList(el);
      const block = activeBlock(el);

      if (item.value === 'task') {
        if (taskList) {
          // Đang là checklist → bấm lần nữa để tắt hẳn danh sách.
          taskList.classList.remove(TASK_LIST_CLASS);
          applyCommand('insertUnorderedList');
        } else {
          if (block === 'ul') applyCommand('insertUnorderedList');
          else if (block === 'ol') applyCommand('insertOrderedList');
          insertTaskList();
        }
      } else if (taskList) {
        // Checklist → danh sách thường: bỏ class là xong (đổi sang số thì chuyển tiếp ul → ol).
        // Đây là thao tác DOM trực tiếp nên KHÔNG vào undo stack — chấp nhận được vì chỉ đổi class.
        taskList.classList.remove(TASK_LIST_CLASS);
        if (item.value === 'insertOrderedList') applyCommand('insertOrderedList');
      } else {
        applyCommand(item.value);
      }

      this.commit();
      this.updateActive();
    });
  }

  /**
   * Tab = THỤT LỀ, Shift+Tab = lùi ra — trong danh sách thì thành danh sách con, ở đoạn văn/tiêu đề
   * thì tăng `margin-left`. Dùng lệnh `indent`/`outdent` nên vẫn nằm trong undo stack.
   *
   * Lối thoát bàn phím: Tab bị chiếm thì phải có cách khác rời khỏi vùng soạn, nếu không là bẫy bàn
   * phím (WCAG 2.1.2). Ở đây quy ước quen thuộc: **Esc rồi Tab** — Esc bật cờ cho đúng lần Tab kế
   * tiếp đi ra ngoài. Cách này được nói rõ cho screen reader qua `aria-describedby`.
   */
  protected onEditableKeydown(e: KeyboardEvent): void {
    if (this.isDisabled()) return;
    if (e.key === 'Escape') {
      this.tabExits = true;
      return;
    }
    if (e.key !== 'Tab') {
      this.tabExits = false;
      return;
    }
    if (this.tabExits) {
      // Vừa bấm Esc → để nguyên cho trình duyệt chuyển focus ra khỏi editor.
      this.tabExits = false;
      return;
    }
    const el = this.editable()?.nativeElement;
    if (!el) return;
    e.preventDefault();
    const block = activeBlock(el);
    // Trong khối code, Tab là để GÕ THỤT ĐẦU DÒNG chứ không phải thụt cả khối.
    if (block === 'pre' && !e.shiftKey) {
      applyCommand('insertText', '  ');
      this.commit();
      return;
    }
    const command = e.shiftKey ? 'outdent' : 'indent';
    // Trong danh sách: lệnh mặc định tạo danh sách CON. Ngoài danh sách: phải ở chế độ CSS, nếu không
    // Chrome bọc đoạn văn vào <blockquote>.
    if (block === 'ul' || block === 'ol') applyCommand(command);
    else applyStyledCommand(command);
    this.syncTaskLists(el);
    this.commit();
    this.updateActive();
  }

  /** Danh sách con do trình duyệt tạo lúc thụt lề KHÔNG mang class checklist → gắn lại cho khớp cha. */
  private syncTaskLists(root: HTMLElement): void {
    root
      .querySelectorAll(`ul.${TASK_LIST_CLASS} ul`)
      .forEach((list) => list.classList.add(TASK_LIST_CLASS));
  }

  /** Bấm vào ô vuông bên trái một mục checklist thì tick/bỏ tick (phần còn lại vẫn gõ chữ). */
  protected onEditableClick(e: MouseEvent): void {
    if (this.isDisabled()) return;
    const item = (e.target as HTMLElement | null)?.closest?.('li');
    if (!item?.parentElement?.classList.contains(TASK_LIST_CLASS)) return;
    if (e.clientX - item.getBoundingClientRect().left > 22) return;
    item.classList.toggle(TASK_DONE_CLASS);
    this.commit();
  }

  // ----- Khay phụ: liên kết / bảng --------------------------------------------------------------

  protected togglePanel(name: 'link' | 'table'): void {
    if (this.isDisabled()) return;
    if (this.panel() === name) {
      this.closePanel();
      return;
    }
    this.saveSelection();
    this.panel.set(name);
  }

  protected closePanel(): void {
    this.panel.set('none');
    this.linkError.set(false);
    this.restoreSelection();
  }

  protected toggleColor(): void {
    if (this.isDisabled()) return;
    this.colorOpen.set(!this.colorOpen());
  }

  protected closeColor(): void {
    if (!this.colorOpen()) return;
    this.colorOpen.set(false);
    this.restoreSelection();
  }

  protected applyColor(color: string): void {
    this.colorOpen.set(false);
    this.restoreSelection();
    applyStyledCommand('foreColor', color);
    this.commit();
    this.updateActive();
  }

  protected applyTable(rows: string, cols: string): void {
    this.restoreSelection();
    insertTable(Number(rows), Number(cols));
    this.panel.set('none');
    this.commit();
    this.updateActive();
  }

  protected openLink(): void {
    const el = this.editable()?.nativeElement;
    if (this.isDisabled() || !el) return;
    if (this.panel() === 'link') {
      this.closePanel();
      return;
    }
    this.saveSelection();
    // Đang đứng trong một liên kết thì mở ra để SỬA (điền sẵn địa chỉ + chữ cũ); còn không thì lấy
    // đoạn đang bôi đen làm chữ hiển thị.
    const anchor = activeLink(el);
    this.linkDraft = anchor?.getAttribute('href') ?? '';
    this.textDraft = anchor?.textContent ?? document.getSelection()?.toString() ?? '';
    this.linkError.set(false);
    this.panel.set('link');
  }

  protected applyLink(text: string, rawUrl: string): void {
    const url = safeLinkUrl(rawUrl);
    if (!url) {
      this.linkError.set(true);
      return;
    }
    this.restoreSelection();
    const el = this.editable()?.nativeElement;
    const sel = document.getSelection();
    // Đang sửa một liên kết có sẵn (con trỏ nằm trong nó) → chọn cả thẻ để thay thế trọn vẹn.
    const anchor = el ? activeLink(el) : null;
    if (anchor && sel?.isCollapsed) {
      const range = document.createRange();
      range.selectNodeContents(anchor);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    const selected = sel?.toString() ?? '';
    const label = text.trim() || selected || url;

    if (selected && label === selected) {
      // Chữ giữ nguyên → `createLink` bọc quanh đoạn chọn, giữ được định dạng bên trong (đậm, màu…).
      applyCommand('createLink', url);
    } else {
      // Có chữ mới (hoặc chưa chọn gì) → chèn thẻ <a> dựng bằng DOM, nhờ vậy URL và chữ được escape
      // đúng cách thay vì nối chuỗi HTML tay.
      const a = document.createElement('a');
      a.href = url;
      a.textContent = label;
      applyCommand('insertHTML', a.outerHTML);
    }
    this.panel.set('none');
    this.commit();
    this.updateActive();
  }

  protected removeLink(): void {
    if (this.isDisabled()) return;
    this.restoreSelection();
    const el = this.editable()?.nativeElement;
    const anchor = el ? activeLink(el) : null;
    const sel = document.getSelection();
    // Con trỏ chỉ đang nằm TRONG liên kết (chưa bôi đen) → chọn cả thẻ <a> rồi mới gỡ.
    if (anchor && sel?.isCollapsed) {
      const range = document.createRange();
      range.selectNodeContents(anchor);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    applyCommand('unlink');
    this.commit();
    this.updateActive();
  }

  // ----- Selection ------------------------------------------------------------------------------

  protected saveSelection(): void {
    const sel = document.getSelection();
    const el = this.editable()?.nativeElement;
    if (sel?.rangeCount && el && sel.anchorNode && el.contains(sel.anchorNode)) {
      this.savedRange = sel.getRangeAt(0).cloneRange();
    }
  }

  private restoreSelection(): void {
    const el = this.editable()?.nativeElement;
    if (!el) return;
    el.focus();
    const range = this.savedRange;
    if (!range || !el.contains(range.startContainer)) return;
    const sel = document.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  private clearPending(): void {
    this.pendingMarks = new Set();
    this.pendingAt = null;
  }

  // ----- Trạng thái toolbar ---------------------------------------------------------------------

  protected updateActive(): void {
    const el = this.editable()?.nativeElement;
    const sel = document.getSelection();
    if (!el || !sel?.anchorNode || !el.contains(sel.anchorNode)) return;
    // Con trỏ đã rời chỗ đặt "định dạng chờ" → bỏ nhớ tay, tin vào DOM.
    if (
      this.pendingAt &&
      (this.pendingAt.node !== sel.focusNode || this.pendingAt.offset !== sel.focusOffset)
    ) {
      this.clearPending();
    }
    const set = new Set(activeMarks(el));
    for (const mark of this.pendingMarks) {
      if (set.has(mark)) set.delete(mark);
      else set.add(mark);
    }
    this.active.set(set);
    this.block.set(activeBlock(el));
    this.align.set(activeAlign(el));
    // Luôn giữ range MỚI NHẤT: mở dropdown bằng bàn phím (Enter, không có mousedown) vẫn phải áp lệnh
    // đúng chỗ — nếu để range cũ, restoreSelection() sẽ kéo con trỏ về vị trí lần trước.
    this.saveSelection();
  }

  // ----- Bàn phím cho toolbar (chuẩn ARIA: 1 điểm dừng Tab, ←/→ chuyển nút) ----------------------

  private toolbarButtons(): HTMLButtonElement[] {
    const bar = this.toolbar()?.nativeElement;
    return bar ? Array.from(bar.querySelectorAll<HTMLButtonElement>('button:not([disabled])')) : [];
  }

  private setRoving(index: number): void {
    const bar = this.toolbar()?.nativeElement;
    if (!bar) return;
    // Đặt -1 cho MỌI nút, kể cả nút đang disabled: nó không nằm trong danh sách điều hướng nhưng vẫn
    // giữ tabindex mặc định 0, bật lại sẽ thành điểm dừng Tab thứ hai của toolbar.
    bar.querySelectorAll('button').forEach((b) => (b.tabIndex = -1));
    const buttons = this.toolbarButtons();
    const target = buttons[Math.min(Math.max(index, 0), buttons.length - 1)];
    if (target) target.tabIndex = 0;
  }

  protected onToolbarKeydown(e: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const buttons = this.toolbarButtons();
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;
    e.preventDefault();
    const step = e.key === 'ArrowRight' ? 1 : -1;
    const next =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? buttons.length - 1
          : (current + step + buttons.length) % buttons.length;
    this.setRoving(next);
    buttons[next]?.focus();
  }

  protected onToolbarFocusIn(e: FocusEvent): void {
    const buttons = this.toolbarButtons();
    const index = buttons.indexOf(e.target as HTMLButtonElement);
    if (index !== -1) this.setRoving(index);
  }
}
