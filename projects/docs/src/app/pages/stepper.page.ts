import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { StepperBasicDemo } from '../demos/stepper/stepper-basic.demo';
import { StepperVerticalDemo } from '../demos/stepper/stepper-vertical.demo';

@Component({
  imports: [StepperBasicDemo, StepperVerticalDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Stepper</h1>
    <p>
      Wizard nhiều bước: thanh bước hiển thị tiến trình (đã xong/đang chọn/chưa tới) và chỉ khởi tạo
      nội dung của bước đang active. Header từng bước bấm được (non-linear) — consumer tự gắn nút
      Tiếp/Quay lại bằng <code>[(activeStep)]</code>.
    </p>

    <docs-demo-section>
      <docs-stepper-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/stepper/stepper-basic.demo.ts" />

    <h2>Dọc</h2>
    <p>
      Đặt <code>orientation="vertical"</code>: các bước xếp chồng dọc, có đường nối dọc giữa các
      circle, nội dung bước đang chọn hiện ngay dưới header của bước đó.
    </p>
    <docs-demo-section>
      <docs-stepper-vertical-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/stepper/stepper-vertical.demo.ts" />

    <h2>API — GStepper, GStep</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Thanh bước là <code>&lt;ol&gt;</code> (thứ tự các bước có ý nghĩa). Bước đang active có
        <code>aria-current="step"</code>.
      </li>
      <li>
        Header mỗi bước là <code>&lt;button&gt;</code> native, có <code>aria-label</code> gồm số thứ
        tự, nhãn, trạng thái tuỳ chọn (nếu có) và trạng thái đã xong/đang chọn/chưa tới — screen
        reader nghe được đầy đủ ý nghĩa dù chỉ số/icon trên indicator là <code>aria-hidden</code>.
      </li>
      <li>
        Chỉ nội dung của bước đang active mới được khởi tạo (<code>ngTemplateOutlet</code>) — cùng
        cơ chế với GTabs.
      </li>
      <li>
        Nếu <code>activeStep</code> ngoài khoảng hợp lệ (vd. do consumer set sai), component tự rơi
        về bước đầu tiên (index 0).
      </li>
    </ul>
    <p>
      Toàn bộ khẳng định trên có test tương ứng trong
      <code>projects/ngx-opendesign/src/lib/stepper/stepper.spec.ts</code>.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StepperPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-stepper / activeStep',
      type: 'number (model)',
      default: '0',
      description: 'Index bước đang active (0-based), two-way binding qua [(activeStep)].',
    },
    {
      name: 'g-stepper / orientation',
      type: `'horizontal' | 'vertical'`,
      default: `'horizontal'`,
      description: 'Hướng bố cục thanh bước.',
    },
    {
      name: 'g-step / label',
      type: 'string (required)',
      default: '—',
      description: 'Nhãn hiển thị trên header của bước.',
    },
    {
      name: 'g-step / optional',
      type: 'boolean',
      default: 'false',
      description: 'Đánh dấu bước là tuỳ chọn — hiện thêm nhãn "(tuỳ chọn)".',
    },
  ];
}
