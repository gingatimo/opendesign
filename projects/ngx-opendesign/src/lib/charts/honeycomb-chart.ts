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
import { chartColor, GChartSlice, heatColor, heatLevel, HEAT_LEVELS, polar } from './chart-utils';
import { GChartZoom } from './chart-zoom';

// Biểu đồ TỔ ONG (honeycomb/hexagon): mỗi hạng mục là một ô lục giác, xếp so le như tổ ong. Đọc
// nhanh "cái nào nổi bật" trong một tập nhiều hạng mục cùng loại — công nghệ trong dự án, kho hàng
// theo khu vực, thành viên theo số việc… Hình lục giác xếp khít hơn hình vuông nên tận dụng chỗ tốt
// hơn khi có nhiều ô, và mắt không bị các hàng/cột thẳng băng dẫn dắt sai.
//
// Ô lục giác ĐỈNH NHỌN (pointy-top): các đỉnh nằm ở góc bội số 60° tính từ hướng 12h, nên dùng thẳng
// `polar()` là ra, không phải tính lượng giác riêng.
@Component({
  selector: 'g-honeycomb-chart',
  imports: [GChartExport, GChartZoom],
  template: `
    <div class="g-chart-frame" [class.g-chart-frame--zoom]="zoomed()">
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
          class="g-honeycomb__svg g-chart-frame__svg"
          [attr.viewBox]="'0 0 ' + w() + ' ' + svgHeight()"
          width="100%"
          [attr.height]="svgHeight()"
          role="img"
          [attr.aria-label]="ariaLabel()"
        >
          @for (cell of cells(); track cell.name) {
            <g class="g-honeycomb__cell">
              <path class="g-honeycomb__hex" [attr.d]="cell.d" [style.fill]="cell.color">
                <title>{{ cell.name }}: {{ cell.value }}</title>
              </path>
              @if (showLabels() && cell.size >= 26) {
                <text
                  class="g-honeycomb__label"
                  [attr.x]="cell.cx"
                  [attr.y]="cell.cy - (showValues() ? cell.size * 0.16 : 0)"
                  [attr.font-size]="labelSize()"
                >
                  {{ cell.name }}
                </text>
                @if (showValues()) {
                  <text
                    class="g-honeycomb__value"
                    [attr.x]="cell.cx"
                    [attr.y]="cell.cy + cell.size * 0.3"
                    [attr.font-size]="valueSize()"
                  >
                    {{ cell.value }}
                  </text>
                }
              }
            </g>
          }
        </svg>
      </div>
    </div>
  `,
  styleUrl: './honeycomb-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-honeycomb-chart', '[attr.title]': 'null' },
})
export class GHoneycombChart {
  readonly data = input<readonly GChartSlice[]>([]);
  /** Số ô mỗi hàng. Bỏ trống (0) thì tự chia cho lưới gần vuông nhất. */
  readonly columns = input(0);
  /**
   * Tô màu theo ĐỘ LỚN giá trị (thang nhiệt 4 bậc) hay theo bảng màu phân loại. Số liệu so sánh được
   * thì 'heat' dễ đọc hơn; các hạng mục rời rạc (ngôn ngữ, phòng ban…) thì 'category'.
   */
  readonly colorMode = input<'heat' | 'category'>('heat');
  readonly color = input('var(--g-chart-2)');
  readonly showLabels = input(true);
  readonly showValues = input(true);
  readonly title = input('');
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('Biểu đồ tổ ong');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('honeycomb-chart');

  protected readonly w = signal(640);
  protected readonly zoomed = signal(false);
  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');

  private readonly destroyRef = inject(DestroyRef);
  protected readonly svgEl = viewChild<ElementRef<SVGSVGElement>>('chartSvg');

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

  private readonly cols = computed(() => {
    const explicit = this.columns();
    if (explicit > 0) return explicit;
    // Lưới gần vuông: căn bậc hai số ô, tối thiểu 1.
    return Math.max(1, Math.ceil(Math.sqrt(this.data().length)));
  });
  private readonly rows = computed(() => Math.ceil(this.data().length / this.cols()) || 1);

  /**
   * Bán kính ô. Hàng lẻ lệch nửa ô nên bề ngang cần (cols + 0.5) ô; ô đỉnh nhọn có bề ngang √3·s và
   * các hàng chồng nhau nên chỉ tốn 1.5·s chiều cao mỗi hàng (trừ hàng cuối tốn đủ 2·s).
   */
  protected readonly size = computed(() => {
    const byWidth = this.w() / (Math.sqrt(3) * (this.cols() + 0.5));
    return Math.max(8, Math.min(byWidth, 72));
  });
  protected readonly svgHeight = computed(() =>
    Math.round(this.size() * (1.5 * (this.rows() - 1) + 2) + 4),
  );
  protected readonly labelSize = computed(() => Math.max(9, Math.round(this.size() * 0.24)));
  protected readonly valueSize = computed(() => Math.max(8, Math.round(this.size() * 0.2)));

  private readonly max = computed(() => Math.max(0, ...this.data().map((d) => d.value)));

  protected readonly cells = computed(() => {
    const size = this.size();
    const cols = this.cols();
    const max = this.max();
    const heat = this.colorMode() === 'heat';
    const hexWidth = Math.sqrt(3) * size;
    return this.data().map((d, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      // Hàng lẻ đẩy sang phải nửa ô — chính là kiểu xếp so le của tổ ong.
      const cx = hexWidth * (col + (row % 2 ? 1 : 0.5));
      const cy = size * (1 + 1.5 * row) + 2;
      return {
        name: d.name,
        value: d.value,
        cx,
        cy,
        size,
        color: heat ? heatColor(heatLevel(d.value, max), this.color()) : chartColor(i, d.color),
        d: hexPath(cx, cy, size),
      };
    });
  });

  protected readonly levels = Array.from({ length: HEAT_LEVELS + 1 }, (_, i) => i);
}

/** Đường viền lục giác ĐỈNH NHỌN: 6 đỉnh cách nhau 60°, đỉnh đầu ở hướng 12h. */
export function hexPath(cx: number, cy: number, size: number): string {
  const points = Array.from({ length: 6 }, (_, i) => polar(cx, cy, size, (i * Math.PI) / 3));
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p.x)} ${round(p.y)}`).join(' ') + ' Z';
}

function round(v: number): number {
  return Math.round(v * 100) / 100;
}
