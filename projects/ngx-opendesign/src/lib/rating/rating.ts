import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { trackControlInvalid } from '../core/control-invalid';
import { GLocaleService } from '../core/locale';

// Sao 5 cánh TÔ ĐẶC (viewBox 0 0 24 24) — vẽ trong component để kiểm soát fill (GIcon chỉ vẽ outline).
const STAR_PATH =
  'M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

// Chấm điểm bằng SAO — bấm/rê để chọn (rê xem trước), hoặc phím ←/→ (Home/End); bấm lại đúng mức đang
// chọn để bỏ (về 0). `allowHalf` cho phép NỬA sao (bước 0.5, chọn theo nửa trái/phải của sao).
// `readonly` chỉ hiển thị. Hỗ trợ cả `formControlName`/`ngModel` (CVA) lẫn `[(value)]` (số sao 0..max).
@Component({
  selector: 'g-rating',
  template: `
    <div
      class="g-rating__stars"
      [attr.role]="readonly() ? 'img' : 'slider'"
      [attr.tabindex]="interactive() ? 0 : null"
      [attr.aria-label]="effectiveLabel()"
      [attr.aria-valuemin]="interactive() ? 0 : null"
      [attr.aria-valuemax]="interactive() ? max() : null"
      [attr.aria-valuenow]="interactive() ? value() : null"
      [attr.aria-disabled]="isDisabled() || null"
      (click)="onCommit()"
      (keydown)="onKeydown($event)"
      (mouseleave)="clearHover()"
      (blur)="onTouchedFn()"
    >
      @for (s of stars(); track s.i) {
        <span
          class="g-rating__star"
          (mouseenter)="onHover(s.i, $event)"
          (mousemove)="onHover(s.i, $event)"
        >
          <svg class="g-rating__glyph" viewBox="0 0 24 24" aria-hidden="true">
            <path [attr.d]="starPath" />
          </svg>
          <span class="g-rating__fill" [style.width.%]="s.fill">
            <svg class="g-rating__glyph" viewBox="0 0 24 24" aria-hidden="true">
              <path [attr.d]="starPath" />
            </svg>
          </span>
        </span>
      }
    </div>
  `,
  styleUrl: './rating.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-rating',
    '[class.g-rating--readonly]': 'readonly()',
    '[class.g-rating--disabled]': 'isDisabled()',
    '[class.g-rating--invalid]': 'invalid()',
    '[class.g-rating--sm]': "size() === 'sm'",
    '[class.g-rating--lg]': "size() === 'lg'",
  },
})
export class GRating implements ControlValueAccessor, OnInit {
  // Điểm hiện tại (số sao đầy) — dùng `[(value)]` HOẶC `formControlName`/`ngModel`.
  readonly value = model(0);
  readonly max = input(5);
  readonly readonly = input(false, { transform: booleanAttribute });
  // Cho phép nửa sao (bước 0.5).
  readonly allowHalf = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  // Nhãn screen reader cho chế độ chọn (readonly tự sinh theo khoá rating.valueText).
  readonly label = input('');

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly invalid = signal(false);
  // Tương tác được (không readonly, không disabled) → mới gắn role slider + bàn phím.
  protected readonly interactive = computed(() => !this.readonly() && !this.isDisabled());

  private onChange: (value: number) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  protected readonly starPath = STAR_PATH;
  private readonly hover = signal<number | null>(null);

  // Rê thì hiện preview theo mức đang rê; không rê thì theo value.
  private readonly displayValue = computed(() => this.hover() ?? this.value());
  // Mỗi sao (1-based) kèm % tô: đầy 100, nửa 50, rỗng 0 (kẹp cho mức phân số bất kỳ).
  protected readonly stars = computed(() => {
    const dv = this.displayValue();
    return Array.from({ length: this.max() }, (_, k) => {
      const i = k + 1;
      return { i, fill: Math.max(0, Math.min(100, (dv - (i - 1)) * 100)) };
    });
  });
  // Nhãn chế độ readonly: số dùng formatNumber của service (dấu thập phân đúng locale) rồi truyền
  // CHUỖI đã định dạng vào khoá valueText — gói ngôn ngữ không phụ thuộc service nên không thể tự
  // quyết dấu thập phân nếu nhận number.
  protected readonly srText = computed(() =>
    this.t().rating.valueText(this.i18n.formatNumber(this.value()), this.max()),
  );
  // Nhãn chế độ chọn: input thắng nếu consumer truyền tay, rỗng thì lấy theo gói ngôn ngữ hiện tại.
  protected readonly resolvedLabel = computed(() => this.label() || this.t().rating.label);
  protected readonly effectiveLabel = computed(() =>
    this.readonly() ? this.srText() : this.resolvedLabel(),
  );

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    trackControlInvalid(this.ngControl, this.destroyRef, this.invalid);
  }

  writeValue(value: number): void {
    this.value.set(value ?? 0);
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  // Rê vào/di trong một sao → set mức preview; nếu allowHalf thì nửa trái = i-0.5, nửa phải = i.
  protected onHover(i: number, e: MouseEvent): void {
    if (!this.interactive()) return;
    this.hover.set(this.resolve(i, e));
  }
  protected clearHover(): void {
    this.hover.set(null);
  }
  private resolve(i: number, e: MouseEvent): number {
    if (!this.allowHalf()) return i;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    return e.clientX - rect.left < rect.width / 2 ? i - 0.5 : i;
  }

  // Bấm cả cụm → chốt theo mức đang rê (mouseenter/move đã set trước click). Bấm lại đúng mức đang
  // chọn → bỏ chọn (về 0). Bàn phím dùng onKeydown, nên click gắn ở cụm (đã có role/tabindex/keydown).
  protected onCommit(): void {
    if (!this.interactive()) return;
    const h = this.hover();
    if (h === null) return;
    this.commit(this.value() === h ? 0 : h);
    this.onTouchedFn();
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (!this.interactive()) return;
    const step = this.allowHalf() ? 0.5 : 1;
    const n = this.max();
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(this.value() + step, n);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(this.value() - step, 0);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = n;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.commit(next);
    this.onTouchedFn();
  }

  // Chốt mức mới: cập nhật cả `[(value)]` (model) lẫn form (onChange).
  private commit(v: number): void {
    if (v === this.value()) return;
    this.value.set(v);
    this.onChange(v);
  }
}
