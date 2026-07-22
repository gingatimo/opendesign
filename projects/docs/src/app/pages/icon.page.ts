import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { IconBasicDemo } from '../demos/icon/icon-basic.demo';
import { displayCopyFor } from './display-copy';

@Component({
  imports: [IconBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <h2>{{ page().setTitle }}</h2>
    <p>{{ page().setIntro }}</p>

    <docs-demo-section>
      <docs-icon-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/icon/icon-basic.demo.ts" />

    <h2>{{ page().usageTitle }}</h2>

    <h3>{{ page().fromSetTitle }}</h3>
    <p>{{ page().fromSetIntro }}</p>
    <docs-code-block [code]="page().fromSetSnippet" language="typescript" />

    <h3>{{ page().customTitle }}</h3>
    <p>{{ page().customIntro }}</p>
    <docs-code-block [code]="page().customGlyphSnippet" language="typescript" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    <ul>
      @for (item of page().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>

    <h2>{{ page().treeTitle }}</h2>
    <p>{{ page().treeIntro }}</p>
    <p>{{ page().treeProof }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => displayCopyFor(this.i18n.tag()).icon);
}
