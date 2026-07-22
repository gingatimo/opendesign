import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { RichTextEditorDemo } from '../demos/editor/rich-text-editor.demo';
import { editorsCopyFor } from './editors-copy';

@Component({
  imports: [RichTextEditorDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-rich-text-editor-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/editor/rich-text-editor.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    <ul>
      @for (item of page().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>

    <h2>{{ page().notesTitle }}</h2>
    <ul>
      @for (item of page().notes; track $index) {
        <li>{{ item }}</li>
      }
    </ul>

    <h2>{{ page().securityTitle }}</h2>
    <ul>
      @for (item of page().security; track $index) {
        <li>{{ item }}</li>
      }
    </ul>

    <h2>{{ page().execTitle }}</h2>
    @for (paragraph of page().execIntro; track $index) {
      <p>{{ paragraph }}</p>
    }
    <ul>
      @for (item of page().execReasons; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
    <p>{{ page().containmentIntro }}</p>
    <ul>
      @for (item of page().containment; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
    <p class="rte-note">{{ page().migrationNote }}</p>
  `,
  styles: `
    .rte-note {
      padding: var(--g-space-3) var(--g-space-4);
      border-left: 3px solid var(--g-warning-solid);
      background: var(--g-warning-bg);
      border-radius: var(--g-radius-sm);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RichTextEditorPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => editorsCopyFor(this.i18n.tag()).richTextEditor);
}
