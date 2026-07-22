import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CascadeSelectBasicDemo } from '../demos/cascade-select/cascade-select-basic.demo';
import { formCopyFor } from './form-copy';

@Component({
  imports: [CascadeSelectBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ copy().title }}</h1>
    <p>{{ copy().intro }}</p>

    <docs-demo-section>
      <docs-cascade-select-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/cascade-select/cascade-select-basic.demo.ts" />

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
export default class CascadeSelectPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => formCopyFor(this.i18n.tag()).cascadeSelect);
}
