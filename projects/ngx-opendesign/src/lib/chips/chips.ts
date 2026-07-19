import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { GChip } from '../chip/chip';

// Ô nhập nhiều giá trị dạng chip (tags input). Gõ + Enter/dấu phẩy để thêm, × hoặc Backspace (khi ô
// rỗng) để xoá. value = string[] (CVA). Chống trùng trừ khi allowDuplicate; max giới hạn số chip.
@Component({
  selector: 'g-chips',
  imports: [GChip],
  template: `
    <div class="g-chips__field" (click)="focusInput()">
      @for (chip of chips(); track $index) {
        <g-chip
          removable
          [removeLabel]="'Xóa ' + chip"
          [disabled]="disabled()"
          (removed)="removeAt($index)"
        >
          {{ chip }}
        </g-chip>
      }
      <input
        #input
        type="text"
        class="g-chips__input"
        [placeholder]="chips().length ? '' : placeholder()"
        [disabled]="disabled() || atMax()"
        aria-label="Thêm mục"
        (keydown)="onKeydown($event)"
        (blur)="onTouchedFn()"
      />
    </div>
  `,
  host: {
    class: 'g-chips',
    '[class.g-chips--disabled]': 'disabled()',
  },
  styleUrl: './chips.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GChips implements ControlValueAccessor {
  readonly placeholder = input('');
  readonly max = input<number | undefined>(undefined, { transform: numberAttribute });
  readonly allowDuplicate = input(false, { transform: booleanAttribute });

  protected readonly chips = signal<string[]>([]);
  protected readonly disabled = signal(false);
  protected readonly atMax = computed(() => {
    const m = this.max();
    return m != null && this.chips().length >= m;
  });

  private readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('input');

  private onChange: (value: string[]) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected focusInput(): void {
    this.inputRef().nativeElement.focus();
  }

  private add(text: string): void {
    const t = text.trim();
    if (!t || this.atMax()) return;
    if (!this.allowDuplicate() && this.chips().includes(t)) return;
    const next = [...this.chips(), t];
    this.chips.set(next);
    this.onChange(next);
  }

  protected removeAt(i: number): void {
    const next = this.chips().filter((_, k) => k !== i);
    this.chips.set(next);
    this.onChange(next);
    this.onTouchedFn();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const inputEl = event.target as HTMLInputElement;
    if (event.key === 'Enter' || event.key === ',') {
      if (inputEl.value.trim()) {
        this.add(inputEl.value);
        inputEl.value = '';
      }
      event.preventDefault();
    } else if (event.key === 'Backspace' && !inputEl.value && this.chips().length > 0) {
      this.removeAt(this.chips().length - 1);
      event.preventDefault();
    }
  }

  writeValue(value: string[] | null): void {
    this.chips.set(Array.isArray(value) ? value : []);
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
