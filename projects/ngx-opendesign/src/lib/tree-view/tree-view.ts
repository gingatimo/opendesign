import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { GLocaleService } from '../core/locale';
import { GIcon } from '../icon/icon';
import { gIconChevronRight, gIconMoreVertical, type GIconGlyph } from '../icon/icons';
import { GSpinner } from '../spinner/spinner';

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

export type GTreeDropPosition = 'before' | 'inside' | 'after';

export interface GTreeReorderEvent {
  sourceId: string;
  targetId: string;
  position: GTreeDropPosition;
}

interface DropTarget {
  id: string;
  position: GTreeDropPosition;
}

@Component({
  selector: 'g-tree-view',
  imports: [GIcon, GSpinner],
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
          [attr.aria-busy]="isLoading(row.node.id) || null"
          [attr.tabindex]="tabIndexFor(row.node)"
          [class.g-tree-view__row--drop-before]="isDropTarget(row.node.id, 'before')"
          [class.g-tree-view__row--drop-inside]="isDropTarget(row.node.id, 'inside')"
          [class.g-tree-view__row--drop-after]="isDropTarget(row.node.id, 'after')"
          (click)="activate(row.node)"
          (dragover)="onDragOver($event, row.node)"
          (dragleave)="onDragLeave($event)"
          (drop)="onDrop($event, row.node)"
          (keydown)="onKeydown($event, index, row)"
        >
          @for (_ of row.indent; track $index) {
            <span class="g-tree-view__indent" aria-hidden="true"></span>
          }
          @if (reorderable()) {
            <button
              type="button"
              class="g-tree-view__drag"
              draggable="true"
              tabindex="-1"
              [attr.aria-label]="t().treeView.drag(row.node.label)"
              [attr.aria-grabbed]="dragSourceId() === row.node.id"
              (click)="$event.stopPropagation()"
              (dragstart)="onDragStart($event, row.node)"
              (dragend)="clearDragState()"
            >
              <g-icon [icon]="iconDrag" size="sm" />
            </button>
          }
          @if (isBranch(row.node)) {
            <button
              type="button"
              class="g-tree-view__toggle"
              tabindex="-1"
              [attr.aria-label]="
                isExpanded(row.node.id)
                  ? t().treeView.collapse(row.node.label)
                  : t().treeView.expand(row.node.label)
              "
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
          @if (isLoading(row.node.id)) {
            <g-spinner size="sm" [attr.aria-label]="t().treeView.loading" />
          }
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
  readonly loadingIds = input<readonly string[]>([]);
  readonly reorderable = input(false, { transform: booleanAttribute });
  readonly nodeActivated = output<GTreeViewNode>();
  readonly loadChildren = output<GTreeViewNode>();
  readonly reorder = output<GTreeReorderEvent>();

  protected readonly iconChevron = gIconChevronRight;
  protected readonly iconDrag = gIconMoreVertical;
  protected readonly focusedId = signal<string | null>(null);
  protected readonly dragSourceId = signal<string | null>(null);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly i18n = inject(GLocaleService);
  private readonly pendingFocusId = signal<string | null>(null);
  private readonly requestedIds = signal<Set<string>>(new Set());
  private readonly dropTarget = signal<DropTarget | null>(null);
  protected readonly t = this.i18n.strings;

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
    effect(() => {
      const loading = new Set(this.loadingIds());
      const loaded = new Set(
        this.allNodes()
          .filter((node) => node.children !== undefined)
          .map((node) => node.id),
      );
      untracked(() => {
        const requested = this.requestedIds();
        const next = new Set([...requested].filter((id) => loading.has(id) && !loaded.has(id)));
        if (next.size !== requested.size) this.requestedIds.set(next);
      });
    });
  }

  protected isBranch(node: GTreeViewNode): boolean {
    return node.hasChildren === true || Boolean(node.children?.length);
  }

  protected isExpanded(id: string): boolean {
    return this.expandedIds().includes(id);
  }

  protected isLoading(id: string): boolean {
    return this.loadingIds().includes(id);
  }

  protected isDropTarget(id: string, position: GTreeDropPosition): boolean {
    const target = this.dropTarget();
    return target?.id === id && target.position === position;
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
      case 'Escape':
        this.clearDragState();
        break;
      default:
        handled = false;
    }

    if (handled) event.preventDefault();
  }

  protected onDragStart(event: DragEvent, node: GTreeViewNode): void {
    if (node.disabled) {
      event.preventDefault();
      return;
    }
    this.dragSourceId.set(node.id);
    event.dataTransfer?.setData('text/plain', node.id);
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }

  protected onDragOver(event: DragEvent, node: GTreeViewNode): void {
    const sourceId = this.dragSourceId();
    if (!sourceId || sourceId === node.id || node.disabled) return;
    event.preventDefault();
    const element = event.currentTarget as HTMLElement;
    const bounds = element.getBoundingClientRect();
    const ratio = bounds.height > 0 ? (event.clientY - bounds.top) / bounds.height : 0.5;
    this.dropTarget.set({ id: node.id, position: this.dropPosition(ratio) });
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
  }

  protected onDragLeave(event: DragEvent): void {
    const row = event.currentTarget as HTMLElement;
    const next = event.relatedTarget as Node | null;
    if (!next || !row.contains(next)) this.dropTarget.set(null);
  }

  protected onDrop(event: DragEvent, node: GTreeViewNode): void {
    event.preventDefault();
    const sourceId = this.dragSourceId();
    const target = this.dropTarget();
    if (sourceId && target?.id === node.id) {
      this.reorder.emit({ sourceId, targetId: node.id, position: target.position });
    }
    this.clearDragState();
  }

  protected clearDragState(): void {
    this.dragSourceId.set(null);
    this.dropTarget.set(null);
  }

  protected emitReorder(sourceId: string, targetId: string, ratio: number): void {
    if (sourceId === targetId) return;
    this.reorder.emit({ sourceId, targetId, position: this.dropPosition(ratio) });
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
    if (next.has(id)) this.requestChildren(id);
  }

  private requestChildren(id: string): void {
    const node = this.allNodes().find((candidate) => candidate.id === id);
    if (!node?.hasChildren || node.children !== undefined || this.requestedIds().has(id)) return;
    this.requestedIds.update((requested) => new Set(requested).add(id));
    this.loadChildren.emit(node);
  }

  private allNodes(): GTreeViewNode[] {
    const result: GTreeViewNode[] = [];
    const walk = (nodes: readonly GTreeViewNode[]): void => {
      for (const node of nodes) {
        result.push(node);
        if (node.children) walk(node.children);
      }
    };
    walk(this.nodes());
    return result;
  }

  private dropPosition(ratio: number): GTreeDropPosition {
    if (ratio < 0.25) return 'before';
    if (ratio > 0.75) return 'after';
    return 'inside';
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
