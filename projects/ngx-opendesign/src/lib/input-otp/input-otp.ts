import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  numberAttribute,
  OnInit,
  signal,
  untracked,
  viewChildren,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { trackControlInvalid } from '../core/control-invalid';

// Ô nhập mã OTP/PIN: length ô một ký tự, tự nhảy ô khi gõ, Backspace lùi, ←→ di chuyển, dán rải chuỗi
// vào các ô. integerOnly chỉ nhận số, mask hiển thị dấu chấm. value = chuỗi ghép các ô (CVA).
@Component({
  selector: 'g-input-otp',
  template: `
    @for (i of slots(); track i) {
      <input
        #box
        class="g-input-otp__box"
        [type]="mask() ? 'password' : 'text'"
        [attr.inputmode]="integerOnly() ? 'numeric' : 'text'"
        autocomplete="one-time-code"
        maxlength="1"
        [value]="charAt(i)"
        [disabled]="disabled()"
        [attr.aria-label]="'Ký tự ' + (i + 1)"
        (input)="onInput(i, $event)"
        (keydown)="onKeydown(i, $event)"
        (paste)="onPaste($event)"
        (focus)="onFocus($event)"
        (blur)="onTouchedFn()"
      />
    }
  `,
  host: {
    class: 'g-input-otp',
    '[class.g-input-otp--invalid]': 'invalid()',
  },
  styleUrl: './input-otp.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GInputOtp implements ControlValueAccessor, OnInit {
  readonly length = input(6, { transform: numberAttribute });
  readonly integerOnly = input(false, { transform: booleanAttribute });
  readonly mask = input(false, { transform: booleanAttribute });

  protected readonly disabled = signal(false);
  protected readonly invalid = signal(false);
  protected readonly slots = computed(() => Array.from({ length: this.length() }, (_, i) => i));

  private readonly chars = signal<string[]>([]);
  private readonly boxes = viewChildren<ElementRef<HTMLInputElement>>('box');

  private onChange: (value: string) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    trackControlInvalid(this.ngControl, this.destroyRef, this.invalid);
  }

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    // Giữ mảng ký tự đúng độ dài length (đổi length thì cắt/đệm, không mất ký tự đã có).
    effect(() => {
      const n = this.length();
      untracked(() => {
        const cur = this.chars();
        this.chars.set(Array.from({ length: n }, (_, i) => cur[i] ?? ''));
      });
    });
  }

  protected charAt(i: number): string {
    return this.chars()[i] ?? '';
  }

  private commit(next: string[]): void {
    this.chars.set(next);
    this.onChange(next.join(''));
  }

  protected onInput(i: number, event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    let v = inputEl.value;
    if (this.integerOnly()) v = v.replace(/\D/g, '');
    const ch = v.slice(-1);
    const arr = [...this.chars()];
    arr[i] = ch;
    inputEl.value = ch; // đồng bộ khi integerOnly lọc bỏ ký tự
    this.commit(arr);
    if (ch && i < this.length() - 1) this.focusBox(i + 1);
  }

  protected onKeydown(i: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace') {
      const arr = [...this.chars()];
      if (arr[i]) {
        arr[i] = '';
        this.commit(arr);
      } else if (i > 0) {
        arr[i - 1] = '';
        this.commit(arr);
        this.focusBox(i - 1);
      }
      event.preventDefault();
    } else if (event.key === 'ArrowLeft' && i > 0) {
      this.focusBox(i - 1);
      event.preventDefault();
    } else if (event.key === 'ArrowRight' && i < this.length() - 1) {
      this.focusBox(i + 1);
      event.preventDefault();
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    let text = event.clipboardData?.getData('text') ?? '';
    if (this.integerOnly()) text = text.replace(/\D/g, '');
    const arr = Array.from({ length: this.length() }, (_, k) => text[k] ?? '');
    this.commit(arr);
    this.focusBox(Math.min(text.length, this.length() - 1));
  }

  protected onFocus(event: FocusEvent): void {
    (event.target as HTMLInputElement).select();
  }

  private focusBox(i: number): void {
    const el = this.boxes()[i]?.nativeElement;
    el?.focus();
    el?.select();
  }

  writeValue(value: string | null): void {
    const v = value ?? '';
    this.chars.set(Array.from({ length: this.length() }, (_, i) => v[i] ?? ''));
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
