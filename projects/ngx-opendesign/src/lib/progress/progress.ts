import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { GLocaleService } from '../core/locale';

@Component({
  selector: 'g-progress',
  template: `
    <span class="g-progress__bar" [style.width.%]="indeterminate() ? null : clampedValue()"></span>
  `,
  styleUrl: './progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-progress',
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'indeterminate() ? null : clampedValue()',
    '[class.g-progress--indeterminate]': 'indeterminate()',
  },
})
export class GProgress {
  readonly value = input(0, { transform: numberAttribute });
  readonly indeterminate = input(false, { transform: booleanAttribute });

  protected readonly clampedValue = computed(() => {
    const value = this.value();
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  constructor() {
    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')) {
        el.setAttribute('aria-label', this.t().progress.label);
      }
    });
  }
}
