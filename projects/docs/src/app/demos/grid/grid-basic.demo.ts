import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GCard, GGrid } from 'ngx-opendesign';

@Component({
  selector: 'docs-grid-basic-demo',
  imports: [GGrid, GCard],
  template: `
    <h4>3 cột đều</h4>
    <g-grid [cols]="3" [gap]="3">
      @for (n of items; track n) {
        <g-card>Ô {{ n }}</g-card>
      }
    </g-grid>

    <h4>Responsive — tự xếp theo bề rộng tối thiểu 160px</h4>
    <g-grid minColWidth="160px" [gap]="3">
      @for (n of items; track n) {
        <g-card>Ô {{ n }}</g-card>
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
  protected readonly items = [1, 2, 3, 4, 5, 6];
}
