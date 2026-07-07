import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TokenRow, TokenTable } from '../../shared/token-table';

@Component({
  imports: [TokenTable],
  template: `
    <h1>Màu sắc</h1>
    <p>
      Màu là biến CSS <code>--g-*</code>, định nghĩa trong <code>opendesign.scss</code> — một bảng
      cho giao diện sáng, một bảng override trong <code>[data-g-theme='dark']</code>. Component
      không tự chọn màu, chỉ đọc token, nên toàn bộ trang đổi màu đồng loạt khi bạn đổi theme. Ô màu
      ở các bảng dưới đây đọc token sống nên đổi theo theme hiện tại; mã hex liệt kê kế bên luôn là
      giá trị của bảng <b>sáng</b> (dùng để tham khảo, không phải giá trị đang hiển thị khi ở chế độ
      tối).
    </p>

    <h2>Màu semantic</h2>
    <docs-token-table [rows]="semanticRows" preview="color" />

    <h2>Màu trạng thái</h2>
    <p>Mỗi trạng thái (thành công/cảnh báo/lỗi) có ba token: chữ, nền nhạt, và màu đặc (solid).</p>
    <docs-token-table [rows]="stateRows" preview="color" />

    <h2>Nguyên tắc</h2>
    <ul>
      <li>
        Bảng màu của OpenDesign <b>đơn sắc tối giản</b> — <code>--g-primary</code> và các token
        chữ/nền/viền đều là sắc độ xám. Màu chỉ xuất hiện ở nhóm trạng thái
        (success/warning/danger).
      </li>
      <li>
        Đừng dùng màu làm kênh thông tin duy nhất: chữ hoặc icon phải tự nói lên trạng thái, màu chỉ
        là gia cố trực quan (vd. Badge <code>variant="danger"</code> vẫn cần chữ "Lỗi", không chỉ
        badge đỏ trống).
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColorsPage {
  protected readonly semanticRows: TokenRow[] = [
    { name: '--g-bg', value: '#ffffff', description: 'Nền trang.' },
    { name: '--g-surface', value: '#f5f5f6', description: 'Nền bề mặt (card, nền phụ).' },
    {
      name: '--g-surface-raised',
      value: '#ffffff',
      description: 'Nền bề mặt nổi (dialog, toast).',
    },
    { name: '--g-text', value: '#18181b', description: 'Màu chữ chính.' },
    { name: '--g-text-muted', value: '#71717a', description: 'Màu chữ phụ, ít nhấn mạnh.' },
    { name: '--g-border', value: '#e4e4e7', description: 'Viền mặc định.' },
    {
      name: '--g-border-strong',
      value: '#d4d4d8',
      description: 'Viền đậm hơn (hover, nhấn mạnh).',
    },
    {
      name: '--g-primary',
      value: '#141416',
      description: 'Màu chủ đạo — nút chính, trạng thái được chọn.',
    },
    { name: '--g-primary-hover', value: '#2d2d30', description: 'Màu chủ đạo khi hover.' },
    { name: '--g-on-primary', value: '#ffffff', description: 'Màu chữ/icon đặt trên nền primary.' },
    { name: '--g-secondary-bg', value: '#ececee', description: 'Nền nút/thành phần phụ.' },
    { name: '--g-secondary-text', value: '#3f3f46', description: 'Màu chữ trên nền secondary.' },
  ];

  protected readonly stateRows: TokenRow[] = [
    { name: '--g-success-text', value: '#15803d', description: 'Chữ trạng thái thành công.' },
    { name: '--g-success-bg', value: '#e8f7ee', description: 'Nền nhạt trạng thái thành công.' },
    { name: '--g-success-solid', value: '#16a34a', description: 'Màu đặc trạng thái thành công.' },
    { name: '--g-warning-text', value: '#a16207', description: 'Chữ trạng thái cảnh báo.' },
    { name: '--g-warning-bg', value: '#fcf4e0', description: 'Nền nhạt trạng thái cảnh báo.' },
    { name: '--g-warning-solid', value: '#d97706', description: 'Màu đặc trạng thái cảnh báo.' },
    { name: '--g-danger-text', value: '#b91c1c', description: 'Chữ trạng thái lỗi.' },
    { name: '--g-danger-bg', value: '#fdecec', description: 'Nền nhạt trạng thái lỗi.' },
    { name: '--g-danger-solid', value: '#dc2626', description: 'Màu đặc trạng thái lỗi.' },
  ];
}
