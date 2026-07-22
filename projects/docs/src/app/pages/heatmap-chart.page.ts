import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { HeatmapChartDemo } from '../demos/charts/heatmap-chart.demo';
import { chartsCopyFor } from './charts-copy';

@Component({
  imports: [HeatmapChartDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-heatmap-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/heatmap-chart.demo.ts" />

    <h2>{{ page().scaleTitle }}</h2>
    <p>{{ page().scaleIntro }}</p>

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HeatmapChartPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => chartsCopyFor(this.i18n.tag()).heatmap);
}
