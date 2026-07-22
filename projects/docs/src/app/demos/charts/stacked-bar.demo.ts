import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GStackedBar } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-stacked-bar-demo',
  imports: [GStackedBar],
  template: `
    <div class="sb-demo">
      <g-stacked-bar
        [title]="copy().languagesTitle"
        [data]="copy().languages"
        [exportable]="true"
        [zoomable]="true"
        [ariaLabel]="copy().languagesAriaLabel"
      />
      <g-stacked-bar
        [title]="copy().ordersTitle"
        [data]="copy().orders"
        [barHeight]="20"
        [showPercent]="false"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .sb-demo {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-7);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedBarDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).stackedBar.demo);
}
