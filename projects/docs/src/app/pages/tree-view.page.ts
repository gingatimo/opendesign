import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { TreeViewBasicDemo } from '../demos/tree-view/tree-view-basic.demo';
import { TreeViewLazyDemo } from '../demos/tree-view/tree-view-lazy.demo';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { dataCopyFor } from './data-copy';

@Component({
  imports: [TreeViewBasicDemo, TreeViewLazyDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>
    <docs-demo-section><docs-tree-view-basic-demo /></docs-demo-section>
    <docs-code-block src="demo-sources/tree-view/tree-view-basic.demo.ts" />

    <h2>{{ page().lazyTitle }}</h2>
    <p>{{ page().lazyIntro }}</p>
    <docs-demo-section><docs-tree-view-lazy-demo /></docs-demo-section>
    <docs-code-block src="demo-sources/tree-view/tree-view-lazy.demo.ts" />

    <h2>{{ page().reorderTitle }}</h2>
    <p>{{ page().reorderIntro }}</p>

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
export default class TreeViewPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => dataCopyFor(this.i18n.tag()).treeView);
}
