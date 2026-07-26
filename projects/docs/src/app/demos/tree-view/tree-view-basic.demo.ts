import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GTreeReorderEvent, GTreeView } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

@Component({
  selector: 'docs-tree-view-basic-demo',
  imports: [GTreeView],
  template: `
    <p>{{ copy().basicCaption }}</p>
    <g-tree-view
      [nodes]="copy().nodes"
      [ariaLabel]="copy().ariaLabel"
      reorderable
      [(selectedId)]="selectedId"
      [(expandedIds)]="expandedIds"
      (reorder)="lastReorder.set($event)"
    />
    @if (lastReorder(); as event) {
      <small>{{ event.sourceId }} → {{ event.targetId }} ({{ event.position }})</small>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--g-space-3);
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeViewBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).treeView.demo);
  protected readonly selectedId = signal<string | null>(null);
  protected readonly expandedIds = signal<readonly string[]>(['garden']);
  protected readonly lastReorder = signal<GTreeReorderEvent | null>(null);
}
