import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GRangeSlider } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-range-slider-basic-demo',
  imports: [GRangeSlider],
  template: `
    <div class="row">
      <g-range-slider
        [(from)]="from"
        [(to)]="to"
        [ariaLabelFrom]="demo().fromLabel"
        [ariaLabelTo]="demo().toLabel"
      />
      <span class="value">{{ from() }} – {{ to() }}</span>
    </div>

    <div class="row">
      <g-range-slider
        [(from)]="clipFrom"
        [(to)]="clipTo"
        max="221"
        step="0.5"
        [ariaLabelFrom]="demo().fromLabel"
        [ariaLabelTo]="demo().toLabel"
      />
      <span class="value">{{ clipFrom() }}s → {{ clipTo() }}s</span>
    </div>

    <div class="row">
      <g-range-slider
        [from]="30"
        [to]="70"
        disabled
        [ariaLabelFrom]="demo().fromLabel"
        [ariaLabelTo]="demo().toLabel"
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
    .row g-range-slider {
      flex: 1;
    }
    .value {
      flex: none;
      min-width: 88px;
      font-variant-numeric: tabular-nums;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RangeSliderBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).rangeSlider.demo);
  protected readonly from = signal(20);
  protected readonly to = signal(60);
  protected readonly clipFrom = signal(45);
  protected readonly clipTo = signal(90);
}
