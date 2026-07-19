import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { AccordionBasicDemo } from '../demos/accordion/accordion-basic.demo';

@Component({
  imports: [AccordionBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Accordion</h1>
    <p>
      Danh sách panel gập/mở. Mặc định mở một panel sẽ đóng các panel khác (single-open); thêm
      <code>multiple</code> trên <code>g-accordion</code> để cho phép mở nhiều panel cùng lúc. Tiêu
      đề header chiếu qua <code>[gAccordionHeader]</code>, phần còn lại là nội dung panel.
    </p>

    <docs-demo-section>
      <docs-accordion-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/accordion/accordion-basic.demo.ts" />

    <h2>API — GAccordion, GAccordionPanel</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mỗi header là một <code>&lt;button&gt;</code> có <code>aria-expanded</code> và
        <code>aria-controls</code> trỏ tới vùng nội dung (<code>role="region"</code>) tương ứng.
      </li>
      <li>
        Điều hướng bàn phím giữa các header bằng
        <code>↑</code>/<code>↓</code>/<code>Home</code>/<code>End</code>; mở/đóng bằng
        <code>Enter</code> hoặc <code>Space</code>. Nội dung panel đang đóng được đánh dấu
        <code>inert</code>.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: '(GAccordion) Cho phép mở nhiều panel cùng lúc thay vì chỉ một.',
    },
    {
      name: 'open',
      type: 'boolean (model)',
      default: 'false',
      description: '(GAccordionPanel) Trạng thái mở/đóng, two-way qua [(open)].',
    },
    {
      name: '[gAccordionHeader]',
      type: '(projection)',
      default: '—',
      description: '(GAccordionPanel) Chiếu nội dung tiêu đề hiển thị trong header.',
    },
  ];
}
