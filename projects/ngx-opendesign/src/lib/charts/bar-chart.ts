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
  viewChild,
} from '@angular/core';
import { GChartExport } from './chart-export';
import { GChartZoom } from './chart-zoom';
import { GChartLegend, GChartLegendItem } from './chart-legend';
import {
  chartColor,
  formatChartNumber,
  GChartLegendPosition,
  GChartSeries,
  legendDirection,
  niceTicks,
} from './chart-utils';

interface Bar {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
}
interface Grid {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tx: number;
  ty: number;
  label: string;
}
interface CatLabel {
  x: number;
  y: number;
  text: string;
}

// Biểu đồ CỘT (SVG thuần). `orientation="vertical"` (cột đứng) hoặc `"horizontal"` (cột nằm). Nhiều
// series → cột NHÓM cạnh nhau; một series → tô màu theo từng mốc. Miền giá trị luôn gồm 0 (chân cột).
@Component({
  selector: 'g-bar-chart',
  imports: [GChartLegend, GChartExport, GChartZoom],
  template: `
    <div
      class="g-chart-frame"
      [class]="'g-chart-frame--' + legendPosition()"
      [class.g-chart-frame--zoom]="zoomed()"
    >
      @if (title() || exportable() || zoomable()) {
        <div class="g-chart-frame__head">
          @if (title()) {
            <div class="g-chart-frame__title">{{ title() }}</div>
          }
          <div class="g-chart-frame__actions">
            @if (exportable()) {
              <g-chart-export
                [target]="svgEl()?.nativeElement"
                [filename]="filename()"
                [title]="title()"
                [legend]="legendItems()"
              />
            }
            @if (zoomable()) {
              <g-chart-zoom [(zoomed)]="zoomed" />
            }
          </div>
        </div>
      }
      <div class="g-chart-frame__plot">
        <svg
          #chartSvg
          class="g-bar-chart__svg g-chart-frame__svg"
          [attr.viewBox]="'0 0 ' + w() + ' ' + plotHeight()"
          width="100%"
          [attr.height]="plotHeight()"
          role="img"
          [attr.aria-label]="ariaLabel()"
        >
          @if (showGrid()) {
            @for (g of layout().grids; track $index) {
              <line
                class="g-bar-chart__grid"
                [attr.x1]="g.x1"
                [attr.y1]="g.y1"
                [attr.x2]="g.x2"
                [attr.y2]="g.y2"
              />
            }
          }
          @for (g of layout().grids; track $index) {
            <text
              class="g-bar-chart__vlabel"
              [class.g-bar-chart__vlabel--h]="orientation() === 'horizontal'"
              [attr.x]="g.tx"
              [attr.y]="g.ty"
            >
              {{ g.label }}
            </text>
          }
          @for (c of layout().catLabels; track $index) {
            <text
              class="g-bar-chart__catlabel"
              [class.g-bar-chart__catlabel--h]="orientation() === 'horizontal'"
              [attr.x]="c.x"
              [attr.y]="c.y"
            >
              {{ c.text }}
            </text>
          }
          @for (b of layout().bars; track $index) {
            <rect
              class="g-bar-chart__bar"
              [attr.x]="b.x"
              [attr.y]="b.y"
              [attr.width]="b.w"
              [attr.height]="b.h"
              [style.fill]="b.color"
            />
          }
        </svg>

        @if (showLegend() && series().length > 1) {
          <g-chart-legend [items]="legendItems()" [direction]="legendDir()" />
        }
      </div>
    </div>
  `,
  styleUrl: './bar-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // `title` là input, nhưng viết dạng attribute tĩnh (title="...") nên nó NẰM LẠI trong DOM và
  // trình duyệt coi đó là tooltip cho toàn bộ chart — rê chuột vào múi nào cũng hiện tên chart. Gỡ
  // attribute khỏi host; tiêu đề đã được vẽ ở hàng đầu khung rồi.
  host: { class: 'g-bar-chart', '[attr.title]': 'null' },
})
export class GBarChart {
  readonly series = input<readonly GChartSeries[]>([]);
  readonly labels = input<readonly string[]>([]);
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');
  readonly height = input(280);
  readonly showGrid = input(true);
  readonly showLegend = input(true);
  readonly legendPosition = input<GChartLegendPosition>('bottom');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('bar-chart');
  readonly title = input('');
  readonly ariaLabel = input('Biểu đồ cột');

  private readonly MT = 12;
  private readonly MR = 16;
  private readonly MB = 28;

  private readonly destroyRef = inject(DestroyRef);
  protected readonly svgEl = viewChild<ElementRef<SVGSVGElement>>('chartSvg');
  protected readonly w = signal(640);

