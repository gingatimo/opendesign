import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ChipBasicDemo } from '../demos/chip/chip-basic.demo';

@Component({
  imports: [ChipBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Chip</h1>
    <p>Nhãn nhỏ dạng pill cho các mục có thể xóa, ví dụ tag hoặc bộ lọc đang chọn.</p>

    <docs-demo-section>
      <docs-chip-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/chip/chip-basic.demo.ts" />

    <h2>API — GChip</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Khi <code>removable</code>, nút xóa là <code>&lt;button type="button"&gt;</code> native nên
        có sẵn focus bằng Tab và kích hoạt bằng Enter/Space.
      </li>
      <li>
        Nút xóa mang <code>aria-label</code>, mặc định là <code>"Xóa"</code>, có thể tùy biến qua
        <code>removeLabel</code>.
      </li>
      <li>
        Khi <code>disabled</code>, nút xóa bị vô hiệu hóa thật sự bằng attribute
        <code>disabled</code> native.
      </li>
      <li>
        Trong danh sách nhiều chip có thể xóa (ví dụ danh sách tag), hãy đặt
        <code>removeLabel</code> riêng cho từng chip (ví dụ
        <code>[removeLabel]="'Xóa ' + tag"</code>) — nếu không, người dùng trình đọc màn hình chỉ
        nghe "Xóa, button" lặp lại nhiều lần và không phân biệt được nút nào xóa mục nào.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChipPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'removable',
      type: 'boolean',
      default: 'false',
      description: 'Hiện nút xóa bên trong chip.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hóa nút xóa.',
    },
    {
      name: 'removeLabel',
      type: 'string',
      default: "'Xóa'",
      description: 'aria-label của nút xóa; nên đặt riêng cho từng chip trong danh sách.',
    },
    {
      name: 'removed',
      type: 'output<void>',
      default: '—',
      description: 'Phát ra khi người dùng bấm nút xóa.',
    },
  ];
}
