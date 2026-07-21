import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { PieChartDemo } from '../demos/charts/pie-chart.demo';

@Component({
  imports: [PieChartDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Pie Chart</h1>
    <p>
      Biểu đồ <b>tròn</b> (SVG thuần). Mỗi múi là hình quạt tỉ lệ theo giá trị, kèm nhãn % trên múi
      đủ lớn. Nhận <code>data</code> là <code>GChartSlice[]</code>. Chú giải sẵn (căn giữa), đặt
      được 4 phía qua <code>legendPosition</code>; bật <code>exportable</code> để tải PNG/SVG. Bản
      có vành rỗng + tổng giữa là <code>Donut Chart</code>.
    </p>

    <docs-demo-section>
      <docs-pie-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/pie-chart.demo.ts" />

    <h2>API — GPieChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PieChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'data',
      type: 'GChartSlice[]',
      default: '[]',
      description: 'Các múi { name, value, color? }.',
    },
    {
      name: 'height',
      type: 'number',
      default: '280',
      description: 'Chiều cao (px); bán kính theo min(rộng, cao).',
    },
    {
      name: 'showLabels',
      type: 'boolean',
      default: 'true',
      description: 'Hiện % trên múi (chỉ múi ≥ 5%).',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Tiêu đề hiển thị góc trên-trái.',
    },
    {
      name: 'legendPosition',
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
      description: 'Vị trí chú giải quanh chart (căn giữa cùng card).',
    },
    {
      name: 'exportable / filename',
      type: 'boolean / string',
      default: "false / 'pie-chart'",
      description: 'Hiện nút export PNG/SVG + tên file khi tải.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Biểu đồ tròn'",
      description: 'Nhãn screen reader (role=img).',
    },
  ];
}
