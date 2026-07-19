import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CascadeSelectBasicDemo } from '../demos/cascade-select/cascade-select-basic.demo';

@Component({
  imports: [CascadeSelectBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Cascade Select</h1>
    <p>
      Chọn một giá trị qua nhiều cấp danh mục lồng nhau. Trigger mở overlay nhiều cột: di chuột hoặc
      focus vào mục có con sẽ mở cột con bên phải; chỉ mục lá (không có <code>children</code>) mới
      chọn được và đóng panel. Giá trị hai chiều qua <code>ControlValueAccessor</code>.
    </p>

    <docs-demo-section>
      <docs-cascade-select-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/cascade-select/cascade-select-basic.demo.ts" />

    <h2>API — GCascadeSelect</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Trigger mang <code>role="combobox"</code> với
        <code>aria-haspopup</code>/<code>aria-expanded</code>; mỗi cột là
        <code>role="listbox"</code>, mỗi mục là <code>role="option"</code> có
        <code>aria-selected</code>.
      </li>
      <li>
        Bàn phím: <code>Enter</code>/<code>Space</code>/<code>↓</code> mở panel;
        <code>↑</code>/<code>↓</code> di chuyển trong cột, <code>→</code> mở cột con,
        <code>←</code> quay lại cột trước, <code>Enter</code> chọn mục lá, <code>Esc</code> đóng
        panel.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CascadeSelectPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<unknown>',
      default: '—',
      description:
        'Dùng với [formControl], formControlName, hoặc [(ngModel)]. Giá trị là value của mục lá đang chọn.',
    },
    {
      name: 'options',
      type: 'GCascadeOption[]',
      default: '[]',
      description:
        'Danh sách tuỳ chọn phân cấp { label, value?, children? }. Chỉ mục không có children mới chọn được.',
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
      description: 'So sánh value của option với giá trị đang bind để xác định mục đang chọn.',
    },
  ];
}
