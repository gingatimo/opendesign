import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TreeSelectBasicDemo } from '../demos/tree-select/tree-select-basic.demo';
import { TreeSelectMultipleDemo } from '../demos/tree-select/tree-select-multiple.demo';

@Component({
  imports: [TreeSelectBasicDemo, TreeSelectMultipleDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Tree Select</h1>
    <p>
      Chọn một mục từ cấu trúc cây gập/mở. Trigger mở overlay dạng cây; khác với Cascade Select, cả
      node nhánh lẫn node lá đều chọn được. Giá trị hai chiều qua
      <code>ControlValueAccessor</code>.
    </p>

    <docs-demo-section>
      <docs-tree-select-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/tree-select/tree-select-basic.demo.ts" />

    <h2>Chọn nhiều (multiple)</h2>
    <p>
      Thêm <code>multiple</code> để chọn nhiều node bằng checkbox. Chọn theo kiểu <b>lan truyền</b>:
      tích một node cha sẽ tích cả nhánh con; node cha hiện trạng thái
      <b>một phần</b> (indeterminate) khi chỉ vài con được tích. Nút gập/mở chuyển sang bên phải,
      checkbox nằm bên trái. Giá trị là mảng <code>value</code> của các node lá đã chọn; trigger
      hiện chips <b>từng node lá</b> (bấm <code>×</code> để bỏ chọn) trên <b>một hàng</b> — tràn quá
      bề rộng thì hiện <code>…</code> thay vì xuống dòng.
    </p>

    <docs-demo-section>
      <docs-tree-select-multiple-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/tree-select/tree-select-multiple.demo.ts" />

    <h2>API — GTreeSelect</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Trigger mang <code>role="combobox"</code> với <code>aria-haspopup="tree"</code>; panel là
        <code>role="tree"</code>, mỗi node là <code>role="treeitem"</code> có
        <code>aria-level</code>, <code>aria-expanded</code> (nếu có con). single dùng
        <code>aria-selected</code>; multiple đặt <code>aria-multiselectable</code> trên tree và
        <code>aria-checked="true|false|mixed"</code> trên từng node (mixed = một phần).
      </li>
      <li>
        Bàn phím: <code>↑</code>/<code>↓</code> di chuyển giữa các node đang hiển thị,
        <code>→</code> mở rộng node có con, <code>←</code> thu gọn, <code>Enter</code>/<code
          >Space</code
        >
        chọn node, <code>Esc</code> đóng panel.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TreeSelectPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<unknown>',
      default: '—',
      description:
        'Dùng với [formControl], formControlName, hoặc [(ngModel)]. single: value của node đang chọn; multiple: mảng value các node lá đã chọn.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description:
        'Bật chọn nhiều bằng checkbox (cascade + tri-state). Trigger hiện chips; nút gập/mở sang phải, checkbox bên trái.',
    },
    {
      name: 'options',
      type: 'GTreeNode[]',
      default: '[]',
      description: 'Cây tuỳ chọn { label, value?, children? }. Chọn được cả node nhánh lẫn lá.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Chữ hiển thị khi chưa chọn giá trị nào.',
    },
    {
      name: 'compareWith',
      type: '(a: unknown, b: unknown) => boolean',
      default: '(a, b) => a === b',
      description: 'So sánh value của node với giá trị đang bind để xác định node đang chọn.',
    },
  ];
}
