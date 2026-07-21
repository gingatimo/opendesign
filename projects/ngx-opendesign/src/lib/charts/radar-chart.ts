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
  GChartLegendPosition,
  GChartSeries,
  legendDirection,
  niceTicks,
  polar,
} from './chart-utils';
import { GChartZoom } from './chart-zoom';
import { GLocaleService } from '../core/locale';

// Biểu đồ RADAR (spider/web, SVG thuần): mỗi trục toả từ tâm là một tiêu chí, mỗi chuỗi nối các điểm
// thành một đa giác. Đọc được HÌNH DÁNG tổng thể — mạnh/yếu ở tiêu chí nào — và so sánh vài chuỗi
// chồng lên nhau (kỹ năng ứng viên, điểm đánh giá sản phẩm…).
//
// Chỉ hợp khi các trục CÙNG THANG ĐO: mọi trục dùng chung một thang giá trị, trục nào đơn vị khác thì
// hình vẽ ra vô nghĩa. Cũng đừng chồng quá 3 chuỗi — các đa giác che nhau là hết đọc được.
@Component({
  selector: 'g-radar-chart',
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
          class="g-radar-chart__svg g-chart-frame__svg g-chart-frame__svg--round"
          [attr.viewBox]="'0 0 ' + w() + ' ' + plotHeight()"
          width="100%"
          [attr.height]="plotHeight()"
          role="img"
          [attr.aria-label]="resolvedAriaLabel()"
        >
          <!-- Lưới vẽ trước để nằm dưới các đa giác: vòng giá trị + nan hoa theo từng trục. -->
          @for (ring of rings(); track ring.value) {
            @if (shape() === 'circle') {
              <circle
                class="g-radar-chart__ring"
                [attr.cx]="cx()"
                [attr.cy]="cy()"
                [attr.r]="ring.r"
              />
            } @else {
              <path class="g-radar-chart__ring" [attr.d]="ring.d" />
            }
            <text
              class="g-radar-chart__tick"
              [attr.x]="cx() + 4"
              [attr.y]="cy() - ring.r - 2"
              [attr.font-size]="tickSize()"
            >
              {{ ring.value }}
            </text>
          }
          @for (axis of axes(); track axis.label) {
            <line
              class="g-radar-chart__spoke"
              [attr.x1]="cx()"
              [attr.y1]="cy()"
              [attr.x2]="axis.x"
              [attr.y2]="axis.y"
            />
            <text
              class="g-radar-chart__label"
              [attr.x]="axis.lx"
              [attr.y]="axis.ly"
              [attr.font-size]="labelSize()"
              [style.text-anchor]="axis.anchor"
            >
              {{ axis.label }}
            </text>
          }

          @for (s of shapes(); track s.name) {
            <path
              class="g-radar-chart__area"
              [attr.d]="s.d"
              [style.fill]="s.color"
              [style.stroke]="s.color"
            />
          }
          @for (s of shapes(); track s.name) {
            @for (p of s.points; track p.label) {
              <circle
                class="g-radar-chart__dot"
                [attr.cx]="p.x"
                [attr.cy]="p.y"
                [attr.r]="dotSize()"
                [style.fill]="s.color"
              >
                <title>{{ s.name }} · {{ p.label }}: {{ p.value }}</title>
              </circle>
            }
          }
        </svg>

        @if (showLegend() && series().length) {
          <g-chart-legend [items]="legendItems()" [direction]="legendDir()" />
        }
      </div>
    </div>
  `,
  styleUrl: './radar-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-radar-chart', '[attr.title]': 'null' },
})
export class GRadarChart {
  /** Tên các trục toả từ tâm; `values` của mỗi chuỗi phải cùng độ dài với mảng này. */
  readonly labels = input<readonly string[]>([]);
  readonly series = input<readonly GChartSeries[]>([]);
  readonly height = input(320);
  /** Lưới nền: vòng TRÒN hay đa giác nối các trục. */
  readonly shape = input<'circle' | 'polygon'>('circle');
  readonly showLegend = input(true);
  readonly legendPosition = input<GChartLegendPosition>('bottom');
  readonly title = input('');
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('radar-chart');

  protected readonly w = signal(320);
  protected readonly zoomed = signal(false);
  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');

  private readonly measuredHeight = signal(0);
  protected readonly plotHeight = computed(() =>
    this.zoomed() && this.measuredHeight() > 0 ? this.measuredHeight() : this.height(),
  );

  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;
  // Input có giá trị thì thắng; rỗng thì lấy từ gói ngôn ngữ. Giữ API cũ, không có hai nguồn sự thật.
  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() || this.t().chart.aria.radar,
  );
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
  protected readonly cx = computed(() => this.w() / 2);
  protected readonly cy = computed(() => this.plotHeight() / 2);

  // Nửa cạnh ngắn — mốc để tính MỌI kích thước, kể cả cỡ chữ. Tính cỡ chữ từ đây (chứ không từ bán
  // kính) để phá vòng lặp: bán kính cần biết chừa bao nhiêu cho nhãn, mà chỗ chừa lại theo cỡ chữ.
  private readonly half = computed(() => Math.min(this.w(), this.plotHeight()) / 2);
  protected readonly labelSize = computed(() => clamp(this.half() * 0.075, 10, 22));
  protected readonly tickSize = computed(() => clamp(this.half() * 0.06, 9, 18));
  protected readonly dotSize = computed(() => clamp(this.half() * 0.02, 2, 6));

  // Chỗ chừa cho nhãn trục phải TỈ LỆ theo cỡ chữ: để hằng số px thì lúc phóng to chữ to lên mà chỗ
  // chừa vẫn thế, nhãn tràn ra ngoài khung và bị cắt.
  private readonly radius = computed(() => Math.max(20, this.half() - this.labelSize() * 2.6));
  private readonly labelGap = computed(() => this.labelSize() * 1.1);

  private readonly ticks = computed(() => {
    const max = Math.max(0, ...this.series().flatMap((s) => [...s.values]));
    return niceTicks(0, max || 1, 4).filter((v) => v > 0);
  });
  private readonly scaleMax = computed(() => Math.max(...this.ticks(), 1));
  private readonly step = computed(() =>
    this.labels().length ? (2 * Math.PI) / this.labels().length : 0,
  );

  /** Điểm trên trục thứ `index` ở bán kính `r`. */
  private pointAt(index: number, r: number) {
    return polar(this.cx(), this.cy(), r, index * this.step());
  }

  protected readonly rings = computed(() =>
    this.ticks().map((value) => {
      const r = (value / this.scaleMax()) * this.radius();
      return { value, r, d: this.polygonPath(this.labels().map(() => r)) };
    }),
  );

  protected readonly axes = computed(() =>
    this.labels().map((label, i) => {
      const end = this.pointAt(i, this.radius());
      const labelPoint = this.pointAt(i, this.radius() + this.labelGap());
      return {
        label,
        x: end.x,
        y: end.y,
        lx: labelPoint.x,
        ly: labelPoint.y,
        // Nhãn hai bên mọc RA NGOÀI thay vì cân giữa điểm neo: cân giữa thì nửa chữ thò vào trong
        // chart (đè lên hình) và nửa kia thò ra ngoài khung (bị cắt).
        anchor: textAnchor(labelPoint.x, this.cx()),
      };
    }),
  );

  protected readonly shapes = computed(() =>
    this.series().map((s, si) => {
      const radii = this.labels().map(
        (_, i) => (Math.max(0, s.values[i] ?? 0) / this.scaleMax()) * this.radius(),
      );
      return {
        name: s.name,
        color: chartColor(si, s.color),
        d: this.polygonPath(radii),
        points: this.labels().map((label, i) => {
          const p = this.pointAt(i, radii[i]);
          return { label, value: s.values[i] ?? 0, x: p.x, y: p.y };
        }),
      };
    }),
  );

  protected readonly legendItems = computed<GChartLegendItem[]>(() =>
    this.series().map((s, i) => ({ name: s.name, color: chartColor(i, s.color) })),
  );

  /** Đa giác khép kín đi qua bán kính cho trước ở từng trục. */
  private polygonPath(radii: readonly number[]): string {
    if (!radii.length) return '';
    return (
      radii
        .map((r, i) => {
          const p = this.pointAt(i, r);
          return `${i === 0 ? 'M' : 'L'}${round(p.x)} ${round(p.y)}`;
        })
        .join(' ') + ' Z'
    );
  }
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

function round(v: number): number {
  return Math.round(v * 100) / 100;
}
