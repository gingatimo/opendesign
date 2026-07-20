import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GAvatar, GOrgChart, GOrgChartNode } from 'ngx-opendesign';

const ORG: GOrgChartNode[] = [
  {
    label: 'Nguyễn An',
    sublabel: 'CEO',
    children: [
      {
        label: 'Trần Bình',
        sublabel: 'CTO',
        children: [
          { label: 'Lê Cường', sublabel: 'TL Backend' },
          { label: 'Phạm Dung', sublabel: 'TL Frontend' },
        ],
      },
      { label: 'Hoàng Em', sublabel: 'CFO' },
      {
        label: 'Vũ Giang',
        sublabel: 'CMO',
        children: [{ label: 'Đỗ Hà', sublabel: 'TP Marketing' }],
      },
    ],
  },
];

@Component({
  selector: 'docs-org-chart-basic-demo',
  imports: [GOrgChart, GAvatar],
  template: `
    <p class="oc-demo__caption">Node mặc định — bấm chọn (multi) + nút +/− thu gọn/mở nhánh</p>
    <g-org-chart [nodes]="org" selectable collapsible [(selected)]="picked" />
    <p class="oc-demo__caption">
      Đã chọn: <b>{{ picked().length ? pickedLabels() : '(chưa chọn)' }}</b>
    </p>

    <p class="oc-demo__caption">
      Node tuỳ biến — chiếu &lt;ng-template let-node&gt; (avatar + tên + vai trò)
    </p>
    <g-org-chart [nodes]="org">
      <ng-template let-node>
        <div class="oc-demo__person">
          <g-avatar [name]="node.label" size="sm" />
          <div class="oc-demo__meta">
            <span class="oc-demo__name">{{ node.label }}</span>
            <span class="oc-demo__role">{{ node.sublabel }}</span>
          </div>
        </div>
      </ng-template>
    </g-org-chart>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
    }
    .oc-demo__caption {
      margin: 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .oc-demo__person {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
    }
    .oc-demo__meta {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      line-height: 1.2;
    }
    .oc-demo__name {
      font-weight: 600;
    }
    .oc-demo__role {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrgChartBasicDemo {
  protected readonly org = ORG;
  protected readonly picked = signal<readonly GOrgChartNode[]>([]);
  protected readonly pickedLabels = computed(() =>
    this.picked()
      .map((n) => n.label)
      .join(', '),
  );
}
