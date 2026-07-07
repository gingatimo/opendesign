import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type GBadgeVariant = 'neutral' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'g-badge',
  template: `<ng-content />`,
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-badge',
    '[class.g-badge--neutral]': 'variant() === "neutral"',
    '[class.g-badge--success]': 'variant() === "success"',
    '[class.g-badge--warning]': 'variant() === "warning"',
    '[class.g-badge--danger]': 'variant() === "danger"',
  },
})
export class GBadge {
  readonly variant = input<GBadgeVariant>('neutral');
}
