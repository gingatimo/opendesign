import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

@Component({
  selector: 'g-card',
  template: `<ng-content />`,
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-card',
  },
})
export class GCard {}

@Directive({
  selector: '[gCardHeader]',
  host: {
    class: 'g-card__header',
  },
})
export class GCardHeader {}

@Directive({
  selector: '[gCardFooter]',
  host: {
    class: 'g-card__footer',
  },
})
export class GCardFooter {}
