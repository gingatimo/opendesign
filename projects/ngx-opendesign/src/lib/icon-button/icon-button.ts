import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { gDevWarning } from '../core/dev-warning';
import { GButtonSize, GButtonVariant } from '../button/button';

@Component({
  selector: 'button[g-icon-button], a[g-icon-button]',
  template: `<ng-content />`,
  styleUrl: './icon-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-icon-button',
    '[class.g-icon-button--primary]': 'variant() === "primary"',
    '[class.g-icon-button--secondary]': 'variant() === "secondary"',
    '[class.g-icon-button--outline]': 'variant() === "outline"',
    '[class.g-icon-button--ghost]': 'variant() === "ghost"',
    '[class.g-icon-button--danger]': 'variant() === "danger"',
    '[class.g-icon-button--sm]': 'size() === "sm"',
    '[class.g-icon-button--md]': 'size() === "md"',
    '[class.g-icon-button--lg]': 'size() === "lg"',
  },
})
export class GIconButton {
  readonly variant = input<GButtonVariant>('ghost');
  readonly size = input<GButtonSize>('md');

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
        gDevWarning('GIconButton', 'icon button needs aria-label or aria-labelledby');
      }
    });
  }
}
