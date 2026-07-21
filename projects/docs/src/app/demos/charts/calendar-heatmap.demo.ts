import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GCalendarHeatmap, GCalendarHeatmapDay } from 'ngx-opendesign';

@Component({
  selector: 'docs-calendar-heatmap-demo',
  imports: [GCalendarHeatmap],
  template: `
    <g-calendar-heatmap
      title="Hoạt động một năm qua"
      [data]="data"
      [from]="from"
      [to]="to"
      unit="lần commit"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeatmapDemo {
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
