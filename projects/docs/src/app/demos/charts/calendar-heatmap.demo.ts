import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GButton, GCalendarHeatmap, GCalendarHeatmapDay, GWeekStart } from 'ngx-opendesign';

@Component({
  selector: 'docs-calendar-heatmap-demo',
  imports: [GCalendarHeatmap, GButton],
  template: `
    <g-calendar-heatmap
      title="Hoạt động một năm qua"
      [data]="data"
      [from]="from"
      [to]="to"
      unit="lần commit"
      [weekStart]="weekStart()"
    />
    <div class="ch-demo__opts">
      <span>Tuần bắt đầu từ:</span>
      <button
        g-button
        size="sm"
        [variant]="weekStart() === 'sunday' ? 'primary' : 'outline'"
        (click)="weekStart.set('sunday')"
      >
        Chủ nhật
      </button>
      <button
        g-button
        size="sm"
        [variant]="weekStart() === 'monday' ? 'primary' : 'outline'"
        (click)="weekStart.set('monday')"
      >
        Thứ hai
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .ch-demo__opts {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
      margin-top: var(--g-space-4);
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeatmapDemo {
  protected readonly weekStart = signal<GWeekStart>('sunday');
  protected readonly to = new Date(2026, 6, 21);
  protected readonly from = new Date(2025, 6, 22);
  // Dữ liệu mẫu: thưa dần về quá khứ, nghỉ cuối tuần — đủ để thấy các bậc màu.
  protected readonly data: GCalendarHeatmapDay[] = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(this.from.getTime() + i * 86_400_000);
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    const recent = i / 365;
    const base = Math.round(((i * 7919) % 11) * recent);
    return { date, value: weekend ? Math.max(0, base - 6) : base };
  });
}
