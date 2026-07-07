import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { InputBasicDemo } from '../demos/input/input-basic.demo';
import { InputIconDemo } from '../demos/input/input-icon.demo';

@Component({
  imports: [InputBasicDemo, InputIconDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Input</h1>
    <p>
      Directive <code>gInput</code> gắn trên phần tử <code>&lt;input&gt;</code> native, hoạt động
      với cả reactive forms lẫn <code>ngModel</code>.
    </p>

    <docs-demo-section>
      <docs-input-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/input/input-basic.demo.ts" />

    <h2>API — gInput</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Input kèm icon — GInputGroup</h2>
    <p>
      <code>g-input-group</code> bọc <code>&lt;input gInput&gt;</code> cùng icon/nút phụ trợ ở trước
      (<code>gInputPrefix</code>) hoặc sau (<code>gInputSuffix</code>). Viền + focus ring vẽ quanh
      cả nhóm, không phải riêng ô input.
    </p>

    <docs-demo-section>
      <docs-input-icon-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/input/input-icon.demo.ts" />

    <h2>API — GInputGroup</h2>
    <docs-api-table [rows]="groupApiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Dùng phần tử <code>&lt;input&gt;</code> native nên giữ nguyên hành vi bàn phím/focus chuẩn
        trình duyệt.
      </li>
      <li>
        Class <code>g-input--invalid</code> tự thêm khi control invalid và đã touched/dirty — kết
        hợp với <code>aria-invalid</code> do form của bạn tự gắn nếu cần.
      </li>
      <li>
        Icon ở <code>gInputPrefix</code> nên để trang trí (mặc định <code>g-icon</code> đã tự
        <code>aria-hidden</code>) — nút ở <code>gInputSuffix</code> phải là
        <code>&lt;button type="button"&gt;</code> có <code>aria-label</code> đổi theo trạng thái,
        không dùng <code>&lt;span (click)&gt;</code>.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<string>',
      default: '—',
      description: 'Dùng với [formControl], formControlName, hoặc [(ngModel)].',
    },
  ];

  protected readonly groupApiRows: ApiRow[] = [
    {
      name: 'gInputPrefix',
      type: 'directive',
      default: '—',
      description: 'Đánh dấu phần tử chiếu vào trước input trong nhóm.',
    },
    {
      name: 'gInputSuffix',
      type: 'directive',
      default: '—',
      description: 'Đánh dấu phần tử chiếu vào sau input trong nhóm.',
    },
  ];
}
