import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { catchError, of } from 'rxjs';
import { derivedAsync } from './derived-async';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);

@Component({
  selector: 'docs-code-block',
  template: `
    <div class="docs-code-block">
      <button type="button" class="docs-code-block__copy" (click)="copy()">
        {{ copied() ? 'Đã copy' : 'Copy' }}
      </button>
      @if (loadFailed()) {
        <pre><code>Không tải được mã nguồn.</code></pre>
      } @else {
        <pre><code [innerHTML]="highlighted()"></code></pre>
      }
    </div>
  `,
  styles: `
    .docs-code-block {
      position: relative;
      background: var(--g-surface);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
      overflow: auto;
    }
    .docs-code-block__copy {
      position: absolute;
      top: var(--g-space-2);
      right: var(--g-space-2);
      border: 1px solid var(--g-border-strong);
      border-radius: var(--g-radius-pill);
      background: var(--g-bg);
      color: var(--g-text);
      font-size: var(--g-font-size-xs);
      padding: 4px 12px;
      cursor: pointer;
    }
    pre {
      margin: 0;
      padding: var(--g-space-4);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlock {
  /** Đường dẫn tới file demo (vd. 'demo-sources/button/button-basic.demo.ts') — nội dung fetch lúc render. */
  readonly src = input<string>();
  /** Code viết thẳng tại chỗ, dùng cho snippet không đến từ file demo (lệnh shell, config...). */
  readonly code = input<string>();
  readonly language = input('typescript');

  private readonly http = inject(HttpClient);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly copied = signal(false);
  protected readonly loadFailed = signal(false);

  private readonly fetched = derivedAsync(
    () => this.src(),
    (src) => {
      // Không có src nghĩa là đang dùng [code] inline — không fetch gì cả.
      if (!src) return of('');
      this.loadFailed.set(false);
      return this.http.get(src, { responseType: 'text' }).pipe(
        catchError(() => {
          this.loadFailed.set(true);
          return of('');
        }),
      );
    },
    '',
  );

  private readonly source = computed(() => this.code() ?? this.fetched());

  protected readonly highlighted = computed<SafeHtml>(() => {
    const code = this.source();
    // hljs.highlight() escape HTML của source trước khi tô màu, nên chuỗi trả về đã an toàn —
    // đó là lý do bypassSecurityTrustHtml ở đây không mở lỗ XSS (xem test bất biến trong spec).
    const html = hljs.highlight(code, { language: this.language() }).value;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  protected copy(): void {
    void navigator.clipboard.writeText(this.source()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
