import { ChangeDetectionStrategy, Component, Directive, input } from '@angular/core';
import { GIcon } from '../icon/icon';
import type { GIconGlyph } from '../icon/icons';

export type GEmptyStateSize = 'compact' | 'comfortable';

@Directive({
  selector: '[gEmptyStateActions]',
})
export class GEmptyStateActions {}

@Component({
  selector: 'g-empty-state',
  imports: [GIcon],
  template: `
    @if (icon()) {
      <g-icon class="g-empty-state__icon" [icon]="icon()!" size="lg" aria-hidden="true" />
    }
    <div class="g-empty-state__heading">{{ heading() }}</div>
    @if (description()) {
      <p class="g-empty-state__description">{{ description() }}</p>
    }
    <div class="g-empty-state__actions">
      <ng-content select="[gEmptyStateActions]" />
    </div>
  `,
  host: {
    class: 'g-empty-state',
    '[class.g-empty-state--compact]': 'size() === "compact"',
    '[class.g-empty-state--comfortable]': 'size() === "comfortable"',
  },
  styleUrl: './empty-state.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GEmptyState {
  readonly icon = input<GIconGlyph>();
  readonly heading = input.required<string>();
  readonly description = input<string>();
  readonly size = input<GEmptyStateSize>('comfortable');
}
