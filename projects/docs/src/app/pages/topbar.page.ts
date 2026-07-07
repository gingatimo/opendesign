import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TopbarBasicDemo } from '../demos/topbar/topbar-basic.demo';

@Component({
  imports: [TopbarBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Topbar</h1>
    <p>
      Thanh ngang cố định đầu trang, chiếu nội dung qua 3 slot:
      <code>[gTopbarStart]</code>, <code>[gTopbarCenter]</code>, <code>[gTopbarEnd]</code>. Cả 3
      slot đều tùy chọn.
    </p>

    <docs-demo-section>
      <docs-topbar-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/topbar/topbar-basic.demo.ts" />

    <h2>API — GTopbar, GTopbarStart, GTopbarCenter, GTopbarEnd</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        <code>g-topbar</code> <b>cố ý không</b> tự đặt <code>role="banner"</code> — role đó chỉ đúng
        khi topbar là banner của toàn trang, và thư viện không biết được ngữ cảnh sử dụng (topbar có
        thể lồng trong một section khác). Nếu topbar của bạn thực sự là banner toàn trang, hãy bọc
        trong <code>&lt;header&gt;</code> hoặc tự thêm <code>role="banner"</code>.
      </li>
      <li>
        Khi thiếu slot <code>gTopbarCenter</code>, slot <code>gTopbarEnd</code> vẫn tự đẩy sang mép
        phải (không cần cấu hình thêm) — xem biến thể thứ hai trong demo phía trên.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TopbarPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-topbar',
      type: '(component)',
      default: '—',
      description: 'Container chính, không có input.',
    },
    {
      name: '[gTopbarStart]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu nội dung bên trái (thường là thương hiệu/logo).',
    },
    {
      name: '[gTopbarCenter]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu nội dung ở giữa, tự canh giữa và chiếm không gian còn lại.',
    },
    {
      name: '[gTopbarEnd]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu nội dung bên phải, tự đẩy sát mép phải.',
    },
  ];
}
