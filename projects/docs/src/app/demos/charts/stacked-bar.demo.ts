import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GChartSlice, GStackedBar } from 'ngx-opendesign';

@Component({
  selector: 'docs-stacked-bar-demo',
  imports: [GStackedBar],
  template: `
    <div class="sb-demo">
      <g-stacked-bar
        title="Ngôn ngữ"
        [data]="languages"
        [exportable]="true"
        [zoomable]="true"
        ariaLabel="Tỉ lệ ngôn ngữ trong dự án"
      />
      <g-stacked-bar
        title="Trạng thái đơn (thanh dày, không hiện %)"
        [data]="orders"
        [barHeight]="20"
        [showPercent]="false"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .sb-demo {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-7);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedBarDemo {
  protected readonly languages: GChartSlice[] = [
    { name: 'TypeScript', value: 86.1 },
    { name: 'SCSS', value: 13.5 },
    { name: 'Khác', value: 0.4 },
  ];
  protected readonly orders: GChartSlice[] = [
    { name: 'Hoàn tất', value: 412 },
    { name: 'Đang giao', value: 168 },
    { name: 'Chờ xác nhận', value: 94 },
    { name: 'Huỷ', value: 37 },
  ];
}
