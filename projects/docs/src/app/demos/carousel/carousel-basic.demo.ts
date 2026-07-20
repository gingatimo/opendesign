import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GCarousel } from 'ngx-opendesign';

interface MixedCard {
  label: string;
  wide: boolean;
}

@Component({
  selector: 'docs-carousel-basic-demo',
  imports: [GCarousel],
  template: `
    <p class="cr-demo__label">Item cùng kích thước — nút flanking (mặc định, không đè lên card)</p>
    <g-carousel>
      @for (n of equalItems; track n) {
        <div class="cr-demo__card cr-demo__card--equal">Thẻ {{ n }}</div>
      }
    </g-carousel>

    <p class="cr-demo__label">Nút overlay — đè lên track, mờ nhẹ lúc nghỉ, rê vào hiện rõ</p>
    <g-carousel navPlacement="overlay">
      @for (n of equalItems; track n) {
        <div class="cr-demo__card cr-demo__card--equal">Thẻ {{ n }}</div>
      }
    </g-carousel>

    <p class="cr-demo__label">
      Item khác kích thước (thẻ ngang xen thẻ dọc) — <code>align="center"</code> căn dọc giữa
    </p>
    <g-carousel align="center">
      @for (c of mixedItems; track $index) {
        <div
          class="cr-demo__card"
          [class.cr-demo__card--wide]="c.wide"
          [class.cr-demo__card--tall]="!c.wide"
        >
          {{ c.label }}
        </div>
      }
    </g-carousel>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
    .cr-demo__label {
      margin: var(--g-space-3) 0 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .cr-demo__card {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--g-space-3);
      border-radius: var(--g-radius-md);
      background: var(--g-primary);
      color: var(--g-on-primary);
      font-weight: 600;
      text-align: center;
    }
    .cr-demo__card--equal {
      width: 180px;
      height: 110px;
    }
    /* Thẻ ngang kiểu thẻ tín dụng (tỉ lệ ~1.6). */
    .cr-demo__card--wide {
      width: 300px;
      height: 180px;
    }
    /* Thẻ dọc. */
    .cr-demo__card--tall {
      width: 170px;
      height: 260px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselBasicDemo {
  protected readonly equalItems = [1, 2, 3, 4, 5, 6, 7, 8];
  protected readonly mixedItems: MixedCard[] = [
    { label: 'Thẻ tín dụng', wide: true },
    { label: 'Thẻ dọc', wide: false },
    { label: 'Thẻ tín dụng', wide: true },
    { label: 'Thẻ dọc', wide: false },
    { label: 'Thẻ tín dụng', wide: true },
    { label: 'Thẻ dọc', wide: false },
  ];
}
