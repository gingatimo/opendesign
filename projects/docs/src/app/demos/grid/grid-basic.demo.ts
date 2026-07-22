import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GCard, GGrid, GLocaleService } from 'ngx-opendesign';
import { layoutCopyFor } from '../../pages/layout-copy';

@Component({
  selector: 'docs-grid-basic-demo',
  imports: [GGrid, GCard],
  template: `
    <h4>{{ copy().equalTitle }}</h4>
    <g-grid [cols]="3" [gap]="3">
      @for (n of items; track n) {
        <g-card>{{ copy().cell(n) }}</g-card>
      }
    </g-grid>

    <h4>{{ copy().responsiveTitle }}</h4>
    <g-grid minColWidth="160px" [gap]="3">
      @for (n of items; track n) {
        <g-card>{{ copy().cell(n) }}</g-card>
      }
    </g-grid>
  `,
  styles: `
    :host {
      display: block;
    }
    h4 {
      margin: 0 0 var(--g-space-2);
    }
    h4:nth-of-type(2) {
      margin-top: var(--g-space-5);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => layoutCopyFor(this.i18n.tag()).grid.demo);
  protected readonly items = [1, 2, 3, 4, 5, 6];
}
