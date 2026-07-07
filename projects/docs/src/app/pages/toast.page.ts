import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ToastBasicDemo } from '../demos/toast/toast-basic.demo';
import { ToastPositionDemo } from '../demos/toast/toast-position.demo';

@Component({
  imports: [ToastBasicDemo, ToastPositionDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Toast</h1>
    <p>
      Thông báo ngắn, xếp chồng ở góc màn hình, tự đóng sau một khoảng thời gian. Mở bằng
      <code>GToastService.show()</code>.
    </p>

    <docs-demo-section>
      <docs-toast-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/toast/toast-basic.demo.ts" />

    <h2>Vị trí</h2>
    <p>
      Toast mặc định hiện ở góc <strong>trên-phải</strong> (<code>top-right</code>). Đổi vị trí bằng
      <code>GToastService.setPosition()</code> — áp dụng cho những lần <code>show()</code> kế tiếp,
      và cập nhật ngay lập tức nếu đang có toast mở.
    </p>

    <docs-demo-section>
      <docs-toast-position-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/toast/toast-position.demo.ts" />

    <h2>API — GToastService</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Nội dung được đọc qua <code>LiveAnnouncer</code> của CDK — <code>announce()</code> được gọi
        với đúng nội dung và politeness tương ứng ngay khi toast xuất hiện.
      </li>
      <li>
        Live region của <code>LiveAnnouncer</code> được tạo sẵn từ constructor của chính nó (trước
        khi có bất kỳ nội dung nào), nên khi announce() chèn text vào, live region đã tồn tại từ
        trước — đây là lý do screen reader đọc được, tránh lỗi kinh điển "chèn nội dung cùng lúc với
        live region thì không đọc".
      </li>
      <li>
        <code>variant="danger"</code> dùng politeness <code>assertive</code>; các variant còn lại
        dùng <code>polite</code>.
      </li>
      <li>
        Panel toast <strong>không</strong> tự đặt <code>aria-live</code> hay
        <code>role="alert"</code>
        — để tránh screen reader đọc hai lần (một lần qua LiveAnnouncer, một lần qua live region của
        chính panel).
      </li>
      <li>Nút đóng là <code>&lt;button&gt;</code> native, có <code>aria-label="Đóng"</code>.</li>
      <li>
        Với nội dung quan trọng, nên dùng <code>duration: 0</code> (không tự đóng) để người dùng có
        đủ thời gian đọc (WCAG 2.2.1 Timing Adjustable).
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToastPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'GToastService.show(config)',
      type: '(config: GToastConfig) => string',
      default: '—',
      description: 'Hiện một toast mới, trả về id của toast đó để dùng với dismiss(id).',
    },
    {
      name: 'GToastService.dismiss(id)',
      type: '(id: string) => void',
      default: '—',
      description: 'Đóng một toast theo id (id lấy từ giá trị trả về của show()).',
    },
    {
      name: 'GToastService.dismissAll()',
      type: '() => void',
      default: '—',
      description: 'Đóng toàn bộ toast đang mở.',
    },
    {
      name: 'GToastService.setPosition(position)',
      type: '(position: GToastPosition) => void',
      default: '—',
      description:
        'Đổi góc màn hình hiện toast. Áp dụng cho những lần show() kế tiếp; nếu đang có toast mở, cập nhật vị trí ngay lập tức.',
    },
    {
      name: 'GToastPosition',
      type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
      default: "'top-right'",
      description: 'Góc màn hình hiện toast — tham số của setPosition().',
    },
    {
      name: 'GToastConfig.message',
      type: 'string',
      default: '—',
      description: 'Nội dung thông báo.',
    },
    {
      name: 'GToastConfig.variant',
      type: "'neutral' | 'success' | 'warning' | 'danger'",
      default: "'neutral'",
      description: 'Kiểu hiển thị; danger dùng politeness assertive khi đọc.',
    },
    {
      name: 'GToastConfig.duration',
      type: 'number',
      default: '4000',
      description: 'Thời gian (ms) trước khi tự đóng. 0 = không tự đóng.',
    },
  ];
}
