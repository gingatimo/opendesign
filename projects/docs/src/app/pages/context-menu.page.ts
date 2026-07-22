import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ContextMenuBasicDemo } from '../demos/context-menu/context-menu-basic.demo';
import { overlayCopyFor } from './overlay-copy';

@Component({
  imports: [ContextMenuBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-context-menu-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/context-menu/context-menu-basic.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContextMenuPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => overlayCopyFor(this.i18n.tag()).contextMenu);
}
