import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ActionExpandBasicDemo } from '../demos/action-expand/action-expand-basic.demo';
import { buttonCopyFor } from './button-copy';

@Component({
  imports: [ActionExpandBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ actionExpand().title }}</h1>
    <p>{{ actionExpand().intro }}</p>

    <docs-demo-section>
      <docs-action-expand-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/action-expand/action-expand-basic.demo.ts" />

    <h2>{{ actionExpand().apiTitle }}</h2>
    <docs-api-table [rows]="actionExpand().apiRows" />

    <h2>{{ actionExpand().accessibilityTitle }}</h2>
    <ul>
      @for (item of actionExpand().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActionExpandPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly actionExpand = computed(() => buttonCopyFor(this.i18n.tag()).actionExpand);
}
