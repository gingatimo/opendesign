import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { BarChartDemo } from '../demos/charts/bar-chart.demo';
import { chartsCopyFor } from './charts-copy';

@Component({
  imports: [BarChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-bar-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/bar-chart.demo.ts" />

    <docs-chart-colors />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BarChartPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => chartsCopyFor(this.i18n.tag()).bar);
}
