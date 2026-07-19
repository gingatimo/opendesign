import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { MenuBasicDemo } from '../demos/menu/menu-basic.demo';

@Component({
  imports: [MenuBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Menu</h1>
    <p>
      Menu điều hướng có mục con phân cấp. <code>orientation="vertical"</code> (mặc định): mục cha
      (<code>&lt;g-submenu&gt;</code>) <b>mở/gập ngay tại chỗ</b> (accordion, thụt lề) — hợp cho
      menu dọc ở sidebar/trang cài đặt. <code>orientation="horizontal"</code>: mục cha bung
      <b>dropdown</b> nổi — hợp cho thanh nav ngang. Có thể lồng nhiều cấp
      <code>&lt;g-submenu&gt;</code>.
    </p>

    <docs-demo-section>
      <docs-menu-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/menu/menu-basic.demo.ts" />

    <h2>API — GMenu, GMenuItem, GSubmenu</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mục lá là <code>&lt;a g-menu-item&gt;</code>/<code>&lt;button g-menu-item&gt;</code> native
        — hỗ trợ bàn phím sẵn. Bọc <code>&lt;g-menu&gt;</code> trong
        <code>&lt;nav aria-label&gt;</code>
        nếu cần landmark.
      </li>
      <li>
        Nút mở mục con (<code>&lt;g-submenu&gt;</code>) có <code>aria-expanded</code> phản ánh trạng
        thái mở/gập; dropdown ngang đóng khi bấm ra ngoài hoặc nhấn <code>Esc</code> (trả focus về
        nút).
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenuPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-menu / orientation',
      type: "'vertical' | 'horizontal'",
      default: "'vertical'",
      description:
        'vertical → mục con mở/gập inline (accordion); horizontal → mục con bung dropdown.',
    },
    {
      name: 'g-menu-item',
      type: 'selector',
      default: '—',
      description: 'Mục lá — đặt trên <a> hoặc <button>.',
    },
    {
      name: 'g-submenu / label',
      type: 'string',
      default: '(bắt buộc)',
      description: 'Mục cha có con: nhãn hiển thị trên nút mở; các mục con chiếu vào bên trong.',
    },
  ];
}
