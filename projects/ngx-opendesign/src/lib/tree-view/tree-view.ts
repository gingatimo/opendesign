import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconChevronRight, type GIconGlyph } from '../icon/icons';

export interface GTreeViewNode {
  id: string;
  label: string;
  icon?: GIconGlyph;
  disabled?: boolean;
  hasChildren?: boolean;
  children?: readonly GTreeViewNode[];
}

interface TreeRow {
  node: GTreeViewNode;
  level: number;
  parentId: string | null;
  indent: readonly number[];
}

@Component({
  selector: 'g-tree-view',
  imports: [GIcon],
  template: `
    <div class="g-tree-view__tree" role="tree" [attr.aria-label]="ariaLabel()">
      @for (row of rows(); track row.node.id; let index = $index) {
        <div
          class="g-tree-view__row"
          role="treeitem"
          [attr.data-node-id]="row.node.id"
          [attr.aria-level]="row.level + 1"
          [attr.aria-expanded]="isBranch(row.node) ? isExpanded(row.node.id) : null"
          [attr.aria-selected]="selectedId() === row.node.id"
          [attr.aria-disabled]="row.node.disabled || null"
          [attr.tabindex]="tabIndexFor(row.node)"
          (click)="activate(row.node)"
          (keydown)="onKeydown($event, index, row)"
        >
          @for (_ of row.indent; track $index) {
            <span class="g-tree-view__indent" aria-hidden="true"></span>
          }
          @if (isBranch(row.node)) {
            <button
              type="button"
              class="g-tree-view__toggle"
              tabindex="-1"
              [attr.aria-label]="isExpanded(row.node.id) ? 'Collapse' : 'Expand'"
              (click)="toggle($event, row.node)"
            >
              <g-icon
                class="g-tree-view__chevron"
                [class.g-tree-view__chevron--expanded]="isExpanded(row.node.id)"
                [icon]="iconChevron"
                size="sm"
              />
            </button>
          } @else {
            <span class="g-tree-view__toggle-spacer" aria-hidden="true"></span>
          }
          @if (row.node.icon) {
            <g-icon [icon]="row.node.icon" size="sm" aria-hidden="true" />
          }
          <span class="g-tree-view__label">{{ row.node.label }}</span>
        </div>
      }
    </div>
  `,
  host: {
    class: 'g-tree-view',
  },
  styleUrl: './tree-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTreeView {
  readonly nodes = input<readonly GTreeViewNode[]>([]);
  readonly ariaLabel = input.required<string>();
  readonly selectedId = model<string | null>(null);
  readonly expandedIds = model<readonly string[]>([]);
  readonly nodeActivated = output<GTreeViewNode>();

  protected readonly iconChevron = gIconChevronRight;
  protected readonly focusedId = signal<string | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly pendingFocusId = signal<string | null>(null);

  protected readonly rows = computed<TreeRow[]>(() => {
    const expanded = new Set(this.expandedIds());
    const result: TreeRow[] = [];

    const walk = (
      nodes: readonly GTreeViewNode[],
      level: number,
      parentId: string | null,
    ): void => {
      for (const node of nodes) {
        result.push({
          node,
          level,
          parentId,
          indent: Array.from({ length: level }, (_, index) => index),
        });
        if (node.children?.length && expanded.has(node.id)) {
          walk(node.children, level + 1, node.id);
        }
      }
    };

    walk(this.nodes(), 0, null);
    return result;
  });

  constructor() {
    afterRenderEffect(() => {
      const id = this.pendingFocusId();
      if (!id) return;
      const target = [
        ...this.host.nativeElement.querySelectorAll<HTMLElement>('[role="treeitem"]'),
      ].find((element) => element.dataset['nodeId'] === id);
      target?.focus();
      this.pendingFocusId.set(null);
    });
  }

  protected isBranch(node: GTreeViewNode): boolean {
    return node.hasChildren === true || Boolean(node.children?.length);
  }

  protected isExpanded(id: string): boolean {
    return this.expandedIds().includes(id);
  }

  protected tabIndexFor(node: GTreeViewNode): number {
    const fallback = this.rows().find((row) => !row.node.disabled)?.node.id ?? null;
    return (this.focusedId() ?? fallback) === node.id ? 0 : -1;
  }

  protected activate(node: GTreeViewNode): void {
    if (node.disabled) return;
    this.focusRow(node.id);
    this.selectedId.set(node.id);
    this.nodeActivated.emit(node);
  }

  protected toggle(event: Event, node: GTreeViewNode): void {
    event.stopPropagation();
    if (node.disabled) return;
    this.toggleExpanded(node.id);
    this.focusRow(node.id);
  }

  protected onKeydown(event: KeyboardEvent, index: number, row: TreeRow): void {
    const key = event.key;
    let handled = true;

    switch (key) {
      case 'ArrowDown':
        this.focusEnabledFrom(index + 1, 1);
        break;
      case 'ArrowUp':
        this.focusEnabledFrom(index - 1, -1);
        break;
      case 'Home':
        this.focusEnabledFrom(0, 1);
        break;
      case 'End':
        this.focusEnabledFrom(this.rows().length - 1, -1);
        break;
      case 'ArrowRight':
        this.onArrowRight(index, row);
        break;
      case 'ArrowLeft':
        this.onArrowLeft(row);
        break;
      case 'Enter':
      case ' ':
        this.activate(row.node);
        break;
      default:
        handled = false;
    }

    if (handled) event.preventDefault();
  }

  private onArrowRight(index: number, row: TreeRow): void {
    if (!this.isBranch(row.node)) return;
    if (!this.isExpanded(row.node.id)) {
      this.toggleExpanded(row.node.id);
      return;
    }
    this.focusEnabledFrom(index + 1, 1, row.node.id);
  }

  private onArrowLeft(row: TreeRow): void {
    if (this.isBranch(row.node) && this.isExpanded(row.node.id)) {
      this.toggleExpanded(row.node.id);
      return;
    }
    if (row.parentId) this.focusRow(row.parentId);
  }

  private toggleExpanded(id: string): void {
    const next = new Set(this.expandedIds());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    this.expandedIds.set([...next]);
  }

  private focusEnabledFrom(start: number, step: 1 | -1, requiredParentId?: string): void {
    const rows = this.rows();
    for (let index = start; index >= 0 && index < rows.length; index += step) {
      const row = rows[index];
      if (requiredParentId && row.parentId !== requiredParentId) return;
      if (!row.node.disabled) {
        this.focusRow(row.node.id);
        return;
      }
    }
  }

  private focusRow(id: string): void {
    this.focusedId.set(id);
    this.pendingFocusId.set(id);
  }
}
