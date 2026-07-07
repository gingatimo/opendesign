import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TooltipBasicDemo } from '../demos/tooltip/tooltip-basic.demo';

@Component({
  imports: [TooltipBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Tooltip</h1>
    <p>
      Directive <code>[gTooltip]</code> gắn một chú thích ngắn lên phần tử trigger, dựng trên
      <code>@angular/cdk/overlay</code>.
    </p>

    <docs-demo-section>
      <docs-tooltip-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/tooltip/tooltip-basic.demo.ts" />

    <h2>API — GTooltip</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>Panel tooltip có <code>role="tooltip"</code>.</li>
      <li>
        Khi hiện, trigger có <code>aria-describedby</code> trỏ đúng tới id của panel; thuộc tính này
        được gỡ khi tooltip ẩn.
      </li>
      <li>
        Mở được bằng cả hover lẫn focus, nên người dùng chỉ thao tác bàn phím vẫn thấy được tooltip.
      </li>
      <li>
        Đáp ứng cả ba nhánh của WCAG 1.4.13 Content on Hover or Focus:
        <ul>
          <li>
            <strong>Dismissible</strong> — phím Esc luôn đóng được tooltip bất kể trigger có đang
            giữ focus hay không, vì CDK lắng nghe keydown ở cấp overlay chứ không chỉ ở trigger.
          </li>
          <li>
            <strong>Hoverable</strong> — con trỏ di chuyển từ trigger vào tooltip (cách nhau 8px)
            không làm tooltip biến mất. Cơ chế gồm hai phần: (1) <code>mouseleave</code> trên
            trigger được bỏ qua nếu <code>relatedTarget</code> nằm trong panel tooltip (và ngược lại
            panel có listener riêng để tự ẩn khi con trỏ thực sự rời khỏi nó); (2) một "hover
            bridge" — <code>::before</code> vô hình phủ đều khoảng trống 8px quanh panel — để con
            trỏ luôn hit-test vào panel ngay cả khi đi ngang qua đúng khoảng trống đó (nếu không,
            <code>.cdk-overlay-container</code> là <code>pointer-events: none</code> nên con trỏ
            xuyên thẳng xuống trang bên dưới ở giữa khoảng trống, khiến
            <code>relatedTarget</code> của <code>mouseleave</code> không nằm trong panel).
            <strong>Đã kiểm chứng bằng trình duyệt thật</strong> (Chromium qua Playwright): di chuột
            từng bước nhỏ (~2px, có chờ giữa mỗi bước) từ trigger băng qua khoảng trống vào panel,
            chiều ngược lại, và rời hẳn ra ngoài — tooltip giữ nguyên trong hai chiều đầu và ẩn đúng
            ở chiều thứ ba. Kiểm chứng này còn xác nhận bằng thực nghiệm đối chứng: tắt hover bridge
            thì đúng kịch bản trên tái hiện lỗi (tooltip biến mất giữa khoảng trống), bật lại thì
            hết.
          </li>
          <li>
            <strong>Persistent</strong> — trạng thái hover và focus được theo dõi độc lập; tooltip
            chỉ ẩn khi CẢ HAI đều không còn, nên một trigger đang giữ focus không mất tooltip chỉ vì
            con trỏ tình cờ lướt qua rồi rời đi.
          </li>
        </ul>
      </li>
      <li>
        Nội dung tooltip là chuỗi text thuần (không phải template tùy ý), nên không thể chứa phần tử
        tương tác — nếu cần link hoặc nút bấm bên trong, đó là popover chứ không phải tooltip.
      </li>
      <li>
        Vị trí hình học thực tế (tooltip nằm trên/dưới/trái/phải, tự chuyển hướng khi sát viền màn
        hình) do <code>CDK Overlay</code> tính toán lúc chạy trong trình duyệt thật; test tự động
        (jsdom, không có layout engine) không phủ được phần này. Riêng hành vi hover-bridge ở trên
        đã được kiểm chứng thủ công bằng trình duyệt thật như mô tả — đó là kiểm chứng một lần, thủ
        công, không phải một bài test tự động chạy lại mỗi lần CI.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TooltipPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'gTooltip',
      type: 'string',
      default: "''",
      description:
        'Nội dung tooltip. Rỗng (mặc định) nghĩa là không hiện gì — không bắt buộc phải truyền.',
    },
    {
      name: 'gTooltipPosition',
      type: "'top' | 'bottom' | 'left' | 'right'",
      default: "'top'",
      description: 'Hướng ưu tiên; CDK tự chuyển sang hướng khác nếu không đủ chỗ.',
    },
  ];
}
