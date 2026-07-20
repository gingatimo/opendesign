import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ContextMenuBasicDemo } from '../demos/context-menu/context-menu-basic.demo';

@Component({
  imports: [ContextMenuBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Context Menu</h1>
    <p>
      Menu <b>ngữ cảnh</b> (chuột phải): gắn directive <code>[gContextMenu]="tpl"</code> lên phần tử
      — chuột phải mở menu ngay tại <b>vị trí con trỏ</b> (overlay CDK, tự lật hướng nếu thiếu chỗ).
      Nội dung là một <code>&lt;ng-template&gt;</code> gồm các
      <code>&lt;button g-menu-item&gt;</code>. Tự đóng khi bấm ra ngoài, nhấn <kbd>Esc</kbd>, hoặc
      chọn một mục.
    </p>

    <docs-demo-section>
      <docs-context-menu-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/context-menu/context-menu-basic.demo.ts" />

    <h2>API — gContextMenu</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContextMenuPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'gContextMenu',
      type: 'TemplateRef',
      default: '(bắt buộc)',
      description:
        'Template nội dung menu — thường là các `<button g-menu-item (click)=…>`. Mở tại vị trí chuột phải.',
    },
  ];
}
