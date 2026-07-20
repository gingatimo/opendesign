import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { RichTextEditorDemo } from '../demos/editor/rich-text-editor.demo';

@Component({
  imports: [RichTextEditorDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Rich Text Editor</h1>
    <p>
      Trình soạn <b>văn bản định dạng</b> (WYSIWYG), <b>Angular-only</b>. Bề mặt là
      <code>contenteditable</code>; toolbar áp định dạng qua <code>document.execCommand</code> —
      <b>built-in trình duyệt</b> (không phải thư viện). Hỗ trợ đậm/nghiêng/gạch dưới/gạch ngang,
      <b>H2</b>, trích dẫn, danh sách chấm/số, xoá định dạng. <b>IME-safe</b> (không ghi đè
      innerHTML lúc gõ), <b>dán = plain-text</b>, giá trị ngoài được <b>sanitize</b> chống XSS. Hai
      chiều <code>[(value)]</code> (HTML) hoặc <code>formControlName</code>.
    </p>
    <p class="rte-note">
      <b>Lưu ý:</b> <code>execCommand</code> đã deprecated (vẫn chạy ổn mọi trình duyệt). Cần
      future-proof/cộng tác thời gian thực thì thay engine bằng TipTap ở một package riêng.
    </p>

    <docs-demo-section>
      <docs-rich-text-editor-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/editor/rich-text-editor.demo.ts" />

    <h2>API — GRichTextEditor</h2>
    <docs-api-table [rows]="apiRows" />
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
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'value',
      type: 'string (HTML)',
      default: "''",
      description:
        'Nội dung HTML — `[(value)]` hoặc `formControlName`. Giá trị ngoài được sanitize.',
    },
    {
      name: 'minHeight',
      type: 'number',
      default: '160',
      description: 'Chiều cao tối thiểu vùng soạn (px).',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "'Nhập nội dung…'",
      description: 'Gợi ý khi rỗng.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá (cũng theo form.disable()).',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: "'Trình soạn văn bản'",
      description: 'Nhãn a11y (role=textbox).',
    },
  ];
}
