import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GChartLegend, GChartSlice, GPieChart } from 'ngx-opendesign';

@Component({
  selector: 'docs-pie-chart-demo',
  imports: [GPieChart, GChartLegend],
  template: `
    <div class="pc-demo">
      <g-pie-chart [data]="data" [height]="260" ariaLabel="Tỉ trọng nguồn truy cập" />
      <g-chart-legend [items]="legend" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .pc-demo {
      max-width: 360px;
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
  // Legend tự dựng từ cùng data + màu palette (pie không tự kèm legend).
  protected readonly legend = this.data.map((d, i) => ({
    name: d.name,
    color: `var(--g-chart-${(i % 8) + 1})`,
  }));
}
