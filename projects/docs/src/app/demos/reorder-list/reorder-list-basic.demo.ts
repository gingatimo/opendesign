import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GReorderList } from 'ngx-opendesign';

interface Task {
  id: number;
  name: string;
}

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
      Thứ tự hiện tại: <b>{{ order() }}</b>
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
  protected readonly tasks = signal<Task[]>([
    { id: 1, name: 'Thiết kế giao diện' },
    { id: 2, name: 'Dựng API' },
    { id: 3, name: 'Viết test' },
    { id: 4, name: 'Kiểm thử QA' },
    { id: 5, name: 'Phát hành' },
  ]);

  protected readonly order = computed(() =>
    this.tasks()
      .map((t) => t.name)
      .join(' → '),
  );
}
