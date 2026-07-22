import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GButton, GLocaleService, GToastPosition, GToastService } from 'ngx-opendesign';
import { overlayCopyFor } from '../../pages/overlay-copy';

@Component({
  selector: 'docs-toast-position-demo',
  imports: [GButton],
  template: `
    <div class="toast-position-demo__positions">
      @for (position of positions; track position) {
        <button
          g-button
          [variant]="current() === position ? 'primary' : 'outline'"
          (click)="choosePosition(position)"
        >
          {{ labels()[position] }}
        </button>
      }
    </div>
    <button g-button variant="secondary" class="toast-position-demo__trigger" (click)="show()">
      {{ demo().positionTrigger }}
    </button>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .toast-position-demo__positions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
    }
    /* :host là flex column nên con mặc định stretch full-width — ghém nút trigger về trái, rộng
       theo nội dung. */
    .toast-position-demo__trigger {
      align-self: flex-start;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPositionDemo {
  private readonly toast = inject(GToastService);
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => overlayCopyFor(this.i18n.tag()).toast.demo);

  protected readonly labels = computed(() => this.demo().positionLabels);
  protected readonly positions: GToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];
  protected readonly current = signal<GToastPosition>('top-right');

  protected choosePosition(position: GToastPosition): void {
    this.current.set(position);
    this.toast.setPosition(position);
  }

  protected show(): void {
    this.toast.show({ message: this.demo().positionedMessage(this.labels()[this.current()]) });
  }
}
