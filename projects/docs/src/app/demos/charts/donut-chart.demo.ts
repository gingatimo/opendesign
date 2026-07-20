import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GChartSlice, GDonutChart } from 'ngx-opendesign';

@Component({
  selector: 'docs-donut-chart-demo',
  imports: [GDonutChart],
  template: `
    <div class="dc-demo">
      <g-donut-chart
        [data]="data"
        [height]="280"
        totalLabel="Đơn"
        filename="don-hang-theo-kenh"
        ariaLabel="Đơn hàng theo kênh"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .dc-demo {
      max-width: 420px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChartDemo {
  protected readonly data: GChartSlice[] = [
    { name: 'Website', value: 1240 },
    { name: 'App', value: 860 },
    { name: 'Đại lý', value: 540 },
    { name: 'Khác', value: 210 },
  ];
}
