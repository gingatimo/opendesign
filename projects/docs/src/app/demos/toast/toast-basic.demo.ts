import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GButton, GLocaleService, GToastService } from 'ngx-opendesign';
import { overlayCopyFor } from '../../pages/overlay-copy';

@Component({
  selector: 'docs-toast-basic-demo',
  imports: [GButton],
  template: `
    <button g-button variant="outline" (click)="show(demo().normalMessage)">
      {{ demo().normalButton }}
    </button>
    <button g-button variant="outline" (click)="show(demo().successMessage, 'success')">
      {{ demo().successButton }}
    </button>
    <button g-button variant="outline" (click)="show(demo().dangerMessage, 'danger')">
      {{ demo().dangerButton }}
    </button>
    <button g-button variant="outline" (click)="showWithTitle()">{{ demo().titledButton }}</button>
    <button g-button variant="outline" (click)="showPersistent()">
      {{ demo().persistentButton }}
    </button>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicDemo {
  private readonly toast = inject(GToastService);
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => overlayCopyFor(this.i18n.tag()).toast.demo);

  protected show(message: string, variant?: 'success' | 'danger'): void {
    this.toast.show({ message, variant });
  }

  protected showWithTitle(): void {
    this.toast.show({
      title: this.demo().title,
      message: this.demo().titledMessage,
      variant: 'success',
    });
  }

  protected showPersistent(): void {
    this.toast.show({ message: this.demo().persistentMessage, duration: 0 });
  }
}
