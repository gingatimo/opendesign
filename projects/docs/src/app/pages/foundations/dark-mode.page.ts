import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';

@Component({
  imports: [CodeBlock],
  template: `
    <h1>Dark mode</h1>
    <p>
      OpenDesign có sẵn hai bảng màu — sáng (mặc định) và tối. Đổi theme bằng một thuộc tính trên
      thẻ
      <code>&lt;html&gt;</code>, không cần build lại hay sửa component nào: mọi component đều đọc
      token <code>--g-*</code> nên tự đổi màu đồng loạt.
    </p>

    <h2>Cách bật</h2>
    <p>
      Đặt <code>data-g-theme="dark"</code> lên <code>&lt;html&gt;</code>. Gỡ thuộc tính (hoặc đặt
      giá trị khác <code>"dark"</code>) để quay về giao diện sáng:
    </p>
    <docs-code-block [code]="toggleSnippet" language="typescript" />

    <h2>ThemeService mẫu</h2>
    <p>OpenDesign không đi kèm service quản lý theme — tự viết một service nhỏ như sau là đủ:</p>
    <docs-code-block [code]="themeServiceSnippet" language="typescript" />

    <h2>color-scheme: UI gốc của trình duyệt cũng phải đổi theo</h2>
    <p>
      CSS variable (<code>--g-*</code>) chỉ đổi màu những gì <em>component tự vẽ</em>. Có một lớp
      giao diện CSS variable không với tới được: những phần do <b>chính trình duyệt vẽ</b> — thanh
      cuộn là rõ nhất, cùng với ô chọn ngày/giờ (<code>&lt;input type="date"&gt;</code>), nền gợi ý
      autofill, và gạch chân từ bị đánh dấu sai chính tả (spellcheck). Thuộc tính CSS
      <code>color-scheme</code> báo cho trình duyệt biết bề mặt hiện tại đang sáng hay tối, để nó tự
      vẽ những phần đó theo đúng theme.
    </p>
    <p>OpenDesign khai báo sẵn trong <code>opendesign.scss</code>:</p>
    <docs-code-block [code]="colorSchemeSnippet" language="scss" />
    <p>
      Cố ý dùng giá trị đơn (<code>light</code> hoặc <code>dark</code>) thay vì
      <code>light dark</code>: theme của OpenDesign do <b>bạn</b> (qua <code>data-g-theme</code>)
      quyết định, không chạy theo <code>prefers-color-scheme</code> của hệ điều hành — nên phải khai
      báo đúng cái đang thực sự hiển thị, không phải "cả hai đều được".
    </p>
    <p class="note">
      Kết quả: bật chế độ tối là thanh cuộn tối theo ngay, và vẫn giữ đúng kiểu thanh cuộn quen
      thuộc của từng hệ điều hành (macOS vẫn là overlay tự ẩn). Nếu muốn thanh cuộn mảnh hơn hoặc
      đổi màu riêng, dùng <code>scrollbar-width</code> và <code>scrollbar-color</code> ở phía ứng
      dụng — lưu ý trên macOS phải đặt <code>scrollbar-width</code> thì màu tùy chỉnh mới hiện, và
      điều đó sẽ ép thanh cuộn luôn hiện thay vì tự ẩn.
    </p>

    <h2>Ghi đè token cho từng theme</h2>
    <p>
      Token là CSS custom property nên ghi đè bằng CSS thuần sau khi import
      <code>opendesign.css</code>. Ghi đè trong <code>[data-g-theme='dark']</code> để chỉ áp dụng
      cho giao diện tối:
    </p>
    <docs-code-block [code]="overrideSnippet" language="scss" />
  `,
  styles: `
    .note {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DarkModePage {
  protected readonly toggleSnippet = `document.documentElement.setAttribute('data-g-theme', 'dark');
// ...hoặc gỡ để quay về sáng:
document.documentElement.removeAttribute('data-g-theme');`;

  protected readonly themeServiceSnippet = `import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<'light' | 'dark'>('light');

  toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    const root = this.document.documentElement;
    if (this.theme() === 'dark') {
      root.setAttribute('data-g-theme', 'dark');
    } else {
      root.removeAttribute('data-g-theme');
    }
  }
}`;

  protected readonly colorSchemeSnippet = `:root {
  color-scheme: light;
  /* ...token màu sáng */
}

[data-g-theme='dark'] {
  color-scheme: dark;
  /* ...token màu tối */
}`;

  protected readonly overrideSnippet = `/* Ghi đè sau khi import opendesign.css */
:root {
  --g-primary: #4f46e5;
  --g-primary-hover: #4338ca;
  --g-radius-sm: 12px;
}

[data-g-theme='dark'] {
  --g-primary: #818cf8;
  --g-primary-hover: #a5b4fc;
}`;
}
