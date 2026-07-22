import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GHeatmapChart, GLocaleService } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-heatmap-chart-demo',
  imports: [GHeatmapChart],
  template: `
    <g-heatmap-chart
      [exportable]="true"
      [zoomable]="true"
      [title]="copy().title"
      [data]="copy().data"
      [rows]="copy().weekdays"
      [columns]="copy().columns"
      [scaleMinLabel]="copy().scaleMinLabel"
      [scaleMaxLabel]="copy().scaleMaxLabel"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).heatmap.demo);
}
