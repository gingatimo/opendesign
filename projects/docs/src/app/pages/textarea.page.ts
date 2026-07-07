import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TextareaBasicDemo } from '../demos/textarea/textarea-basic.demo';

@Component({
  imports: [TextareaBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Textarea</h1>
    <p>
      Directive <code>gTextarea</code> gắn trên phần tử <code>&lt;textarea&gt;</code> native, radius
      nhỏ (khác với các control dạng pill).
    </p>

    <docs-demo-section>
      <docs-textarea-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/textarea/textarea-basic.demo.ts" />

    <h2>API — gTextarea</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>Dùng phần tử native nên giữ nguyên hành vi bàn phím/focus chuẩn trình duyệt.</li>
      <li>Có thể resize theo chiều dọc (<code>resize: vertical</code>).</li>
      <li>
        Class <code>g-textarea--invalid</code> tự thêm khi control invalid và đã touched/dirty — kết
        hợp với <code>aria-invalid</code> do form của bạn tự gắn nếu cần.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextareaPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<string>',
      default: '—',
      description: 'Dùng với [formControl], formControlName, hoặc [(ngModel)].',
    },
  ];
}
