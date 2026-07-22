import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { GridBasicDemo } from '../demos/grid/grid-basic.demo';
import { layoutCopyFor } from './layout-copy';

@Component({
  imports: [GridBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-grid-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/grid/grid-basic.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    @for (item of page().accessibility; track $index) {
      <p>{{ item }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GridPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => layoutCopyFor(this.i18n.tag()).grid);
}
