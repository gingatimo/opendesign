import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { OrgChartBasicDemo } from '../demos/org-chart/org-chart-basic.demo';
import { dataCopyFor } from './data-copy';

@Component({
  imports: [OrgChartBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-org-chart-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/org-chart/org-chart-basic.demo.ts" />

    <h2>{{ page().structureTitle }}</h2>
    <p>{{ page().structureIntro }}</p>

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    <ul>
      @for (item of page().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrgChartPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => dataCopyFor(this.i18n.tag()).orgChart);
}
