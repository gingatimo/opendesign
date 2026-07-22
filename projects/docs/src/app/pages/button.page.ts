import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ButtonBasicDemo } from '../demos/button/button-basic.demo';
import { ButtonIconTextDemo } from '../demos/button/button-icon-text.demo';
import { buttonCopyFor } from './button-copy';

@Component({
  imports: [ButtonBasicDemo, ButtonIconTextDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ button().title }}</h1>
    <p>{{ button().intro }}</p>

    <docs-demo-section>
      <docs-button-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/button/button-basic.demo.ts" />

    <h2>{{ button().iconTitle }}</h2>
    <p>{{ button().iconBody }}</p>

    <docs-demo-section>
      <docs-button-icon-text-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/button/button-icon-text.demo.ts" />
    <p>{{ button().iconNote }}</p>

    <h2>{{ button().apiTitle }}</h2>
    <docs-api-table [rows]="button().apiRows" />

    <h2>{{ button().accessibilityTitle }}</h2>
    <ul>
      @for (item of button().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly button = computed(() => buttonCopyFor(this.i18n.tag()).button);
}
