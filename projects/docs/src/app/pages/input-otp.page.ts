import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { InputOtpBasicDemo } from '../demos/input-otp/input-otp-basic.demo';

@Component({
  imports: [InputOtpBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Input OTP</h1>
    <p>
      Ô nhập mã OTP/PIN gồm <code>length</code> ô một ký tự. Gõ tự nhảy sang ô kế tiếp,
      <code>Backspace</code> lùi lại, <code>←</code>/<code>→</code> di chuyển giữa các ô, dán
      (paste) rải chuỗi vào các ô liên tiếp. Giá trị là chuỗi ghép các ô, hai chiều qua
      <code>ControlValueAccessor</code> (dùng với <code>[formControl]</code>).
    </p>

    <docs-demo-section>
      <docs-input-otp-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/input-otp/input-otp-basic.demo.ts" />

    <h2>API — GInputOtp</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mỗi ô là một <code>&lt;input maxlength="1"&gt;</code> có <code>aria-label</code> riêng ("Ký
        tự 1", "Ký tự 2"...) và <code>autocomplete="one-time-code"</code> để trình duyệt/bàn phím
        gợi ý mã OTP nhận qua SMS.
      </li>
      <li>
        Khi <code>integerOnly</code>, mỗi ô có <code>inputmode="numeric"</code> để hiện bàn phím số
        trên thiết bị di động.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputOtpPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<string>',
      default: '—',
      description:
        'Dùng với [formControl], formControlName, hoặc [(ngModel)]. Giá trị là chuỗi ghép các ô.',
    },
    {
      name: 'length',
      type: 'number',
      default: '6',
      description: 'Số ô nhập.',
    },
    {
      name: 'integerOnly',
      type: 'boolean',
      default: 'false',
      description: 'Chỉ cho nhập chữ số.',
    },
    {
      name: 'mask',
      type: 'boolean',
      default: 'false',
      description: 'Ẩn ký tự đã nhập (hiển thị dạng ô mật khẩu).',
    },
  ];
}
