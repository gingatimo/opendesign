import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ContainerBasicDemo } from '../demos/layout/container-basic.demo';

@Component({
  imports: [ContainerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Container</h1>
    <p>
      Directive <code>gContainer</code> gắn class <code>.g-container</code> lên phần tử bất kỳ —
      giới hạn chiều rộng tối đa và canh giữa theo chiều ngang, giúp vùng nội dung đọc dễ hơn trên
      màn hình rộng. Không có input, không có output — thuần bố cục.
    </p>

    <docs-demo-section>
      <docs-container-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/layout/container-basic.demo.ts" />

    <h2>API — GContainer</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <p>
      Thuần bố cục — không đặt <code>role</code> hay thuộc tính ARIA nào lên phần tử host, không ảnh
      hưởng tới accessibility tree.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContainerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '[gContainer]',
      type: '(directive)',
      default: '—',
      description: 'Gắn class .g-container lên phần tử host — không có input, không có output.',
    },
    {
      name: '--g-container-max-width',
      type: 'token CSS',
      default: '960px',
      description: 'Chiều rộng tối đa của .g-container — ghi đè để đổi ngưỡng canh giữa.',
    },
  ];
}
