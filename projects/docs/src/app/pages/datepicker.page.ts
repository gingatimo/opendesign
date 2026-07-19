import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DatepickerBasicDemo } from '../demos/datepicker/datepicker-basic.demo';

@Component({
  imports: [DatepickerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Datepicker</h1>
    <p>
      Chọn một ngày qua ô hiển thị read-only + popover lịch. Điều hướng tháng bằng nút
      <code>‹ ›</code>, chọn ngày bằng chuột hoặc bàn phím. Giá trị hai chiều qua
      <code>[(value)]</code> kiểu <code>Date | null</code>, định dạng hiển thị
      <code>dd/MM/yyyy</code>. Giới hạn khoảng chọn bằng <code>min</code>/<code>max</code>.
    </p>

    <docs-demo-section>
      <docs-datepicker-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/datepicker/datepicker-basic.demo.ts" />

    <h2>API — GDatepicker</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Nút mở lịch có <code>aria-haspopup="dialog"</code> + <code>aria-expanded</code>; panel là
        <code>role="dialog"</code> có nhãn.
      </li>
      <li>
        Lưới ngày điều hướng bằng bàn phím: <code>←→</code> đổi ngày, <code>↑↓</code> đổi tuần,
        <code>PageUp</code>/<code>PageDown</code> đổi tháng, <code>Enter</code> chọn,
        <code>Esc</code> đóng. Ngày hôm nay đánh dấu <code>aria-current="date"</code>, mỗi ngày có
        nhãn đầy đủ.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatepickerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'Date | null (model)',
      default: 'null',
      description: 'Ngày đang chọn, two-way binding qua [(value)].',
    },
    {
      name: 'min',
      type: 'Date',
      default: '—',
      description: 'Ngày nhỏ nhất được phép chọn (các ngày trước đó bị vô hiệu).',
    },
    {
      name: 'max',
      type: 'Date',
      default: '—',
      description: 'Ngày lớn nhất được phép chọn (các ngày sau đó bị vô hiệu).',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: `'dd/MM/yyyy'`,
      description: 'Chữ mờ hiển thị khi chưa chọn ngày.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá ô chọn ngày.',
    },
  ];
}
