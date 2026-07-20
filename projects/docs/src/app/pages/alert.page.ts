import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { AlertBasicDemo } from '../demos/alert/alert-basic.demo';

@Component({
  imports: [AlertBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Alert</h1>
    <p>
      Thông báo dạng khối <b>inline</b> (callout) đặt ngay trong nội dung — dùng cho ghi chú, cảnh
      báo, lỗi. Khác <code>GToast</code> (nổi tạm thời qua overlay) và <code>GBadge</code> (nhãn
      nhỏ). Mỗi mức độ (<code>neutral</code> / <code>success</code> / <code>warning</code> /
      <code>danger</code>) có màu và icon riêng; <code>dismissible</code> thêm nút đóng.
    </p>

    <docs-demo-section>
      <docs-alert-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/alert/alert-basic.demo.ts" />

    <h2>API — GAlert</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Icon chỉ trang trí (<code>aria-hidden</code>). Mức độ được truyền cho screen reader qua một
        tiền tố ẩn ("Lưu ý:", "Cảnh báo:", "Lỗi:"…) — vì <b>màu sắc không đọc được</b> với người
        dùng SR.
      </li>
      <li>Nút đóng có <code>aria-label="Đóng thông báo"</code>.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlertPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'variant',
      type: "'neutral' | 'success' | 'warning' | 'danger'",
      default: "'neutral'",
      description: 'Mức độ — quyết định màu và icon (neutral = ghi chú, danger = lỗi).',
    },
    {
      name: 'heading',
      type: 'string',
      default: '—',
      description: 'Dòng tiêu đề đậm phía trên nội dung (tuỳ chọn).',
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: 'Hiện nút đóng ở góc phải.',
    },
    {
      name: '[(open)]',
      type: 'boolean',
      default: 'true',
      description: 'Hiển thị hay không — nút đóng đặt về false; hai chiều để consumer điều khiển.',
    },
    {
      name: '<ng-content>',
      type: 'slot',
      default: '—',
      description: 'Nội dung thông báo.',
    },
  ];
}
