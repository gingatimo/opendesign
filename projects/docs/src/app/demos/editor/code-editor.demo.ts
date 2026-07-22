import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GCodeEditor, GLocaleService, GTab, GTabs } from 'ngx-opendesign';
import { editorsCopyFor } from '../../pages/editors-copy';

@Component({
  selector: 'docs-code-editor-demo',
  imports: [GCodeEditor, GTabs, GTab],
  template: `
    <g-tabs [tablistLabel]="copy().tablistLabel">
      <g-tab [label]="copy().typescriptLabel">
        <g-code-editor
          language="typescript"
          [value]="copy().typescript"
          [height]="240"
          [ariaLabel]="copy().typescriptAriaLabel"
        />
      </g-tab>
      <g-tab [label]="copy().jsonLabel">
        <g-code-editor
          language="json"
          [value]="copy().json"
          [height]="240"
          [ariaLabel]="copy().jsonAriaLabel"
        />
      </g-tab>
      <g-tab [label]="copy().cssLabel">
        <g-code-editor
          language="css"
          [value]="copy().css"
          [height]="240"
          [ariaLabel]="copy().cssAriaLabel"
        />
      </g-tab>
      <g-tab [label]="copy().plainLabel">
        <g-code-editor
          language="plain"
          [value]="copy().plain"
          [height]="240"
          [ariaLabel]="copy().plainAriaLabel"
        />
      </g-tab>
    </g-tabs>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => editorsCopyFor(this.i18n.tag()).codeEditor.demo);
}
