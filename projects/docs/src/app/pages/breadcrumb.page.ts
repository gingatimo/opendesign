import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { BreadcrumbBasicDemo } from '../demos/breadcrumb/breadcrumb-basic.demo';

@Component({
  imports: [BreadcrumbBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Breadcrumb</h1>
    <p>
      Đường dẫn phân cấp cho biết vị trí trang hiện tại. Đặt trên <code>&lt;nav&gt;</code> để có
      landmark điều hướng; dấu <code>›</code> giữa các mục tự chèn bằng CSS. Mục cuối là trang hiện
      tại — dùng <code>&lt;span&gt;</code> (không link) với <code>aria-current="page"</code>.
    </p>

    <docs-demo-section>
      <docs-breadcrumb-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/breadcrumb/breadcrumb-basic.demo.ts" />

    <h2>API — GBreadcrumb, GBreadcrumbItem</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Đặt <code>g-breadcrumb</code> trên <code>&lt;nav&gt;</code> kèm
        <code>aria-label="Breadcrumb"</code> để tạo landmark điều hướng có tên.
      </li>
      <li>
        Mục hiện tại là <code>&lt;span g-breadcrumb-item aria-current="page"&gt;</code> — không phải
        link, và <code>aria-current</code> cho screen reader biết đây là trang đang xem.
      </li>
      <li>
        Dấu phân cách <code>›</code> chèn bằng CSS <code>::before</code> nên không lọt vào DOM/đọc
        màn hình.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BreadcrumbPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-breadcrumb',
      type: 'selector',
      default: '—',
      description:
        'Đặt trên <nav> — container bọc các mục, tự dàn hàng ngang + chèn dấu phân cách.',
    },
    {
      name: 'g-breadcrumb-item',
      type: 'selector',
      default: '—',
      description:
        'Đặt trên <a> (mục có link) hoặc <span aria-current="page"> (mục hiện tại, không link).',
    },
  ];
}
