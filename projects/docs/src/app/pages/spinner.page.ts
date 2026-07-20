import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SpinnerBasicDemo } from '../demos/spinner/spinner-basic.demo';

@Component({
  imports: [SpinnerBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Spinner</h1>
    <p>Chỉ báo đang tải dạng vòng xoay, dùng khi chờ dữ liệu hoặc thao tác bất đồng bộ.</p>

    <docs-demo-section>
      <docs-spinner-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/spinner/spinner-basic.demo.ts" />

    <h2>API — GSpinner</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Host mang <code>role="status"</code> để trình đọc màn hình thông báo khi nội dung đang tải.
      </li>
      <li>
        Nếu không tự đặt <code>aria-label</code> hoặc <code>aria-labelledby</code>, component tự gán
        <code>aria-label="Đang tải"</code>.
      </li>
      <li>
        Nên tự đặt <code>aria-label</code> cụ thể hơn khi ngữ cảnh cần (vd. "Đang tải danh sách sản
        phẩm").
      </li>
      <li>SVG bên trong chỉ mang tính trang trí, đã đặt <code>aria-hidden="true"</code>.</li>
      <li>
        Tôn trọng <code>prefers-reduced-motion</code>: khi bật, animation xoay chậm lại thay vì dừng
        hẳn.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SpinnerPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      default: "'md'",
      description: 'Cỡ vòng xoay: sm 16px, md 24px, lg 32px, xl 48px, 2xl 64px.',
    },
  ];
}
