import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GRating } from 'ngx-opendesign';

@Component({
  selector: 'docs-rating-basic-demo',
  imports: [GRating],
  template: `
    <p class="rt-demo__cap">Chọn điểm (bấm hoặc rê, phím ←/→)</p>
    <div class="rt-demo__row">
      <g-rating [(value)]="score" label="Chất lượng sản phẩm" />
      <span class="rt-demo__val">{{ score() }} / 5</span>
    </div>

    <p class="rt-demo__cap">Các cỡ</p>
    <div class="rt-demo__row">
      <g-rating size="sm" [(value)]="score" />
      <g-rating size="md" [(value)]="score" />
      <g-rating size="lg" [(value)]="score" />
    </div>

    <p class="rt-demo__cap">Nửa sao (allowHalf) — rê nửa trái/phải của sao</p>
    <div class="rt-demo__row">
      <g-rating allowHalf [(value)]="half" size="lg" label="Độ hài lòng" />
      <span class="rt-demo__val">{{ half() }} / 5</span>
    </div>

    <p class="rt-demo__cap">Chỉ đọc (readonly)</p>
    <div class="rt-demo__row">
      <g-rating [value]="4.5" allowHalf readonly />
      <span class="rt-demo__val">Đánh giá trung bình 4,5</span>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .rt-demo__cap {
      margin: var(--g-space-4) 0 var(--g-space-2);
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .rt-demo__cap:first-child {
      margin-top: 0;
    }
    .rt-demo__row {
      display: flex;
      align-items: center;
      gap: var(--g-space-4);
    }
    .rt-demo__val {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingBasicDemo {
  protected readonly score = signal(3);
  protected readonly half = signal(2.5);
}
