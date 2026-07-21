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
  arcPath,
  chartColor,
  GChartLegendPosition,
  GChartSlice,
  legendDirection,
  polar,
} from './chart-utils';

// Biểu đồ TRÒN (pie, SVG thuần). Mỗi múi là một hình quạt tỉ lệ theo giá trị; kèm nhãn % trên múi đủ
// lớn. Legend 4 phía (`legendPosition`), export PNG/SVG (`exportable`). Bản có vành rỗng + tổng giữa là
// `g-donut-chart`.
@Component({
  selector: 'g-pie-chart',
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
          class="g-pie-chart__svg g-chart-frame__svg g-chart-frame__svg--round"
          [attr.viewBox]="'0 0 ' + w() + ' ' + plotHeight()"
          width="100%"
          [attr.height]="plotHeight()"
          role="img"
          [attr.aria-label]="ariaLabel()"
        >
          @for (s of slices(); track s.name) {
            <path class="g-pie-chart__slice" [attr.d]="s.d" [style.fill]="s.color">
              <!-- Tooltip gốc của trình duyệt: rê vào múi nào hiện đúng tên múi đó. -->
              <title>{{ s.name }}: {{ s.value }} ({{ s.pct }}%)</title>
            </path>
          }
          @if (showLabels()) {
            @for (s of slices(); track s.name) {
              @if (s.frac >= 0.05) {
                <text
                  class="g-pie-chart__label"
                  [attr.x]="s.lx"
                  [attr.y]="s.ly"
                  [attr.font-size]="labelSize()"
                >
                  {{ s.pct }}%
                </text>
              }
            }
          }
        </svg>

        @if (showLegend() && data().length) {
          <g-chart-legend [items]="legendItems()" [direction]="legendDir()" />
        }
      </div>
    </div>
  `,
  styleUrl: './pie-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // `title` là input, nhưng viết dạng attribute tĩnh (title="...") nên nó NẰM LẠI trong DOM và
  // trình duyệt coi đó là tooltip cho toàn bộ chart — rê chuột vào múi nào cũng hiện tên chart. Gỡ
  // attribute khỏi host; tiêu đề đã được vẽ ở hàng đầu khung rồi.
  host: { class: 'g-pie-chart', '[attr.title]': 'null' },
})
export class GPieChart {
  readonly data = input<readonly GChartSlice[]>([]);
  readonly height = input(280);
  readonly showLabels = input(true);
  readonly showLegend = input(true);
  readonly legendPosition = input<GChartLegendPosition>('bottom');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('pie-chart');
  readonly title = input('');
  readonly ariaLabel = input('Biểu đồ tròn');

  private readonly destroyRef = inject(DestroyRef);
  protected readonly svgEl = viewChild<ElementRef<SVGSVGElement>>('chartSvg');
  protected readonly w = signal(320);

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
    pieSlices(this.data(), this.w(), this.plotHeight(), 0),
  );
  protected readonly zoomed = signal(false);
  // Chiều cao ô vẽ đo được. Lúc phóng to, hình phải cao theo KHUNG chứ không giữ `height` cố định —
  // nếu không, tỉ lệ viewBox trùng tỉ lệ ô nên trình duyệt không phóng gì cả, card rộng ra mà chart
  // vẫn y nguyên (đúng cái đã thấy trên màn hình).
  private readonly measuredHeight = signal(0);
  protected readonly plotHeight = computed(() =>
    this.zoomed() && this.measuredHeight() > 0 ? this.measuredHeight() : this.height(),
  );
  // Nhãn % phải TỈ LỆ theo bán kính: viewBox khớp 1:1 với kích thước thật nên cỡ px cố định sẽ hoá
  // bé tí lúc phóng to. Hệ số lấy đúng tỉ lệ ở cỡ mặc định (12px trên bán kính 132).
  protected readonly radius = computed(() => Math.min(this.w(), this.plotHeight()) / 2 - 8);
  protected readonly labelSize = computed(() => Math.max(9, Math.round(this.radius() * 0.091)));
  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.data().map((d, i) => ({ name: d.name, color: chartColor(i, d.color) })),
  );
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
