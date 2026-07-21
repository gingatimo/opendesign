import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { HeatmapChartDemo } from '../demos/charts/heatmap-chart.demo';

@Component({
  imports: [HeatmapChartDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Heatmap</h1>
    <p>
      <b>Bản đồ nhiệt</b> dạng ma trận: mỗi ô là giao của một <b>hàng</b> và một <b>cột</b>, đậm dần
      theo giá trị. Hợp cho "giờ trong ngày × thứ trong tuần", "sản phẩm × khu vực"… Rê chuột vào ô
      để xem giá trị.
    </p>

    <docs-demo-section>
      <docs-heatmap-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/heatmap-chart.demo.ts" />

    <h2>Thang màu</h2>
    <p>
      Thang chia <b>4 bậc theo tỉ lệ</b> với giá trị lớn nhất trong dữ liệu (không phải ngưỡng tuyệt
      đối), nên cùng một bộ màu dùng được cho mọi thang số. Bậc 0 là ô trống; các bậc còn lại pha từ
      <code>color</code> bằng <code>color-mix</code> nên chỉ cần <b>một</b> token màu là ra cả thang
      và thang tự đổi theo theme sáng/tối.
    </p>

    <h2>API — GHeatmapChart</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeatmapChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'data',
      type: 'GHeatmapCell[]',
      default: '[]',
      description: 'Các ô { row, col, value }. Ô không có trong mảng coi như giá trị 0.',
    },
    {
      name: 'rows / columns',
      type: 'string[]',
      default: '[] / []',
      description: 'Thứ tự hàng/cột. Bỏ trống thì lấy theo thứ tự xuất hiện trong `data`.',
    },
    {
      name: 'cellSize',
      type: 'number',
      default: '28',
      description: 'Cạnh tối đa của một ô (px). Ô luôn vuông; lưới hẹp hơn thì ô co lại theo.',
    },
    {
      name: 'color',
      type: 'string',
      default: "'var(--g-chart-2)'",
      description: 'Màu đậm nhất của thang; các bậc nhạt hơn được pha từ màu này.',
    },
    {
      name: 'showScale',
      type: 'boolean',
      default: 'true',
      description: 'Hiện dải thang màu ở góc dưới-phải.',
    },
    {
      name: 'scaleMinLabel / scaleMaxLabel',
      type: 'string',
      default: "'Ít' / 'Nhiều'",
      description: 'Nhãn hai đầu thang màu.',
    },
    {
      name: 'title / ariaLabel',
      type: 'string',
      default: "'' / 'Bản đồ nhiệt'",
      description: 'Tiêu đề hiển thị; nhãn a11y cho vùng lưới (role=img).',
    },
    {
      name: 'exportable / filename',
      type: 'boolean / string',
      default: "false / 'heatmap-chart'",
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
      name: 'titlePosition',
      type: "'left' | 'center'",
      default: "'left'",
      description: 'Vị trí tiêu đề trong hàng đầu: sát trái (mặc định) hay giữa khung.',
    },
  ];
}
