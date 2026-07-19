import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { GridBasicDemo } from '../demos/grid/grid-basic.demo';

@Component({
  imports: [GridBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Grid</h1>
    <p>
      Primitive bố cục lưới CSS. Đặt <code>cols</code> để có số cột đều nhau, hoặc
      <code>minColWidth</code> để lưới tự xếp số cột theo bề rộng khả dụng (responsive
      <code>auto-fill</code>). Khoảng cách <code>gap</code> theo thang token
      <code>--g-space-N</code>.
    </p>

    <docs-demo-section>
      <docs-grid-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/grid/grid-basic.demo.ts" />

    <h2>API — GGrid</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <p>
      Thuần bố cục — không đặt <code>role</code> hay ARIA nào lên host, không ảnh hưởng
      accessibility tree.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GridPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'cols',
      type: 'number',
      default: '2',
      description: 'Số cột đều nhau (repeat(cols, 1fr)). Bị bỏ qua khi có minColWidth.',
    },
    {
      name: 'minColWidth',
      type: 'string',
      default: '—',
      description:
        'Bề rộng tối thiểu mỗi cột (vd "200px") → responsive repeat(auto-fill, minmax(min, 1fr)).',
    },
    {
      name: 'gap',
      type: 'number (0–8)',
      default: '4',
      description: 'Khoảng cách hàng/cột, map tới token --g-space-N. 0 → không giãn.',
    },
  ];
}
