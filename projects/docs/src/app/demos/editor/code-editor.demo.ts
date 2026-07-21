import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GCodeEditor, GTab, GTabs } from 'ngx-opendesign';

// Mỗi ngôn ngữ một mẫu code — chuyển tab sẽ hiện code editor đúng language + nội dung tương ứng.
const TS_SAMPLE = `// Ví dụ TypeScript
import { signal } from '@angular/core';

export function tao(dem = 0) {
  const count = signal(dem);
  const tang = () => count.set(count() + 1);
  return { count, tang };
}

const { count, tang } = tao(10);
tang();
console.log(\`Giá trị: \${count()}\`);
`;

const JSON_SAMPLE = `{
  "name": "ngx-opendesign",
  "version": "1.0.0",
  "private": false,
  "keywords": ["angular", "design-system", "pill"],
  "peerDependencies": {
    "@angular/cdk": ">=22.0.0",
    "@angular/forms": ">=22.0.0"
  }
}
`;

const CSS_SAMPLE = `.g-button {
  height: var(--g-control-md);
  padding: 0 var(--g-space-4);
  border-radius: var(--g-radius-pill);
  background: var(--g-primary);
  color: #ffffff;
  transition: background-color 120ms ease;
}
.g-button:hover {
  background: var(--g-primary-hover);
}
`;

const PLAIN_SAMPLE = `OpenDesign — design system cho Angular
- 71 component, 114 icon
- 0 dependency bên thứ ba
- sáng/tối qua thuộc tính data-g-theme
`;

@Component({
  selector: 'docs-code-editor-demo',
  imports: [GCodeEditor, GTabs, GTab],
  template: `
    <g-tabs tablistLabel="Ngôn ngữ code">
      <g-tab label="TypeScript">
        <g-code-editor
          language="typescript"
          [value]="ts"
          [height]="240"
          ariaLabel="Ví dụ TypeScript"
        />
      </g-tab>
      <g-tab label="JSON">
        <g-code-editor language="json" [value]="json" [height]="240" ariaLabel="Ví dụ JSON" />
      </g-tab>
      <g-tab label="CSS">
        <g-code-editor language="css" [value]="css" [height]="240" ariaLabel="Ví dụ CSS" />
      </g-tab>
      <g-tab label="Plain">
        <g-code-editor language="plain" [value]="plain" [height]="240" ariaLabel="Ví dụ Plain" />
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
  protected readonly ts = TS_SAMPLE;
  protected readonly json = JSON_SAMPLE;
  protected readonly css = CSS_SAMPLE;
  protected readonly plain = PLAIN_SAMPLE;
}
