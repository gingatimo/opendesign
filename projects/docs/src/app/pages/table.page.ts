import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TableAdvancedDemo } from '../demos/table/table-advanced.demo';
import { TableBasicDemo } from '../demos/table/table-basic.demo';
import { TableContainerDemo } from '../demos/table/table-container.demo';
import { TableSelectDemo } from '../demos/table/table-select.demo';
import { dataCopyFor } from './data-copy';

@Component({
  imports: [
    TableBasicDemo,
    TableAdvancedDemo,
    TableContainerDemo,
    TableSelectDemo,
    CodeBlock,
    ApiTable,
    DemoSection,
  ],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>
    <p>{{ page().overflowNote }}</p>

    <docs-demo-section>
      <docs-table-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-basic.demo.ts" />

    <h2>{{ page().sortTitle }}</h2>
    <p>{{ page().sortIntro }}</p>

    <h2>{{ page().freezeTitle }}</h2>
    <p>{{ page().freezeIntro }}</p>

    <docs-demo-section>
      <docs-table-advanced-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-advanced.demo.ts" />

    <h2>{{ page().selectTitle }}</h2>
    <p>{{ page().selectIntro }}</p>

    <docs-demo-section>
      <docs-table-select-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-select.demo.ts" />

    <h2>{{ page().containerTitle }}</h2>
    <p>{{ page().containerIntro }}</p>
    <ul>
      @for (item of page().containerBullets; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
    <p>{{ page().containerNote }}</p>

    <docs-demo-section>
      <docs-table-container-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/table/table-container.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().containerApiTitle }}</h2>
    <docs-api-table [rows]="page().containerApiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    @for (item of page().accessibility; track $index) {
      <p>{{ item }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TablePage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => dataCopyFor(this.i18n.tag()).table);
}
