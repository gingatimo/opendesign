import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { GIcon } from '../icon/icon';
import { gIconCheck, gIconChevronDown, gIconChevronRight } from '../icon/icons';

export interface GTreeNode {
  label: string;
  value?: unknown;
  children?: GTreeNode[];
}

interface Row {
  node: GTreeNode;
  level: number;
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

function findLabel(
  nodes: GTreeNode[],
  value: unknown,
  eq: (a: unknown, b: unknown) => boolean,
): string {
  for (const n of nodes) {
    if (n.value !== undefined && eq(n.value, value)) return n.label;
    if (n.children?.length) {
      const l = findLabel(n.children, value, eq);
      if (l) return l;
    }
  }
  return '';
}

// Chọn một node từ cây (single). Trigger + overlay cây gập/mở. Chọn được cả node nhánh lẫn lá. CVA.
@Component({
  selector: 'g-tree-select',
  imports: [CdkConnectedOverlay, GIcon],
  template: `
    <div class="g-tree-select__value" [class.g-tree-select__value--placeholder]="!selectedLabel()">
      {{ selectedLabel() || placeholder() }}
    </div>
    <g-icon class="g-tree-select__arrow" [icon]="iconDown" />

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="elementRef"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayWidth]="triggerWidth()"
      [cdkConnectedOverlayPositions]="positions"
      cdkConnectedOverlayHasBackdrop
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div #panel class="g-tree-select__panel" role="tree">
        @for (row of rows(); track row.node; let idx = $index) {
          <div
            class="g-tree-select__node"
            role="treeitem"
            [attr.data-idx]="idx"
            [attr.aria-level]="row.level + 1"
            [attr.aria-selected]="isSelected(row.node)"
            [attr.aria-expanded]="row.node.children?.length ? isExpanded(row.node) : null"
            [class.g-tree-select__node--selected]="isSelected(row.node)"
            [attr.tabindex]="focused() === row.node ? 0 : -1"
            [style.padding-left.px]="row.level * 20 + 8"
            (click)="selectNode(row.node)"
            (keydown)="onKeydown($event, idx, row)"
          >
            @if (row.node.children?.length) {
              <button
                type="button"
                class="g-tree-select__toggle"
                [class.g-tree-select__toggle--open]="isExpanded(row.node)"
                tabindex="-1"
                aria-hidden="true"
                (click)="toggleExpand($event, row.node)"
              >
                <g-icon [icon]="iconRight" size="sm" />
              </button>
            } @else {
              <span class="g-tree-select__spacer"></span>
            }
            <span class="g-tree-select__label">{{ row.node.label }}</span>
            @if (isSelected(row.node)) {
              <g-icon class="g-tree-select__check" [icon]="iconCheck" size="sm" />
            }
          </div>
        }
      </div>
    </ng-template>
  `,
  host: {
    class: 'g-tree-select',
    role: 'combobox',
    tabindex: '0',
    'aria-haspopup': 'tree',
    '[attr.aria-expanded]': 'open()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[class.g-tree-select--disabled]': 'disabled()',
    '[class.g-tree-select--open]': 'open()',
    '(click)': 'onTriggerClick()',
    '(keydown)': 'onTriggerKeydown($event)',
    '(blur)': 'onTouchedFn()',
  },
  styleUrl: './tree-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTreeSelect implements ControlValueAccessor {
  readonly options = input<GTreeNode[]>([]);
  readonly placeholder = input('');
  readonly compareWith = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);

  protected readonly open = signal(false);
  protected readonly disabled = signal(false);
  protected readonly triggerWidth = signal(0);
  protected readonly positions = POSITIONS;
  protected readonly iconDown = gIconChevronDown;
  protected readonly iconRight = gIconChevronRight;
  protected readonly iconCheck = gIconCheck;

  private readonly expandedSet = signal<Set<GTreeNode>>(new Set());
  private readonly valueSignal = signal<unknown>(undefined);
  protected readonly focused = signal<GTreeNode | null>(null);
  private focusPending = false;

  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  private onChange: (value: unknown) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    afterRenderEffect(() => {
      if (!this.open() || !this.focusPending) return;
      const f = this.focused();
      untracked(() => {
        const idx = this.rows().findIndex((r) => r.node === f);
        this.panel()
          ?.nativeElement.querySelector<HTMLElement>(`.g-tree-select__node[data-idx="${idx}"]`)
          ?.focus();
        this.focusPending = false;
      });
    });
  }

  // Các hàng đang hiển thị (DFS, chỉ mở con của node đã expand).
  protected readonly rows = computed(() => {
    const out: Row[] = [];
    const walk = (nodes: GTreeNode[], level: number) => {
      for (const n of nodes) {
        out.push({ node: n, level });
        if (n.children?.length && this.expandedSet().has(n)) walk(n.children, level + 1);
      }
    };
    walk(this.options(), 0);
    return out;
  });

  protected readonly selectedLabel = computed(() => {
    const v = this.valueSignal();
    if (v === undefined || v === null) return '';
    return findLabel(this.options(), v, this.compareWith());
  });

  protected isSelected(node: GTreeNode): boolean {
    return node.value !== undefined && this.compareWith()(node.value, this.valueSignal());
  }
  protected isExpanded(node: GTreeNode): boolean {
    return this.expandedSet().has(node);
  }

  protected toggleExpand(event: Event, node: GTreeNode): void {
    event.stopPropagation();
    const set = new Set(this.expandedSet());
    if (set.has(node)) set.delete(node);
    else set.add(node);
    this.expandedSet.set(set);
  }

  protected selectNode(node: GTreeNode): void {
    this.valueSignal.set(node.value);
    this.onChange(node.value);
    this.onTouchedFn();
    this.close();
  }

  protected onTriggerClick(): void {
    if (this.disabled()) return;
    if (this.open()) this.close();
    else this.openPanel();
  }
  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    if (!this.open() && (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')) {
      event.preventDefault();
      this.openPanel();
    } else if (event.key === 'Escape' && this.open()) {
      this.close();
    }
  }

  private openPanel(): void {
    this.triggerWidth.set(this.elementRef.nativeElement.offsetWidth);
    const r = this.rows();
    this.focused.set(r[0]?.node ?? null);
    this.focusPending = true;
    this.open.set(true);
  }

  close(): void {
    this.open.set(false);
    this.elementRef.nativeElement.focus({ preventScroll: true });
  }

  protected onKeydown(event: KeyboardEvent, idx: number, row: Row): void {
    const rows = this.rows();
    switch (event.key) {
      case 'Escape':
        this.close();
        event.preventDefault();
        break;
      case 'ArrowDown':
        this.moveFocus((idx + 1) % rows.length);
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.moveFocus((idx - 1 + rows.length) % rows.length);
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (row.node.children?.length && !this.isExpanded(row.node)) {
          this.toggleExpand(event, row.node);
        } else if (row.node.children?.length) {
          this.moveFocus(idx + 1);
        }
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (row.node.children?.length && this.isExpanded(row.node)) {
          this.toggleExpand(event, row.node);
        }
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        this.selectNode(row.node);
        event.preventDefault();
        break;
    }
  }

  private moveFocus(idx: number): void {
    const r = this.rows();
    if (idx < 0 || idx >= r.length) return;
    this.focused.set(r[idx].node);
    this.focusPending = true;
  }

  writeValue(value: unknown): void {
    this.valueSignal.set(value);
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
