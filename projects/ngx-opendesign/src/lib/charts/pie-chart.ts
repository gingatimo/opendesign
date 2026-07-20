import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { arcPath, chartColor, GChartSlice, polar } from './chart-utils';

// Biểu đồ TRÒN (pie, SVG thuần). Mỗi múi là một hình quạt tỉ lệ theo giá trị; kèm nhãn % trên múi đủ
// lớn. Dùng chung `GChartSlice[]`. (Bản có vành rỗng + legend + export là `g-donut-chart`.)
@Component({
  selector: 'g-pie-chart',
  template: `
    <svg
      class="g-pie-chart__svg"
      [attr.viewBox]="'0 0 ' + w() + ' ' + height()"
      width="100%"
      [attr.height]="height()"
      role="img"
      [attr.aria-label]="ariaLabel()"
    >
      @for (s of slices(); track s.name) {
        <path class="g-pie-chart__slice" [attr.d]="s.d" [style.fill]="s.color" />
      }
      @if (showLabels()) {
        @for (s of slices(); track s.name) {
          @if (s.frac >= 0.05) {
            <text class="g-pie-chart__label" [attr.x]="s.lx" [attr.y]="s.ly">{{ s.pct }}%</text>
          }
        }
      }
    </svg>
  `,
  styleUrl: './pie-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-pie-chart' },
})
export class GPieChart {
  readonly data = input<readonly GChartSlice[]>([]);
  readonly height = input(280);
  readonly showLabels = input(true);
  readonly ariaLabel = input('Biểu đồ tròn');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly w = signal(320);

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      const ro = new ResizeObserver((entries) => {
        const width = Math.round(entries[0].contentRect.width);
        if (width > 0) this.w.set(width);
      });
      ro.observe(el);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  protected readonly slices = computed(() => pieSlices(this.data(), this.w(), this.height(), 0));
}

// Tính các múi (dùng lại cho cả pie lẫn donut). rInnerRatio=0 → pie; >0 → donut.
export function pieSlices(data: readonly GChartSlice[], w: number, h: number, rInnerRatio: number) {
  const total = data.reduce((s, d) => s + Math.max(0, d.value), 0) || 1;
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) / 2 - 8;
  const rInner = R * rInnerRatio;
  let a = 0;
  return data.map((d, i) => {
    const frac = Math.max(0, d.value) / total;
    const a0 = a;
    const a1 = a + frac * 2 * Math.PI;
    a = a1;
    const mid = (a0 + a1) / 2;
    const labelR = rInner > 0 ? (R + rInner) / 2 : R * 0.62;
    const lp = polar(cx, cy, labelR, mid);
    return {
      name: d.name,
      value: d.value,
      color: chartColor(i, d.color),
      d: arcPath(cx, cy, R, rInner, a0, a1),
      frac,
      pct: Math.round(frac * 100),
      lx: lp.x,
      ly: lp.y,
    };
  });
}
