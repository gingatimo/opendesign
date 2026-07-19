import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  numberAttribute,
} from '@angular/core';

// Thanh trượt chọn một giá trị số. Bọc input[type=range] native để có sẵn bàn phím (←→/Home/End),
// kéo chuột/chạm và ARIA (role=slider, aria-valuenow) — chỉ style lại pill: track bo tròn, phần đã
// chọn tô --g-primary, thumb tròn. Giá trị hai chiều qua [(value)].
@Component({
  selector: 'g-slider',
  template: `
    <input
      type="range"
      class="g-slider__input"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [value]="value()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabel() || null"
      [style.--g-slider-fill]="fill() + '%'"
      (input)="onInput($event)"
    />
  `,
  host: { class: 'g-slider' },
  styleUrl: './slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GSlider {
  readonly value = model(0);
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  // % đã chọn để tô phần đầu track (CSS var --g-slider-fill). Kẹp khoảng min-max rỗng về 0 để không
  // chia cho 0.
  protected readonly fill = computed(() => {
    const range = this.max() - this.min();
    return range > 0 ? ((this.value() - this.min()) / range) * 100 : 0;
  });

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).valueAsNumber);
  }
}
