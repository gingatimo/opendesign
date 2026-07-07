import { Directive } from '@angular/core';

// Directive style thuần trên <a> native — không có view riêng (giống GCardHeader/GInput), chỉ gắn
// class để opendesign.scss vẽ style (gạch chân, hover, focus ring). Selector camelCase (a[gLink])
// khớp rule @angular-eslint/directive-selector (prefix g, style camelCase) nên PHẢI là @Directive —
// khác a[g-button] (kebab-case) buộc phải là @Component, xem tiền lệ GSidebarItem.
//
// Không set role hay can thiệp bất kỳ thuộc tính nào của <a>: <a href> native đã có sẵn role "link"
// và hành vi focus/kích hoạt bàn phím chuẩn — tự thêm role vào đây là thừa và có thể ghi đè nhầm
// khi <a> không có href (khi đó role mặc định là "generic", không phải "link" — đúng theo spec HTML,
// không phải lỗi cần "sửa").
@Directive({
  selector: 'a[gLink]',
  host: {
    class: 'g-link',
  },
})
export class GLink {}
