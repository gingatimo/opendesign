import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { HoneycombChartDemo } from '../demos/charts/honeycomb-chart.demo';

@Component({
  imports: [HoneycombChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>Honeycomb Chart</h1>
    <p>
      Biểu đồ <b>tổ ong</b> (honeycomb/hexagon, SVG thuần): mỗi hạng mục là một ô <b>lục giác</b>,
      xếp so le như tổ ong. Đọc nhanh "cái nào nổi bật" trong một tập
      <b>nhiều hạng mục cùng loại</b>
      — công nghệ trong dự án, kho hàng theo khu vực, thành viên theo số việc. Lục giác xếp khít hơn
      hình vuông nên tận dụng chỗ tốt hơn khi có nhiều ô, và mắt không bị các hàng/cột thẳng băng
      dẫn dắt sai.
    </p>

    <docs-demo-section>
      <docs-honeycomb-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/honeycomb-chart.demo.ts" />

    <h2>Hai cách tô màu</h2>
    <ul>
      <li>
        <code>colorMode="heat"</code> (mặc định) — đậm dần theo <b>độ lớn giá trị</b>, thang 4 bậc
        tính theo tỉ lệ với giá trị lớn nhất. Dùng khi các số <b>so sánh được với nhau</b>.
      </li>
      <li>
        <code>colorMode="category"</code> — mỗi ô một màu trong bảng phân loại. Dùng khi các hạng
        mục <b>rời rạc</b> (ngôn ngữ, phòng ban) và màu chỉ để phân biệt chứ không mang thứ bậc.
      </li>
    </ul>

    <docs-chart-colors />

    <h2>API — GHoneycombChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HoneycombChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'data',
      type: 'GChartSlice[]',
      default: '[]',
      description: 'Các hạng mục { name, value, color? }; mỗi hạng mục là một ô lục giác.',
    },
    {
      name: 'columns',
      type: 'number',
      default: '0',
      description: 'Số ô mỗi hàng. Bỏ trống (0) thì tự chia cho lưới gần vuông nhất.',
    },
    {
      name: 'colorMode / color',
      type: "'heat' | 'category' / string",
      default: "'heat' / 'var(--g-chart-2)'",
      description:
        'Tô theo độ lớn giá trị hay theo bảng màu phân loại; `color` là màu gốc của thang nhiệt.',
    },
    {
      name: 'showLabels / showValues',
      type: 'boolean',
      default: 'true / true',
      description: 'Ghi tên và giá trị trong ô. Ô nhỏ hơn 26px thì tự ẩn chữ cho khỏi chen.',
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
      default: "false / 'honeycomb-chart'",
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
      default: "'Biểu đồ tổ ong'",
      description: 'Nhãn a11y cho vùng SVG (role=img).',
    },
  ];
}
