import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CodeEditorDemo } from '../demos/editor/code-editor.demo';
import { editorsCopyFor } from './editors-copy';

@Component({
  imports: [CodeEditorDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-code-editor-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/editor/code-editor.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CodeEditorPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => editorsCopyFor(this.i18n.tag()).codeEditor);
}
