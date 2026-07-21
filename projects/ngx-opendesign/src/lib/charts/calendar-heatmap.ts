import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HEAT_LEVELS, heatColor, heatLevel } from './chart-utils';

/** Một ngày có dữ liệu. `date` nhận `Date` hoặc chuỗi `YYYY-MM-DD`. */
export interface GCalendarHeatmapDay {
  date: string | Date;
  value: number;
}

const DAY_MS = 86_400_000;
const MONTHS = [
  'Th1',
  'Th2',
  'Th3',
  'Th4',
  'Th5',
  'Th6',
  'Th7',
  'Th8',
  'Th9',
  'Th10',
  'Th11',
  'Th12',
];
const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

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

/**
 * Chia khoảng [from, to] thành các TUẦN (cột), mỗi tuần 7 ô theo thứ (hàng). Tuần bắt đầu từ Chủ
 * nhật như lịch đóng góp của GitHub; các ô trước `from`/sau `to` để `null` cho lưới không bị lệch.
 */
export function calendarWeeks(from: Date, to: Date): (Date | null)[][] {
  const start = startOfDay(from);
  start.setDate(start.getDate() - start.getDay()); // lùi về Chủ nhật của tuần đầu
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
// ô đậm dần theo giá trị. Vẽ bằng lưới CSS thay vì SVG — ô chỉ là hình vuông bo góc nên grid vừa gọn
// vừa tự lo căn nhãn tháng/thứ.
@Component({
  selector: 'g-calendar-heatmap',
  template: `
    <div class="g-chart-frame">
      @if (title()) {
        <div class="g-chart-frame__head" [class.g-chart-frame__head--center]="titleCentered()">
          <div class="g-chart-frame__title">{{ title() }}</div>
        </div>
      }
      <div class="g-calendar" role="img" [attr.aria-label]="ariaLabel()">
        <div class="g-calendar__weekdays">
          <!-- Chỉ ghi T2/T4/T6 như lịch đóng góp quen thuộc: ghi đủ 7 thứ thì chữ chen nhau. -->
          @for (label of weekdayLabels; track $index) {
            <span class="g-calendar__weekday">{{ label }}</span>
          }
        </div>
        <div class="g-calendar__grid-wrap">
          <div class="g-calendar__months">
            @for (m of monthLabels(); track m.index) {
              <span class="g-calendar__month" [style.grid-column-start]="m.column + 1">
                {{ m.label }}
              </span>
            }
          </div>
          <div class="g-calendar__grid">
            @for (week of weeks(); track $index) {
              <div class="g-calendar__week">
                @for (day of week; track $index) {
                  @if (day) {
                    <span
                      class="g-calendar__day"
                      [style.background]="colorFor(day)"
                      [attr.title]="tooltipFor(day)"
                    ></span>
                  } @else {
                    <span class="g-calendar__day g-calendar__day--empty"></span>
                  }
                }
              </div>
            }
          </div>
        </div>
      </div>
      @if (showScale()) {
        <div class="g-calendar__scale">
          <span>{{ scaleMinLabel() }}</span>
          @for (level of levels; track level) {
            <span class="g-calendar__swatch" [style.background]="colorOfLevel(level)"></span>
          }
          <span>{{ scaleMaxLabel() }}</span>
        </div>
      }
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
  readonly color = input('var(--g-chart-2)');
  readonly showScale = input(true);
  readonly scaleMinLabel = input('Ít');
  readonly scaleMaxLabel = input('Nhiều');
  /** Đơn vị trong tooltip: "12 đóng góp vào 03/07/2026". */
  readonly unit = input('đóng góp');
  readonly title = input('');
  /** Vị trí tiêu đề trong hàng đầu: sát trái (mặc định) hay giữa khung. */
  readonly titlePosition = input<'left' | 'center'>('left');
  readonly ariaLabel = input('Lịch nhiệt theo ngày');

  protected readonly titleCentered = computed(() => this.titlePosition() === 'center');

  protected readonly levels = Array.from({ length: HEAT_LEVELS + 1 }, (_, i) => i);
  protected readonly weekdayLabels = WEEKDAYS.map((d, i) => (i % 2 === 1 ? d : ''));

  private readonly range = computed(() => {
    const to = this.to() ? startOfDay(this.to()!) : startOfDay(new Date());
    const from = this.from()
      ? startOfDay(this.from()!)
      : startOfDay(new Date(to.getTime() - 364 * DAY_MS));
    return { from, to };
  });

  protected readonly weeks = computed(() => {
    const { from, to } = this.range();
    return calendarWeeks(from, to);
  });

  private readonly byDay = computed(() => {
    const map = new Map<string, number>();
    for (const d of this.data()) map.set(dayKey(d.date), (map.get(dayKey(d.date)) ?? 0) + d.value);
    return map;
  });
  private readonly max = computed(() => Math.max(0, ...this.byDay().values()));

  /** Nhãn tháng đặt tại cột của tuần ĐẦU TIÊN thuộc tháng đó. */
  protected readonly monthLabels = computed(() => {
    const labels: { index: number; column: number; label: string }[] = [];
    let previous = -1;
    this.weeks().forEach((week, column) => {
      const first = week.find((d): d is Date => d !== null);
      if (!first) return;
      const month = first.getMonth();
      if (month !== previous) {
        labels.push({ index: labels.length, column, label: MONTHS[month] });
        previous = month;
      }
    });
    return labels;
  });

  protected colorFor(day: Date): string {
    return heatColor(heatLevel(this.byDay().get(dayKey(day)) ?? 0, this.max()), this.color());
  }

  protected colorOfLevel(level: number): string {
    return heatColor(level, this.color());
  }

  protected tooltipFor(day: Date): string {
    const value = this.byDay().get(dayKey(day)) ?? 0;
    return `${value} ${this.unit()} vào ${day.toLocaleDateString('vi-VN')}`;
  }
}
