import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SidebarBasicDemo } from '../demos/sidebar/sidebar-basic.demo';
import { navigationCopyFor } from './navigation-copy';

@Component({
  imports: [SidebarBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-sidebar-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/sidebar/sidebar-basic.demo.ts" />

    @for (section of page().sections; track section.title) {
      <h2>{{ section.title }}</h2>
      @for (paragraph of section.paragraphs; track $index) {
        <p>{{ paragraph }}</p>
      }
    }

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
export default class SidebarPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => navigationCopyFor(this.i18n.tag()).sidebar);
}
