import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { GLocaleService, GRichTextEditor } from 'ngx-opendesign';
import { editorsCopyFor } from '../../pages/editors-copy';

@Component({
  selector: 'docs-rich-text-editor-demo',
  imports: [GRichTextEditor],
  template: `
    <g-rich-text-editor [(value)]="html" pasteMode="html" [ariaLabel]="copy().ariaLabel" />

    <details class="rte-demo__out">
      <summary>{{ copy().summary }}</summary>
      <pre>{{ html() }}</pre>
    </details>
  `,
  styles: `
    :host {
      display: block;
    }
    .rte-demo__out {
      margin-top: var(--g-space-3);
    }
    .rte-demo__out summary {
      cursor: pointer;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .rte-demo__out pre {
      margin: var(--g-space-2) 0 0;
      padding: var(--g-space-3);
      border-radius: var(--g-radius-sm);
      background: var(--g-surface);
      font-size: var(--g-font-size-xs);
      white-space: pre-wrap;
      word-break: break-word;
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditorDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => editorsCopyFor(this.i18n.tag()).richTextEditor.demo);
  protected readonly html = signal(this.copy().html);

  constructor() {
    effect(() => {
      this.html.set(this.copy().html);
    });
  }
}
