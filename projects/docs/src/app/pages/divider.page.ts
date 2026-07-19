import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DividerBasicDemo } from '../demos/divider/divider-basic.demo';

@Component({
  imports: [DividerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Divider</h1>
    <p>
      Vạch phân cách giữa các khối nội dung. Ngang (mặc định) chiếm hết bề rộng; dọc dùng trong hàng
      ngang để ngăn các mục. Có thể đặt nhãn ở giữa (vd "HOẶC") qua nội dung chiếu.
    </p>

    <docs-demo-section>
      <docs-divider-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/divider/divider-basic.demo.ts" />

    <h2>API — GDivider</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Host mang <code>role="separator"</code> và <code>aria-orientation</code> theo hướng, để công
        nghệ hỗ trợ hiểu đây là ranh giới phân tách.
      </li>
      <li>Nhãn (nếu có) là nội dung văn bản bình thường, đọc được cùng ngữ cảnh xung quanh.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DividerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'orientation',
      type: `'horizontal' | 'vertical'`,
      default: `'horizontal'`,
      description: 'Hướng vạch. Dọc cần đặt trong một hàng flex có chiều cao xác định.',
    },
  ];
}
