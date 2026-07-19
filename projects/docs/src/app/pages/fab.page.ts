import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { FabBasicDemo } from '../demos/fab/fab-basic.demo';

@Component({
  imports: [FabBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Fab</h1>
    <p>
      Nút hành động nổi (Floating Action Button) — một <code>&lt;button g-fab&gt;</code> cố định ở
      góc màn hình (<code>position: fixed</code>) cho hành động chính. Dạng tròn chỉ icon, hoặc
      <code>extended</code> dạng viên có icon kèm nhãn.
    </p>

    <docs-demo-section>
      <docs-fab-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/fab/fab-basic.demo.ts" />

    <h2>API — GFab</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Là <code>&lt;button&gt;</code> thật — hỗ trợ bàn phím và focus mặc định. Dạng tròn chỉ có
        icon <b>bắt buộc</b> phải cấp <code>aria-label</code>; dạng extended có nhãn văn bản nên tự
        đủ tên.
      </li>
      <li>Consumer tự gắn <code>(click)</code> cho hành động.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FabPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'position',
      type: `'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'`,
      default: `'bottom-right'`,
      description: 'Góc màn hình nút bám vào (cố định theo viewport).',
    },
    {
      name: 'extended',
      type: 'boolean',
      default: 'false',
      description: 'Dạng viên có nhãn (icon + text) thay vì tròn chỉ icon.',
    },
  ];
}
