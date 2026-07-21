import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
  model,
  signal,
  TemplateRef,
} from '@angular/core';
import { GLocaleService } from '../core/locale';
import { GIcon } from '../icon/icon';
import { gIconMinus, gIconPlus } from '../icon/icons';

// Một node trong sơ đồ tổ chức. `children` đệ quy cho cây nhiều tầng.
export interface GOrgChartNode {
  label: string;
  sublabel?: string;
  children?: readonly GOrgChartNode[];
}

// Sơ đồ TỔ CHỨC dạng cây top-down: node gốc trên cùng, con toả xuống dưới, nối bằng đường thuần CSS
// (không SVG/canvas). Data-driven qua `[nodes]` (đệ quy `children`). Node mặc định hiện label + sublabel;
// muốn tuỳ biến (avatar, badge…) thì chiếu một <ng-template let-node> vào. Cây rộng thì cuộn ngang.
@Component({
  selector: 'g-org-chart',
  imports: [NgTemplateOutlet, GIcon],
  template: `
    <ul class="g-org-chart__level g-org-chart__level--root">
      @for (node of nodes(); track node) {
        <ng-container *ngTemplateOutlet="branch; context: { $implicit: node }" />
      }
    </ul>

    <ng-template #branch let-node>
      <li class="g-org-chart__node">
        <div
          class="g-org-chart__box"
          [class.g-org-chart__box--selectable]="selectable()"
          [class.g-org-chart__box--selected]="selectable() && isSelected(node)"
          [attr.role]="selectable() ? 'button' : null"
          [attr.tabindex]="selectable() ? 0 : null"
          [attr.aria-pressed]="selectable() ? isSelected(node) : null"
          (click)="onNodeClick(node)"
          (keydown)="onNodeKeydown($event, node)"
        >
          @if (nodeTemplate(); as tpl) {
            <ng-container *ngTemplateOutlet="tpl; context: { $implicit: node }" />
          } @else {
            <span class="g-org-chart__label">{{ node.label }}</span>
            @if (node.sublabel) {
              <span class="g-org-chart__sublabel">{{ node.sublabel }}</span>
            }
          }

          @if (collapsible() && node.children?.length) {
            <button
              type="button"
              class="g-org-chart__toggle"
              [attr.aria-expanded]="!isCollapsed(node)"
              [attr.aria-label]="t().orgChart.toggleBranch"
              (click)="onToggleCollapse($event, node)"
            >
              <g-icon [icon]="isCollapsed(node) ? iconExpand : iconCollapse" size="sm" />
            </button>
          }
        </div>

        @if (node.children?.length && !(collapsible() && isCollapsed(node))) {
          <ul class="g-org-chart__level">
            @for (child of node.children; track child) {
              <ng-container *ngTemplateOutlet="branch; context: { $implicit: child }" />
            }
          </ul>
        }
      </li>
    </ng-template>
  `,
  styleUrl: './org-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-org-chart' },
})
export class GOrgChart {
  // Các node gốc (thường 1, nhưng nhận nhiều để dựng "rừng" nếu cần).
  readonly nodes = input<readonly GOrgChartNode[]>([]);

  // Cho phép CHỌN node bằng cách bấm (multi-select, bấm lần nữa để bỏ chọn).
  readonly selectable = input(false, { transform: booleanAttribute });
  // Danh sách node đang chọn (two-way `[(selected)]`).
  readonly selected = model<readonly GOrgChartNode[]>([]);
  // Cho THU GỌN/MỞ nhánh con: node có con hiện nút +/− để ẩn/hiện cả cây con bên dưới.
  readonly collapsible = input(false, { transform: booleanAttribute });

  // Template tuỳ biến nội dung node (nếu consumer chiếu vào <ng-template let-node>). Không có thì dùng
  // mặc định label + sublabel.
  protected readonly nodeTemplate = contentChild(TemplateRef);

  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  protected readonly iconExpand = gIconPlus;
  protected readonly iconCollapse = gIconMinus;
  // Tập node đang thu gọn (theo tham chiếu node).
  private readonly collapsed = signal<ReadonlySet<GOrgChartNode>>(new Set());

  protected isCollapsed(node: GOrgChartNode): boolean {
    return this.collapsed().has(node);
  }

  protected onToggleCollapse(e: MouseEvent, node: GOrgChartNode): void {
    // Chặn nổi bọt để không kích hoạt chọn node (khi selectable).
    e.stopPropagation();
    const next = new Set(this.collapsed());
    if (next.has(node)) {
      next.delete(node);
    } else {
      next.add(node);
    }
    this.collapsed.set(next);
  }

  protected isSelected(node: GOrgChartNode): boolean {
    return this.selected().includes(node);
  }

  protected onNodeClick(node: GOrgChartNode): void {
    if (!this.selectable()) return;
    const cur = this.selected();
    this.selected.set(cur.includes(node) ? cur.filter((n) => n !== node) : [...cur, node]);
  }

  protected onNodeKeydown(e: KeyboardEvent, node: GOrgChartNode): void {
    if (!this.selectable() || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    this.onNodeClick(node);
  }
}
