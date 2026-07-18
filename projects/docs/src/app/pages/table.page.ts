import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TableBasicDemo } from '../demos/table/table-basic.demo';

@Component({
  imports: [TableBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Table</h1>
    <p>
      Directive <code>gTable</code> gắn class lên phần tử <code>&lt;table&gt;</code> native để
      style — <b>thuần hiển thị</b>: không quản lý dữ liệu, sắp xếp hay phân trang. Consumer tự
      dựng <code>&lt;thead&gt;</code>/<code>&lt;tbody&gt;</code> và tự lo logic đó.
    </p>
    <p>
      Bọc <code>&lt;table&gt;</code> trong một khối <code>overflow-x: auto</code> (như demo dưới)
      để bảng cuộn ngang thay vì tràn trang trên màn hình hẹp.
    </p>

    <docs-demo-section>
      <docs-table-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-basic.demo.ts" />

    <h2>API — GTable</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <p>
      Dùng đúng phần tử <code>&lt;table&gt;</code> native cùng <code>&lt;th scope="col"&gt;</code>
      cho header — screen reader đọc đúng cấu trúc bảng theo hàng/cột mà không cần thêm
      <code>role</code> nào. <code>gTable</code> chỉ gắn class trình bày, không đụng tới ARIA.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TablePage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '[gTable] / striped',
      type: 'boolean',
      default: 'false',
      description: 'Tô nền xen kẽ cho các hàng chẵn trong tbody.',
    },
    {
      name: '[gTable] / stickyHeader',
      type: 'boolean',
      default: 'false',
      description: 'Ghim hàng tiêu đề (thead) khi cuộn dọc.',
    },
  ];
}
