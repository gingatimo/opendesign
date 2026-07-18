import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { FileInputBasicDemo } from '../demos/file-input/file-input-basic.demo';

@Component({
  imports: [FileInputBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>File Input</h1>
    <p>
      Component chọn tệp thuần trình bày: nút mở picker native + vùng kéo-thả, phát ra
      <code>File[]</code> qua model — component <b>không tự upload</b>, việc gửi lên mạng do
      consumer tự xử lý.
    </p>
    <p>
      Kéo tệp thả vào vùng component để chọn nhanh, hoặc bấm nút "Chọn tệp" để mở hộp thoại chọn tệp
      của hệ điều hành.
    </p>

    <docs-demo-section>
      <docs-file-input-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/file-input/file-input-basic.demo.ts" />

    <h2>API — GFileInput</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Vùng kéo-thả chỉ là tiện ích thêm — bọc quanh một <code>&lt;input type="file"&gt;</code>
        native ẩn, nên vẫn chọn được tệp hoàn toàn bằng bàn phím và hộp thoại chọn tệp của hệ điều
        hành, không phụ thuộc thao tác chuột.
      </li>
      <li>Nút mở picker là <code>&lt;button&gt;</code> có nhãn rõ ràng "Chọn tệp".</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FileInputPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'files',
      type: 'File[] (model)',
      default: '[]',
      description: 'Danh sách tệp đã chọn, two-way binding qua [(files)].',
    },
    {
      name: 'accept',
      type: 'string',
      default: '—',
      description: 'Bộ lọc loại tệp (vd. "image/*", ".png") — áp cho cả picker lẫn kéo-thả.',
    },
    {
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Cho phép chọn/thả nhiều tệp cùng lúc.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hóa nút chọn tệp và vùng kéo-thả.',
    },
  ];
}
