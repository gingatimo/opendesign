import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CardBasicDemo } from '../demos/card/card-basic.demo';

@Component({
  imports: [CardBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Card</h1>
    <p>Bề mặt chứa nội dung, có thể thêm phần đầu và phần chân tùy chọn.</p>

    <docs-demo-section>
      <docs-card-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/card/card-basic.demo.ts" />

    <h2>API — GCard, GCardHeader, GCardFooter</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        <code>GCard</code> là bề mặt thuần túy, cố ý <b>không</b> đặt <code>role</code> để tránh tạo
        landmark thừa cho trình đọc màn hình.
      </li>
      <li>
        Nếu card của bạn là một vùng có ý nghĩa điều hướng hoặc cần được công bố riêng, hãy tự thêm
        <code>role</code>/<code>aria-label</code> phù hợp ở phía consumer.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-card',
      type: '(component)',
      default: '—',
      description: 'Container chính, không có input.',
    },
    {
      name: '[gCardHeader]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu phần đầu của card, không có input.',
    },
    {
      name: '[gCardFooter]',
      type: '(directive)',
      default: '—',
      description: 'Đánh dấu phần chân của card, không có input.',
    },
  ];
}
