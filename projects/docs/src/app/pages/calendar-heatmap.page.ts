import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CalendarHeatmapDemo } from '../demos/charts/calendar-heatmap.demo';
import { chartsCopyFor } from './charts-copy';

@Component({
  imports: [CalendarHeatmapDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-calendar-heatmap-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/charts/calendar-heatmap.demo.ts" />

    <h2>{{ page().notesTitle }}</h2>
    <ul>
      @for (note of page().notes; track note) {
        <li>{{ note }}</li>
      }
    </ul>

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalendarHeatmapPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => chartsCopyFor(this.i18n.tag()).calendarHeatmap);
}
