import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { StackBasicDemo } from '../demos/layout/stack-basic.demo';
import { StackWrapDemo } from '../demos/layout/stack-wrap.demo';

@Component({
  imports: [StackBasicDemo, StackWrapDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Stack</h1>
    <p>
      Component <code>g-stack</code> xếp các phần tử con theo flexbox — dọc (<code>column</code>)
      hoặc ngang (<code>row</code>), với khoảng cách đều nhau theo thang token
      <code>--g-space-N</code>.
    </p>

    <docs-demo-section>
      <docs-stack-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/layout/stack-basic.demo.ts" />

    <h2>Wrap &amp; căn chỉnh</h2>
    <p>
      Xếp ngang với <code>[wrap]="true"</code> để các phần tử tự xuống dòng khi hết chỗ; kết hợp
      <code>align</code>/<code>justify</code> để căn theo hai trục.
    </p>
    <docs-demo-section>
      <docs-stack-wrap-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/layout/stack-wrap.demo.ts" />

    <h2>API — GStack</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <p>
      Thuần bố cục — không đặt <code>role</code> hay thuộc tính ARIA nào lên phần tử host, không ảnh
      hưởng tới accessibility tree.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'direction',
      type: `'vertical' | 'horizontal'`,
      default: `'vertical'`,
      description: 'Hướng xếp: vertical → flex-direction column, horizontal → row.',
    },
    {
      name: 'gap',
      type: 'number (0–8)',
      default: '4',
      description: 'Khoảng cách giữa các phần tử con, map tới token --g-space-N. 0 → không giãn.',
    },
    {
      name: 'align',
      type: 'string',
      default: '—',
      description: 'Giá trị CSS align-items tuỳ chọn.',
    },
    {
      name: 'justify',
      type: 'string',
      default: '—',
      description: 'Giá trị CSS justify-content tuỳ chọn.',
    },
    {
      name: 'wrap',
      type: 'boolean',
      default: 'false',
      description: 'Cho phép xuống dòng (flex-wrap: wrap) khi các phần tử tràn khỏi trục chính.',
    },
  ];
}
