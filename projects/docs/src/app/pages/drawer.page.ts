import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DrawerBasicDemo } from '../demos/drawer/drawer-basic.demo';

@Component({
  imports: [DrawerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Drawer</h1>
    <p>
      Panel trượt từ mép màn hình kèm nền mờ — gộp <strong>bottom sheet</strong> và
      <strong>side panel</strong> vào một component. Chọn mép bằng <code>side</code>:
      <code>bottom</code> là bottom sheet (bo góc trên, có thanh grab), <code>left</code>/<code
        >right</code
      >
      là side panel cao hết màn hình, <code>top</code> là sheet trên. Mở/đóng hai chiều qua
      <code>[(open)]</code> — consumer tự đặt nút đóng trong nội dung.
    </p>

    <docs-demo-section>
      <docs-drawer-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/drawer/drawer-basic.demo.ts" />

    <h2>API — GDrawer</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Panel là <code>role="dialog"</code> <code>aria-modal="true"</code>; cấp tên qua
        <code>ariaLabel</code>.
      </li>
      <li>
        Focus bị giữ trong panel khi mở (CDK focus trap); mở thì focus phần tử focusable đầu, đóng
        thì trả focus về nơi vừa rời (thường là nút đã mở).
      </li>
      <li>
        <code>Esc</code> và bấm nền đóng drawer (trừ khi <code>disableClose</code>). Panel bị
        <code>inert</code> khi đóng nên không lọt tab. Scroll của <code>body</code> bị khoá khi mở.
      </li>
      <li><code>prefers-reduced-motion</code>: tắt hiệu ứng trượt.</li>
    </ul>

    <h2>Lưu ý khi đặt</h2>
    <p>
      Panel dùng <code>position: fixed</code> neo theo viewport — đặt
      <code>&lt;g-drawer&gt;</code> ở nhánh DOM không có tổ tiên bị <code>transform</code>/<code
        >filter</code
      >
      (thường là gần gốc app), nếu không mép neo sẽ lệch.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DrawerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'open',
      type: 'boolean (model)',
      default: 'false',
      description: 'Trạng thái mở, two-way binding qua [(open)].',
    },
    {
      name: 'side',
      type: `'bottom' | 'left' | 'right' | 'top'`,
      default: `'right'`,
      description: 'Mép neo. bottom = bottom sheet, left/right = side panel, top = sheet trên.',
    },
    {
      name: 'size',
      type: 'string',
      default: '—',
      description: 'Chiều rộng (left/right) hoặc chiều cao (bottom/top), vd "360px", "45vh".',
    },
    {
      name: 'disableClose',
      type: 'boolean',
      default: 'false',
      description: 'Chặn đóng bằng Esc và bấm nền.',
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: '—',
      description: 'Tên của panel dialog cho screen reader.',
    },
  ];
}
