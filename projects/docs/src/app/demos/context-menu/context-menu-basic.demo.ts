import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GContextMenu, GLocaleService, GMenuItem } from 'ngx-opendesign';
import { overlayCopyFor } from '../../pages/overlay-copy';

@Component({
  selector: 'docs-context-menu-basic-demo',
  imports: [GContextMenu, GMenuItem],
  template: `
    <div class="cm-demo__target" [gContextMenu]="menu">{{ demo().target }}</div>
    <p class="cm-demo__hint">
      {{ demo().lastAction }} <b>{{ last() ?? demo().none }}</b>
    </p>

    <ng-template #menu>
      <button g-menu-item type="button" (click)="run(demo().edit)">{{ demo().edit }}</button>
      <button g-menu-item type="button" (click)="run(demo().copy)">{{ demo().copy }}</button>
      <button g-menu-item type="button" (click)="run(demo().rename)">{{ demo().rename }}</button>
      <button g-menu-item type="button" (click)="run(demo().delete)">{{ demo().delete }}</button>
    </ng-template>
  `,
  styles: `
    .cm-demo__target {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
      border: 1px dashed var(--g-border-strong);
      border-radius: var(--g-radius-md);
      background: var(--g-surface);
      color: var(--g-text-muted);
      cursor: context-menu;
      user-select: none;
    }
    .cm-demo__hint {
      margin: var(--g-space-3) 0 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => overlayCopyFor(this.i18n.tag()).contextMenu.demo);
  protected readonly last = signal<string | null>(null);
  protected run(action: string): void {
    this.last.set(action);
  }
}
