import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TimePickerBasicDemo } from '../demos/time-picker/time-picker-basic.demo';

@Component({
  imports: [TimePickerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Time Picker</h1>
    <p>
      Chọn giờ:phút (24h) qua ô read-only + popover hai cột Giờ/Phút. Bước cột phút đặt bằng
      <code>minuteStep</code>. Giá trị hai chiều qua <code>[(value)]</code> kiểu chuỗi
      <code>"HH:mm"</code>.
    </p>

    <docs-demo-section>
      <docs-time-picker-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/time-picker/time-picker-basic.demo.ts" />

    <h2>API — GTimePicker</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Nút mở có <code>aria-haspopup="dialog"</code> + <code>aria-expanded</code>; panel là
        <code>role="dialog"</code>, mỗi cột là <code>role="listbox"</code> với các
        <code>role="option"</code> đánh dấu <code>aria-selected</code>.
      </li>
      <li>
        Bàn phím: <code>↑↓</code> di chuyển trong cột, <code>Enter</code>/<code>Space</code> chọn,
        <code>Esc</code> đóng. Mở popover tự cuộn mục đang chọn vào giữa.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimePickerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'string | null (model)',
      default: 'null',
      description: 'Giờ đang chọn dạng "HH:mm", two-way binding qua [(value)].',
    },
    {
      name: 'minuteStep',
      type: 'number',
      default: '1',
      description: 'Bước nhảy của cột phút (vd. 5, 15).',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: `'HH:mm'`,
      description: 'Chữ mờ khi chưa chọn.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá.',
    },
  ];
}
