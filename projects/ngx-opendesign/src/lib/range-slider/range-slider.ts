import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  numberAttribute,
} from '@angular/core';

// Thanh trượt chọn MỘT KHOẢNG [from, to] (2 đầu kéo). Chồng 2 input[type=range] native lên cùng
// track để giữ nguyên bàn phím (←→/Home/End), kéo chuột/chạm và ARIA riêng từng đầu — cùng triết lý
// GSlider. Track tô --g-primary giữa from→to qua 2 CSS var đặt trên host; input tắt pointer-events,
// chỉ thumb bắt chuột nên 2 lớp không che nhau. Kéo chéo bị kẹp: from ≤ to. Hai chiều [(from)]/[(to)].
@Component({
  selector: 'g-range-slider',
  template: `
    <input
      type="range"
      class="g-range-slider__input g-range-slider__input--from"
      [class.g-range-slider__input--top]="fromOnTop()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [value]="from()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabelFrom() || null"
      (input)="onFrom($event)"
    />
    <input
      type="range"
      class="g-range-slider__input g-range-slider__input--to"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [value]="to()"
      [disabled]="disabled()"
      [attr.aria-label]="ariaLabelTo() || null"
      (input)="onTo($event)"
    />
  `,
  host: {
    class: 'g-range-slider',
    '[style.--g-range-from]': 'fromPct() + "%"',
    '[style.--g-range-to]': 'toPct() + "%"',
  },
  styleUrl: './range-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GRangeSlider {
  readonly from = model(0);
  readonly to = model(0);
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly ariaLabelFrom = input<string>();
  readonly ariaLabelTo = input<string>();

  // % vị trí 2 đầu để tô track (kẹp khoảng min-max rỗng về 0, không chia cho 0).
  private pct(v: number): number {
    const range = this.max() - this.min();
    return range > 0 ? ((v - this.min()) / range) * 100 : 0;
  }
  protected readonly fromPct = computed(() => this.pct(this.from()));
  protected readonly toPct = computed(() => this.pct(this.to()));
  // Cả 2 đầu dồn về cuối track thì thumb from phải nổi lên trên, không thì bị to che mất không kéo
  // xuống được (và ngược lại ở đầu track, to mặc định đã nằm trên).
  protected readonly fromOnTop = computed(() => this.fromPct() > 50);

  protected onFrom(event: Event): void {
    const el = event.target as HTMLInputElement;
    const v = Math.min(el.valueAsNumber, this.to());
    el.value = String(v); // kéo vượt đầu kia → trả thumb về điểm kẹp ngay
    this.from.set(v);
  }
  protected onTo(event: Event): void {
    const el = event.target as HTMLInputElement;
    const v = Math.max(el.valueAsNumber, this.from());
    el.value = String(v);
    this.to.set(v);
  }
}
