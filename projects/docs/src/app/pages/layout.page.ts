import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { LayoutBasicDemo } from '../demos/layout/layout-basic.demo';

@Component({
  imports: [LayoutBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Layout</h1>
    <p>
      Component <code>g-layout</code> dựng app-shell: topbar (đỉnh) + sidebar (trái) + nội dung —
      ba region chiếu qua content projection, không có input. Bố cục lưới CSS (grid +
      <code>:has()</code>) tự chọn theo region nào thực sự có mặt trong markup: chỉ có
      <code>&lt;g-topbar&gt;</code>, chỉ có <code>&lt;g-sidebar&gt;</code>, có cả hai, hoặc không
      region nào. Chỉ vùng nội dung cuộn — topbar và sidebar luôn đứng yên.
    </p>

    <docs-demo-section>
      <docs-layout-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/layout/layout-basic.demo.ts" />

    <h2>API — GLayout</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>3 vùng qua content projection</h2>
    <ul>
      <li>
        <code>&lt;g-topbar&gt;</code> — đặt làm con trực tiếp của <code>&lt;g-layout&gt;</code> để
        chiếu vào vùng đỉnh, chiều rộng đầy đủ.
      </li>
      <li>
        <code>&lt;g-sidebar&gt;</code> — đặt làm con trực tiếp để chiếu vào vùng trái, chiều cao
        đầy đủ.
      </li>
      <li>
        Mọi nội dung khác (không khớp hai selector trên) tự rơi vào vùng nội dung —
        <code>.g-layout__main</code>, phần duy nhất có <code>overflow: auto</code>.
      </li>
    </ul>

    <h2>Accessibility</h2>
    <p>
      <code>g-layout</code> thuần bố cục — không đặt <code>role</code> hay thuộc tính ARIA nào lên
      phần tử host hay các vùng con. Mỗi region giữ nguyên semantics của chính component đó (vd.
      <code>g-topbar</code>, <code>g-sidebar</code> — xem trang riêng của từng component để biết
      accessibility của bản thân chúng); nội dung đặt trong vùng content nên tự bọc trong
      <code>&lt;main&gt;</code> hoặc thẻ ngữ nghĩa phù hợp.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-layout',
      type: '(component)',
      default: '—',
      description:
        'Container app-shell, không có input. Bố cục quyết định bởi region nào được projected.',
    },
  ];
}
