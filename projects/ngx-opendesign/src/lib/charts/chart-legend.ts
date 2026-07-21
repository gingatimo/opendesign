import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface GChartLegendItem {
  name: string;
  color: string;
}

// Chú giải dùng chung cho các chart — hàng swatch màu + tên, CĂN GIỮA mặc định. `direction` ngang
// (row, wrap) hoặc dọc (column) cho legend đặt bên trái/phải. Chỉ hiển thị (không tương tác).
@Component({
  selector: 'g-chart-legend',
  template: `
    <ul class="g-chart-legend" [class.g-chart-legend--vertical]="direction() === 'vertical'">
      @for (item of items(); track item.name) {
        <li class="g-chart-legend__item">
          <span class="g-chart-legend__swatch" [style.background]="item.color"></span>
          <span>{{ item.name }}</span>
        </li>
      }
    </ul>
  `,
  styleUrl: './chart-legend.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GChartLegend {
  readonly items = input<readonly GChartLegendItem[]>([]);
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');
}
