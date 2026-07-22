import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { GButton, GLocaleService, GProgressCircle } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

const TOTAL_MS = 10_000;
const TICK_MS = 100;

@Component({
  selector: 'docs-progress-circle-demo',
  imports: [GProgressCircle, GButton],
  template: `
    <div class="pc-demo">
      <g-progress-circle
        [value]="percent()"
        [size]="140"
        [stroke]="10"
        [attr.aria-label]="demo().countdown"
      >
        <div class="pc-demo__center">
          <span class="pc-demo__num">{{ secondsLeft() }}</span>
          <span class="pc-demo__unit">{{ demo().unit }}</span>
        </div>
      </g-progress-circle>

      <div class="pc-demo__controls">
        <button g-button variant="outline" (click)="toggle()">
          {{ running() ? demo().pause : remaining() <= 0 ? demo().rerun : demo().resume }}
        </button>
        <button g-button variant="ghost" (click)="restart()">{{ demo().reset }}</button>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .pc-demo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--g-space-4);
    }
    .pc-demo__center {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.1;
    }
    .pc-demo__num {
      font-size: 2rem;
      font-weight: 700;
    }
    .pc-demo__unit {
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
    }
    .pc-demo__controls {
      display: flex;
      gap: var(--g-space-2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressCircleDemo {
  private timer?: ReturnType<typeof setInterval>;
  private readonly i18n = inject(GLocaleService);

  protected readonly remaining = signal(TOTAL_MS); // mili-giây còn lại
  protected readonly running = signal(false);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).progress.demo);

  protected readonly percent = computed(() => (this.remaining() / TOTAL_MS) * 100);
  protected readonly secondsLeft = computed(() => Math.ceil(this.remaining() / 1000));

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
    this.start();
  }

  protected toggle(): void {
    if (this.running()) {
      this.stop();
      return;
    }
    if (this.remaining() <= 0) this.remaining.set(TOTAL_MS); // hết giờ → chạy lại
    this.start();
  }

  protected restart(): void {
    this.stop();
    this.remaining.set(TOTAL_MS);
    this.start();
  }

  // Tick mỗi 100ms (không phải mỗi giây) để vòng tròn vơi mượt; nhãn hiện số giây làm tròn lên.
  private start(): void {
    this.running.set(true);
    this.timer = setInterval(() => {
      const next = this.remaining() - TICK_MS;
      if (next <= 0) {
        this.remaining.set(0);
        this.stop();
      } else {
        this.remaining.set(next);
      }
    }, TICK_MS);
  }

  private stop(): void {
    this.running.set(false);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