  constructor() {
    afterNextRender(() => {
      const el = this.svgEl()?.nativeElement;
      if (!el) return;
      // Đo CẢ hai chiều: chiều cao cần cho chế độ phóng to (xem `plotHeight`).
      const ro = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        if (width > 0) this.w.set(Math.round(width));
        if (height > 0) this.measuredHeight.set(Math.round(height));
      });
      ro.observe(el);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  protected readonly legendDir = computed(() => legendDirection(this.legendPosition()));

  private readonly ticks = computed(() => {
    const vals = this.series().flatMap((s) => [...s.values]);
    if (!vals.length) return [0, 1];
    return niceTicks(Math.min(0, ...vals), Math.max(0, ...vals), 5);
  });

  protected readonly layout = computed<{ bars: Bar[]; grids: Grid[]; catLabels: CatLabel[] }>(
    () => {
      const series = this.series();
      const labels = this.labels();
      const t = this.ticks();
      const vmin = t[0];
      const vmax = t[t.length - 1];
      const span = vmax - vmin || 1;
      const n = Math.max(1, labels.length);
      const groups = Math.max(1, series.length);
      const single = series.length === 1;
      const bars: Bar[] = [];
      const grids: Grid[] = [];
      const catLabels: CatLabel[] = [];

      if (this.orientation() === 'horizontal') {
        const left = 72;
        const right = this.w() - this.MR;
        const top = this.MT;
        const bottom = this.plotHeight() - this.MB;
        const mapV = (v: number) => left + ((v - vmin) / span) * (right - left);
        const slotH = (bottom - top) / n;
        for (const tick of t) {
          const x = mapV(tick);
          grids.push({
            x1: x,
            y1: top,
            x2: x,
            y2: bottom,
            tx: x,
            ty: this.plotHeight() - 8,
            label: formatChartNumber(tick),
          });
        }
        const x0 = mapV(0);
        for (let i = 0; i < n; i++) {
          const center = top + (i + 0.5) * slotH;
          catLabels.push({ x: left - 8, y: center, text: labels[i] ?? '' });
          const groupH = slotH * 0.7;
          const barH = groupH / groups;
          for (let j = 0; j < groups; j++) {
            const v = series[j]?.values[i] ?? 0;
            const x1 = mapV(v);
            bars.push({
              x: Math.min(x0, x1),
              y: center - groupH / 2 + j * barH,
              w: Math.abs(x1 - x0),
              h: barH * 0.86,
              color: chartColor(single ? i : j, series[j]?.color),
            });
          }
        }
      } else {
        const left = 44;
        const right = this.w() - this.MR;
        const top = this.MT;
        const bottom = this.plotHeight() - this.MB;
        const mapV = (v: number) => bottom - ((v - vmin) / span) * (bottom - top);
        const slotW = (right - left) / n;
        for (const tick of t) {
          const y = mapV(tick);
          grids.push({
            x1: left,
            y1: y,
            x2: right,
            y2: y,
            tx: left - 8,
            ty: y,
            label: formatChartNumber(tick),
          });
        }
        const y0 = mapV(0);
        for (let i = 0; i < n; i++) {
          const center = left + (i + 0.5) * slotW;
          catLabels.push({ x: center, y: this.plotHeight() - 8, text: labels[i] ?? '' });
          const groupW = slotW * 0.7;
          const barW = groupW / groups;
          for (let j = 0; j < groups; j++) {
            const v = series[j]?.values[i] ?? 0;
            const y1 = mapV(v);
            bars.push({
              x: center - groupW / 2 + j * barW,
              y: Math.min(y0, y1),
              w: barW * 0.86,
              h: Math.abs(y1 - y0),
              color: chartColor(single ? i : j, series[j]?.color),
            });
          }
        }
      }
      return { bars, grids, catLabels };
    },
  );

  protected readonly zoomed = signal(false);
  // Chiều cao ô vẽ đo được. Lúc phóng to, hình phải cao theo KHUNG chứ không giữ `height` cố định —
  // nếu không, tỉ lệ viewBox trùng tỉ lệ ô nên trình duyệt không phóng gì cả, card rộng ra mà chart
  // vẫn y nguyên (đúng cái đã thấy trên màn hình).
  private readonly measuredHeight = signal(0);
  protected readonly plotHeight = computed(() =>
    this.zoomed() && this.measuredHeight() > 0 ? this.measuredHeight() : this.height(),
  );
  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.series().map((s, j) => ({ name: s.name, color: chartColor(j, s.color) })),
  );
}
