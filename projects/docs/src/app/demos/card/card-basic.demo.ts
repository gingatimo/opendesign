import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GCard, GCardFooter, GCardHeader, GLocaleService } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-card-basic-demo',
  imports: [GCard, GCardHeader, GCardFooter],
  template: `
    <g-card>
      <p>{{ demo().simple }}</p>
    </g-card>

    <g-card>
      <div gCardHeader>{{ demo().header }}</div>
      <p>{{ demo().body }}</p>
      <div gCardFooter>{{ demo().footer }}</div>
    </g-card>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
      max-width: 360px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).card.demo);
}
