import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { trackControlInvalid } from '../core/control-invalid';

@Component({
  selector: 'g-checkbox',
  template: `
    <span
      class="g-checkbox__box"
      [class.g-checkbox__box--checked]="checked()"
      [class.g-checkbox__box--indeterminate]="indeterminate()"
    >
      @if (indeterminate()) {
        <svg class="g-checkbox__icon" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      } @else if (checked()) {
        <svg class="g-checkbox__icon" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M3.5 8.5l3 3 6-6"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      }
    </span>
    <span class="g-checkbox__label"><ng-content /></span>
  `,
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-checkbox',
    role: 'checkbox',
    tabindex: '0',
    '[attr.aria-checked]': 'indeterminate() ? "mixed" : checked()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[class.g-checkbox--disabled]': 'disabled()',
    '[class.g-checkbox--invalid]': 'invalid()',
    '(click)': 'toggle()',
    '(keydown.space)': 'onSpace($event)',
    '(blur)': 'onTouchedFn()',
  },
})
export class GCheckbox implements ControlValueAccessor, OnInit {
  // model() ở Angular 22 chưa hỗ trợ transform: booleanAttribute — nhận boolean thật,
  // không nhận chuỗi rỗng kiểu thuộc tính HTML (vd. `indeterminate` không kèm giá trị).
  readonly indeterminate = model(false);

  protected readonly checked = signal(false);
  protected readonly disabled = signal(false);
  protected readonly invalid = signal(false);

  private onChange: (value: boolean) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    trackControlInvalid(this.ngControl, this.destroyRef, this.invalid);
  }

  protected toggle(): void {
    if (this.disabled()) return;
    this.checked.update((c) => !c);
    // Người dùng vừa tương tác: trạng thái không còn "chưa xác định" nữa,
    // giống hành vi checkbox gốc/Angular Material.
    this.indeterminate.set(false);
    this.onChange(this.checked());
    this.onTouchedFn();
  }

  protected onSpace(event: Event): void {
    event.preventDefault();
    this.toggle();
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
