import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DateRangePickerBasicDemo } from '../demos/date-range-picker/date-range-picker-basic.demo';

@Component({
  imports: [DateRangePickerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Date Range Picker</h1>
    <p>
      Chọn khoảng ngày trên một lịch: bấm ngày đầu (start), rồi ngày cuối (end) — dải ở giữa được tô
      màu, di chuột xem trước dải. <b>Bấm tiêu đề</b> (Tháng/Năm) để <b>chọn nhanh tháng & năm</b>
      (ngày → lưới 12 tháng → lưới 12 năm), khỏi next từng tháng. Giá trị hai chiều qua
      <code>[(value)]</code> kiểu
      <code>{{ '{' }} start, end {{ '}' }}</code> (<code>GDateRange</code>). Giới hạn bằng
      <code>min</code>/<code>max</code>.
    </p>

    <docs-demo-section>
      <docs-date-range-picker-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/date-range-picker/date-range-picker-basic.demo.ts" />

    <h2>API — GDateRangePicker</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Nút mở có <code>aria-haspopup="dialog"</code> + <code>aria-expanded</code>; lịch là
        <code>role="dialog"</code> có nhãn, mỗi ngày có nhãn đầy đủ, hôm nay đánh dấu
        <code>aria-current="date"</code>.
      </li>
      <li>
        Bàn phím: <code>←→</code> đổi ngày, <code>↑↓</code> đổi tuần, <code>PageUp</code>/<code
          >PageDown</code
        >
        đổi tháng, <code>Enter</code> chọn (đầu rồi cuối), <code>Esc</code> đóng. Ngày ngoài
        <code>min</code>/<code>max</code> dùng <code>aria-disabled</code> nên vẫn duyệt được bằng
        bàn phím.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DateRangePickerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'GDateRange (model)',
      default: '{ start: null, end: null }',
      description: 'Khoảng ngày { start, end }, two-way binding qua [(value)].',
    },
    {
      name: 'min',
      type: 'Date',
      default: '—',
      description: 'Ngày nhỏ nhất được phép chọn.',
    },
    {
      name: 'max',
      type: 'Date',
      default: '—',
      description: 'Ngày lớn nhất được phép chọn.',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: `'dd/MM/yyyy – dd/MM/yyyy'`,
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
