import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CoverflowBasicDemo } from '../demos/coverflow/coverflow-basic.demo';
import { displayCopyFor } from './display-copy';

@Component({
  imports: [CoverflowBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-coverflow-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/coverflow/coverflow-basic.demo.ts" />

    <h2>{{ page().usageTitle }}</h2>
    <p>{{ page().usageIntro }}</p>

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
export default class CoverflowPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => displayCopyFor(this.i18n.tag()).coverflow);
}
