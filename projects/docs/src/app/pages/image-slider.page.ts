import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ImageSliderBasicDemo } from '../demos/image-slider/image-slider-basic.demo';

@Component({
  imports: [ImageSliderBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Image Slider</h1>
    <p>
      Băng chuyền ảnh — một ảnh mỗi khung, chuyển trước/sau bằng nút ‹ ›, chấm chỉ vị trí bên dưới
      hoặc phím <code>←</code>/<code>→</code>. Nhận <code>string</code> (URL) hoặc
      <code>File</code>. Bật <code>loop</code> để cuộn vòng, <code>lightbox</code> để click ảnh mở
      xem toàn màn hình (zoom/pan).
    </p>

    <docs-demo-section>
      <docs-image-slider-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/image-slider/image-slider-basic.demo.ts" />

    <h2>API — GImageSlider</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Vùng băng chuyền là <code>role="region"</code> có <code>aria-roledescription</code> và nhận
        phím <code>←</code>/<code>→</code> để chuyển ảnh.
      </li>
      <li>
        Nút ‹ › là <code>&lt;button&gt;</code> có nhãn "Ảnh trước"/"Ảnh sau", tự vô hiệu ở hai đầu
        khi không bật <code>loop</code>.
      </li>
      <li>
        Mỗi chấm là <code>&lt;button&gt;</code> nhãn "Tới ảnh N"; chấm của ảnh hiện tại đánh dấu
        <code>aria-current</code>.
      </li>
      <li>Một vùng <code>aria-live</code> ẩn thông báo "Ảnh N/M" mỗi khi đổi ảnh.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageSliderPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'images',
      type: '(string | File)[]',
      default: '[]',
      description: 'Danh sách ảnh — URL dạng string hoặc File (tự tạo/thu hồi objectURL).',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'false',
      description: 'Cuộn vòng: từ ảnh cuối bấm sau quay về đầu; tắt thì nút ‹ › vô hiệu ở hai đầu.',
    },
    {
      name: 'lightbox',
      type: 'boolean',
      default: 'false',
      description: 'Bấm ảnh đang xem mở lightbox toàn màn hình (zoom/pan).',
    },
  ];
}
