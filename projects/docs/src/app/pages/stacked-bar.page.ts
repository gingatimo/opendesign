import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { StackedBarDemo } from '../demos/charts/stacked-bar.demo';

@Component({
  imports: [StackedBarDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>Stacked Bar</h1>
    <p>
      <b>Thanh tỉ lệ một dòng</b> (SVG thuần) — cả tập dữ liệu nằm trên một thanh ngang, mỗi phần
      rộng theo tỉ lệ, chú giải kèm <b>phần trăm</b> bên dưới (kiểu thanh "Languages" của GitHub).
      Chọn nó thay cho pie/donut khi chỉ cần thấy <b>cơ cấu của một tổng thể</b> mà không muốn tốn
      chỗ. Rê chuột vào từng đoạn hiện tên + giá trị + %.
    </p>

    <docs-demo-section>
      <docs-stacked-bar-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/stacked-bar.demo.ts" />

    <docs-chart-colors />

    <h2>API — GStackedBar</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackedBarPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'data',
      type: 'GChartSlice[]',
      default: '[]',
      description: 'Các phần { name, value, color? }. Bề rộng mỗi đoạn tính theo tỉ lệ với tổng.',
    },
    {
      name: 'barHeight',
      type: 'number',
      default: '12',
      description: 'Độ dày thanh (px). Hai đầu thanh luôn bo tròn theo độ dày.',
    },
    {
      name: 'showLegend / showPercent',
      type: 'boolean',
      default: 'true / true',
      description: 'Hiện chú giải; hiện phần trăm ngay sau tên trong chú giải.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Tiêu đề ở góc trên-trái.',
    },
    {
      name: 'exportable / filename',
      type: 'boolean / string',
      default: "false / 'stacked-bar'",
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
      default: "'Thanh tỉ lệ'",
      description: 'Nhãn a11y cho vùng SVG (role=img).',
    },
  ];
}
