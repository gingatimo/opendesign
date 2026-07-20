import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GStepSlider } from 'ngx-opendesign';

@Component({
  selector: 'docs-step-slider-basic-demo',
  imports: [GStepSlider],
  template: `
    <p class="ss-demo__cap">Cỡ md (mặc định)</p>
    <g-step-slider
      class="ss-demo"
      [steps]="6"
      [(value)]="level"
      startLabel="Faster"
      endLabel="Smarter"
      ariaLabel="Nhanh hơn hay thông minh hơn"
    />

    <p class="ss-demo__cap">Cỡ sm</p>
    <g-step-slider
      class="ss-demo"
      size="sm"
      [steps]="6"
      [(value)]="level"
      startLabel="Faster"
      endLabel="Smarter"
      ariaLabel="Nhanh hơn hay thông minh hơn (nhỏ)"
    />

    <p class="ss-demo__cap">Cỡ xs</p>
    <g-step-slider
      class="ss-demo"
      size="xs"
      [steps]="6"
      [(value)]="level"
      startLabel="Faster"
      endLabel="Smarter"
      ariaLabel="Nhanh hơn hay thông minh hơn (rất nhỏ)"
    />

    <p class="ss-demo__val">
      Bậc đang chọn: <b>{{ level() + 1 }} / 6</b>
    </p>
  `,
  styles: `
    :host {
      display: block;
    }
    .ss-demo {
      max-width: 420px;
    }
    .ss-demo__cap {
      margin: var(--g-space-4) 0 var(--g-space-2);
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .ss-demo__cap:first-child {
      margin-top: 0;
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
