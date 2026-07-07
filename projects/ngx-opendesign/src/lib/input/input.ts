import { DestroyRef, Directive, ElementRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({
  selector: 'input[gInput]',
  host: {
    class: 'g-input',
    '[class.g-input--invalid]': 'invalid()',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlurHandler()',
  },
})
export class GInput implements ControlValueAccessor, OnInit {
  private readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  protected readonly invalid = signal(false);

  private onChange: (value: string) => void = () => undefined;
  private onTouchedFn: () => void = () => undefined;

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    // markAsTouched()/form.markAllAsTouched() (vd. lúc submit) không phát sự kiện DOM
    // (input/blur) nào — phải subscribe control.events để invalid signal phản ánh đúng.
    const control = this.ngControl?.control;
    if (!control) return;
    control.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.updateInvalid());
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
    this.updateInvalid();
  }

  protected onBlurHandler(): void {
    this.onTouchedFn();
    this.updateInvalid();
  }

  private updateInvalid(): void {
    const control = this.ngControl?.control;
    this.invalid.set(!!control && control.invalid && !!(control.touched || control.dirty));
  }

  writeValue(value: string): void {
    this.elementRef.nativeElement.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }
}
