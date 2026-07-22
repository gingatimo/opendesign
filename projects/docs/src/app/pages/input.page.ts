import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { InputBasicDemo } from '../demos/input/input-basic.demo';
import { InputIconDemo } from '../demos/input/input-icon.demo';
import { formCopyFor } from './form-copy';

@Component({
  imports: [InputBasicDemo, InputIconDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ copy().title }}</h1>
    <p>{{ copy().intro }}</p>

    <docs-demo-section>
      <docs-input-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/input/input-basic.demo.ts" />

    <h2>{{ copy().apiTitle }}</h2>
    <docs-api-table [rows]="copy().apiRows" />

    <h2>{{ copy().iconTitle }}</h2>
    <p>{{ copy().iconIntro }}</p>
    <p>{{ copy().iconNote }}</p>

    <docs-demo-section>
      <docs-input-icon-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/input/input-icon.demo.ts" />

    <h2>{{ copy().groupApiTitle }}</h2>
    <docs-api-table [rows]="copy().groupApiRows" />

    <h2>{{ copy().accessibilityTitle }}</h2>
    <ul>
      @for (item of copy().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => formCopyFor(this.i18n.tag()).input);
}
