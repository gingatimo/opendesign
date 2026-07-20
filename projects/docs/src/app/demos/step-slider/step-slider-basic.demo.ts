import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GStepSlider } from 'ngx-opendesign';

@Component({
  selector: 'docs-step-slider-basic-demo',
  imports: [GStepSlider],
  template: `
    <g-step-slider
      class="ss-demo"
      [steps]="6"
      [(value)]="level"
      startLabel="Faster"
      endLabel="Smarter"
      ariaLabel="Nhanh hơn hay thông minh hơn"
    />
    <p class="ss-demo__val">
      Bậc đang chọn: <b>{{ level() + 1 }} / 6</b>
    </p>
  `,
  styles: `
    .ss-demo {
      max-width: 420px;
    }
    .ss-demo__val {
      margin: var(--g-space-3) 0 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepSliderBasicDemo {
  protected readonly level = signal(3);
}
