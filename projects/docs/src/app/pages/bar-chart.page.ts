import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { BarChartDemo } from '../demos/charts/bar-chart.demo';

@Component({
  imports: [BarChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>Bar Chart</h1>
    <p>
      Biểu đồ <b>cột</b> (SVG thuần). Đổi chiều bằng <code>orientation</code>:
      <b>cột đứng</b> (<code>vertical</code>) hoặc <b>cột nằm</b> (<code>horizontal</code>). Nhiều
      <code>series</code> → cột <b>nhóm</b> cạnh nhau; một series → tô màu theo từng mốc. Miền giá
      trị luôn gồm 0.
    </p>

    <docs-demo-section>
      <docs-bar-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/bar-chart.demo.ts" />

    <docs-chart-colors />

    <h2>API — GBarChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BarChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'series',
      type: 'GChartSeries[]',
      default: '[]',
      description: 'Các chuỗi { name, values, color? }.',
    },
    { name: 'labels', type: 'string[]', default: '[]', description: 'Nhãn mốc (danh mục).' },
    {
      name: 'orientation',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description: 'Cột đứng hay nằm.',
    },
    { name: 'height', type: 'number', default: '280', description: 'Chiều cao (px).' },
    {
      name: 'showGrid / showLegend',
      type: 'boolean',
      default: 'true',
      description: 'Bật/tắt lưới, chú giải.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Tiêu đề hiển thị góc trên-trái.',
    },
    {
      name: 'titlePosition',
      type: "'left' | 'center'",
      default: "'left'",
      description: 'Vị trí tiêu đề trong hàng đầu: sát trái (mặc định) hay giữa khung.',
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
      default: "false / 'bar-chart'",
      description: 'Hiện nút export PNG/SVG + tên file khi tải.',
    },
    {
      name: 'zoomable',
      type: 'boolean',
      default: 'false',
      description:
        'Hiện nút phóng to (cạnh nút tải xuống): chart phủ gần kín màn hình, Esc hoặc bấm lại để thu. Khi đang phóng to, nút tải ẩn đi.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Biểu đồ cột'",
      description: 'Nhãn screen reader (role=img).',
    },
  ];
}
