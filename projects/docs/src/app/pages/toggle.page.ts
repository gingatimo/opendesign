import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ToggleBasicDemo } from '../demos/toggle/toggle-basic.demo';

@Component({
  imports: [ToggleBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Toggle</h1>
    <p>Công tắc bật/tắt, dùng cho các cài đặt có hiệu lực ngay lập tức.</p>

    <docs-demo-section>
      <docs-toggle-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/toggle/toggle-basic.demo.ts" />

    <h2>API — GToggle</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li><code>role="switch"</code>, <code>aria-checked</code> phản ánh trạng thái bật/tắt.</li>
      <li>Bàn phím: phím Space để toggle.</li>
      <li>
        Bắt buộc có <code>aria-label</code> hoặc <code>aria-labelledby</code> — thiếu sẽ có cảnh báo
        console ở dev mode.
      </li>
      <li>
        Tôn trọng <code>prefers-reduced-motion</code>: thumb trượt ngang là chuyển động theo tương
        tác (không phải chỉ báo liên tục như spinner), nên khi bật, animation <b>tắt hẳn</b> thay vì
        chậm lại — thumb đổi bên tức thì, trạng thái cuối vẫn đúng.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TogglePage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<boolean>',
      default: '—',
      description: 'Dùng với [formControl], formControlName, hoặc [(ngModel)].',
    },
  ];
}
