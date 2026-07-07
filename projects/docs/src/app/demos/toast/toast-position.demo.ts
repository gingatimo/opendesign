import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GButton, GToastPosition, GToastService } from 'ngx-opendesign';

const POSITION_LABELS: Record<GToastPosition, string> = {
  'top-left': 'Trên trái',
  'top-center': 'Trên giữa',
  'top-right': 'Trên phải (mặc định)',
  'bottom-left': 'Dưới trái',
  'bottom-center': 'Dưới giữa',
  'bottom-right': 'Dưới phải',
};

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
          {{ labels[position] }}
        </button>
      }
    </div>
    <button g-button variant="secondary" class="toast-position-demo__trigger" (click)="show()">
      Bắn toast ở vị trí đã chọn
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

  protected readonly labels = POSITION_LABELS;
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
    this.toast.show({ message: `Toast ở vị trí "${this.labels[this.current()]}"` });
  }
}
