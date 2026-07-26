import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GTreeView, GTreeViewNode } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

@Component({
  selector: 'docs-tree-view-lazy-demo',
  imports: [GTreeView],
  template: `
    <p>{{ copy().lazyCaption }}</p>
    <g-tree-view
      [nodes]="nodes()"
      [ariaLabel]="copy().ariaLabel"
      [loadingIds]="loadingIds()"
      [(expandedIds)]="expandedIds"
      (loadChildren)="load($event)"
    />
    @if (requestedId(); as id) {
      <small>{{ copy().loadResult }} {{ id }}</small>
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
export class TreeViewLazyDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).treeView.demo);
  protected readonly nodes = signal<readonly GTreeViewNode[]>([
    { id: 'devices', label: 'Devices', hasChildren: true },
  ]);
  protected readonly expandedIds = signal<readonly string[]>([]);
  protected readonly loadingIds = signal<readonly string[]>([]);
  protected readonly requestedId = signal<string | null>(null);

  protected load(node: GTreeViewNode): void {
    this.requestedId.set(node.id);
    this.loadingIds.set([node.id]);
  }
}
