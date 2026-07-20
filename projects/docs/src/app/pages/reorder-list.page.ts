import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ReorderListBasicDemo } from '../demos/reorder-list/reorder-list-basic.demo';

@Component({
  imports: [ReorderListBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Reorder List</h1>
    <p>
      Danh sách <b>kéo-thả để sắp xếp lại thứ tự</b> (dùng CDK drag-drop). Kéo bằng tay nắm (grip)
      bên trái mỗi hàng; thả xong <code>[(items)]</code> tự cập nhật theo thứ tự mới. Mỗi hàng
      render bằng <code>&lt;ng-template let-item let-i="index"&gt;</code> bạn chiếu vào. Bản xem
      trước nổi lên khi kéo, chỗ trống mờ đi.
    </p>

    <docs-demo-section>
      <docs-reorder-list-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/reorder-list/reorder-list-basic.demo.ts" />

    <h2>API — GReorderList</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Tay nắm là <code>&lt;button&gt;</code> có <code>aria-label</code>, focus được bằng bàn phím.
      </li>
      <li>
        Sắp xếp bằng kéo (chuột/cảm ứng). Với người dùng chỉ bàn phím, nên kèm nút chuyển lên/xuống.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ReorderListPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'items',
      type: 'T[]',
      default: '[]',
      description: 'Danh sách item (two-way `[(items)]`). Thả xong tự set lại theo thứ tự mới.',
    },
  ];
}
