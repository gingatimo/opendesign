import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
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
import { GLocaleService } from '../core/locale';

// Thanh trượt RỜI RẠC dạng pill: một dải pill chứa N chấm đều nhau, chấm đang chọn được thay bằng
// "thumb" pill nổi lên. Kèm nhãn hai đầu (vd. "Faster" / "Smarter"). Chọn bằng bấm/kéo trên dải hoặc
// phím mũi tên (Home/End về hai đầu). Hỗ trợ cả `formControlName`/`ngModel` (CVA) lẫn `[(value)]`
// (chỉ số 0..steps-1).
@Component({
  selector: 'g-step-slider',
  template: `
    @if (startLabel() || endLabel()) {
      <div class="g-step-slider__labels">
        <span>{{ startLabel() }}</span>
        <span>{{ endLabel() }}</span>
      </div>
    }

    <div
      #track
      class="g-step-slider__track"
      role="slider"
      [attr.tabindex]="isDisabled() ? -1 : 0"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="steps() - 1"
      [attr.aria-valuenow]="value()"
      [attr.aria-label]="resolvedAriaLabel()"
      [attr.aria-disabled]="isDisabled() || null"
      (pointerdown)="onPointerDown($event)"
      (keydown)="onKeydown($event)"
      (blur)="onTouchedFn()"
    >
      @for (i of stepIndexes(); track i) {
        <span class="g-step-slider__step">
          @if (i === value()) {
            <span class="g-step-slider__thumb"></span>
          } @else {
            <span
              class="g-step-slider__dot"
              [class.g-step-slider__dot--last]="i === steps() - 1"
            ></span>
          }
        </span>
      }
    </div>
  `,
  styleUrl: './step-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-step-slider',
    '[class.g-step-slider--sm]': "size() === 'sm'",
    '[class.g-step-slider--xs]': "size() === 'xs'",
    '[class.g-step-slider--disabled]': 'isDisabled()',
    '[class.g-step-slider--invalid]': 'invalid()',
  },
})
export class GStepSlider implements ControlValueAccessor, OnInit {
  // Số bậc (số chấm). Giá trị là chỉ số 0..steps-1.
  readonly steps = input(5);
  // Chỉ số bậc đang chọn — dùng `[(value)]` HOẶC `formControlName`/`ngModel`.
  readonly value = model(0);
  // Cỡ dải: 'md' (40px, mặc định), 'sm' (24px) hoặc 'xs' (20px, gọn nhất).
  readonly size = input<'xs' | 'sm' | 'md'>('md');
  readonly startLabel = input('');
  readonly endLabel = input('');
  readonly ariaLabel = input<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);

  // Disabled hợp nhất từ input [disabled] và setDisabledState của form (formControl.disable()).
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly invalid = signal(false);

  private onChange: (value: number) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  protected readonly stepIndexes = computed(() =>
    Array.from({ length: this.steps() }, (_, i) => i),
  );
  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() ?? this.i18n.strings().stepSlider.label,
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

  // Chốt bậc mới: cập nhật cả `[(value)]` (model) lẫn form (onChange).
  private commit(i: number): void {
    if (i === this.value()) return;
    this.value.set(i);
    this.onChange(i);
  }

  protected onPointerDown(e: PointerEvent): void {
    if (this.isDisabled()) return;
    // preventDefault chặn chọn text khi kéo; tự focus (programmatic → không hiện focus ring lúc bấm
    // chuột) để phím mũi tên dùng được ngay.
    e.preventDefault();
    this.track().nativeElement.focus();
    this.setFromPointer(e.clientX);
    const move = (ev: PointerEvent) => this.setFromPointer(ev.clientX);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      this.onTouchedFn();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  private setFromPointer(clientX: number): void {
    const rect = this.track().nativeElement.getBoundingClientRect();
    const n = this.steps();
    const i = Math.min(Math.max(Math.floor(((clientX - rect.left) / rect.width) * n), 0), n - 1);
    this.commit(i);
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (this.isDisabled()) return;
    const n = this.steps();
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(this.value() + 1, n - 1);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(this.value() - 1, 0);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = n - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.commit(next);
    this.onTouchedFn();
  }
}
