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
import { trackControlInvalid } from '../core/control-invalid';

// Trình soạn RICH-TEXT (Angular-only, 0 thư viện ngoài). Bề mặt là contenteditable; các nút toolbar
// áp định dạng qua `document.execCommand` — ĐÂY LÀ BUILT-IN CỦA TRÌNH DUYỆT (không phải dependency),
// nên vẫn "Angular-only". execCommand tuy đã deprecated nhưng mọi trình duyệt vẫn hỗ trợ ổn định;
// viết engine toggle mark bằng Range API từ đầu là "lãnh địa ProseMirror" (rất lớn/rủi ro) nên với v1
// đây là đánh đổi hợp lý — cần future-proof/cộng tác thì thay engine bằng TipTap sau.
//
// IME-safe: KHÔNG ghi innerHTML trở lại lúc gõ (chỉ đọc khi input); chỉ đồng bộ ngược khi giá trị đổi
// từ ngoài (writeValue). Dán = plain-text để tránh rác HTML từ Word/web.
@Component({
  selector: 'g-rich-text-editor',
  template: `
    <div class="g-rte" [class.g-rte--disabled]="isDisabled()" [class.g-rte--invalid]="invalid()">
      <div class="g-rte__toolbar" role="toolbar" aria-label="Định dạng">
        @for (b of marks; track b.cmd) {
          <button
            type="button"
            class="g-rte__btn"
            [class.g-rte__btn--active]="active().has(b.cmd)"
            [attr.aria-label]="b.title"
            [attr.aria-pressed]="active().has(b.cmd)"
            [style]="b.style"
            [disabled]="isDisabled()"
            (mousedown)="$event.preventDefault()"
            (click)="exec(b.cmd)"
          >
            {{ b.label }}
          </button>
        }
        <span class="g-rte__sep"></span>
        <button
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="active().has('block:h2')"
          aria-label="Tiêu đề"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="toggleBlock('h2')"
        >
          H2
        </button>
        <button
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="active().has('block:blockquote')"
          aria-label="Trích dẫn"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="toggleBlock('blockquote')"
        >
          &#10077;
        </button>
        <span class="g-rte__sep"></span>
        <button
          type="button"
          class="g-rte__btn"
          [class.g-rte__btn--active]="active().has('insertUnorderedList')"
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
          [class.g-rte__btn--active]="active().has('insertOrderedList')"
          aria-label="Danh sách số"
          [disabled]="isDisabled()"
          (mousedown)="$event.preventDefault()"
          (click)="exec('insertOrderedList')"
        >
          1.
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

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly invalid = signal(false);
  protected readonly active = signal<ReadonlySet<string>>(new Set());
  private onChange: (v: string) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;
  // HTML nội bộ vừa commit từ thao tác gõ/định dạng — để phân biệt "echo của chính mình" với giá trị
  // đổi từ NGOÀI (writeValue/[(value)]) trong effect đồng bộ ngược.
  private lastInternal = '';

  private readonly editable = viewChild<ElementRef<HTMLElement>>('editable');

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
    // Cập nhật trạng thái active nút khi con trỏ di chuyển trong vùng soạn.
    afterNextRender(() => {
      const onSel = () => this.updateActive();
      document.addEventListener('selectionchange', onSel);
      this.destroyRef.onDestroy(() => document.removeEventListener('selectionchange', onSel));
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
    this.commit();
  }

  protected exec(cmd: string, arg?: string): void {
    if (this.isDisabled()) return;
    this.editable()?.nativeElement.focus();
    document.execCommand(cmd, false, arg);
    this.commit();
    this.updateActive();
  }

  protected toggleBlock(tag: string): void {
    const cur = (document.queryCommandValue('formatBlock') || '').toLowerCase();
    this.exec('formatBlock', `<${cur === tag ? 'p' : tag}>`);
  }

  protected onPaste(e: ClipboardEvent): void {
    // Dán PLAIN-TEXT: chặn HTML rác từ nguồn ngoài.
    e.preventDefault();
    const text = e.clipboardData?.getData('text/plain') ?? '';
    document.execCommand('insertText', false, text);
    this.commit();
  }

  protected updateActive(): void {
    const el = this.editable()?.nativeElement;
    const sel = document.getSelection();
    if (!el || !sel || !sel.anchorNode || !el.contains(sel.anchorNode)) return;
    const set = new Set<string>();
    for (const c of [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'insertUnorderedList',
      'insertOrderedList',
    ]) {
      if (document.queryCommandState(c)) set.add(c);
    }
    const block = (document.queryCommandValue('formatBlock') || '').toLowerCase();
    if (block) set.add(`block:${block}`);
    this.active.set(set);
  }
}
