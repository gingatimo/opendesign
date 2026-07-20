import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GButton, GCodeEditor, GCodeLanguage } from 'ngx-opendesign';

@Component({
  selector: 'docs-code-editor-demo',
  imports: [GCodeEditor, GButton],
  template: `
    <div class="ce-demo__ctrls">
      @for (l of langs; track l.id) {
        <button
          g-button
          size="sm"
          [variant]="lang() === l.id ? 'primary' : 'outline'"
          (click)="lang.set(l.id)"
        >
          {{ l.label }}
        </button>
      }
    </div>

    <g-code-editor
      [(value)]="code"
      [language]="lang()"
      [height]="240"
      ariaLabel="Ví dụ soạn code"
    />

    <p class="ce-demo__meta">{{ code().length }} ký tự · {{ lineCount() }} dòng</p>
  `,
  styles: `
    :host {
      display: block;
    }
    .ce-demo__ctrls {
      margin-bottom: var(--g-space-3);
    }
    .ce-demo__meta {
      margin: var(--g-space-2) 0 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditorDemo {
  protected readonly langs: { id: GCodeLanguage; label: string }[] = [
    { id: 'typescript', label: 'TypeScript' },
    { id: 'json', label: 'JSON' },
    { id: 'css', label: 'CSS' },
    { id: 'plain', label: 'Plain' },
  ];
  protected readonly lang = signal<GCodeLanguage>('typescript');
  protected readonly code = signal(`// Ví dụ TypeScript
import { signal } from '@angular/core';

export function tao(dem = 0) {
  const count = signal(dem);
  const tang = () => count.set(count() + 1);
  return { count, tang };
}

const { count, tang } = tao(10);
tang();
console.log(\`Giá trị: \${count()}\`);
`);

  protected lineCount(): number {
    return this.code().split('\n').length;
  }
}
