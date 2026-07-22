import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TooltipBasicDemo } from '../demos/tooltip/tooltip-basic.demo';
import { overlayCopyFor } from './overlay-copy';

@Component({
  imports: [TooltipBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-tooltip-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/tooltip/tooltip-basic.demo.ts" />

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
export default class TooltipPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => overlayCopyFor(this.i18n.tag()).tooltip);
}
