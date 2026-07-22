import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { gDevWarning } from '../core/dev-warning';

@Component({
  selector: 'g-toggle',
  template: `<span class="g-toggle__thumb"></span>`,
  styleUrl: './toggle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-toggle',
    role: 'switch',
    tabindex: '0',
    '[attr.aria-checked]': 'checked()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[class.g-toggle--checked]': 'checked()',
    '[class.g-toggle--disabled]': 'disabled()',
    '(click)': 'toggle()',
    '(keydown.space)': 'onSpace($event)',
    '(blur)': 'onTouchedFn()',
  },
})
export class GToggle implements ControlValueAccessor {
  protected readonly checked = signal(false);
  protected readonly disabled = signal(false);

  private onChange: (value: boolean) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
        gDevWarning('GToggle', 'toggle needs aria-label or aria-labelledby');
      }
    });
  }

  protected toggle(): void {
    if (this.disabled()) return;
    this.checked.update((c) => !c);
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
