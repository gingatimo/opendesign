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
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { GActionMenu, GActionMenuItem } from '../action-menu/action-menu';
import { trackControlInvalid } from '../core/control-invalid';
import { GIcon } from '../icon/icon';
import {
  gIconAlignCenter,
  gIconAlignLeft,
  gIconAlignRight,
  gIconLink,
  gIconRedo,
  gIconUndo,
  gIconUnlink,
} from '../icon/icons';
import {
  activeAlign,
  activeBlock,
  activeLink,
  activeMarks,
  applyCommand,
  safeLinkUrl,
} from './rte-commands';

// Nhãn hiển thị trên nút chọn khối, theo tag đang đứng.
const BLOCK_LABELS: Readonly<Record<string, string>> = {
  p: 'Đoạn',
  h1: 'Tiêu đề 1',
  h2: 'Tiêu đề 2',
  h3: 'Tiêu đề 3',
  blockquote: 'Trích dẫn',
  ul: 'Danh sách',
  ol: 'Danh sách',
};

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
  imports: [GIcon, GActionMenu],
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
        <span class="g-rte__block" (mousedown)="saveSelection()">
          <g-action-menu
            variant="label"
            [label]="blockLabel()"
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
        <span class="g-rte__sep"></span>

        <button
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="block() === 'ul'"
          [attr.aria-pressed]="block() === 'ul'"
          aria-label="Danh sách chấm"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="exec('insertUnorderedList')"
        >
          &bull;
        </button>
        <button
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="block() === 'ol'"
          [attr.aria-pressed]="block() === 'ol'"
          aria-label="Danh sách số"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="exec('insertOrderedList')"
        >
          1.
        </button>
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
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="linkOpen()"
          aria-label="Chèn liên kết"
          [attr.aria-expanded]="linkOpen()"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="openLink()"
        >
          <g-icon [icon]="iconLink" size="sm" />
        </button>
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

      @if (linkOpen()) {
        <div class="g-rte__linkbar">
          <input
            #linkInput
            type="url"
            class="g-rte__linkinput"
            placeholder="https://vi-du.com"
            aria-label="Địa chỉ liên kết"
            [attr.aria-invalid]="linkError() || null"
            [class.g-rte__linkinput--invalid]="linkError()"
            (keydown.enter)="applyLink(linkInput.value)"
            (keydown.escape)="closeLink()"
          />
          <button type="button" class="g-rte__btn" (click)="applyLink(linkInput.value)">
            Áp dụng
          </button>
          <button type="button" class="g-rte__btn" (click)="closeLink()">Huỷ</button>
          @if (linkError()) {
            <span class="g-rte__linkerr">Chỉ nhận http, https, mailto hoặc tel.</span>
          }
        </div>
      }

      <div
        #editable
        class="g-rte__body"
        [attr.contenteditable]="isDisabled() ? 'false' : 'true'"
        [attr.data-placeholder]="placeholder()"
        [attr.aria-label]="ariaLabel()"
        [attr.aria-invalid]="invalid() || null"
        role="textbox"
        aria-multiline="true"
        [attr.tabindex]="isDisabled() ? -1 : 0"
        [style.min-height.px]="minHeight()"
        (input)="onInput()"
        (paste)="onPaste($event)"
        (keyup)="updateActive()"
        (mouseup)="updateActive()"
        (blur)="onTouchedFn()"
      ></div>
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
    {
      cmd: 'strikeThrough',
      label: 'S',
      title: 'Gạch ngang',
      style: 'text-decoration:line-through',
    },
  ];
  protected readonly aligns = [
    { cmd: 'justifyLeft', value: 'left', title: 'Căn trái', icon: gIconAlignLeft },
    { cmd: 'justifyCenter', value: 'center', title: 'Căn giữa', icon: gIconAlignCenter },
    { cmd: 'justifyRight', value: 'right', title: 'Căn phải', icon: gIconAlignRight },
  ];
  protected readonly blockItems: GActionMenuItem[] = [
    { label: 'Đoạn', value: 'p' },
    { label: 'Tiêu đề 1', value: 'h1' },
    { label: 'Tiêu đề 2', value: 'h2' },
    { label: 'Tiêu đề 3', value: 'h3' },
    { label: 'Trích dẫn', value: 'blockquote' },
  ];
  protected readonly iconUndo = gIconUndo;
  protected readonly iconRedo = gIconRedo;
  protected readonly iconLink = gIconLink;
  protected readonly iconUnlink = gIconUnlink;

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly invalid = signal(false);
  protected readonly active = signal<ReadonlySet<string>>(new Set());
  protected readonly block = signal('');
  protected readonly align = signal('');
  protected readonly blockLabel = computed(() => BLOCK_LABELS[this.block()] ?? 'Đoạn');
  protected readonly linkOpen = signal(false);
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
  // href điền sẵn cho ô URL khi mở popover liên kết.
  private linkDraft = '';

  private readonly editable = viewChild<ElementRef<HTMLElement>>('editable');
  private readonly toolbar = viewChild<ElementRef<HTMLElement>>('toolbar');
  private readonly linkInput = viewChild<ElementRef<HTMLInputElement>>('linkInput');

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
    // Ô URL vừa hiện ra thì điền sẵn href cũ và đặt con trỏ vào — viewChild là signal nên effect này
    // chạy đúng lúc phần tử xuất hiện trong DOM.
    effect(() => {
      if (!this.linkOpen()) return;
      const input = this.linkInput()?.nativeElement;
      if (!input) return;
      input.value = this.linkDraft;
      input.focus();
      input.select();
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

  // ----- Liên kết -------------------------------------------------------------------------------

  protected openLink(): void {
    const el = this.editable()?.nativeElement;
    if (this.isDisabled() || !el) return;
    this.saveSelection();
    // Đang đứng trong một liên kết thì mở ra để SỬA (điền sẵn href cũ).
    this.linkDraft = activeLink(el)?.getAttribute('href') ?? '';
    this.linkError.set(false);
    this.linkOpen.set(true);
  }

  protected closeLink(): void {
    this.linkOpen.set(false);
    this.linkError.set(false);
    this.restoreSelection();
  }

  protected applyLink(raw: string): void {
    const url = safeLinkUrl(raw);
    if (!url) {
      this.linkError.set(true);
      return;
    }
    this.restoreSelection();
    const sel = document.getSelection();
    if (sel?.isCollapsed) {
      // Không có chữ nào được chọn → chèn hẳn thẻ <a> mới, lấy chính URL làm nhãn. Dựng bằng DOM rồi
      // đọc outerHTML để URL được escape đúng cách (không nối chuỗi HTML tay).
      const a = document.createElement('a');
      a.href = url;
      a.textContent = url;
      applyCommand('insertHTML', a.outerHTML);
    } else {
      applyCommand('createLink', url);
    }
    this.linkOpen.set(false);
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
