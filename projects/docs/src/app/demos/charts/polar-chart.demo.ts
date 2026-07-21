import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GChartSlice, GPolarChart } from 'ngx-opendesign';

@Component({
  selector: 'docs-polar-chart-demo',
  imports: [GPolarChart],
  template: `
    <g-polar-chart
      title="Lượng mưa theo mùa (mm)"
      titlePosition="center"
      [data]="data"
      [height]="320"
      [exportable]="true"
      [zoomable]="true"
      ariaLabel="Lượng mưa trung bình theo mùa"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolarChartDemo {
  protected readonly data: GChartSlice[] = [
    { name: 'Xuân', value: 120 },
    { name: 'Hạ', value: 310 },
    { name: 'Thu', value: 240 },
    { name: 'Đông', value: 90 },
  ];
}
