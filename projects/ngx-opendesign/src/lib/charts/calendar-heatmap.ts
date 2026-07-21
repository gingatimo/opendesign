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
import { weekdayNames } from '../core/locale-format';

/** Một ngày có dữ liệu. `date` nhận `Date` hoặc chuỗi `YYYY-MM-DD`. */
export interface GCalendarHeatmapDay {
  date: string | Date;
  value: number;
}

const DAY_MS = 86_400_000;
const GAP = 3;
const LABEL_SIZE = 12;

/** Chuẩn hoá về nửa đêm giờ địa phương — so sánh ngày thì giờ/phút chỉ gây lệch. */
function startOfDay(value: string | Date): Date {
  const d = typeof value === 'string' ? new Date(`${value}T00:00:00`) : new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Khoá ngày dạng YYYY-MM-DD theo giờ ĐỊA PHƯƠNG (toISOString sẽ lệch ngày do quy về UTC). */
export function dayKey(value: string | Date): string {
  const d = startOfDay(value);
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Ngày mở đầu một tuần trong lưới. */
export type GWeekStart = 'sunday' | 'monday';

/**
 * Chia khoảng [from, to] thành các TUẦN (cột), mỗi tuần 7 ô theo thứ (hàng). `weekStart` quyết định
 * hàng đầu là Chủ nhật hay Thứ hai; các ô trước `from`/sau `to` để `null` cho lưới không bị lệch.
 */
export function calendarWeeks(
  from: Date,
  to: Date,
  weekStart: GWeekStart = 'sunday',
): (Date | null)[][] {
  const offset = weekStart === 'monday' ? 1 : 0;
  const start = startOfDay(from);
  // Lùi về ngày mở đầu tuần: getDay() trả 0 = CN, nên bắt đầu từ T2 thì phải xoay vòng thêm.
  start.setDate(start.getDate() - ((start.getDay() - offset + 7) % 7));
  const end = startOfDay(to);
  const weeks: (Date | null)[][] = [];
  for (let cursor = start; cursor <= end;) {
    const week: (Date | null)[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(cursor.getTime() + i * DAY_MS);
      week.push(day >= startOfDay(from) && day <= end ? day : null);
    }
    weeks.push(week);
    cursor = new Date(cursor.getTime() + 7 * DAY_MS);
  }
  return weeks;
}

// Lịch NHIỆT theo ngày (kiểu biểu đồ đóng góp của GitHub): mỗi cột là một tuần, mỗi hàng là một thứ,
// ô đậm dần theo giá trị.
//
// Vẽ bằng SVG (không phải lưới CSS) để dùng chung được đường XUẤT ẢNH và chế độ PHÓNG TO với các
// chart khác — đổi lại phải tự đo bề ngang nhãn thứ để chừa chỗ, việc mà CSS grid vốn lo hộ.
@Component({
  selector: 'g-calendar-heatmap',
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
          class="g-calendar__svg g-chart-frame__svg"
          [attr.viewBox]="'0 0 ' + w() + ' ' + svgHeight()"
          width="100%"
          [attr.height]="svgHeight()"
          role="img"
          [attr.aria-label]="resolvedAriaLabel()"
        >
          @for (m of monthLabels(); track m.index) {
            <text
              class="g-calendar__month"
              [attr.x]="m.x"
              [attr.y]="labelSize()"
              [attr.font-size]="labelSize()"
            >
              {{ m.label }}
            </text>
          }
          @for (d of weekdayRows(); track d.index) {
            @if (d.label) {
              <text
                class="g-calendar__weekday"
                [attr.x]="labelWidth() - 6"
                [attr.y]="d.y + cell() / 2"
                [attr.font-size]="labelSize()"
              >
                {{ d.label }}
              </text>
            }
          }
          @for (week of weeks(); track $index; let wi = $index) {
            @for (day of week; track $index; let di = $index) {
              @if (day) {
                <rect
                  class="g-calendar__day"
                  [attr.x]="labelWidth() + wi * (cell() + gap)"
                  [attr.y]="headerHeight() + di * (cell() + gap)"
                  [attr.width]="cell()"
                  [attr.height]="cell()"
                  [attr.rx]="cellRadius()"
                  [style.fill]="colorFor(day)"
                >
                  <title>{{ tooltipFor(day) }}</title>
                </rect>
              }
            }
          }

          @if (showScale()) {
            <text
              class="g-calendar__scale-label"
              [attr.x]="scale().minX"
              [attr.y]="scale().textY"
              [attr.font-size]="labelSize()"
            >
              {{ resolvedScaleMinLabel() }}
            </text>
            @for (s of scale().swatches; track s.level) {
              <rect
                class="g-calendar__swatch"
                [attr.x]="s.x"
                [attr.y]="scale().swatchY"
                [attr.width]="cell()"
                [attr.height]="cell()"
                [attr.rx]="cellRadius()"
                [style.fill]="s.color"
              />
            }
            <text
              class="g-calendar__scale-label"
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
  styleUrl: './calendar-heatmap.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-calendar-heatmap', '[attr.title]': 'null' },
})
export class GCalendarHeatmap {
  readonly data = input<readonly GCalendarHeatmapDay[]>([]);
  /** Ngày đầu/cuối. Bỏ trống thì lấy tròn một năm tính ngược từ hôm nay. */
  readonly from = input<string | Date | undefined>();
  readonly to = input<string | Date | undefined>();
  /** Hàng đầu của lưới là Chủ nhật hay Thứ hai. */
  readonly weekStart = input<GWeekStart>('sunday');
  readonly color = input('var(--g-chart-2)');
  readonly showScale = input(true);
  readonly scaleMinLabel = input('');
  readonly scaleMaxLabel = input('');
  /** Đơn vị trong tooltip: "12 đóng góp vào 03/07/2026". */
  readonly unit = input('');
  readonly title = input('');
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('');
  readonly exportable = input(false);
  /** Cho phép phóng to chart ra gần kín màn hình — nút nằm cạnh nút tải xuống. */
  readonly zoomable = input(false);
  readonly filename = input('calendar-heatmap');

  protected readonly gap = GAP;
  protected readonly w = signal(760);
  protected readonly zoomed = signal(false);
  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');

  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;
  // Input có giá trị thì thắng; rỗng thì lấy từ gói ngôn ngữ. Giữ API cũ, không có hai nguồn sự thật.
  protected readonly resolvedAriaLabel = computed(
    () => this.ariaLabel() || this.t().chart.aria.calendarHeatmap,
  );
  protected readonly resolvedScaleMinLabel = computed(
    () => this.scaleMinLabel() || this.t().chart.scaleLow,
  );
  protected readonly resolvedScaleMaxLabel = computed(
    () => this.scaleMaxLabel() || this.t().chart.scaleHigh,
  );
  protected readonly resolvedUnit = computed(() => this.unit() || this.t().chart.contributionUnit);
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

  private readonly range = computed(() => {
    const to = this.to() ? startOfDay(this.to()!) : startOfDay(new Date());
    const from = this.from()
      ? startOfDay(this.from()!)
      : startOfDay(new Date(to.getTime() - 364 * DAY_MS));
    return { from, to };
  });

  protected readonly weeks = computed(() => {
    const { from, to } = this.range();
    return calendarWeeks(from, to, this.weekStart());
  });

  private readonly byDay = computed(() => {
    const map = new Map<string, number>();
    for (const d of this.data()) map.set(dayKey(d.date), (map.get(dayKey(d.date)) ?? 0) + d.value);
    return map;
  });
  private readonly max = computed(() => Math.max(0, ...this.byDay().values()));

  // `weekdayNames` đã tự trả đúng thứ tự bắt đầu từ `firstDayOfWeek` truyền vào, nên không cần tự
  // xoay vòng mảng như bản cũ nữa. Tham số thứ hai lấy từ `weekStart` của CHÍNH component (lựa chọn
  // tường minh của consumer), không phải `firstDayOfWeek` của locale.
  private readonly weekdayLabels = computed(() =>
    weekdayNames(this.i18n.tag(), this.weekStart() === 'monday' ? 1 : 0),
  );

  /**
   * Cạnh ô suy từ bề ngang: một năm là ~53 cột nên ô phải co lại cho vừa, và phóng to thì ô tự to
   * lên theo — đó là lý do không để cạnh ô cố định 12px như bản dựng bằng CSS grid.
   */
  private readonly weekCount = computed(() => this.weeks().length || 1);

  /** Cạnh ô nếu chừa chỗ nhãn theo cỡ chữ GỐC — chỉ dùng để suy ra cỡ chữ, tránh vòng lặp. */
  private readonly baseCell = computed(() =>
    fitCell(this.w(), maxTextWidth(this.weekdayLabels(), LABEL_SIZE) + 8, this.weekCount()),
  );
  protected readonly labelSize = computed(() =>
    Math.round(Math.min(20, Math.max(LABEL_SIZE, this.baseCell() * 0.95))),
  );
  protected readonly labelWidth = computed(
    () => maxTextWidth(this.weekdayLabels(), this.labelSize()) + 8,
  );

  /**
   * Cạnh ô CHỐT LẠI theo bề ngang nhãn THẬT. Tính hai bước như vậy vì cỡ chữ phụ thuộc cạnh ô, mà
   * cạnh ô lại phụ thuộc chỗ chừa cho chữ — lấy luôn bước ước lượng thì lưới rộng hơn khung và cột
   * cuối bị cắt (đúng lỗi đã thấy lúc phóng to).
   */
  protected readonly cell = computed(() => fitCell(this.w(), this.labelWidth(), this.weekCount()));
  protected readonly cellRadius = computed(() => Math.min(4, this.cell() / 3));
  protected readonly headerHeight = computed(() => this.labelSize() + 8);

  /** Nhãn thứ: chỉ ghi cách quãng (T2/T4/T6) như lịch đóng góp quen thuộc, ghi đủ 7 thì chữ chen nhau. */
  protected readonly weekdayRows = computed(() => {
    const labelled = this.weekStart() === 'monday' ? 0 : 1;
    return this.weekdayLabels().map((label, index) => ({
      index,
      label: index % 2 === labelled ? label : '',
      y: this.headerHeight() + index * (this.cell() + GAP),
    }));
  });

  /** Nhãn tháng đặt tại cột của tuần ĐẦU TIÊN thuộc tháng đó. */
  protected readonly monthLabels = computed(() => {
    const months = this.i18n.monthNames();
    const labels: { index: number; x: number; label: string }[] = [];
    let previous = -1;
    this.weeks().forEach((week, column) => {
      const first = week.find((d): d is Date => d !== null);
      if (!first) return;
      const month = first.getMonth();
      if (month !== previous) {
        labels.push({
          index: labels.length,
          x: this.labelWidth() + column * (this.cell() + GAP),
          label: months[month],
        });
        previous = month;
      }
    });
    return labels;
  });

  private readonly gridRight = computed(
    () => this.labelWidth() + this.weeks().length * (this.cell() + GAP) - GAP,
  );
  private readonly gridBottom = computed(() => this.headerHeight() + 7 * (this.cell() + GAP) - GAP);

  /** Thang màu nằm dưới lưới, căn PHẢI theo mép LƯỚI (không phải mép khung). */
  protected readonly scale = computed(() => {
    const size = this.labelSize();
    const count = HEAT_LEVELS + 1;
    const swatchesWidth = count * (this.cell() + GAP) - GAP;
    const maxX = this.gridRight() - maxTextWidth([this.resolvedScaleMaxLabel()], size);
    const firstSwatchX = maxX - 6 - swatchesWidth;
    const textY = this.gridBottom() + 14 + size * 0.8;
    return {
      textY,
      swatchY: textY - this.cell() * 0.85,
      minX: firstSwatchX - 6 - maxTextWidth([this.resolvedScaleMinLabel()], size),
      maxX,
      swatches: Array.from({ length: count }, (_, level) => ({
        level,
        x: firstSwatchX + level * (this.cell() + GAP),
        color: heatColor(level, this.color()),
      })),
    };
  });

  protected readonly svgHeight = computed(() =>
    Math.round(this.gridBottom() + (this.showScale() ? 22 + this.labelSize() : 4)),
  );

  protected colorFor(day: Date): string {
    return heatColor(heatLevel(this.byDay().get(dayKey(day)) ?? 0, this.max()), this.color());
  }

  protected tooltipFor(day: Date): string {
    const value = this.byDay().get(dayKey(day)) ?? 0;
    return `${value} ${this.resolvedUnit()} vào ${this.i18n.formatDate(day)}`;
  }
}

/** Chia đều chỗ trống còn lại sau khi trừ cột nhãn; chặn dưới 6px, chặn trên 28px. */
function fitCell(width: number, labelWidth: number, count: number): number {
  const available = Math.max(60, width - labelWidth) - GAP * (count - 1);
  return Math.max(6, Math.min(28, available / count));
}
