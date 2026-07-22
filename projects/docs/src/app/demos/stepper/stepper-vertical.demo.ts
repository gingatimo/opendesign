import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GButton, GLocaleService, GStep, GStepper } from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-stepper-vertical-demo',
  imports: [GStepper, GStep, GButton],
  template: `
    <g-stepper orientation="vertical" [(activeStep)]="step">
      <g-step [label]="copy().info">
        <p>{{ copy().infoContent }}</p>
      </g-step>
      <g-step [label]="copy().address">
        <p>{{ copy().addressContent }}</p>
      </g-step>
      <g-step [label]="copy().confirm">
        <p>{{ copy().verticalConfirmContent }}</p>
      </g-step>
    </g-stepper>

    <div class="actions">
      <button g-button variant="outline" (click)="step.set(step() - 1)" [disabled]="step() === 0">
        {{ copy().back }}
      </button>
      <button g-button (click)="step.set(step() + 1)" [disabled]="step() === 2">
        {{ copy().next }}
      </button>
    </div>
  `,
  styles: `
    .actions {
      display: flex;
      gap: var(--g-space-2);
      margin-top: var(--g-space-4);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperVerticalDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).stepper.demo);
  protected readonly step = signal(0);
}
