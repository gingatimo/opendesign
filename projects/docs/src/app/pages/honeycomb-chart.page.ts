import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { ChartColors } from '../shared/chart-colors';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { HoneycombChartDemo } from '../demos/charts/honeycomb-chart.demo';
import { chartsCopyFor } from './charts-copy';

@Component({
  imports: [HoneycombChartDemo, ApiTable, CodeBlock, DemoSection, ChartColors],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-honeycomb-chart-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/honeycomb-chart.demo.ts" />

    <h2>{{ page().modesTitle }}</h2>
    <ul>
      @for (mode of page().modes; track mode) {
        <li>{{ mode }}</li>
      }
    </ul>

    <docs-chart-colors />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HoneycombChartPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => chartsCopyFor(this.i18n.tag()).honeycomb);
}
