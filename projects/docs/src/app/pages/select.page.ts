import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SelectBasicDemo } from '../demos/select/select-basic.demo';
import { SelectSearchDemo } from '../demos/select/select-search.demo';
import { SelectMultipleDemo } from '../demos/select/select-multiple.demo';

@Component({
  imports: [
    SelectBasicDemo,
    SelectSearchDemo,
    SelectMultipleDemo,
    CodeBlock,
    ApiTable,
    DemoSection,
  ],
  template: `
    <h1>Select</h1>
    <p>Trigger dạng pill, panel nổi bằng CDK Overlay, hỗ trợ điều hướng bàn phím đầy đủ.</p>

    <docs-demo-section>
      <docs-select-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/select/select-basic.demo.ts" />

    <h2>Tìm kiếm</h2>
    <p>
      Thêm <code>searchable</code> để lọc option bằng ô tìm kiếm trong panel. Lọc không phân biệt
      dấu tiếng Việt (gõ <code>chuoi</code> khớp <code>Chuối</code>).
    </p>
    <docs-demo-section>
      <docs-select-search-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/select/select-search.demo.ts" />

    <h2>Chọn nhiều</h2>
    <p>
      Thêm <code>multiple</code> để chọn nhiều mục — giá trị là mảng, panel giữ mở, mỗi mục đã chọn
      hiển thị dạng chip có nút bỏ. Ghép được với <code>searchable</code>.
    </p>
    <docs-demo-section>
      <docs-select-multiple-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/select/select-multiple.demo.ts" />

    <h2>API — GSelect</h2>
    <docs-api-table [rows]="selectApiRows" />

    <h2>API — GOption</h2>
    <docs-api-table [rows]="optionApiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        <code>role="combobox"</code> trên trigger, <code>role="listbox"</code>/<code
          >role="option"</code
        >
        trên panel — theo pattern combobox của ARIA.
      </li>
      <li>
        Bàn phím: Enter/Space/mũi tên xuống mở panel, mũi tên lên/xuống di chuyển lựa chọn đang
        active, Enter chọn, Esc hoặc click ra ngoài đóng panel.
      </li>
      <li>Gõ một ký tự để nhảy nhanh tới option có nhãn bắt đầu bằng ký tự đó (typeahead).</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {
  protected readonly selectApiRows: ApiRow[] = [
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Chữ hiển thị khi chưa chọn.',
    },
    {
      name: 'searchable',
      type: 'boolean',
      default: 'false',
      description: 'Hiện ô tìm kiếm trong panel để lọc option (không phân biệt dấu).',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Cho chọn nhiều mục; giá trị trở thành mảng, hiển thị dạng chip trên trigger.',
    },
    {
      name: 'searchPlaceholder',
      type: 'string',
      default: "'Tìm...'",
      description: 'Chữ mờ của ô tìm kiếm (khi searchable).',
    },
    {
      name: 'compareWith',
      type: '(optionValue: unknown, modelValue: unknown) => boolean',
      default: '(a, b) => a === b',
      description:
        'So sánh giá trị của option (tham số 1) với giá trị đang bind của control (tham số 2) để xác định option nào đang được chọn.',
    },
    {
      name: '(CVA)',
      type: 'ControlValueAccessor<unknown>',
      default: '—',
      description: 'Dùng với [formControl], formControlName, hoặc [(ngModel)].',
    },
  ];
  protected readonly optionApiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'unknown',
      default: '(bắt buộc)',
      description: 'Giá trị của option này.',
    },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Vô hiệu hóa option này.' },
  ];
}
