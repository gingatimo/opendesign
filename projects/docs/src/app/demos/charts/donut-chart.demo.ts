import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GDonutChart, GLocaleService } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-donut-chart-demo',
  imports: [GDonutChart],
  template: `
    <div class="dc-demo">
      <g-donut-chart
        [zoomable]="true"
        [title]="copy().title"
        [data]="copy().data"
        [height]="280"
        [totalLabel]="copy().totalLabel ?? ''"
        [filename]="copy().filename ?? 'donut-chart'"
        [ariaLabel]="copy().ariaLabel"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .dc-demo {
      max-width: 420px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).donut.demo);
}
