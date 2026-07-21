import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { RadarChartDemo } from '../demos/charts/radar-chart.demo';

@Component({
  imports: [RadarChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>Radar Chart</h1>
    <p>
      Biểu đồ <b>radar</b> (spider/web, SVG thuần): mỗi trục toả từ tâm là một <b>tiêu chí</b>, mỗi
      chuỗi nối các điểm thành một <b>đa giác</b>. Đọc được hình dáng tổng thể — mạnh/yếu ở tiêu chí
      nào — và so sánh vài chuỗi chồng lên nhau. Lưới nền chọn <b>vòng tròn</b> hoặc
      <b>đa giác</b> qua <code>shape</code>; rê chuột vào điểm để xem giá trị.
    </p>

    <docs-demo-section>
      <docs-radar-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/radar-chart.demo.ts" />

    <h2>Khi nào KHÔNG nên dùng</h2>
    <ul>
      <li>
        <b>Các trục khác thang đo.</b> Mọi trục dùng chung một thang giá trị, nên trộn "doanh thu
        (triệu)" với "đánh giá (1–5)" là hình vẽ ra vô nghĩa — tách thành nhiều chart hoặc chuẩn hoá
        về cùng thang trước.
      </li>
      <li>
        <b>Quá 3 chuỗi.</b> Các đa giác che nhau, mắt hết đọc được. Nhiều chuỗi thì dùng bar chart
        nhóm sẽ rõ hơn.
      </li>
      <li><b>Ít hơn 3 trục.</b> Dưới 3 tiêu chí thì không thành hình đa giác — dùng bar chart.</li>
    </ul>

    <docs-chart-colors />

    <h2>API — GRadarChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadarChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'labels',
      type: 'string[]',
      default: '[]',
      description: 'Tên các trục toả từ tâm. `values` của mỗi chuỗi phải cùng độ dài với mảng này.',
    },
    {
      name: 'series',
      type: 'GChartSeries[]',
      default: '[]',
      description: 'Các chuỗi { name, values, color? }. Mỗi chuỗi là một đa giác.',
    },
    {
      name: 'shape',
      type: "'circle' | 'polygon'",
      default: "'circle'",
      description: 'Lưới nền là vòng tròn hay đa giác nối các trục.',
    },
    {
      name: 'height',
      type: 'number',
      default: '320',
      description: 'Chiều cao vùng vẽ (px).',
    },
    {
      name: 'showLegend / legendPosition',
      type: "boolean / 'top' | 'right' | 'bottom' | 'left'",
      default: "true / 'bottom'",
      description: 'Hiện chú giải và vị trí của nó quanh chart.',
    },
    {
      name: 'title / titlePosition',
      type: "string / 'left' | 'center'",
      default: "'' / 'left'",
      description: 'Tiêu đề và vị trí của nó trong hàng đầu khung.',
    },
    {
      name: 'exportable / filename',
      type: 'boolean / string',
      default: "false / 'radar-chart'",
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
      default: "'Biểu đồ radar'",
      description: 'Nhãn a11y cho vùng SVG (role=img).',
    },
  ];
}
