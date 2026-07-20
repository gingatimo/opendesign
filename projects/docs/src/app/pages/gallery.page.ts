import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { GalleryBasicDemo } from '../demos/gallery/gallery-basic.demo';

@Component({
  imports: [GalleryBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Gallery</h1>
    <p>
      Gallery ảnh kiểu trang bán hàng: một <b>ảnh chính</b> lớn + dải <b>thumbnail</b> bên dưới. Bấm
      thumbnail để đổi ảnh chính; bấm ảnh chính mở lightbox (zoom/pan). Nhận URL hoặc
      <code>File</code> (File tự tạo objectURL và thu hồi khi đổi/huỷ để không rò). Khác
      <code>GImagePreview</code> (lưới thumbnail + lightbox) và <code>GImageSlider</code> (một
      ảnh/khung trượt).
    </p>

    <docs-demo-section>
      <docs-gallery-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/gallery/gallery-basic.demo.ts" />

    <h2>API — GGallery</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GalleryPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'images',
      type: '(string | File)[]',
      default: '[]',
      description:
        'Danh sách ảnh — URL chuỗi hoặc File (File → objectURL, tự thu hồi khi đổi/huỷ).',
    },
  ];
}
