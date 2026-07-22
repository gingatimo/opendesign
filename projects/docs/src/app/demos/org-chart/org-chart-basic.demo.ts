import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { GAvatar, GLocaleService, GOrgChart, GOrgChartNode } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

@Component({
  selector: 'docs-org-chart-basic-demo',
  imports: [GOrgChart, GAvatar],
  template: `
    <p class="oc-demo__caption">{{ copy().defaultCaption }}</p>
    <g-org-chart [nodes]="copy().nodes" selectable collapsible [(selected)]="picked" />
    <p class="oc-demo__caption">
      {{ copy().selectedLabel }} <b>{{ picked().length ? pickedLabels() : copy().none }}</b>
    </p>

    <p class="oc-demo__caption">{{ copy().customCaption }}</p>
    <g-org-chart [nodes]="copy().nodes">
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
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).orgChart.demo);
  protected readonly picked = signal<readonly GOrgChartNode[]>([]);
  protected readonly pickedLabels = computed(() =>
    this.picked()
      .map((n) => n.label)
      .join(', '),
  );

  constructor() {
    effect(() => {
      void this.copy().nodes;
      this.picked.set([]);
    });
  }
}
