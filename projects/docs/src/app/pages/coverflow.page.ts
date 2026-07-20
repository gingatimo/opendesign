import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { CoverflowBasicDemo } from '../demos/coverflow/coverflow-basic.demo';

@Component({
  imports: [CoverflowBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Coverflow</h1>
    <p>
      Băng chuyền <b>tâm điểm</b>: khung hiện 3 card — card <b>ở giữa</b> phóng to (active), hai bên
      <b>peek</b> một phần card trước/sau. Chạy theo <b>active index</b> (không free-scroll như
      <code>GCarousel</code>): bấm nút prev/next, bấm thẳng vào card bên cạnh, hoặc phím ←/→ để đưa
      card vào giữa. Chiếu card vào qua <code>&lt;ng-content&gt;</code>.
    </p>

    <docs-demo-section>
      <docs-coverflow-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/coverflow/coverflow-basic.demo.ts" />

    <h2>Cách dùng</h2>
    <p>
      Đặt các card làm con trực tiếp của <code>&lt;g-coverflow&gt;</code> và cho mỗi card một bề
      rộng <b>nhỏ hơn khung</b> để lộ phần peek hai bên. Track tự dịch để card active nằm chính
      giữa; nút prev/next đặt flanking (ngoài khung, không đè lên card) và tự ẩn ở biên.
    </p>

    <h2>API — GCoverflow</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Track có <code>role="group"</code> +
        <code>aria-roledescription="băng chuyền tâm điểm"</code>; <code>tabindex="0"</code> để focus
        rồi dùng phím ←/→ chuyển card.
      </li>
      <li>Hai nút điều hướng có <code>aria-label</code> và tự <code>disabled</code>/ẩn ở biên.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CoverflowPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'active',
      type: 'number',
      default: '0',
      description:
        'Chỉ số card đang ở giữa (two-way `[(active)]`). Bấm card/nút/phím sẽ đổi giá trị.',
    },
  ];
}
