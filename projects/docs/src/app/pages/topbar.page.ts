import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TopbarBasicDemo } from '../demos/topbar/topbar-basic.demo';
import { navigationCopyFor } from './navigation-copy';

@Component({
  imports: [TopbarBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-topbar-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/topbar/topbar-basic.demo.ts" />

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
export default class TopbarPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => navigationCopyFor(this.i18n.tag()).topbar);
}
