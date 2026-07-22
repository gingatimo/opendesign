import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GPieChart } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-pie-chart-demo',
  imports: [GPieChart],
  template: `
    <div class="pc-demo">
      <g-pie-chart
        [title]="copy().title"
        [data]="copy().data"
        [height]="260"
        legendPosition="right"
        [exportable]="true"
        [zoomable]="true"
        [filename]="copy().filename ?? 'pie-chart'"
        [ariaLabel]="copy().ariaLabel"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .pc-demo {
      max-width: 440px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).pie.demo);
}
