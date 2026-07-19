import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ColorPickerBasicDemo } from '../demos/color-picker/color-picker-basic.demo';

@Component({
  imports: [ColorPickerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Color Picker</h1>
    <p>
      Chọn màu qua ô hiển thị + popover: vùng <strong>Saturation/Value</strong> kéo chuột, thanh
      <strong>Hue</strong> (dùng GSlider), ô nhập <strong>hex</strong> và hàng màu dựng sẵn. Giá trị
      hai chiều qua <code>[(value)]</code> kiểu chuỗi hex <code>#rrggbb</code>.
    </p>

    <docs-demo-section>
      <docs-color-picker-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/color-picker/color-picker-basic.demo.ts" />

    <h2>API — GColorPicker</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Nút mở có <code>aria-haspopup="dialog"</code>; panel là <code>role="dialog"</code> có nhãn.
        Thanh Hue là <code>input[type="range"]</code> gốc (bàn phím sẵn); ô hex có nhãn; mỗi swatch
        có <code>aria-label</code> là mã màu.
      </li>
      <li>
        Vùng Saturation/Value focus được, đổi bằng mũi tên (<code>←→</code> bão hoà,
        <code>↑↓</code> độ sáng); <code>aria-valuetext</code> đọc mã màu hiện tại.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColorPickerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'string (model)',
      default: `'#000000'`,
      description: 'Màu đang chọn dạng hex #rrggbb, two-way binding qua [(value)].',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá.',
    },
  ];
}
