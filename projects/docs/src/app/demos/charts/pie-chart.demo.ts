import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GChartSlice, GPieChart } from 'ngx-opendesign';

@Component({
  selector: 'docs-pie-chart-demo',
  imports: [GPieChart],
  template: `
    <div class="pc-demo">
      <g-pie-chart
        title="Nguồn truy cập"
        [data]="data"
        [height]="260"
        legendPosition="right"
        [exportable]="true"
        [zoomable]="true"
        filename="nguon-truy-cap"
        ariaLabel="Tỉ trọng nguồn truy cập"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .pc-demo {
      max-width: 440px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartDemo {
  protected readonly data: GChartSlice[] = [
    { name: 'Trực tiếp', value: 38 },
    { name: 'Tìm kiếm', value: 27 },
    { name: 'Mạng xã hội', value: 21 },
    { name: 'Giới thiệu', value: 14 },
  ];
}
