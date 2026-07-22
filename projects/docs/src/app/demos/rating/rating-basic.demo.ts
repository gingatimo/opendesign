import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GRating } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-rating-basic-demo',
  imports: [GRating],
  template: `
    <p class="rt-demo__cap">{{ demo().choose }}</p>
    <div class="rt-demo__row">
      <g-rating [(value)]="score" [label]="demo().productLabel" />
      <span class="rt-demo__val">{{ score() }} / 5</span>
    </div>

    <p class="rt-demo__cap">{{ demo().sizes }}</p>
    <div class="rt-demo__row">
      <g-rating size="sm" [(value)]="score" />
      <g-rating size="md" [(value)]="score" />
      <g-rating size="lg" [(value)]="score" />
    </div>

    <p class="rt-demo__cap">{{ demo().half }}</p>
    <div class="rt-demo__row">
      <g-rating allowHalf [(value)]="half" size="lg" [label]="demo().satisfactionLabel" />
      <span class="rt-demo__val">{{ half() }} / 5</span>
    </div>

    <p class="rt-demo__cap">{{ demo().readonly }}</p>
    <div class="rt-demo__row">
      <g-rating [value]="4.5" allowHalf readonly />
      <span class="rt-demo__val">{{ demo().average }}</span>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).rating.demo);
  protected readonly score = signal(3);
  protected readonly half = signal(2.5);
}
