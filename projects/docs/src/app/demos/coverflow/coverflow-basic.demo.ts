import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GCoverflow } from 'ngx-opendesign';

interface Card {
  label: string;
  color: string;
}

interface MixedCard extends Card {
  wide: boolean;
}

@Component({
  selector: 'docs-coverflow-basic-demo',
  imports: [GCoverflow],
  template: `
    <p class="cf-demo__label">Card cùng kích thước — loop + dot điều hướng</p>
    <g-coverflow class="cf-demo" [active]="2" loop>
      @for (c of cards; track c.label) {
        <div class="cf-demo__card cf-demo__card--equal" [style.background]="c.color">
          {{ c.label }}
        </div>
      }
    </g-coverflow>

    <p class="cf-demo__label">Card khác kích thước — thẻ ngang (thẻ tín dụng) xen thẻ dọc</p>
    <g-coverflow class="cf-demo" [active]="1">
      @for (c of mixed; track $index) {
        <div
          class="cf-demo__card"
          [class.cf-demo__card--wide]="c.wide"
          [class.cf-demo__card--tall]="!c.wide"
          [style.background]="c.color"
        >
          {{ c.label }}
        </div>
      }
    </g-coverflow>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
    }
    .cf-demo {
      max-width: 640px;
    }
    .cf-demo__label {
      margin: 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .cf-demo__card {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--g-radius-lg);
      color: #fff;
      font-weight: 600;
      font-size: var(--g-font-size-lg);
      text-align: center;
      box-shadow: var(--g-shadow-md);
    }
    .cf-demo__card--equal {
      width: 360px;
      height: 220px;
    }
    /* Thẻ ngang kiểu thẻ tín dụng (tỉ lệ ~1.7). */
    .cf-demo__card--wide {
      width: 340px;
      height: 200px;
    }
    /* Thẻ dọc. */
    .cf-demo__card--tall {
      width: 200px;
      height: 300px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoverflowBasicDemo {
  protected readonly cards: Card[] = [
    { label: 'Card 1', color: '#4f46e5' },
    { label: 'Card 2', color: '#0d9488' },
    { label: 'Card 3', color: '#d97706' },
    { label: 'Card 4', color: '#db2777' },
    { label: 'Card 5', color: '#0891b2' },
    { label: 'Card 6', color: '#7c3aed' },
  ];

  protected readonly mixed: MixedCard[] = [
    { label: 'Thẻ tín dụng', wide: true, color: '#4f46e5' },
    { label: 'Thẻ dọc', wide: false, color: '#0d9488' },
    { label: 'Thẻ tín dụng', wide: true, color: '#d97706' },
    { label: 'Thẻ dọc', wide: false, color: '#db2777' },
    { label: 'Thẻ tín dụng', wide: true, color: '#0891b2' },
  ];
}
