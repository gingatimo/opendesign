import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { FabBasicDemo } from '../demos/fab/fab-basic.demo';
import { buttonCopyFor } from './button-copy';

@Component({
  imports: [FabBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ fab().title }}</h1>
    <p>{{ fab().intro }}</p>

    <docs-demo-section>
      <docs-fab-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/fab/fab-basic.demo.ts" />

    <h2>{{ fab().apiTitle }}</h2>
    <docs-api-table [rows]="fab().apiRows" />

    <h2>{{ fab().accessibilityTitle }}</h2>
    <ul>
      @for (item of fab().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FabPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly fab = computed(() => buttonCopyFor(this.i18n.tag()).fab);
}
