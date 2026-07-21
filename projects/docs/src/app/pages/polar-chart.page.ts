import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { PolarChartDemo } from '../demos/charts/polar-chart.demo';

@Component({
  imports: [PolarChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>Polar Chart</h1>
    <p>
      Biểu đồ <b>cực</b> (polar area, SVG thuần): mỗi hạng mục chiếm <b>góc bằng nhau</b>, còn
      <b>bán kính</b> mới thay đổi theo giá trị — ngược với pie (góc thay đổi, bán kính bằng nhau).
      Hợp khi so sánh độ lớn của các hạng mục <b>cùng loại</b> và có thứ tự vòng quanh: mùa trong
      năm, hướng gió, giờ trong ngày. Kèm vòng lưới có nhãn số để đối chiếu giá trị.
    </p>

    <docs-demo-section>
      <docs-polar-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/polar-chart.demo.ts" />

    <h2>Vì sao bán kính tỉ lệ tuyến tính?</h2>
    <p>
      Bán kính tăng <b>tuyến tính</b> theo giá trị để khớp với các vòng lưới có nhãn số. Lấy căn bậc
      hai sẽ cho <b>diện tích</b> đúng tỉ lệ (chính xác hơn về mặt thị giác), nhưng khi đó múi không
      còn chạm đúng vòng lưới nữa nên rất khó đối chiếu — mà đối chiếu mới là việc chính của dạng
      biểu đồ này.
    </p>

    <docs-chart-colors />

    <h2>API — GPolarChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PolarChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'data',
      type: 'GChartSlice[]',
      default: '[]',
      description: 'Các hạng mục { name, value, color? }. Mỗi hạng mục chiếm một góc bằng nhau.',
    },
    {
      name: 'height',
      type: 'number',
      default: '300',
      description: 'Chiều cao vùng vẽ (px).',
    },
    {
      name: 'showLabels / showLegend',
      type: 'boolean',
      default: 'true / true',
      description: 'Ghi tên quanh vành ngoài; hiện chú giải.',
    },
    {
      name: 'legendPosition',
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
      description: 'Vị trí chú giải quanh chart.',
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
      default: "false / 'polar-chart'",
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
      default: "'Biểu đồ cực'",
      description: 'Nhãn a11y cho vùng SVG (role=img).',
    },
  ];
}
