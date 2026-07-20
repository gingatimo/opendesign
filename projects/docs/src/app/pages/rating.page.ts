import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { RatingBasicDemo } from '../demos/rating/rating-basic.demo';

@Component({
  imports: [RatingBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Rating</h1>
    <p>
      Chấm điểm bằng <b>sao</b>: bấm hoặc rê để chọn (rê xem trước), hoặc phím ←/→ (Home/End về hai
      đầu). Bấm lại đúng mức đang chọn để <b>bỏ chọn</b> (về 0). Bật <code>allowHalf</code> cho
      <b>nửa sao</b> (bước 0.5, chọn theo nửa trái/phải). Đặt <code>readonly</code> để chỉ hiển thị
      (vd. điểm trung bình). Dùng được cả <code>formControlName</code>/<code>ngModel</code> lẫn
      <code>[(value)]</code> — số sao <code>0..max</code>.
    </p>

    <docs-demo-section>
      <docs-rating-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/rating/rating-basic.demo.ts" />

    <h2>API — GRating</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Khi chọn được: <code>role="slider"</code> có <code>tabindex</code>,
        <code>aria-valuemin/max/now</code> và <code>aria-label</code>; chỉnh bằng phím mũi tên.
      </li>
      <li>
        Khi <code>readonly</code>: <code>role="img"</code> với nhãn tự sinh
        <i>"{{ '{' }}value{{ '}' }} trên {{ '{' }}max{{ '}' }} sao"</i>.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RatingPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'number',
      default: '0',
      description: 'Số sao đang chọn (`[(value)]` hoặc `formControlName`/`ngModel`), 0..max.',
    },
    {
      name: 'max',
      type: 'number',
      default: '5',
      description: 'Tổng số sao.',
    },
    {
      name: 'allowHalf',
      type: 'boolean',
      default: 'false',
      description: 'Cho phép nửa sao (bước 0.5, chọn theo nửa trái/phải của sao).',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Cỡ sao: sm (16px), md (20px) hoặc lg (28px).',
    },
    {
      name: 'readonly',
      type: 'boolean',
      default: 'false',
      description: 'Chỉ hiển thị, không cho chọn (dùng cho điểm trung bình…).',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá (cũng tự theo `formControl.disable()`).',
    },
    {
      name: 'label',
      type: 'string',
      default: "'Đánh giá'",
      description: 'Nhãn screen reader cho chế độ chọn.',
    },
  ];
}
