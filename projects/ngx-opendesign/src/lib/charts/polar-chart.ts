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
  arcPath,
  chartColor,
  GChartLegendPosition,
  GChartSlice,
  legendDirection,
  niceTicks,
  polar,
} from './chart-utils';
import { GChartZoom } from './chart-zoom';

// Biểu đồ CỰC (polar area, SVG thuần): mỗi phần chiếm góc BẰNG NHAU, còn BÁN KÍNH mới thay đổi theo
// giá trị — khác pie (góc thay đổi, bán kính bằng nhau). Hợp khi muốn so sánh độ lớn của các hạng mục
// cùng loại (vd. lượng mưa theo tháng) mà vẫn thấy được thứ tự vòng quanh.
//
// Bán kính tỉ lệ TUYẾN TÍNH với giá trị để khớp với các vòng lưới có nhãn số: nếu lấy căn bậc hai cho
// "đúng diện tích" thì mắt đọc được diện tích nhưng lại lệch hẳn so với vòng lưới, thành ra khó đối
// chiếu hơn.
@Component({
  selector: 'g-polar-chart',
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
          class="g-polar-chart__svg g-chart-frame__svg g-chart-frame__svg--round"
          [attr.viewBox]="'0 0 ' + w() + ' ' + plotHeight()"
          width="100%"
          [attr.height]="plotHeight()"
          role="img"
          [attr.aria-label]="ariaLabel()"
        >
          <!-- Lưới: các vòng tròn ứng với vạch giá trị, vẽ TRƯỚC để nằm dưới các múi. -->
          @for (ring of rings(); track ring.value) {
            <circle
              class="g-polar-chart__ring"
              [attr.cx]="w() / 2"
              [attr.cy]="plotHeight() / 2"
              [attr.r]="ring.r"
            />
            <text
              class="g-polar-chart__tick"
              [attr.x]="w() / 2 + 4"
              [attr.y]="plotHeight() / 2 - ring.r - 2"
              [attr.font-size]="tickSize()"
            >
              {{ ring.value }}
            </text>
          }
          @for (sector of sectors(); track sector.name) {
            <path class="g-polar-chart__sector" [attr.d]="sector.d" [style.fill]="sector.color">
              <title>{{ sector.name }}: {{ sector.value }}</title>
            </path>
          }
          @if (showLabels()) {
            @for (sector of sectors(); track sector.name) {
              <text
                class="g-polar-chart__label"
                [attr.x]="sector.lx"
                [attr.y]="sector.ly"
                [attr.font-size]="labelSize()"
                [style.text-anchor]="sector.anchor"
              >
                {{ sector.name }}
              </text>
            }
          }
        </svg>

        @if (showLegend() && data().length) {
          <g-chart-legend [items]="legendItems()" [direction]="legendDir()" />
        }
      </div>
    </div>
  `,
  styleUrl: './polar-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-polar-chart', '[attr.title]': 'null' },
})
export class GPolarChart {
  readonly data = input<readonly GChartSlice[]>([]);
  readonly height = input(300);
  /** Ghi tên hạng mục quanh vành ngoài. */
  readonly showLabels = input(true);
  readonly showLegend = input(true);
  readonly legendPosition = input<GChartLegendPosition>('bottom');
  readonly title = input('');
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('Biểu đồ cực');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('polar-chart');

  protected readonly w = signal(320);
  protected readonly zoomed = signal(false);
  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');

  private readonly measuredHeight = signal(0);
  protected readonly plotHeight = computed(() =>
    this.zoomed() && this.measuredHeight() > 0 ? this.measuredHeight() : this.height(),
  );

  private readonly destroyRef = inject(DestroyRef);
  protected readonly svgEl = viewChild<ElementRef<SVGSVGElement>>('chartSvg');

  constructor() {
    afterNextRender(() => {
      const el = this.svgEl()?.nativeElement;
      if (!el) return;
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

  // Nửa cạnh ngắn — mốc tính mọi kích thước. Cỡ chữ tính từ đây (không phải từ bán kính) để phá vòng
  // lặp: bán kính cần biết chừa bao nhiêu cho nhãn, mà chỗ chừa lại theo cỡ chữ.
  private readonly half = computed(() => Math.min(this.w(), this.plotHeight()) / 2);
  protected readonly labelSize = computed(() => clamp(this.half() * 0.075, 10, 22));
  protected readonly tickSize = computed(() => clamp(this.half() * 0.06, 9, 18));

  // Chỗ chừa cho nhãn phải TỈ LỆ theo cỡ chữ: để hằng số px thì lúc phóng to chữ to lên mà chỗ chừa
  // vẫn thế, nhãn tràn ra ngoài khung và bị cắt.
  private readonly radius = computed(() =>
    Math.max(20, this.half() - (this.showLabels() ? this.labelSize() * 2.6 : 8)),
  );
  private readonly labelGap = computed(() => this.labelSize() * 1.1);

  /** Vạch giá trị: chỉ lấy các vạch > 0 vì vòng bán kính 0 không vẽ được gì. */
  private readonly ticks = computed(() => {
    const max = Math.max(0, ...this.data().map((d) => d.value));
    return niceTicks(0, max || 1, 4).filter((v) => v > 0);
  });
  private readonly scaleMax = computed(() => Math.max(...this.ticks(), 1));

  protected readonly rings = computed(() =>
    this.ticks().map((value) => ({ value, r: (value / this.scaleMax()) * this.radius() })),
  );

  protected readonly sectors = computed(() => {
    const data = this.data();
    const step = data.length ? (2 * Math.PI) / data.length : 0;
    const cx = this.w() / 2;
    const cy = this.plotHeight() / 2;
    return data.map((d, i) => {
      const a0 = i * step;
      const a1 = a0 + step;
      const r = (Math.max(0, d.value) / this.scaleMax()) * this.radius();
      // Nhãn đặt ngoài vành lớn nhất để không đè lên múi nào.
      const labelPoint = polar(cx, cy, this.radius() + this.labelGap(), (a0 + a1) / 2);
      return {
        name: d.name,
        value: d.value,
        color: chartColor(i, d.color),
        d: arcPath(cx, cy, r, 0, a0, a1),
        lx: labelPoint.x,
        ly: labelPoint.y,
        // Nhãn hai bên mọc RA NGOÀI thay vì cân giữa: cân giữa thì nửa chữ thò vào trong chart và
        // nửa kia thò ra ngoài khung, bị cắt.
        anchor: textAnchor(labelPoint.x, cx),
      };
    });
  });

  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.data().map((d, i) => ({ name: d.name, color: chartColor(i, d.color) })),
  );
}

/** Neo chữ theo phía so với tâm: bên phải mọc sang phải, bên trái mọc sang trái, trên/dưới cân giữa. */
function textAnchor(x: number, cx: number): 'start' | 'middle' | 'end' {
  if (x > cx + 1) return 'start';
  if (x < cx - 1) return 'end';
  return 'middle';
}

function clamp(value: number, min: number, max: number): number {
  return Math.round(Math.min(Math.max(value, min), max));
}
