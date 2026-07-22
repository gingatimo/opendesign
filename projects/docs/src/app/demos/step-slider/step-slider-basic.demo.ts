import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GStepSlider } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-step-slider-basic-demo',
  imports: [GStepSlider],
  template: `
    <p class="ss-demo__cap">{{ demo().md }}</p>
    <g-step-slider
      class="ss-demo"
      [steps]="6"
      [(value)]="level"
      startLabel="Faster"
      endLabel="Smarter"
      [ariaLabel]="demo().ariaMd"
      [attr.ariaLabel]="demo().ariaMd"
    />

    <p class="ss-demo__cap">{{ demo().sm }}</p>
    <g-step-slider
      class="ss-demo"
      size="sm"
      [steps]="6"
      [(value)]="level"
      startLabel="Faster"
      endLabel="Smarter"
      [ariaLabel]="demo().ariaSm"
      [attr.ariaLabel]="demo().ariaSm"
    />

    <p class="ss-demo__cap">{{ demo().xs }}</p>
    <g-step-slider
      class="ss-demo"
      size="xs"
      [steps]="6"
      [(value)]="level"
      startLabel="Faster"
      endLabel="Smarter"
      [ariaLabel]="demo().ariaXs"
      [attr.ariaLabel]="demo().ariaXs"
    />

    <p class="ss-demo__val">
      {{ demo().selected(level() + 1, 6) }}
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).stepSlider.demo);
  protected readonly level = signal(3);
}
