import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ChipsBasicDemo } from '../demos/chips/chips-basic.demo';

@Component({
  imports: [ChipsBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Chips</h1>
    <p>
      Ô nhập nhiều giá trị dạng chip (tags input). Gõ rồi nhấn <code>Enter</code> hoặc dấu phẩy để
      thêm; nhấn nút × trên chip hoặc <code>Backspace</code> khi ô nhập rỗng để xoá chip cuối. Giá
      trị là <code>string[]</code>, hai chiều qua <code>ControlValueAccessor</code>.
    </p>

    <docs-demo-section>
      <docs-chips-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/chips/chips-basic.demo.ts" />

    <h2>API — GChips</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mỗi chip có nút xoá riêng với <code>aria-label</code> mô tả rõ mục sẽ bị xoá (vd "Xóa
        Angular").
      </li>
      <li>
        Ô nhập có <code>aria-label</code> "Thêm mục"; khi đạt <code>max</code>, ô nhập tự vô hiệu
        hoá để ngăn thêm mới.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChipsPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<string[]>',
      default: '—',
      description:
        'Dùng với [formControl], formControlName, hoặc [(ngModel)]. Giá trị là mảng chuỗi.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Chữ mờ hiển thị trong ô nhập khi chưa có chip nào.',
    },
    {
      name: 'max',
      type: 'number',
      default: '—',
      description: 'Giới hạn số chip tối đa; ô nhập tự vô hiệu hoá khi đạt giới hạn.',
    },
    {
      name: 'allowDuplicate',
      type: 'boolean',
      default: 'false',
      description: 'Cho phép thêm giá trị trùng lặp với chip đã có.',
    },
  ];
}
