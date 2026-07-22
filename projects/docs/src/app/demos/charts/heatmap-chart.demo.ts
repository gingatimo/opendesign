import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GHeatmapCell, GHeatmapChart, GLocaleService } from 'ngx-opendesign';

const HOURS = ['0h', '3h', '6h', '9h', '12h', '15h', '18h', '21h'];
const SUNDAY_UTC = Date.UTC(2024, 0, 7);
const DAY_MS = 86_400_000;

function mondayFirstWeekdays(tag: string): string[] {
  const fmt = new Intl.DateTimeFormat(tag, { weekday: 'short', timeZone: 'UTC' });
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(SUNDAY_UTC + ((i + 1) % 7) * DAY_MS)),
  );
}

@Component({
  selector: 'docs-heatmap-chart-demo',
  imports: [GHeatmapChart],
  template: `
    <g-heatmap-chart
      [exportable]="true"
      [zoomable]="true"
      title="Lượt truy cập theo giờ"
      [data]="data()"
      [rows]="days()"
      [columns]="hours"
      scaleMinLabel="Vắng"
      scaleMaxLabel="Đông"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapChartDemo {
  private readonly i18n = inject(GLocaleService);

  protected readonly hours = HOURS;
  protected readonly days = computed(() => mondayFirstWeekdays(this.i18n.tag()));
  // Dựng sẵn một mẫu "giờ hành chính đông, cuối tuần thưa" cho dễ nhìn.
  protected readonly data = computed<GHeatmapCell[]>(() =>
    this.days().flatMap((row, r) =>
      HOURS.map((col, c) => {
        const officeHours = c >= 3 && c <= 6 ? 3 : 1;
        const weekend = r >= 5 ? 0.4 : 1;
        return {
          row,
          col,
          value: Math.round(((c * 7 + r * 3) % 5) + officeHours * 4 * weekend),
        };
      }),
    ),
  );
}
