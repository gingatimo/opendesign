import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CheckboxBasicDemo } from '../demos/checkbox/checkbox-basic.demo';

@Component({
  imports: [CheckboxBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Checkbox</h1>
    <p>Component chọn một mục độc lập, hỗ trợ trạng thái indeterminate.</p>

    <docs-demo-section>
      <docs-checkbox-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/checkbox/checkbox-basic.demo.ts" />

    <h2>API — GCheckbox</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        <code>role="checkbox"</code>, <code>aria-checked</code> là <code>"mixed"</code> khi
        indeterminate.
      </li>
      <li>Bàn phím: phím Space để toggle.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'indeterminate',
      type: 'boolean',
      default: 'false',
      description: 'Hiển thị trạng thái chọn một phần.',
    },
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<boolean>',
      default: '—',
      description: 'Dùng với [formControl], formControlName, hoặc [(ngModel)].',
    },
  ];
}
