import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SliderBasicDemo } from '../demos/slider/slider-basic.demo';

@Component({
  imports: [SliderBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Slider</h1>
    <p>
      Thanh trượt chọn một giá trị số trong khoảng <code>min</code>–<code>max</code> theo bước
      <code>step</code>. Bọc <code>input[type="range"]</code> gốc nên điều khiển được bằng chuột,
      chạm và bàn phím. Giá trị hai chiều qua <code>[(value)]</code>; phần đã chọn được tô màu
      chính.
    </p>

    <docs-demo-section>
      <docs-slider-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/slider/slider-basic.demo.ts" />

    <h2>API — GSlider</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Dùng <code>input[type="range"]</code> gốc nên có sẵn <code>role="slider"</code>,
        <code>aria-valuenow/min/max</code> và điều hướng bàn phím (<code>←→</code>,
        <code>Home</code>, <code>End</code>).
      </li>
      <li>Cấp tên qua <code>ariaLabel</code> (hoặc liên kết nhãn ngoài).</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SliderPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'number (model)',
      default: '0',
      description: 'Giá trị đang chọn, two-way binding qua [(value)].',
    },
    {
      name: 'min',
      type: 'number',
      default: '0',
      description: 'Giá trị nhỏ nhất.',
    },
    {
      name: 'max',
      type: 'number',
      default: '100',
      description: 'Giá trị lớn nhất.',
    },
    {
      name: 'step',
      type: 'number',
      default: '1',
      description: 'Bước nhảy giữa hai giá trị liền kề.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá thanh trượt.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Tên cho screen reader.',
    },
  ];
}
