import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GCoverflow } from 'ngx-opendesign';

interface Card {
  label: string;
  color: string;
}

@Component({
  selector: 'docs-coverflow-basic-demo',
  imports: [GCoverflow],
  template: `
    <g-coverflow class="cf-demo" [active]="2" loop>
      @for (c of cards; track c.label) {
        <div class="cf-demo__card" [style.background]="c.color">{{ c.label }}</div>
      }
    </g-coverflow>
  `,
  styles: `
    .cf-demo {
      max-width: 640px;
    }
    .cf-demo__card {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 360px;
      height: 220px;
      border-radius: var(--g-radius-lg);
      color: #fff;
      font-weight: 600;
      font-size: var(--g-font-size-lg);
      box-shadow: var(--g-shadow-md);
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
}
