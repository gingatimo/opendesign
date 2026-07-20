import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

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
  imports: [NgTemplateOutlet],
  template: `
    <ul class="g-org-chart__level g-org-chart__level--root">
      @for (node of nodes(); track node) {
        <ng-container *ngTemplateOutlet="branch; context: { $implicit: node }" />
      }
    </ul>

    <ng-template #branch let-node>
      <li class="g-org-chart__node">
        <div class="g-org-chart__box">
          @if (nodeTemplate(); as tpl) {
            <ng-container *ngTemplateOutlet="tpl; context: { $implicit: node }" />
          } @else {
            <span class="g-org-chart__label">{{ node.label }}</span>
            @if (node.sublabel) {
              <span class="g-org-chart__sublabel">{{ node.sublabel }}</span>
            }
          }
        </div>

        @if (node.children?.length) {
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

  // Template tuỳ biến nội dung node (nếu consumer chiếu vào <ng-template let-node>). Không có thì dùng
  // mặc định label + sublabel.
  protected readonly nodeTemplate = contentChild(TemplateRef);
}
