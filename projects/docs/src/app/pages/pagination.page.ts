import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { PaginationBasicDemo } from '../demos/pagination/pagination-basic.demo';

@Component({
  imports: [PaginationBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Pagination</h1>
    <p>
      Control phân trang <b>thuần trình bày</b> — chỉ quản lý trang đang chọn, không tự cắt dữ liệu.
      Consumer tự dùng <code>page</code> để lấy đúng phần dữ liệu cần hiển thị (vd.
      <code>slice((page - 1) * pageSize, page * pageSize)</code>).
    </p>

    <docs-demo-section>
      <docs-pagination-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/pagination/pagination-basic.demo.ts" />

    <h2>API — GPagination</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>Toàn bộ control nằm trong <code>&lt;nav aria-label="Phân trang"&gt;</code>.</li>
      <li>
        Nút của trang đang chọn mang <code>aria-current="page"</code>; mỗi nút số trang có
        <code>aria-label</code> riêng dạng "Trang N".
      </li>
      <li>
        Nút Trước/Sau tự <code>disabled</code> ở trang đầu/trang cuối, có <code>aria-label</code>
        tiếng Việt riêng ("Trang trước"/"Trang sau").
      </li>
      <li>
        Dấu ba chấm (…) đại diện cho các trang bị ẩn khi có nhiều trang — không phải nút bấm, mang
        <code>aria-hidden="true"</code> để không gây nhiễu cho screen reader.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginationPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'page',
      type: 'number (model)',
      default: '1',
      description: 'Trang đang chọn, 1-based, two-way binding qua [(page)].',
    },
    {
      name: 'pageCount',
      type: 'number (required)',
      default: '—',
      description: 'Tổng số trang.',
    },
  ];
}
