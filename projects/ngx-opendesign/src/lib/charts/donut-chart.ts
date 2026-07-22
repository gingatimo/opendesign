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
  GChartSlice,
  legendDirection,
} from './chart-utils';
import { pieSlices } from './pie-chart';
import { GLocaleService } from '../core/locale';

// Biểu đồ VÀNH KHUYÊN (donut, SVG thuần). Như pie nhưng có lỗ giữa (hiện TỔNG). Legend 4 phía
// (`legendPosition`), export PNG/SVG (`exportable`, mặc định BẬT). `thickness` = tỉ lệ bán kính lỗ.
@Component({
  selector: 'g-donut-chart',
  imports: [GChartLegend, GChartExport, GChartZoom],
  template: `
    <div
      class="g-chart-frame"
      [class]="'g-chart-frame--' + legendPosition()"
      [class.g-chart-frame--zoom]="zoomed()"
    >
      @if (title() || exportable() || zoomable()) {
        <div class="g-chart-frame__head" [class.g-chart-frame__head--center]="titleCentered()">
          @if (title()) {
            <div class="g-chart-frame__title">{{ title() }}</div>
          }
          <div class="g-chart-frame__actions">
            <!-- Đang phóng to thì giấu nút tải: lúc này người dùng đang XEM, còn muốn tải thì
                 thu lại rồi tải — đỡ một nút trong khung đang cố dành hết chỗ cho biểu đồ. -->
            @if (exportable() && !zoomed()) {
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
          class="g-donut-chart__svg g-chart-frame__svg g-chart-frame__svg--round"
          [attr.viewBox]="'0 0 ' + w() + ' ' + plotHeight()"
          width="100%"
          [attr.height]="plotHeight()"
          role="img"
          [attr.aria-label]="resolvedAriaLabel()"
        >
          @for (s of slices(); track s.name) {
            <path class="g-donut-chart__slice" [attr.d]="s.d" [style.fill]="s.color">
              <!-- Tooltip gốc của trình duyệt: rê vào múi nào hiện đúng tên múi đó. -->
              <title>{{ s.name }}: {{ s.value }} ({{ s.pct }}%)</title>
            </path>
          }
          @if (showTotal()) {
            <text
              class="g-donut-chart__total"
              [attr.x]="w() / 2"
              [attr.y]="plotHeight() / 2 - radius() * 0.015"
              [attr.font-size]="totalSize()"
            >
              {{ totalText() }}
            </text>
            <text
              class="g-donut-chart__total-label"
              [attr.x]="w() / 2"
              [attr.y]="plotHeight() / 2 + radius() * 0.121"
              [attr.font-size]="totalLabelSize()"
            >
              {{ resolvedTotalLabel() }}
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
  // `title` là input, nhưng viết dạng attribute tĩnh (title="...") nên nó NẰM LẠI trong DOM và
  // trình duyệt coi đó là tooltip cho toàn bộ chart — rê chuột vào múi nào cũng hiện tên chart. Gỡ
  // attribute khỏi host; tiêu đề đã được vẽ ở hàng đầu khung rồi.
  host: { class: 'g-donut-chart', '[attr.title]': 'null' },
})
export class GDonutChart {
  readonly data = input<readonly GChartSlice[]>([]);
  readonly height = input(280);
  readonly thickness = input(0.6);
  readonly showLegend = input(true);
  readonly legendPosition = input<GChartLegendPosition>('bottom');
  readonly showTotal = input(true);
  readonly totalLabel = input('');
  readonly exportable = input(true);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('donut-chart');
  readonly title = input('');
  /** Vị trí tiêu đề trong hàng đầu: sát trái (mặc định) hay giữa khung. */
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('');

  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;
  protected readonly svgEl = viewChild<ElementRef<SVGSVGElement>>('chartSvg');
  protected readonly w = signal(320);
  // Input có giá trị thì thắng; rỗng thì lấy từ gói ngôn ngữ. Giữ API cũ, không có hai nguồn sự thật.
  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() || this.t().chart.aria.donut,
  );
  protected readonly resolvedTotalLabel = computed(() => this.totalLabel() || this.t().chart.total);

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
  protected readonly slices = computed(() =>
    pieSlices(this.data(), this.w(), this.plotHeight(), this.thickness()),
  );
  // Chữ giữa vành phải TỈ LỆ theo bán kính, không để cỡ px cố định: viewBox nay khớp 1:1 với kích
  // thước thật nên cỡ cố định sẽ hoá bé tí khi phóng to. Các hệ số lấy đúng theo tỉ lệ ở cỡ mặc định
  // (22px/12px trên bán kính 132) để hình thường nhìn y như cũ.
  protected readonly radius = computed(() => Math.min(this.w(), this.plotHeight()) / 2 - 8);
  protected readonly totalSize = computed(() => Math.max(12, Math.round(this.radius() * 0.167)));
  protected readonly totalLabelSize = computed(() =>
    Math.max(9, Math.round(this.radius() * 0.091)),
  );
  protected readonly totalText = computed(() =>
    formatChartNumber(this.data().reduce((s, d) => s + Math.max(0, d.value), 0)),
  );
  protected readonly zoomed = signal(false);
  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');
  // Chiều cao ô vẽ đo được. Lúc phóng to, hình phải cao theo KHUNG chứ không giữ `height` cố định —
  // nếu không, tỉ lệ viewBox trùng tỉ lệ ô nên trình duyệt không phóng gì cả, card rộng ra mà chart
  // vẫn y nguyên (đúng cái đã thấy trên màn hình).
  private readonly measuredHeight = signal(0);
  protected readonly plotHeight = computed(() =>
    this.zoomed() && this.measuredHeight() > 0 ? this.measuredHeight() : this.height(),
  );
  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.data().map((d, i) => ({ name: d.name, color: chartColor(i, d.color) })),
  );
}
