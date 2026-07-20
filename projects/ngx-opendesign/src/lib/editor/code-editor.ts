import {
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
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { trackControlInvalid } from '../core/control-invalid';
import { GCodeLanguage, highlightCode } from './code-highlight';

// Trình soạn CODE nhẹ (Angular-only, 0 thư viện ngoài). Kỹ thuật "textarea overlay": <textarea> TRONG
// SUỐT đè đúng lên <pre> đã tô màu (cùng font/padding/line-height) → gõ vào textarea native nên IME
// (tiếng Việt), undo/redo, chọn, con trỏ đều "miễn phí"; lớp <pre> chỉ hiện màu. Tô màu bằng regex
// (js/ts/json/css/html); muốn xịn hơn thì truyền `highlighter` riêng. Số dòng ở gutter; Tab = spaces.
// Hai chiều `[(value)]` HOẶC `formControlName`/`ngModel` (CVA).
@Component({
  selector: 'g-code-editor',
  template: `
    <div
      class="g-code-editor"
      [class.g-code-editor--disabled]="isDisabled()"
      [style.height.px]="height()"
    >
      @if (lineNumbers()) {
        <div #gutter class="g-code-editor__gutter" aria-hidden="true">
          <div class="g-code-editor__gutter-inner">
            @for (n of lines(); track n) {
              <div>{{ n }}</div>
            }
          </div>
        </div>
      }
      <div class="g-code-editor__body">
        <pre
          #pre
          class="g-code-editor__pre"
          aria-hidden="true"
        ><code [innerHTML]="highlighted()"></code></pre>
        <textarea
          #ta
          class="g-code-editor__input"
          wrap="off"
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
          [readonly]="readonly() || isDisabled()"
          [attr.placeholder]="placeholder()"
          [attr.aria-label]="ariaLabel()"
          [attr.aria-invalid]="invalid() || null"
          (input)="onInput($event)"
          (scroll)="syncScroll()"
          (keydown)="onKeydown($event)"
          (blur)="onTouchedFn()"
        ></textarea>
      </div>
    </div>
  `,
  styleUrl: './code-editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-code-editor-host' },
})
export class GCodeEditor implements ControlValueAccessor, OnInit {
  readonly value = model('');
  readonly language = input<GCodeLanguage>('plain');
  readonly height = input(220);
  readonly lineNumbers = input(true, { transform: booleanAttribute });
  readonly tabSize = input(2);
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly placeholder = input('');
  readonly ariaLabel = input('Trình soạn code');
  // Hàm tô màu riêng (vd. Prism của consumer) — bỏ trống thì dùng bộ regex nội bộ.
  readonly highlighter = input<(code: string, lang: string) => string>();

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.formDisabled());
  protected readonly invalid = signal(false);
  private onChange: (v: string) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private readonly ta = viewChild<ElementRef<HTMLTextAreaElement>>('ta');
  private readonly pre = viewChild<ElementRef<HTMLPreElement>>('pre');
  private readonly gutter = viewChild<ElementRef<HTMLElement>>('gutter');

  protected readonly highlighted = computed(() => {
    const v = this.value();
    const fn = this.highlighter();
    const html = fn ? fn(v, this.language()) : highlightCode(v, this.language());
    // <pre> nuốt newline CUỐI trong khi textarea vẫn dành một dòng trống cuối → thêm '\n' cho khớp
    // chiều cao (nếu không, lớp highlight thấp hơn textarea đúng một dòng, cuộn bị lệch).
    return v.endsWith('\n') ? `${html}\n` : html;
  });
  protected readonly lines = computed(() =>
    Array.from({ length: this.value().split('\n').length }, (_, i) => i + 1),
  );

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    // Đồng bộ NGƯỢC vào textarea CHỈ khi giá trị đổi từ NGOÀI (writeValue/[(value)]) — lúc gõ thì
    // textarea đã có sẵn text nên bỏ qua, tránh nhảy con trỏ / vỡ IME.
    effect(() => {
      const v = this.value();
      const el = this.ta()?.nativeElement;
      if (el && el.value !== v) {
        el.value = v;
        this.syncScroll();
      }
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

  private commit(v: string): void {
    this.value.set(v);
    this.onChange(v);
  }

  protected onInput(e: Event): void {
    this.commit((e.target as HTMLTextAreaElement).value);
  }

  protected onKeydown(e: KeyboardEvent): void {
    // Tab chèn spaces thay vì nhảy focus (giữ trong ô soạn).
    if (e.key === 'Tab' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      const ta = e.target as HTMLTextAreaElement;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const spaces = ' '.repeat(this.tabSize());
      ta.value = ta.value.slice(0, start) + spaces + ta.value.slice(end);
      ta.selectionStart = ta.selectionEnd = start + spaces.length;
      this.commit(ta.value);
    }
  }

  // Cuộn textarea → kéo lớp <pre> và gutter theo cho khớp từng pixel.
  protected syncScroll(): void {
    const ta = this.ta()?.nativeElement;
    const pre = this.pre()?.nativeElement;
    if (!ta) return;
    if (pre) {
      pre.scrollTop = ta.scrollTop;
      pre.scrollLeft = ta.scrollLeft;
    }
    const g = this.gutter()?.nativeElement.firstElementChild as HTMLElement | null;
    if (g) g.style.transform = `translateY(${-ta.scrollTop}px)`;
  }
}
