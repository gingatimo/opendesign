import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { StepSliderBasicDemo } from '../demos/step-slider/step-slider-basic.demo';

@Component({
  imports: [StepSliderBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Step Slider</h1>
    <p>
      Thanh trượt <b>rời rạc</b> dạng pill: một dải pill chứa <code>steps</code> chấm đều nhau, chấm
      đang chọn thay bằng <b>thumb</b> nổi lên; kèm <b>nhãn hai đầu</b> (vd. Faster / Smarter). Chọn
      bằng bấm/kéo trên dải hoặc phím ←/→ (Home/End về hai đầu). Dùng được cả
      <code>formControlName</code>/<code>ngModel</code> lẫn <code>[(value)]</code> — chỉ số bậc
      <code>0..steps-1</code>. Khác <code>GSlider</code> (trượt liên tục có tay cầm).
    </p>

    <docs-demo-section>
      <docs-step-slider-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/step-slider/step-slider-basic.demo.ts" />

    <h2>API — GStepSlider</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Dải là <code>role="slider"</code> có <code>tabindex</code>,
        <code>aria-valuemin/max/now</code> và <code>aria-label</code>; chỉnh bằng phím mũi tên.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StepSliderPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description:
        'Chỉ số bậc đang chọn (`[(value)]` hoặc `formControlName`/`ngModel`), 0..steps-1.',
    },
    {
      name: 'steps',
      type: 'number',
      default: '5',
      description: 'Số bậc (số chấm).',
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md'",
      default: "'md'",
      description: 'Cỡ dải: md (40px), sm (24px) hoặc xs (20px, gọn nhất).',
    },
    {
      name: 'startLabel / endLabel',
      type: 'string',
      default: "''",
      description: 'Nhãn hai đầu dải (không đặt thì ẩn hàng nhãn).',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Mức'",
      description: 'Nhãn cho screen reader.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá (cũng tự theo `formControl.disable()`).',
    },
  ];
}
