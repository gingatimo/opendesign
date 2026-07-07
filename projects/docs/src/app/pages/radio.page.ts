import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { RadioBasicDemo } from '../demos/radio/radio-basic.demo';

@Component({
  imports: [RadioBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Radio</h1>
    <p>
      <code>&lt;g-radio-group&gt;</code> chứa các <code>&lt;g-radio&gt;</code>, chỉ chọn được một
      giá trị.
    </p>

    <docs-demo-section>
      <docs-radio-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/radio/radio-basic.demo.ts" />

    <h2>API — GRadioGroup</h2>
    <docs-api-table [rows]="groupApiRows" />

    <h2>API — GRadio</h2>
    <docs-api-table [rows]="radioApiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        <code>role="radiogroup"</code> trên nhóm, <code>role="radio"</code> trên từng lựa chọn.
      </li>
      <li>
        Roving tabindex: chỉ radio đang chọn (hoặc radio đầu tiên nếu chưa chọn) nhận được Tab.
      </li>
      <li>Bàn phím: mũi tên lên/xuống/trái/phải di chuyển và chọn luôn giữa các lựa chọn.</li>
      <li>
        Tôn trọng <code>prefers-reduced-motion</code>: dot phóng to khi chọn là chuyển động theo
        tương tác (không phải chỉ báo liên tục như spinner), nên khi bật, animation <b>tắt hẳn</b>
        thay vì chậm lại — dot hiện đủ tức thì, trạng thái cuối vẫn đúng.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadioPage {
  protected readonly groupApiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<unknown>',
      default: '—',
      description: 'Dùng với [formControl], formControlName, hoặc [(ngModel)].',
    },
  ];
  protected readonly radioApiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'unknown',
      default: '(bắt buộc)',
      description: 'Giá trị của lựa chọn này.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hóa lựa chọn này.',
    },
  ];
}
