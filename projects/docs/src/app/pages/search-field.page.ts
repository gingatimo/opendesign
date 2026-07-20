import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SearchFieldBasicDemo } from '../demos/search-field/search-field-basic.demo';

@Component({
  imports: [SearchFieldBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Search Field</h1>
    <p>
      Ô tìm kiếm <b>theo trường</b>: bên trái là <code>GSelect</code> chọn trường (vd. Mã khách
      hàng, CCCD, Tên đăng nhập), bên phải là ô nhập giá trị — tất cả trong một khung pill. Nhấn
      <code>Enter</code> phát sự kiện <code>(search)</code> gồm
      <code>{{ '{' }} field, value {{ '}' }}</code> để bạn tự chạy truy vấn; trường và giá trị cũng
      hai chiều qua <code>[(field)]</code> / <code>[(query)]</code>. Thuần trình bày — không tự gọi
      mạng.
    </p>

    <docs-demo-section>
      <docs-search-field-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/search-field/search-field-basic.demo.ts" />

    <h2>API — GSearchField</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Select trường mang <code>aria-label="Trường tìm kiếm"</code>, ô nhập mang
        <code>aria-label="Giá trị tìm kiếm"</code> — screen reader đọc rõ vai trò từng phần.
      </li>
      <li>
        Bàn phím: Tab tới select chọn trường (mở bằng Enter/Space/mũi tên), Tab sang ô nhập, gõ giá
        trị rồi <code>Enter</code> để tìm.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchFieldPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'fields',
      type: 'GSearchFieldOption[]',
      default: '[]',
      description:
        'Danh sách trường tìm kiếm { value, label }. value là khoá trường (đưa vào sự kiện search), label là chữ hiển thị.',
    },
    {
      name: 'field',
      type: 'unknown (model)',
      default: 'trường đầu tiên',
      description: 'Trường đang chọn, hai chiều [(field)]. Mặc định là value của trường đầu tiên.',
    },
    {
      name: 'query',
      type: 'string (model)',
      default: "''",
      description: 'Giá trị đang nhập, hai chiều [(query)].',
    },
    {
      name: 'placeholder',
      type: 'string',
      default: "''",
      description: 'Chữ mờ của ô nhập giá trị.',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Vô hiệu hoá cả select trường lẫn ô nhập.',
    },
    {
      name: '(search)',
      type: 'EventEmitter<{ field: unknown; value: string }>',
      default: '—',
      description: 'Phát khi nhấn Enter trong ô nhập — gồm trường đang chọn và giá trị đã gõ.',
    },
  ];
}
