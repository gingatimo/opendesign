import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { GLocaleService, GReorderList } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

@Component({
  selector: 'docs-reorder-list-basic-demo',
  imports: [GReorderList],
  template: `
    <g-reorder-list class="rl-demo" [(items)]="tasks">
      <ng-template let-task let-i="index">
        <span class="rl-demo__num">{{ i + 1 }}</span>
        <span>{{ task.name }}</span>
      </ng-template>
    </g-reorder-list>

    <p class="rl-demo__order">
      {{ copy().currentOrder }} <b>{{ order() }}</b>
    </p>
  `,
  styles: `
    .rl-demo {
      display: block;
      max-width: 360px;
    }
    .rl-demo__num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      margin-right: var(--g-space-2);
      border-radius: var(--g-radius-pill);
      background: var(--g-surface-sunken, var(--g-border));
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
      font-weight: 600;
    }
    .rl-demo__order {
      margin: var(--g-space-3) 0 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReorderListBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).reorderList.demo);
  protected readonly tasks = signal(this.copy().tasks);

  protected readonly order = computed(() =>
    this.tasks()
      .map((t) => t.name)
      .join(' → '),
  );

  constructor() {
    effect(() => {
      this.tasks.set([...this.copy().tasks]);
    });
  }
}
