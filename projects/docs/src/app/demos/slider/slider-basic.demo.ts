import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GSlider } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-slider-basic-demo',
  imports: [GSlider],
  template: `
    <div class="row">
      <g-slider
        [(value)]="value"
        [ariaLabel]="demo().valueLabel"
        [attr.ariaLabel]="demo().valueLabel"
      />
      <span class="value">{{ value() }}</span>
    </div>

    <div class="row">
      <g-slider
        [(value)]="temp"
        min="16"
        max="30"
        step="0.5"
        [ariaLabel]="demo().temperatureLabel"
        [attr.ariaLabel]="demo().temperatureLabel"
      />
      <span class="value">{{ temp() }}°C</span>
    </div>

    <div class="row">
      <g-slider
        [value]="40"
        disabled
        [ariaLabel]="demo().lockedLabel"
        [attr.ariaLabel]="demo().lockedLabel"
      />
      <span class="value">{{ demo().disabled }}</span>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
      max-width: 360px;
    }
    .row {
      display: flex;
      align-items: center;
      gap: var(--g-space-4);
    }
    .row g-slider {
      flex: 1;
    }
    .value {
      flex: none;
      min-width: 64px;
      font-variant-numeric: tabular-nums;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).slider.demo);
  protected readonly value = signal(50);
  protected readonly temp = signal(22);
}
