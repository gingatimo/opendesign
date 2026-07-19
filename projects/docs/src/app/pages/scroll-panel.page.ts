import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ScrollPanelBasicDemo } from '../demos/scroll-panel/scroll-panel-basic.demo';

@Component({
  imports: [ScrollPanelBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Scroll Panel</h1>
    <p>
      Vùng cuộn với thanh cuộn mảnh theo theme. Thuần CSS
      (<code>scrollbar-width</code>/<code>scrollbar-color</code>) — không dùng JavaScript để vẽ
      scrollbar tuỳ chỉnh. Đặt <code>maxHeight</code> hoặc <code>height</code> để giới hạn kích
      thước rồi cuộn nội dung chiếu bên trong.
    </p>

    <docs-demo-section>
      <docs-scroll-panel-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/scroll-panel/scroll-panel-basic.demo.ts" />

    <h2>API — GScrollPanel</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Cuộn bằng chuột/trackpad hoạt động ngay trên vùng chứa; nếu cần cuộn bằng bàn phím, hãy đảm
        bảo nội dung bên trong có phần tử focus được (link, button, ô nhập...) vì bản thân
        <code>g-scroll-panel</code> không tự thêm <code>tabindex</code>.
      </li>
      <li>
        Không thêm <code>role</code> hay landmark nào — đây là vùng cuộn thuần bố cục, dùng ARIA
        landmark riêng ở phía consumer nếu nội dung bên trong cần được công bố.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ScrollPanelPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'maxHeight',
      type: 'string',
      default: '—',
      description: 'Chiều cao tối đa (vd "180px"); nội dung vượt quá sẽ cuộn bên trong.',
    },
    {
      name: 'height',
      type: 'string',
      default: '—',
      description: 'Chiều cao cố định cho vùng cuộn (vd "240px").',
    },
  ];
}
