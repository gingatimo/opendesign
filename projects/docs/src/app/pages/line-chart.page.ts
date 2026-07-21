import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { LineChartDemo } from '../demos/charts/line-chart.demo';

@Component({
  imports: [LineChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>Line Chart</h1>
    <p>
      Biểu đồ <b>đường</b> vẽ bằng <b>SVG thuần</b> (0 thư viện ngoài). Nối các mốc bằng đường
      <b>thẳng</b> (<code>curve="straight"</code>) hoặc
      <b>cong trơn</b> (<code>curve="smooth"</code>, spline Catmull-Rom). Trục y tự chọn vạch tròn
      trịa + gridline; responsive theo bề rộng (ResizeObserver). Nhiều <code>series</code> → tự kèm
      chú giải.
    </p>

    <docs-demo-section>
      <docs-line-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/line-chart.demo.ts" />

    <docs-chart-colors />

    <h2>API — GLineChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LineChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'series',
      type: 'GChartSeries[]',
      default: '[]',
      description: 'Các chuỗi { name, values, color? }.',
    },
    {
      name: 'labels',
      type: 'string[]',
      default: '[]',
      description: 'Nhãn trục x (cùng độ dài values).',
    },
    {
      name: 'curve',
      type: "'straight' | 'smooth'",
      default: "'straight'",
      description: 'Nối thẳng hay cong trơn.',
    },
    { name: 'height', type: 'number', default: '280', description: 'Chiều cao (px).' },
    {
      name: 'showGrid / showDots / showLegend',
      type: 'boolean',
      default: 'true',
      description: 'Bật/tắt lưới, điểm, chú giải.',
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
      default: "false / 'line-chart'",
      description: 'Hiện nút export PNG/SVG + tên file khi tải.',
    },
    {
      name: 'zoomable',
      type: 'boolean',
      default: 'false',
      description:
        'Hiện nút phóng to (cạnh nút tải xuống): chart phủ gần kín màn hình, Esc hoặc bấm lại để thu.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Biểu đồ đường'",
      description: 'Nhãn screen reader (role=img).',
    },
  ];
}
