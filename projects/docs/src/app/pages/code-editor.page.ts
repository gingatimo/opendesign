import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CodeEditorDemo } from '../demos/editor/code-editor.demo';

@Component({
  imports: [CodeEditorDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Code Editor</h1>
    <p>
      Trình soạn <b>code</b> nhẹ, <b>Angular-only</b> (0 thư viện ngoài). Kỹ thuật
      <b>textarea overlay</b>: một <code>&lt;textarea&gt;</code> trong suốt đè đúng lên
      <code>&lt;pre&gt;</code> đã tô màu — nhờ vậy <b>IME tiếng Việt</b>, undo/redo, chọn, con trỏ
      đều dùng cơ chế native. Tô màu bằng regex
      (<code>typescript</code>/<code>json</code>/<code>css</code>/<code>html</code>); muốn xịn hơn
      truyền <code>highlighter</code> riêng (vd. Prism, lazy-load). Số dòng ở gutter, Tab = spaces.
      Hai chiều <code>[(value)]</code> hoặc <code>formControlName</code>.
    </p>

    <docs-demo-section>
      <docs-code-editor-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/editor/code-editor.demo.ts" />

    <h2>API — GCodeEditor</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CodeEditorPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'string',
      default: "''",
      description: 'Nội dung — `[(value)]` hoặc `formControlName`.',
    },
    {
      name: 'language',
      type: "'plain' | 'typescript' | 'json' | 'css' | 'html' | …",
      default: "'plain'",
      description: 'Ngôn ngữ tô màu.',
    },
    {
      name: 'highlighter',
      type: '(code, lang) => string',
      default: '—',
      description: 'Hàm tô màu riêng (trả HTML đã escape); bỏ trống dùng bộ regex nội bộ.',
    },
    {
      name: 'height',
      type: 'number',
      default: '220',
      description: 'Chiều cao (px), cuộn khi tràn.',
    },
    { name: 'lineNumbers', type: 'boolean', default: 'true', description: 'Hiện gutter số dòng.' },
    { name: 'tabSize', type: 'number', default: '2', description: 'Số spaces khi nhấn Tab.' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Chỉ đọc.' },
    {
      name: 'placeholder / ariaLabel',
      type: 'string',
      default: "'' / 'Trình soạn code'",
      description: 'Gợi ý rỗng, nhãn a11y.',
    },
  ];
}
