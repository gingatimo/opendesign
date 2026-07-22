import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GAlert, GButton, GLocaleService } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-alert-basic-demo',
  imports: [GAlert, GButton],
  template: `
    <g-alert>{{ demo().neutral }}</g-alert>

    <g-alert variant="success" [heading]="demo().savedHeading"> {{ demo().saved }} </g-alert>

    <g-alert variant="warning" [heading]="demo().expiringHeading">{{ demo().expiring }}</g-alert>

    <g-alert
      variant="danger"
      [heading]="demo().failedHeading"
      [dismissible]="true"
      [(open)]="showError"
    >
      {{ demo().failed }}
    </g-alert>

    @if (!showError()) {
      <button g-button variant="outline" (click)="showError.set(true)">
        {{ demo().showAgain }}
      </button>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--g-space-3);
    }
    :host g-alert {
      align-self: stretch;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).alert.demo);
  protected readonly showError = signal(true);
}
