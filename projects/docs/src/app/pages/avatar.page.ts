import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { AvatarBasicDemo } from '../demos/avatar/avatar-basic.demo';

@Component({
  imports: [AvatarBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Avatar</h1>
    <p>Hiển thị ảnh đại diện của người dùng, tự động rơi về chữ cái đầu khi không có ảnh.</p>

    <docs-demo-section>
      <docs-avatar-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/avatar/avatar-basic.demo.ts" />

    <h2>API — GAvatar</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Host mang <code>role="img"</code> cùng <code>aria-label</code> là giá trị của
        <code>name</code>. <code>role="img"</code> là điều kiện để <code>aria-label</code> được
        trình đọc màn hình công nhận (thẻ tùy biến không role sẽ ánh xạ về <code>generic</code>, nơi
        <code>aria-label</code> bị bỏ qua); nhờ đó avatar luôn có đúng một accessible name dù đang
        hiển thị ảnh hay chữ cái đầu.
      </li>
      <li>
        Vì host đã là <code>role="img"</code>, nội dung bên trong (ảnh, chữ cái đầu) tự động trở
        thành presentational — đó là lý do <code>alt=""</code> và <code>aria-hidden</code> ở dưới
        đây là đúng đắn chứ không phải ngẫu nhiên.
      </li>
      <li>
        Ảnh dùng <code>alt=""</code> để tránh trình đọc màn hình đọc lặp lại tên (đã có ở
        <code>aria-label</code> của host).
      </li>
      <li>
        Khi ảnh lỗi tải, component tự fallback về chữ cái đầu của <code>name</code> mà vẫn giữ
        nguyên accessible name.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AvatarPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'name',
      type: 'string',
      default: '(bắt buộc)',
      description: 'Tên người dùng, dùng để tính chữ cái đầu và làm accessible name.',
    },
    {
      name: 'src',
      type: 'string | undefined',
      default: 'undefined',
      description: 'Đường dẫn ảnh đại diện; nếu thiếu hoặc lỗi tải sẽ fallback về chữ cái đầu.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Cỡ avatar.',
    },
    {
      name: 'shape',
      type: "'circle' | 'square'",
      default: "'circle'",
      description: 'Hình dạng: tròn (mặc định) hoặc vuông bo góc nhẹ.',
    },
  ];
}
