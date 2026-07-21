import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CalendarHeatmapDemo } from '../demos/charts/calendar-heatmap.demo';

@Component({
  imports: [CalendarHeatmapDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Calendar Heatmap</h1>
    <p>
      <b>Lịch nhiệt theo ngày</b> — mỗi cột là một tuần, mỗi hàng là một thứ, ô đậm dần theo giá trị
      (kiểu biểu đồ đóng góp của GitHub). Dùng để thấy <b>nhịp hoạt động</b> theo thời gian: ngày
      nào nhiều, quãng nào nghỉ. Rê chuột vào ô hiện giá trị + ngày.
    </p>

    <docs-demo-section>
      <docs-calendar-heatmap-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/calendar-heatmap.demo.ts" />

    <h2>Ghi chú</h2>
    <ul>
      <li>
        Tuần bắt đầu từ <b>Chủ nhật</b>; ô nằm ngoài khoảng ngày vẫn giữ chỗ (trong suốt) để lưới
        không lệch hàng.
      </li>
      <li>
        Ngày quy về <b>giờ địa phương</b> khi gom nhóm — dùng <code>toISOString</code> sẽ lệch một
        ngày với các múi giờ phía đông.
      </li>
      <li>
        Nhiều bản ghi cùng một ngày thì <b>cộng dồn</b>, nên truyền thẳng danh sách sự kiện cũng
        được.
      </li>
      <li>Một năm là 53 cột: khung hẹp thì <b>cuộn ngang</b> chứ không bóp méo ô.</li>
    </ul>

    <h2>API — GCalendarHeatmap</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalendarHeatmapPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'data',
      type: 'GCalendarHeatmapDay[]',
      default: '[]',
      description: 'Các ngày { date, value }; `date` nhận Date hoặc chuỗi `YYYY-MM-DD`.',
    },
    {
      name: 'from / to',
      type: 'string | Date',
      default: '1 năm gần nhất',
      description: 'Khoảng ngày hiển thị. Bỏ trống thì lấy tròn một năm tính ngược từ hôm nay.',
    },
    {
      name: 'color',
      type: 'string',
      default: "'var(--g-chart-2)'",
      description: 'Màu đậm nhất của thang; các bậc nhạt hơn được pha từ màu này.',
    },
    {
      name: 'unit',
      type: 'string',
      default: "'đóng góp'",
      description: 'Đơn vị trong tooltip: "12 đóng góp vào 03/07/2026".',
    },
    {
      name: 'showScale',
      type: 'boolean',
      default: 'true',
      description: 'Hiện dải thang màu (Ít → Nhiều) ở góc dưới-phải.',
    },
    {
      name: 'title / ariaLabel',
      type: 'string',
      default: "'' / 'Lịch nhiệt theo ngày'",
      description: 'Tiêu đề hiển thị; nhãn a11y cho vùng lưới (role=img).',
    },
  ];
}
