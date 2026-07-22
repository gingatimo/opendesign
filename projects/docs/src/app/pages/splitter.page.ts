import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SplitterBasicDemo } from '../demos/splitter/splitter-basic.demo';
import { layoutCopyFor } from './layout-copy';

@Component({
  imports: [SplitterBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-splitter-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/splitter/splitter-basic.demo.ts" />

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
export default class SplitterPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => layoutCopyFor(this.i18n.tag()).splitter);
}
