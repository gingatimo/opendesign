import {
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { GChip } from '../chip/chip';
import { trackControlInvalid } from '../core/control-invalid';

// Ô nhập nhiều giá trị dạng chip (tags input). Gõ + Enter/dấu phẩy để thêm, × hoặc Backspace (khi ô
// rỗng) để xoá. value = string[] (CVA). Chống trùng trừ khi allowDuplicate; max giới hạn số chip.
@Component({
  selector: 'g-chips',
  imports: [GChip],
  template: `
    <label class="g-chips__field" #field>
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
        type="text"
        class="g-chips__input"
        [placeholder]="chips().length ? '' : placeholder()"
        [disabled]="disabled()"
        aria-label="Thêm mục"
        (keydown)="onKeydown($event)"
        (blur)="onTouchedFn()"
      />
    </label>
  `,
  host: {
    class: 'g-chips',
    '[class.g-chips--disabled]': 'disabled()',
    '[class.g-chips--invalid]': 'invalid()',
    '[class.g-chips--wrapped]': 'wrapped()',
  },
  styleUrl: './chips.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GChips implements ControlValueAccessor, OnInit {
  readonly placeholder = input('');
  readonly max = input<number | undefined>(undefined, { transform: numberAttribute });
  readonly allowDuplicate = input(false, { transform: booleanAttribute });

  protected readonly chips = signal<string[]>([]);
  protected readonly disabled = signal(false);
  protected readonly invalid = signal(false);
  protected readonly atMax = computed(() => {
    const m = this.max();
    return m != null && this.chips().length >= m;
  });

  private onChange: (value: string[]) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  private readonly fieldRef = viewChild.required<ElementRef<HTMLElement>>('field');
  // Ô đã xuống nhiều dòng chưa → đổi bo góc pill (1 dòng) ↔ chữ nhật (nhiều dòng).
  protected readonly wrapped = signal(false);

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;

    // Đo xuống-dòng SAU khi render (zoneless: render ở macrotask) — afterRenderEffect, KHÔNG
    // queueMicrotask/setTimeout(0). Đọc chips() để chạy lại khi số chip đổi.
    afterRenderEffect(() => {
      this.chips();
      this.measureWrap();
    });
    // Bề rộng field đổi (cửa sổ/parent co giãn) làm chip reflow → đo lại. Đổi bo góc không đổi kích
    // thước nên không gây vòng lặp RO.
    afterNextRender(() => {
      const ro = new ResizeObserver(() => this.measureWrap());
      ro.observe(this.fieldRef().nativeElement);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  ngOnInit(): void {
    trackControlInvalid(this.ngControl, this.destroyRef, this.invalid);
  }

  // Nhiều hàng khi các con (chip + ô nhập) không cùng một offsetTop.
  private measureWrap(): void {
    const kids = Array.from(this.fieldRef().nativeElement.children) as HTMLElement[];
    if (kids.length <= 1) {
      this.wrapped.set(false);
      return;
    }
    const tops = kids.map((k) => k.offsetTop);
    this.wrapped.set(Math.max(...tops) - Math.min(...tops) > 4);
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
    // Bộ gõ (IME) đang ghép ký tự → Enter/phẩy đó thuộc về bộ gõ, không phải để thêm chip; bỏ qua để
    // không thêm chip 2 lần (hoặc thêm nhầm) khi gõ tiếng Việt/CJK.
    if (event.isComposing) return;
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
