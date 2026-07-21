import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ActionMenuBasicDemo } from '../demos/action-menu/action-menu-basic.demo';

@Component({
  imports: [ActionMenuBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Action Menu</h1>
    <p>
      Dropdown menu <b>điều hướng / hành động</b>: bấm trigger để xổ danh sách xuống dưới,
      <b>TỰ LẬT lên trên</b> khi sát mép dưới viewport (dùng CDK overlay —
      <code>FlexibleConnectedPositionStrategy</code> chọn vị trí vừa màn hình). Trigger có 2 kiểu
      qua <code>variant</code>: <b>icon</b> (nút tròn, mặc định kebab <code>⋮</code>) hoặc
      <b>label</b> (chữ + mũi tên lên/xuống) — kiểu label <b>tái dùng cho menu ngang</b>. Phát
      <code>(action)</code> với item được chọn. Khác <code>Action Expand</code> (bung ngang, không
      overlay) và <code>Context Menu</code> (chuột phải).
    </p>

    <docs-demo-section>
      <docs-action-menu-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/action-menu/action-menu-basic.demo.ts" />

    <h2>API — GActionMenu</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Trigger có <code>aria-haspopup="menu"</code> + <code>aria-expanded</code>; panel
        <code>role="menu"</code>, item <code>role="menuitem"</code>.
      </li>
      <li>
        Bàn phím: mở → focus vào item đầu (<code>cdkTrapFocus</code> auto-capture); ↑/↓ điều hướng
        (bỏ qua item disabled), Home/End, <b>Esc</b> đóng + trả focus về trigger, Enter/Space chọn.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActionMenuPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'items',
      type: 'GActionMenuItem[]',
      default: '[]',
      description: 'Các mục { label, value, icon?, disabled? }.',
    },
    {
      name: 'variant',
      type: "'icon' | 'label'",
      default: "'icon'",
      description:
        "'icon' = nút tròn chỉ icon; 'label' = chữ (lấy từ `label`) + mũi tên lên/xuống theo trạng thái — hợp menu ngang.",
    },
    {
      name: 'icon',
      type: 'GIconGlyph',
      default: 'gIconMoreVertical',
      description: "Icon trigger khi variant='icon' (mặc định ⋮ kebab).",
    },
    {
      name: 'placement',
      type: "'auto' | 'bottom' | 'top'",
      default: "'auto'",
      description: 'Hướng ưu tiên; tự lật theo viewport nếu bị cắt.',
    },
    {
      name: 'label',
      type: 'string',
      default: "'Menu'",
      description: "Nhãn a11y khi variant='icon'; là CHỮ HIỂN THỊ khi variant='label'.",
    },
    {
      name: '(action)',
      type: 'GActionMenuItem',
      default: '—',
      description: 'Phát item được chọn.',
    },
  ];
}
