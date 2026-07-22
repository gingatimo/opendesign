import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ReorderListBasicDemo } from '../demos/reorder-list/reorder-list-basic.demo';
import { dataCopyFor } from './data-copy';

@Component({
  imports: [ReorderListBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-reorder-list-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/reorder-list/reorder-list-basic.demo.ts" />

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
export default class ReorderListPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => dataCopyFor(this.i18n.tag()).reorderList);
}
