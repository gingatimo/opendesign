import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SkeletonBasicDemo } from '../demos/skeleton/skeleton-basic.demo';

@Component({
  imports: [SkeletonBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Skeleton</h1>
    <p>
      Khối placeholder hiển thị trong lúc tải dữ liệu, có hiệu ứng shimmer (vệt sáng quét ngang). Ba
      biến thể <code>text</code> / <code>circular</code> / <code>rectangular</code>; ghép nhiều khối
      để dựng khung của nội dung sắp hiện. <code>lines</code> tạo nhiều dòng text (dòng cuối ngắn).
    </p>

    <docs-demo-section>
      <docs-skeleton-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/skeleton/skeleton-basic.demo.ts" />

    <h2>API — GSkeleton</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Skeleton là <code>aria-hidden</code> (thuần trang trí). Thông báo trạng thái tải cho screen
        reader ở vùng bao — vd. <code>aria-busy="true"</code> hoặc một live region riêng.
      </li>
      <li>
        Tôn trọng <code>prefers-reduced-motion</code>: tắt hiệu ứng shimmer, khối vẫn hiển thị.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SkeletonPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'variant',
      type: `'text' | 'circular' | 'rectangular'`,
      default: `'text'`,
      description: 'Hình dạng khối placeholder.',
    },
    {
      name: 'width',
      type: 'string',
      default: '—',
      description: 'Chiều rộng, vd "100%", "48px". Không đặt thì theo mặc định của biến thể.',
    },
    {
      name: 'height',
      type: 'string',
      default: '—',
      description: 'Chiều cao, vd "120px". Không đặt thì theo mặc định của biến thể.',
    },
    {
      name: 'lines',
      type: 'number',
      default: '1',
      description: 'Số dòng cho variant text (> 1 render nhiều dòng, dòng cuối ngắn 60%).',
    },
  ];
}
