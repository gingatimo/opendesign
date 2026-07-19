import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DockMenuBasicDemo } from '../demos/dock-menu/dock-menu-basic.demo';

@Component({
  imports: [DockMenuBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Dock Menu</h1>
    <p>
      Thanh menu kiểu macOS dock: hàng icon, mục đang hover phóng to icon và cho icon trồi lên trên
      thanh (không tô nền, không phóng các mục lân cận). Đặt <code>position="bottom"</code> để cố
      định giữa dưới màn hình.
    </p>

    <docs-demo-section>
      <docs-dock-menu-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/dock-menu/dock-menu-basic.demo.ts" />

    <h2>API — GDockMenu</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mỗi mục là một <code>&lt;button&gt;</code> có <code>aria-label</code> lấy từ
        <code>label</code>; nhãn cũng hiển thị dạng tooltip khi hover.
      </li>
      <li>
        Hiệu ứng phóng to icon chỉ là <code>:hover</code> thuần CSS (thị giác); các mục vẫn dùng
        được đầy đủ bằng bàn phím (<code>Tab</code> + <code>Enter</code>) mà không phụ thuộc hiệu
        ứng đó.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DockMenuPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'items',
      type: 'GDockItem[]',
      default: '[]',
      description: 'Danh sách mục { icon, label, onClick? } hiển thị trên thanh dock.',
    },
    {
      name: 'position',
      type: `'bottom' | 'static'`,
      default: `'static'`,
      description:
        "'bottom' cố định giữa dưới màn hình (position: fixed); 'static' theo dòng chảy layout bình thường.",
    },
  ];
}
