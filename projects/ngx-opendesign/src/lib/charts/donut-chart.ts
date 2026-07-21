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
import { GChartLegend, GChartLegendItem } from './chart-legend';
import {
  chartColor,
  formatChartNumber,
  GChartLegendPosition,
  GChartSlice,
  legendDirection,
} from './chart-utils';
import { pieSlices } from './pie-chart';

// Biểu đồ VÀNH KHUYÊN (donut, SVG thuần). Như pie nhưng có lỗ giữa (hiện TỔNG). Legend 4 phía
// (`legendPosition`), export PNG/SVG (`exportable`, mặc định BẬT). `thickness` = tỉ lệ bán kính lỗ.
@Component({
  selector: 'g-donut-chart',
  imports: [GChartLegend, GChartExport],
  template: `
    <div class="g-chart-frame" [class]="'g-chart-frame--' + legendPosition()">
      @if (title() || exportable()) {
        <div class="g-chart-frame__head">
          @if (title()) {
            <div class="g-chart-frame__title">{{ title() }}</div>
          }
          @if (exportable()) {
            <g-chart-export
              class="g-chart-frame__export"
              [target]="svgEl()?.nativeElement"
              [filename]="filename()"
              [title]="title()"
              [legend]="legendItems()"
            />
          }
        </div>
      }
      <div class="g-chart-frame__plot">
        <svg
          #chartSvg
          class="g-donut-chart__svg g-chart-frame__svg"
          [attr.viewBox]="'0 0 ' + w() + ' ' + height()"
          width="100%"
          [attr.height]="height()"
          role="img"
          [attr.aria-label]="ariaLabel()"
        >
          @for (s of slices(); track s.name) {
            <path class="g-donut-chart__slice" [attr.d]="s.d" [style.fill]="s.color" />
          }
          @if (showTotal()) {
            <text class="g-donut-chart__total" [attr.x]="w() / 2" [attr.y]="height() / 2 - 2">
              {{ totalText() }}
            </text>
            <text
              class="g-donut-chart__total-label"
              [attr.x]="w() / 2"
              [attr.y]="height() / 2 + 16"
            >
              {{ totalLabel() }}
            </text>
          }
        </svg>

        @if (showLegend() && data().length) {
          <g-chart-legend [items]="legendItems()" [direction]="legendDir()" />
        }
      </div>
    </div>
  `,
  styleUrl: './donut-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-donut-chart' },
})
export class GDonutChart {
  readonly data = input<readonly GChartSlice[]>([]);
  readonly height = input(280);
  readonly thickness = input(0.6);
  readonly showLegend = input(true);
  readonly legendPosition = input<GChartLegendPosition>('bottom');
  readonly showTotal = input(true);
  readonly totalLabel = input('Tổng');
  readonly exportable = input(true);
  readonly filename = input('donut-chart');
  readonly title = input('');
  readonly ariaLabel = input('Biểu đồ vành khuyên');

  private readonly destroyRef = inject(DestroyRef);
  protected readonly svgEl = viewChild<ElementRef<SVGSVGElement>>('chartSvg');
  protected readonly w = signal(320);

  constructor() {
    afterNextRender(() => {
      const el = this.svgEl()?.nativeElement;
      if (!el) return;
      const ro = new ResizeObserver((entries) => {
        const width = Math.round(entries[0].contentRect.width);
        if (width > 0) this.w.set(width);
      });
      ro.observe(el);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  protected readonly legendDir = computed(() => legendDirection(this.legendPosition()));
  protected readonly slices = computed(() =>
    pieSlices(this.data(), this.w(), this.height(), this.thickness()),
  );
  protected readonly totalText = computed(() =>
    formatChartNumber(this.data().reduce((s, d) => s + Math.max(0, d.value), 0)),
  );
  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.data().map((d, i) => ({ name: d.name, color: chartColor(i, d.color) })),
  );
}
