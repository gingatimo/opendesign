import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SelectBasicDemo } from '../demos/select/select-basic.demo';
import { SelectSearchDemo } from '../demos/select/select-search.demo';
import { SelectMultipleDemo } from '../demos/select/select-multiple.demo';
import { formCopyFor } from './form-copy';

@Component({
  imports: [
    SelectBasicDemo,
    SelectSearchDemo,
    SelectMultipleDemo,
    CodeBlock,
    ApiTable,
    DemoSection,
  ],
  template: `
    <h1>{{ copy().title }}</h1>
    <p>{{ copy().intro }}</p>

    <docs-demo-section>
      <docs-select-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/select/select-basic.demo.ts" />

    <h2>{{ copy().searchTitle }}</h2>
    <p>{{ copy().searchIntro }}</p>
    <docs-demo-section>
      <docs-select-search-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/select/select-search.demo.ts" />

    <h2>{{ copy().multipleTitle }}</h2>
    <p>{{ copy().multipleIntro }}</p>
    <docs-demo-section>
      <docs-select-multiple-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/select/select-multiple.demo.ts" />

    <h2>{{ copy().apiTitle }}</h2>
    <docs-api-table [rows]="copy().apiRows" />

    <h2>{{ copy().optionApiTitle }}</h2>
    <docs-api-table [rows]="copy().optionApiRows" />

    <h2>{{ copy().accessibilityTitle }}</h2>
    <ul>
      @for (item of copy().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SelectPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => formCopyFor(this.i18n.tag()).select);
}
