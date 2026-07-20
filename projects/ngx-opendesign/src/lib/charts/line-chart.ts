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
import { GChartLegend, GChartLegendItem } from './chart-legend';
import {
  chartColor,
  formatChartNumber,
  GChartSeries,
  linePath,
  niceTicks,
  Point,
  smoothPath,
} from './chart-utils';

// Biểu đồ ĐƯỜNG (SVG thuần, 0 thư viện ngoài). Nối các mốc bằng đường THẲNG (`curve="straight"`) hoặc
// đường CONG trơn (`curve="smooth"`, spline Catmull-Rom). Trục y tự chọn vạch "đẹp" + gridline, trục x
// theo `labels`. Responsive: đo bề rộng host bằng ResizeObserver → viewBox khớp pixel (chữ không méo).
@Component({
  selector: 'g-line-chart',
  imports: [GChartLegend],
  template: `
    <svg
      class="g-line-chart__svg"
      [attr.viewBox]="'0 0 ' + w() + ' ' + height()"
      width="100%"
      [attr.height]="height()"
      role="img"
      [attr.aria-label]="ariaLabel()"
    >
      @if (showGrid()) {
        @for (g of gridLines(); track $index) {
          <line
            class="g-line-chart__grid"
            [attr.x1]="area().left"
            [attr.y1]="g.y"
            [attr.x2]="area().right"
            [attr.y2]="g.y"
          />
        }
      }
      @for (g of gridLines(); track $index) {
        <text class="g-line-chart__ylabel" [attr.x]="area().left - 8" [attr.y]="g.y">
          {{ g.label }}
        </text>
      }
      @for (xl of xLabels(); track $index) {
        <text class="g-line-chart__xlabel" [attr.x]="xl.x" [attr.y]="height() - 8">
          {{ xl.label }}
        </text>
      }
      @for (s of seriesRender(); track s.name) {
        <path class="g-line-chart__line" [attr.d]="s.d" [style.stroke]="s.color" />
        @if (showDots()) {
          @for (p of s.points; track $index) {
            <circle
              class="g-line-chart__dot"
              [attr.cx]="p.x"
              [attr.cy]="p.y"
              r="3"
              [style.fill]="s.color"
            />
          }
        }
      }
    </svg>

    @if (showLegend() && seriesRender().length > 1) {
      <g-chart-legend [items]="legendItems()" />
    }
  `,
  styleUrl: './line-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-line-chart' },
})
export class GLineChart {
  readonly series = input<readonly GChartSeries[]>([]);
  readonly labels = input<readonly string[]>([]);
  readonly curve = input<'straight' | 'smooth'>('straight');
  readonly height = input(280);
  readonly showGrid = input(true);
  readonly showDots = input(true);
  readonly showLegend = input(true);
  readonly ariaLabel = input('Biểu đồ đường');

  // Lề: trái cho nhãn y, dưới cho nhãn x.
  private readonly ML = 44;
  private readonly MR = 16;
  private readonly MT = 12;
  private readonly MB = 28;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly w = signal(640);

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

  protected readonly area = computed(() => ({
    left: this.ML,
    right: this.w() - this.MR,
    top: this.MT,
    bottom: this.height() - this.MB,
  }));

  private readonly ticks = computed(() => {
    const vals = this.series().flatMap((s) => [...s.values]);
    if (!vals.length) return [0, 1];
    return niceTicks(Math.min(...vals), Math.max(...vals), 5);
  });

  private mapY(v: number): number {
    const t = this.ticks();
    const min = t[0];
    const max = t[t.length - 1];
    const a = this.area();
    const frac = (v - min) / (max - min || 1);
    return a.bottom - frac * (a.bottom - a.top);
  }

  private xAt(i: number): number {
    const a = this.area();
    const n = this.labels().length || 1;
    if (n <= 1) return (a.left + a.right) / 2;
    return a.left + (i / (n - 1)) * (a.right - a.left);
  }

  protected readonly gridLines = computed(() =>
    this.ticks().map((t) => ({ y: this.mapY(t), label: formatChartNumber(t) })),
  );

  protected readonly xLabels = computed(() =>
    this.labels().map((label, i) => ({ x: this.xAt(i), label })),
  );

  protected readonly seriesRender = computed(() =>
    this.series().map((s, si) => {
      const points: Point[] = s.values.map((v, i) => ({ x: this.xAt(i), y: this.mapY(v) }));
      const color = chartColor(si, s.color);
      const d = this.curve() === 'smooth' ? smoothPath(points) : linePath(points);
      return { name: s.name, color, d, points };
    }),
  );

  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.seriesRender().map((s) => ({ name: s.name, color: s.color })),
  );
}
