import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { OrgChartBasicDemo } from '../demos/org-chart/org-chart-basic.demo';

@Component({
  imports: [OrgChartBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Organization Chart</h1>
    <p>
      Sơ đồ <b>tổ chức</b> dạng cây top-down: node gốc trên cùng, các cấp con toả xuống, nối bằng
      <b>đường thuần CSS</b> (không SVG/canvas). Data-driven qua <code>[nodes]</code> với cấu trúc
      đệ quy (<code>children</code>). Node mặc định hiện <code>label</code> + <code>sublabel</code>;
      muốn tuỳ biến (avatar, badge…) thì chiếu một <code>&lt;ng-template let-node&gt;</code> vào.
      Cây rộng hơn khung thì cuộn ngang. Bật <code>selectable</code> để bấm
      <b>chọn node</b> (multi-select, hai chiều <code>[(selected)]</code>).
    </p>

    <docs-demo-section>
      <docs-org-chart-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/org-chart/org-chart-basic.demo.ts" />

    <h2>Cấu trúc dữ liệu</h2>
    <p>
      Mỗi node kiểu <code>GOrgChartNode</code>: <code>label</code> (bắt buộc),
      <code>sublabel</code> (tuỳ chọn) và <code>children</code> (mảng node con — đệ quy). Node tuỳ
      biến nhận node hiện tại qua context <code>$implicit</code>:
      <code>&lt;ng-template let-node&gt;…&lt;/ng-template&gt;</code>.
    </p>

    <h2>API — GOrgChart</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Cấu trúc <code>ul</code>/<code>li</code> lồng nhau phản ánh đúng phân cấp cho screen reader.
      </li>
      <li>Đường nối chỉ mang tính trang trí (pseudo-element), không chèn nội dung đọc thừa.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrgChartPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'nodes',
      type: 'GOrgChartNode[]',
      default: '[]',
      description:
        'Các node gốc (thường 1). Mỗi node: `label`, `sublabel?`, `children?` (đệ quy nhiều tầng).',
    },
    {
      name: 'selectable',
      type: 'boolean',
      default: 'false',
      description: 'Cho bấm node để chọn (multi-select, bấm lần nữa để bỏ chọn).',
    },
    {
      name: 'selected',
      type: 'GOrgChartNode[]',
      default: '[]',
      description: 'Danh sách node đang chọn (two-way `[(selected)]`).',
    },
  ];
}
