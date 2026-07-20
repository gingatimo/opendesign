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
import { GButton } from '../button/button';
import { GIcon } from '../icon/icon';
import { gIconDownload } from '../icon/icons';
import { GChartLegend, GChartLegendItem } from './chart-legend';
import { chartColor, formatChartNumber, GChartSlice } from './chart-utils';
import { exportChartSvg } from './export-chart';
import { pieSlices } from './pie-chart';

// Biểu đồ VÀNH KHUYÊN (donut, SVG thuần). Như pie nhưng có lỗ giữa (hiện TỔNG), kèm LEGEND và nút
// EXPORT ra PNG/SVG (người dùng bấm để tải). `thickness` = tỉ lệ bán kính lỗ (0.6 mặc định).
@Component({
  selector: 'g-donut-chart',
  imports: [GChartLegend, GButton, GIcon],
  template: `
    <svg
      #chartSvg
      class="g-donut-chart__svg"
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
        <text class="g-donut-chart__total-label" [attr.x]="w() / 2" [attr.y]="height() / 2 + 16">
          {{ totalLabel() }}
        </text>
      }
    </svg>

    <div class="g-donut-chart__foot">
      @if (showLegend()) {
        <g-chart-legend [items]="legendItems()" />
      }
      @if (exportable()) {
        <div class="g-donut-chart__export">
          <button g-button variant="outline" size="sm" (click)="export('png')">
            <g-icon [icon]="iconDownload" size="sm" /> PNG
          </button>
          <button g-button variant="outline" size="sm" (click)="export('svg')">
            <g-icon [icon]="iconDownload" size="sm" /> SVG
          </button>
        </div>
      }
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
  readonly showTotal = input(true);
  readonly totalLabel = input('Tổng');
  readonly exportable = input(true);
  readonly filename = input('donut-chart');
  readonly ariaLabel = input('Biểu đồ vành khuyên');

  protected readonly iconDownload = gIconDownload;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly svgRef = viewChild.required<ElementRef<SVGSVGElement>>('chartSvg');
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

  protected readonly slices = computed(() =>
    pieSlices(this.data(), this.w(), this.height(), this.thickness()),
  );
  protected readonly totalText = computed(() =>
    formatChartNumber(this.data().reduce((s, d) => s + Math.max(0, d.value), 0)),
  );
  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.data().map((d, i) => ({ name: d.name, color: chartColor(i, d.color) })),
  );

  protected export(format: 'png' | 'svg'): void {
    void exportChartSvg(this.svgRef().nativeElement, this.filename(), format);
  }
}
