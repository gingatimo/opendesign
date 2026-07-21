import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DonutChartDemo } from '../demos/charts/donut-chart.demo';

@Component({
  imports: [DonutChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>Donut Chart</h1>
    <p>
      Biểu đồ <b>vành khuyên</b> (SVG thuần) — như pie nhưng có lỗ giữa hiện <b>tổng</b>, kèm
      <b>chú giải</b> sẵn và nút <b>export</b> ra PNG/SVG (người dùng bấm để tải, không tự động).
      <code>thickness</code> chỉnh tỉ lệ lỗ. Export tự "nướng" màu đã resolve từ biến CSS nên file
      ra giữ đúng màu.
    </p>

    <docs-demo-section>
      <docs-donut-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/donut-chart.demo.ts" />

    <docs-chart-colors />

    <h2>API — GDonutChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DonutChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'data',
      type: 'GChartSlice[]',
      default: '[]',
      description: 'Các múi { name, value, color? }.',
    },
    {
      name: 'thickness',
      type: 'number',
      default: '0.6',
      description: 'Tỉ lệ bán kính lỗ giữa (0..1).',
    },
    {
      name: 'showTotal / totalLabel',
      type: 'boolean / string',
      default: "true / 'Tổng'",
      description: 'Tổng ở giữa + nhãn dưới nó.',
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
      description: 'Vị trí chú giải (căn giữa cùng card).',
    },
    {
      name: 'showLegend',
      type: 'boolean',
      default: 'true',
      description: 'Hiện chú giải dưới chart.',
    },
    {
      name: 'exportable',
      type: 'boolean',
      default: 'true',
      description: 'Hiện nút export PNG/SVG.',
    },
    {
      name: 'zoomable',
      type: 'boolean',
      default: 'false',
      description:
        'Hiện nút phóng to (cạnh nút tải xuống): chart phủ gần kín màn hình, Esc hoặc bấm lại để thu. Khi đang phóng to, nút tải ẩn đi.',
    },
    {
      name: 'filename',
      type: 'string',
      default: "'donut-chart'",
      description: 'Tên file khi export (không đuôi).',
    },
    { name: 'height', type: 'number', default: '280', description: 'Chiều cao (px).' },
  ];
}
