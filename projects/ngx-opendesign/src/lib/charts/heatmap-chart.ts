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
import { maxTextWidth } from './chart-text';
import { HEAT_LEVELS, heatColor, heatLevel } from './chart-utils';
import { GChartZoom } from './chart-zoom';
import { GLocaleService } from '../core/locale';

/** Một ô của heatmap: giá trị tại giao của hàng `row` và cột `col`. */
export interface GHeatmapCell {
  row: string;
  col: string;
  value: number;
}

const GAP = 3;
const LABEL_SIZE = 12;
const SCALE_SWATCH = 12;

// HEATMAP ma trận — mỗi ô là giao của một hàng và một cột, đậm nhạt theo giá trị. Hợp cho "giờ trong
// ngày × thứ trong tuần", "sản phẩm × khu vực"…
//
// Vẽ bằng SVG (không phải lưới CSS) để dùng chung được đường XUẤT ẢNH và chế độ PHÓNG TO với các
// chart khác — đổi lại phải tự đo bề ngang nhãn hàng để chừa chỗ, việc mà CSS grid vốn lo hộ.
@Component({
  selector: 'g-heatmap-chart',
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
          class="g-heatmap__svg g-chart-frame__svg"
          [attr.viewBox]="'0 0 ' + w() + ' ' + svgHeight()"
          width="100%"
          [attr.height]="svgHeight()"
          role="img"
          [attr.aria-label]="resolvedAriaLabel()"
        >
          @for (col of colLabels(); track col.name) {
            <text
              class="g-heatmap__col-label"
              [attr.x]="col.x"
              [attr.y]="labelSize()"
              [attr.font-size]="labelSize()"
            >
              {{ col.name }}
            </text>
          }
          @for (row of grid(); track row.name) {
            <text
              class="g-heatmap__row-label"
              [attr.x]="labelWidth() - 8"
              [attr.y]="row.y + cell() / 2"
              [attr.font-size]="labelSize()"
            >
              {{ row.name }}
            </text>
            @for (c of row.cells; track c.col) {
              <rect
                class="g-heatmap__cell"
                [attr.x]="c.x"
                [attr.y]="row.y"
                [attr.width]="cell()"
                [attr.height]="cell()"
                [attr.rx]="cellRadius()"
                [style.fill]="c.color"
              >
                <title>{{ row.name }} · {{ c.col }}: {{ c.value }}</title>
              </rect>
            }
          }

          @if (showScale()) {
            <text
              class="g-heatmap__scale-label"
              [attr.x]="scale().minX"
              [attr.y]="scale().textY"
              [attr.font-size]="labelSize()"
            >
              {{ resolvedScaleMinLabel() }}
            </text>
            @for (s of scale().swatches; track s.level) {
              <rect
                class="g-heatmap__swatch"
                [attr.x]="s.x"
                [attr.y]="scale().swatchY"
                [attr.width]="swatchSize"
                [attr.height]="swatchSize"
                rx="3"
                [style.fill]="s.color"
              />
            }
            <text
              class="g-heatmap__scale-label"
              [attr.x]="scale().maxX"
              [attr.y]="scale().textY"
              [attr.font-size]="labelSize()"
            >
              {{ resolvedScaleMaxLabel() }}
            </text>
          }
        </svg>
      </div>
    </div>
  `,
  styleUrl: './heatmap-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-heatmap-chart', '[attr.title]': 'null' },
})
export class GHeatmapChart {
  readonly data = input<readonly GHeatmapCell[]>([]);
  /** Thứ tự hàng/cột. Bỏ trống thì lấy theo thứ tự xuất hiện trong `data`. */
  readonly rows = input<readonly string[]>([]);
  readonly columns = input<readonly string[]>([]);
  /** Màu đậm nhất của thang (các bậc nhạt hơn được pha từ màu này). */
  readonly color = input('var(--g-chart-2)');
  /** Cạnh tối đa của một ô (px). Ô luôn vuông; lưới hẹp hơn thì ô co lại theo. */
  readonly cellSize = input(28);
  readonly showScale = input(true);
  readonly scaleMinLabel = input('');
  readonly scaleMaxLabel = input('');
  readonly title = input('');
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('heatmap-chart');

  protected readonly swatchSize = SCALE_SWATCH;
  protected readonly w = signal(640);
  protected readonly zoomed = signal(false);
  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');

  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;
  // Input có giá trị thì thắng; rỗng thì lấy từ gói ngôn ngữ. Giữ API cũ, không có hai nguồn sự thật.
  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() || this.t().chart.aria.heatmap,
  );
  protected readonly resolvedScaleMinLabel = computed(
    () => this.scaleMinLabel() || this.t().chart.scaleLow,
  );
  protected readonly resolvedScaleMaxLabel = computed(
    () => this.scaleMaxLabel() || this.t().chart.scaleHigh,
  );
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

  protected readonly cols = computed(() =>
    this.columns().length ? this.columns() : unique(this.data().map((d) => d.col)),
  );
  private readonly rowNames = computed(() =>
    this.rows().length ? this.rows() : unique(this.data().map((d) => d.row)),
  );
  private readonly max = computed(() => Math.max(0, ...this.data().map((d) => d.value)));

  /**
   * Cạnh ô: chặn trên bởi `cellSize`, còn lại chia đều chỗ trống sau khi trừ cột nhãn. Chỗ trừ tính
   * theo cỡ chữ GỐC (không phải cỡ đã phóng) để không thành vòng lặp cỡ chữ ↔ cạnh ô.
   */
  private readonly colCount = computed(() => this.cols().length || 1);

  /** Cạnh ô nếu chừa chỗ nhãn theo cỡ chữ GỐC — chỉ dùng để suy ra cỡ chữ, tránh vòng lặp. */
  /**
   * Trần cạnh ô. Lúc phóng to nới trần lên gấp 3: giữ nguyên `cellSize` thì khung to ra mà lưới vẫn
   * bé như cũ, phóng to chẳng để làm gì.
   */
  private readonly maxCell = computed(() => this.cellSize() * (this.zoomed() ? 3 : 1));
  private readonly baseCell = computed(() =>
    fitCell(
      this.w(),
      maxTextWidth(this.rowNames(), LABEL_SIZE) + 12,
      this.colCount(),
      this.maxCell(),
    ),
  );
  // Ô to ra (lúc phóng to) thì chữ cũng phải to theo, không thì nhãn bé tí cạnh các ô đã giãn.
  protected readonly labelSize = computed(() =>
    Math.round(Math.min(22, Math.max(LABEL_SIZE, this.baseCell() * 0.42))),
  );
  protected readonly labelWidth = computed(
    () => maxTextWidth(this.rowNames(), this.labelSize()) + 12,
  );

  /**
   * Cạnh ô CHỐT LẠI theo bề ngang nhãn THẬT. Tính hai bước vì cỡ chữ phụ thuộc cạnh ô, mà cạnh ô lại
   * phụ thuộc chỗ chừa cho chữ — lấy luôn bước ước lượng thì lưới rộng hơn khung, cột cuối bị cắt.
   */
  protected readonly cell = computed(() =>
    fitCell(this.w(), this.labelWidth(), this.colCount(), this.maxCell()),
  );
  protected readonly cellRadius = computed(() => Math.min(6, this.cell() / 4));
  private readonly headerHeight = computed(() => this.labelSize() + 8);

  protected readonly colLabels = computed(() =>
    this.cols().map((name, i) => ({
      name,
      x: this.labelWidth() + i * (this.cell() + GAP) + this.cell() / 2,
    })),
  );

  protected readonly grid = computed(() => {
    const byKey = new Map(this.data().map((d) => [`${d.row} ${d.col}`, d.value]));
    const max = this.max();
    return this.rowNames().map((name, r) => ({
      name,
      y: this.headerHeight() + r * (this.cell() + GAP),
      cells: this.cols().map((col, c) => {
        const value = byKey.get(`${name} ${col}`) ?? 0;
        return {
          col,
          value,
          x: this.labelWidth() + c * (this.cell() + GAP),
          color: heatColor(heatLevel(value, max), this.color()),
        };
      }),
    }));
  });

  private readonly gridRight = computed(
    () => this.labelWidth() + this.cols().length * (this.cell() + GAP) - GAP,
  );
  private readonly gridBottom = computed(
    () => this.headerHeight() + this.rowNames().length * (this.cell() + GAP) - GAP,
  );

  /** Thang màu nằm dưới lưới, căn PHẢI theo mép LƯỚI (không phải mép khung). */
  protected readonly scale = computed(() => {
    const size = this.labelSize();
    const count = HEAT_LEVELS + 1;
    const swatchesWidth = count * (SCALE_SWATCH + 4) - 4;
    const maxX = this.gridRight() - maxTextWidth([this.resolvedScaleMaxLabel()], size);
    const firstSwatchX = maxX - 6 - swatchesWidth;
    const textY = this.gridBottom() + 14 + size * 0.8;
    return {
      textY,
      swatchY: textY - SCALE_SWATCH * 0.85,
      minX: firstSwatchX - 6 - maxTextWidth([this.resolvedScaleMinLabel()], size),
      maxX,
      swatches: Array.from({ length: count }, (_, level) => ({
        level,
        x: firstSwatchX + level * (SCALE_SWATCH + 4),
        color: heatColor(level, this.color()),
      })),
    };
  });

  protected readonly svgHeight = computed(() =>
    Math.round(this.gridBottom() + (this.showScale() ? 24 + this.labelSize() : 4)),
  );
}

function unique(values: readonly string[]): string[] {
  return [...new Set(values)];
}

/** Chia đều chỗ trống còn lại sau khi trừ cột nhãn, chặn trên bởi `maxSize`. */
function fitCell(width: number, labelWidth: number, count: number, maxSize: number): number {
  const available = Math.max(40, width - labelWidth) - GAP * (count - 1);
  return Math.max(8, Math.min(maxSize, available / count));
}
