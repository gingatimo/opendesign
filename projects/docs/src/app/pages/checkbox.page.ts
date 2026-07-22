import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CheckboxBasicDemo } from '../demos/checkbox/checkbox-basic.demo';
import { formCopyFor } from './form-copy';

@Component({
  imports: [CheckboxBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ copy().title }}</h1>
    <p>{{ copy().intro }}</p>

    <docs-demo-section>
      <docs-checkbox-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/checkbox/checkbox-basic.demo.ts" />

    <h2>{{ copy().apiTitle }}</h2>
    <docs-api-table [rows]="copy().apiRows" />

    <h2>{{ copy().accessibilityTitle }}</h2>
    <ul>
      @for (item of copy().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CheckboxPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => formCopyFor(this.i18n.tag()).checkbox);
}
