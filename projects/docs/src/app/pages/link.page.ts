import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { LinkBasicDemo } from '../demos/link/link-basic.demo';

@Component({
  imports: [LinkBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Link</h1>
    <p>
      Directive <code>gLink</code> gắn class <code>.g-link</code> lên phần tử
      <code>&lt;a&gt;</code> native — dùng cho link đứng trong đoạn văn bản (khác
      <code>g-button</code>, vốn là nút hành động dạng pill). Không có input, không tự thêm
      <code>role</code> hay can thiệp <code>href</code>/nội dung — <code>&lt;a&gt;</code> vẫn hoạt
      động y hệt thẻ native.
    </p>

    <docs-demo-section>
      <docs-link-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/link/link-basic.demo.ts" />

    <h2>API — GLink</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        <b>Gạch chân luôn hiện</b>, kể cả ở trạng thái nghỉ (không chỉ khi hover) — đáp ứng WCAG
        1.4.1 Use of Color. Bảng màu OpenDesign đơn sắc nên màu link (<code>--g-primary</code>) và
        màu chữ thường (<code>--g-text</code>) khá gần nhau; nếu chỉ dùng màu để phân biệt link, ở
        bảng màu này link sẽ khó phân biệt với chữ thường bằng mắt. Gạch chân là dấu hiệu độc lập
        với màu, đọc được cả ở chế độ grayscale.
      </li>
      <li>
        <b>Không tự thêm <code>role</code></b> — <code>&lt;a href&gt;</code> native đã có sẵn role
        "link". Nếu bạn dùng <code>gLink</code> trên <code>&lt;a&gt;</code> không có
        <code>href</code>, role mặc định của HTML là "generic" (đúng theo spec, không phải lỗi cần
        sửa) — vì phần tử đó thật sự không kích hoạt được gì.
      </li>
      <li>
        Test lib (<code>link.spec.ts</code>) chứng minh: class <code>g-link</code> được gắn đúng,
        không có <code>role</code> nào bị ghi đè, và <code>href</code>/nội dung
        <code>&lt;a&gt;</code> giữ nguyên. Riêng việc gạch chân/focus ring có thực sự hiển thị đúng
        trên trình duyệt hay không thì jsdom (không có layout/render engine) không kiểm chứng được —
        phần đó đã được xác nhận một lần bằng Chromium thật khi dựng directive này, không phải một
        bài test tự động chạy lại mỗi lần CI.
      </li>
      <li>
        Không có variant "link ngoài" (icon mở tab mới) sẵn trong thư viện — nếu cần, tự thêm chữ mô
        tả (vd. "(mở tab mới)") hoặc icon từ trang <code>Icon</code> ngay trong nội dung link.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LinkPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'a[gLink]',
      type: '(directive)',
      default: '—',
      description: 'Gắn class .g-link lên phần tử <a> native — không có input, không có output.',
    },
  ];
}
