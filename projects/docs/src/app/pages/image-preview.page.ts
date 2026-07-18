import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ImagePreviewBasicDemo } from '../demos/image-preview/image-preview-basic.demo';

@Component({
  imports: [ImagePreviewBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Image Preview</h1>
    <p>
      Lưới thumbnail cho danh sách ảnh — nhận <code>string</code> (URL) hoặc <code>File</code>.
      Click một thumbnail mở lightbox toàn màn hình: zoom bằng cuộn chuột/nút/double-click, pan kéo
      khi đã zoom, chuyển ảnh trước/sau nếu có nhiều ảnh.
    </p>

    <docs-demo-section>
      <docs-image-preview-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/image-preview/image-preview-basic.demo.ts" />

    <h2>API — GImagePreview</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mỗi thumbnail là <code>&lt;button&gt;</code>, ảnh bên trong có <code>alt</code> mô tả.
      </li>
      <li>
        Lightbox mở qua overlay CDK có focus trap (Tab quẩn trong overlay, không lọt ra ngoài) và tự
        trả focus lại thumbnail khi đóng.
      </li>
      <li>
        Phím tắt trong lightbox: <code>←</code>/<code>→</code> chuyển ảnh,
        <code>+</code>/<code>-</code>/<code>0</code> zoom vào/ra/về mặc định, <code>Esc</code> đóng.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImagePreviewPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'images',
      type: '(string | File)[]',
      default: '[]',
      description: 'Danh sách ảnh hiển thị — URL dạng string hoặc File (tự tạo/thu hồi objectURL).',
    },
    {
      name: 'removable',
      type: 'boolean',
      default: 'false',
      description: 'Hiện nút xoá (×) trên từng thumbnail.',
    },
    {
      name: '(remove)',
      type: 'number',
      default: '—',
      description: 'Phát ra khi bấm nút xoá, kèm index ảnh trong images.',
    },
  ];
}
