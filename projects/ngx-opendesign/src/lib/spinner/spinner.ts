import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { GLocaleService } from '../core/locale';

export type GSpinnerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'g-spinner',
  template: `
    <svg class="g-spinner__circle" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" />
    </svg>
  `,
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-spinner',
    role: 'status',
    '[class.g-spinner--sm]': 'size() === "sm"',
    '[class.g-spinner--md]': 'size() === "md"',
    '[class.g-spinner--lg]': 'size() === "lg"',
    '[class.g-spinner--xl]': 'size() === "xl"',
    '[class.g-spinner--2xl]': 'size() === "2xl"',
  },
})
export class GSpinner {
  readonly size = input<GSpinnerSize>('md');

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  constructor() {
    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
        el.setAttribute('aria-label', this.t().common.loading);
      }
    });
  }
}
