import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { LineChartDemo } from '../demos/charts/line-chart.demo';
import { chartsCopyFor } from './charts-copy';

@Component({
  imports: [LineChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-line-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/line-chart.demo.ts" />

    <docs-chart-colors />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LineChartPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => chartsCopyFor(this.i18n.tag()).line);
}
