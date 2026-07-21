import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GHeatmapCell, GHeatmapChart } from 'ngx-opendesign';

const HOURS = ['0h', '3h', '6h', '9h', '12h', '15h', '18h', '21h'];
const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

@Component({
  selector: 'docs-heatmap-chart-demo',
  imports: [GHeatmapChart],
  template: `
    <g-heatmap-chart
      title="Lượt truy cập theo giờ"
      [data]="data"
      [rows]="days"
      [columns]="hours"
      scaleMinLabel="Vắng"
      scaleMaxLabel="Đông"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapChartDemo {
  protected readonly hours = HOURS;
  protected readonly days = DAYS;
  // Dựng sẵn một mẫu "giờ hành chính đông, cuối tuần thưa" cho dễ nhìn.
  protected readonly data: GHeatmapCell[] = DAYS.flatMap((row, r) =>
    HOURS.map((col, c) => {
      const officeHours = c >= 3 && c <= 6 ? 3 : 1;
      const weekend = r >= 5 ? 0.4 : 1;
      return { row, col, value: Math.round(((c * 7 + r * 3) % 5) + officeHours * 4 * weekend) };
    }),
  );
}
