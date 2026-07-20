import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  DestroyRef,
  inject,
  InjectionToken,
  OnInit,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { trackControlInvalid } from '../core/control-invalid';
import { GRadio } from './radio';

export const G_RADIO_GROUP = new InjectionToken<GRadioGroup>('G_RADIO_GROUP');

@Component({
  selector: 'g-radio-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-radio-group',
    role: 'radiogroup',
    '[attr.aria-disabled]': 'isGroupDisabled() ? "true" : null',
    '(focusout)': 'onTouchedFn()',
  },
  providers: [{ provide: G_RADIO_GROUP, useExisting: GRadioGroup }],
})
export class GRadioGroup implements ControlValueAccessor, OnInit {
  private readonly value = signal<unknown>(undefined);
  private readonly disabledSignal = signal(false);
  protected readonly invalid = signal(false);
  private readonly radios = contentChildren(GRadio);

  private onChange: (value: unknown) => void = () => undefined;
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

  isSelected(value: unknown): boolean {
    return this.value() === value;
  }

  hasCheckedRadio(): boolean {
    return this.radios().some((r) => this.isSelected(r.value()));
  }

  isGroupDisabled(): boolean {
    return this.disabledSignal();
  }

  isInvalid(): boolean {
    return this.invalid();
  }

  isFirst(radio: GRadio): boolean {
    const enabled = this.radios().filter((r) => !r.disabled());
    return enabled[0] === radio;
  }

  selectValue(value: unknown): void {
    if (this.disabledSignal()) return;
    this.value.set(value);
    this.onChange(value);
    this.onTouchedFn();
  }

  moveSelection(currentValue: unknown, direction: 1 | -1): void {
    if (this.disabledSignal()) return;
    const list = this.radios().filter((r) => !r.disabled());
    if (list.length === 0) return;
    const currentIndex = list.findIndex((r) => r.value() === currentValue);
    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + direction + list.length) % list.length;
    const next = list[nextIndex];
    this.selectValue(next.value());
    next.focusSelf();
  }

  writeValue(value: unknown): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledSignal.set(isDisabled);
  }
}
