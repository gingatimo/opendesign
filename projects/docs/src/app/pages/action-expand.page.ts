import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ActionExpandBasicDemo } from '../demos/action-expand/action-expand-basic.demo';

@Component({
  imports: [ActionExpandBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Action Expand</h1>
    <p>
      Nút <b>hành động bung</b>: cùng một hành động nhưng <b>nhiều "type"</b> (vd. Tải xuống →
      PDF/SVG/PNG). Lúc đầu thu gọn thành <b>icon tròn</b>; khi <b>rê chuột / focus</b> (bàn phím)
      hoặc chạm → bung sang phải, lộ các nút lựa chọn kiểu tab. Phát <code>(action)</code> với item
      được chọn (<code>{{ '{ label, value, icon? }' }}</code
      >).
    </p>

    <docs-demo-section>
      <docs-action-expand-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/action-expand/action-expand-basic.demo.ts" />

    <h2>API — GActionExpand</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Nút tròn (trigger) là điểm vào bàn phím: Tab tới nó → bung (<code>aria-expanded</code>) →
        Tab tiếp vào các nút lựa chọn. Khi thu gọn, các nút lựa chọn có
        <code>tabindex="-1"</code> nên không lọt vào tab order.
      </li>
      <li>Cả cụm là <code>role="group"</code> với <code>aria-label</code>.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActionExpandPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'actions',
      type: 'GActionExpandItem[]',
      default: '[]',
      description: 'Các lựa chọn { label, value, icon? } hiện khi bung.',
    },
    {
      name: 'icon',
      type: 'GIconGlyph',
      default: 'gIconDownload',
      description: 'Icon lúc thu gọn (tròn).',
    },
    {
      name: 'label',
      type: 'string',
      default: "'Hành động'",
      description: 'Nhãn a11y cho cụm + trigger.',
    },
    {
      name: '(action)',
      type: 'GActionExpandItem',
      default: '—',
      description: 'Phát item được chọn.',
    },
  ];
}
