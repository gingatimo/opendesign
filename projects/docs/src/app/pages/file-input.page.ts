import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { FileInputBasicDemo } from '../demos/file-input/file-input-basic.demo';
import { FileInputMultiDemo } from '../demos/file-input/file-input-multi.demo';
import { formCopyFor } from './form-copy';

@Component({
  imports: [FileInputBasicDemo, FileInputMultiDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ copy().title }}</h1>
    <p>{{ copy().intro }}</p>

    <docs-demo-section>
      <docs-file-input-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/file-input/file-input-basic.demo.ts" />

    <h2>{{ copy().multipleTitle }}</h2>
    <p>{{ copy().multipleIntro }}</p>
    <docs-demo-section>
      <docs-file-input-multi-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/file-input/file-input-multi.demo.ts" />

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
export default class FileInputPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => formCopyFor(this.i18n.tag()).fileInput);
}
