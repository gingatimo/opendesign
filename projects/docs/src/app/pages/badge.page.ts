import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { BadgeBasicDemo } from '../demos/badge/badge-basic.demo';

@Component({
  imports: [BadgeBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Badge</h1>
    <p>Nhãn nhỏ dạng pill để đánh dấu trạng thái hoặc phân loại.</p>

    <docs-demo-section>
      <docs-badge-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/badge/badge-basic.demo.ts" />

    <h2>API — GBadge</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Badge là nhãn tĩnh nên không mang <code>role</code> riêng — nội dung chữ chính là tên của
        nó.
      </li>
      <li>
        Đừng dùng màu làm kênh thông tin duy nhất: chữ trong badge phải tự nói lên trạng thái (vd.
        "Lỗi", không chỉ là badge đỏ trống).
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BadgePage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'variant',
      type: "'neutral' | 'success' | 'warning' | 'danger'",
      default: "'neutral'",
      description: 'Bộ màu trạng thái của badge.',
    },
  ];
}
