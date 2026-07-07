import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

/**
 * Bọc `<input gInput>` cùng icon/nút phụ trợ ở trước (prefix) hoặc sau (suffix) — vd. icon kính
 * lúp cho ô tìm kiếm, nút con mắt hiện/ẩn cho ô mật khẩu.
 *
 * Viền + focus ring vẽ trên CHÍNH nhóm này, không phải trên `<input>` bên trong — nếu để cả hai
 * cùng vẽ viền sẽ thấy hai lớp chồng nhau. `GInputGroup` không can thiệp gì vào `<input>`: không
 * đọc/ghi value, không đụng CVA — `gInput` bên trong hoạt động y hệt lúc dùng độc lập (`[formControl]`,
 * `ngModel`, trạng thái invalid... đều nguyên vẹn).
 *
 * Style đặt ở `styles/opendesign.scss` (global), KHÔNG phải `styleUrl` của component này — cùng lý
 * do `.g-card__header`/`.g-card__footer` cũng nằm ở đó: CSS cần với vào `<input gInput>` và icon/nút
 * được projected từ template của consumer, còn view encapsulation của `GInputGroup` chỉ style được
 * nội dung trong TEMPLATE của chính nó (`<ng-content />`), không với ra ngoài được.
 */
@Component({
  selector: 'g-input-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-input-group',
  },
})
export class GInputGroup {}

/** Đánh dấu phần tử chiếu vào TRƯỚC input trong nhóm — vd. icon trang trí (kính lúp). */
@Directive({
  selector: '[gInputPrefix]',
  host: {
    class: 'g-input-group__prefix',
  },
})
export class GInputPrefix {}

/** Đánh dấu phần tử chiếu vào SAU input trong nhóm — vd. nút hiện/ẩn mật khẩu. */
@Directive({
  selector: '[gInputSuffix]',
  host: {
    class: 'g-input-group__suffix',
  },
})
export class GInputSuffix {}
