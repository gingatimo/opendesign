import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DrawerBasicDemo } from '../demos/drawer/drawer-basic.demo';
import { overlayCopyFor } from './overlay-copy';

@Component({
  imports: [DrawerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-drawer-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/drawer/drawer-basic.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    <ul>
      @for (item of page().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>

    <h2>{{ page().placementTitle }}</h2>
    <p>{{ page().placementIntro }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DrawerPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => overlayCopyFor(this.i18n.tag()).drawer);
}
