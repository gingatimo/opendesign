import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { StackBasicDemo } from '../demos/layout/stack-basic.demo';
import { StackWrapDemo } from '../demos/layout/stack-wrap.demo';
import { layoutCopyFor } from './layout-copy';

@Component({
  imports: [StackBasicDemo, StackWrapDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-stack-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/layout/stack-basic.demo.ts" />

    <h2>{{ page().wrapTitle }}</h2>
    <p>{{ page().wrapIntro }}</p>
    <docs-demo-section>
      <docs-stack-wrap-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/layout/stack-wrap.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    @for (item of page().accessibility; track $index) {
      <p>{{ item }}</p>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StackPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => layoutCopyFor(this.i18n.tag()).stack);
}
