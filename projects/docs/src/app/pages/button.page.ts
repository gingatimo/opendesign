import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ButtonBasicDemo } from '../demos/button/button-basic.demo';
import { ButtonIconTextDemo } from '../demos/button/button-icon-text.demo';

@Component({
  imports: [ButtonBasicDemo, ButtonIconTextDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Button</h1>
    <p>
      Nút pill cho hành động. Dùng attribute selector trên <code>&lt;button&gt;</code> hoặc
      <code>&lt;a&gt;</code> để giữ semantics native.
    </p>

    <docs-demo-section>
      <docs-button-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/button/button-basic.demo.ts" />

    <h2>Icon kèm chữ</h2>
    <p>
      <code>&lt;g-button&gt;</code> chiếu nội dung nguyên vẹn (<code>&lt;ng-content /&gt;</code>),
      là <code>display: inline-flex</code> kèm <code>gap</code> — đặt <code>&lt;g-icon&gt;</code>
      ngay cạnh chữ là canh giữa dọc và có khoảng cách đúng, không cần CSS thêm:
    </p>

    <docs-demo-section>
      <docs-button-icon-text-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/button/button-icon-text.demo.ts" />
    <p>
      Icon ở đây là trang trí (chữ trong nút đã tự là accessible name) nên để
      <code>&lt;g-icon&gt;</code> ở chế độ mặc định, không cần <code>aria-label</code>.
    </p>

    <h2>API — GButton</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>Dùng phần tử native nên hành vi bàn phím/focus là chuẩn trình duyệt.</li>
      <li>Trạng thái <code>loading</code> đặt <code>aria-busy="true"</code> và chặn tương tác.</li>
      <li>Vô hiệu hóa bằng attribute <code>disabled</code> native.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ButtonPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
      default: "'primary'",
      description: 'Kiểu hiển thị của nút.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Cỡ nút (32/40/48px).',
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Hiện spinner, chặn click, đặt aria-busy.',
    },
  ];
}
