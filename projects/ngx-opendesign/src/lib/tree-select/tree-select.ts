import {
  afterRenderEffect,
  booleanAttribute,
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
import { gIconCheck, gIconChevronDown, gIconChevronRight, gIconMinus } from '../icon/icons';

export interface GTreeNode {
  label: string;
  value?: unknown;
  children?: GTreeNode[];
}

interface Row {
  node: GTreeNode;
  level: number;
}

type NodeState = 'checked' | 'indeterminate' | 'unchecked';
type Eq = (a: unknown, b: unknown) => boolean;

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

function findLabel(nodes: GTreeNode[], value: unknown, eq: Eq): string {
  for (const n of nodes) {
    if (n.value !== undefined && eq(n.value, value)) return n.label;
    if (n.children?.length) {
      const l = findLabel(n.children, value, eq);
      if (l) return l;
    }
  }
  return '';
}

// Giá trị của các node LÁ (không con) trong nhánh — cascade lưu theo lá, trạng thái cha suy ra.
function leafValues(node: GTreeNode): unknown[] {
  if (!node.children?.length) return node.value !== undefined ? [node.value] : [];
  return node.children.flatMap(leafValues);
}

// Chọn node từ cây. single = chọn một node (đóng ngay). multiple = checkbox cascade + tri-state:
// tích cha → tích cả nhánh; cha hiện "một phần" khi chỉ vài lá được tích. Trigger LIỆT KÊ nhãn các
// node lá đã chọn (một hàng, tràn thì "…"); bỏ chọn bằng cách mở lại cây. CVA: single = value,
// multiple = value[].
@Component({
  selector: 'g-tree-select',
  imports: [CdkConnectedOverlay, GIcon],
  template: `
    @let text = multiple() ? multipleLabel() : selectedLabel();
    <div class="g-tree-select__value" [class.g-tree-select__value--placeholder]="!text">
      {{ text || placeholder() }}
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
          <!-- Tính trạng thái tri-state MỘT lần mỗi hàng (dùng cho aria + checkbox), tránh gọi
               stateOf() lặp 5-6 lần/hàng mỗi CD. -->
          @let st = multiple() ? stateOf(row.node) : null;
          <div
            class="g-tree-select__node"
            role="treeitem"
            [attr.data-idx]="idx"
            [attr.aria-level]="row.level + 1"
            [attr.aria-selected]="multiple() ? null : isSelected(row.node)"
            [attr.aria-checked]="
              st === null
                ? null
                : st === 'checked'
                  ? 'true'
                  : st === 'indeterminate'
                    ? 'mixed'
                    : 'false'
            "
            [attr.aria-expanded]="row.node.children?.length ? isExpanded(row.node) : null"
            [class.g-tree-select__node--selected]="!multiple() && isSelected(row.node)"
            [attr.tabindex]="focused() === row.node ? 0 : -1"
            [style.padding-left.px]="row.level * 20 + 8"
            (click)="onNodeClick(row.node)"
            (keydown)="onKeydown($event, idx, row)"
          >
            @if (multiple()) {
              <span
                class="g-tree-select__checkbox"
                [class.g-tree-select__checkbox--checked]="st === 'checked'"
                [class.g-tree-select__checkbox--indeterminate]="st === 'indeterminate'"
                aria-hidden="true"
              >
                @if (st === 'indeterminate') {
                  <g-icon [icon]="iconMinus" size="sm" />
                } @else if (st === 'checked') {
                  <g-icon [icon]="iconCheck" size="sm" />
                }
              </span>
              <span class="g-tree-select__label">{{ row.node.label }}</span>
              @if (row.node.children?.length) {
                <button
                  type="button"
                  class="g-tree-select__toggle g-tree-select__toggle--right"
                  [class.g-tree-select__toggle--open]="isExpanded(row.node)"
                  tabindex="-1"
                  aria-hidden="true"
                  (click)="toggleExpand($event, row.node)"
                >
                  <g-icon [icon]="iconRight" size="sm" />
                </button>
              }
            } @else {
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
    '[class.g-tree-select--multiple]': 'multiple()',
    '(click)': 'onTriggerClick()',
    '(keydown)': 'onTriggerKeydown($event)',
    '(blur)': 'onBlur($event)',
  },
  styleUrl: './tree-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTreeSelect implements ControlValueAccessor {
  readonly options = input<GTreeNode[]>([]);
  readonly placeholder = input('');
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly compareWith = input<Eq>((a, b) => a === b);

  protected readonly open = signal(false);
  protected readonly disabled = signal(false);
  protected readonly triggerWidth = signal(0);
  protected readonly positions = POSITIONS;
  protected readonly iconDown = gIconChevronDown;
  protected readonly iconRight = gIconChevronRight;
  protected readonly iconCheck = gIconCheck;
  protected readonly iconMinus = gIconMinus;

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

  // ---- single ----
  protected readonly selectedLabel = computed(() => {
    const v = this.valueSignal();
    if (v === undefined || v === null) return '';
    return findLabel(this.options(), v, this.compareWith());
  });

  protected isSelected(node: GTreeNode): boolean {
    return node.value !== undefined && this.compareWith()(node.value, this.valueSignal());
  }

  // ---- multiple (mảng giá trị lá đã chọn) ----
  private readonly selectedValues = computed<unknown[]>(() => {
    const v = this.valueSignal();
    return this.multiple() && Array.isArray(v) ? v : [];
  });

  private isValueSelected(v: unknown, arr: unknown[]): boolean {
    const eq = this.compareWith();
    return arr.some((x) => eq(x, v));
  }

  protected stateOf(node: GTreeNode): NodeState {
    const leaves = leafValues(node);
    if (leaves.length === 0) return 'unchecked';
    const arr = this.selectedValues();
    const sel = leaves.filter((v) => this.isValueSelected(v, arr)).length;
    if (sel === 0) return 'unchecked';
    return sel === leaves.length ? 'checked' : 'indeterminate';
  }

  // Nhãn trigger (multiple) = nhãn từng node LÁ đã chọn, nối bằng ", " (không gộp lên node cha).
  // Trigger một hàng + text-overflow: ellipsis → tràn tự "…"; bỏ chọn bằng cách mở lại cây.
  protected readonly multipleLabel = computed(() => {
    const arr = this.selectedValues();
    const labels: string[] = [];
    const walk = (nodes: GTreeNode[]) => {
      for (const n of nodes) {
        if (n.children?.length) walk(n.children);
        else if (n.value !== undefined && this.isValueSelected(n.value, arr)) labels.push(n.label);
      }
    };
    walk(this.options());
    return labels.join(', ');
  });

  private toggleNode(node: GTreeNode): void {
    const leaves = leafValues(node);
    if (leaves.length === 0) return;
    const eq = this.compareWith();
    const cur = this.selectedValues();
    const checked = this.stateOf(node) === 'checked';
    let next: unknown[];
    if (checked) {
      next = cur.filter((x) => !leaves.some((v) => eq(x, v)));
    } else {
      next = [...cur];
      for (const v of leaves) if (!next.some((x) => eq(x, v))) next.push(v);
    }
    this.commit(next);
  }

  private commit(value: unknown): void {
    this.valueSignal.set(value);
    this.onChange(value);
    this.onTouchedFn();
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

  protected onNodeClick(node: GTreeNode): void {
    if (this.multiple()) {
      // Click chuột đã focus vào node (tabindex=-1 vẫn nhận click-focus) — cập nhật roving tabindex
      // để khớp, khỏi lệch state khi sau đó dùng bàn phím. KHÔNG đặt focusPending (không cướp focus).
      this.focused.set(node);
      this.toggleNode(node);
    } else {
      this.selectNode(node);
    }
  }

  private selectNode(node: GTreeNode): void {
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

  // Không đánh dấu touched khi focus chuyển vào panel (overlay) — chỉ khi rời hẳn control.
  protected onBlur(event: FocusEvent): void {
    if (this.panel()?.nativeElement.contains(event.relatedTarget as Node)) return;
    this.onTouchedFn();
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
        this.onNodeClick(row.node);
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
