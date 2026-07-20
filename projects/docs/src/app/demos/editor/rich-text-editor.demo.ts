import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GRichTextEditor } from 'ngx-opendesign';

@Component({
  selector: 'docs-rich-text-editor-demo',
  imports: [GRichTextEditor],
  template: `
    <g-rich-text-editor [(value)]="html" ariaLabel="Ví dụ soạn văn bản" />

    <details class="rte-demo__out">
      <summary>Xem HTML kết quả</summary>
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
  protected readonly html = signal(
    '<h2>Xin chào 👋</h2><p>Đây là trình soạn <b>rich-text</b> viết <i>thuần Angular</i>. Bôi đen chữ rồi bấm nút trên thanh công cụ để định dạng.</p><ul><li>Danh sách chấm</li><li>Đậm, nghiêng, gạch dưới</li></ul>',
  );
}
