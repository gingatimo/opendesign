import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GSlider } from 'ngx-opendesign';

@Component({
  selector: 'docs-slider-basic-demo',
  imports: [GSlider],
  template: `
    <div class="row">
      <g-slider [(value)]="value" ariaLabel="Giá trị" />
      <span class="value">{{ value() }}</span>
    </div>

    <div class="row">
      <g-slider [(value)]="temp" min="16" max="30" step="0.5" ariaLabel="Nhiệt độ" />
      <span class="value">{{ temp() }}°C</span>
    </div>

    <div class="row">
      <g-slider [value]="40" disabled ariaLabel="Đã khoá" />
      <span class="value">Disabled</span>
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
  protected readonly value = signal(50);
  protected readonly temp = signal(22);
}
