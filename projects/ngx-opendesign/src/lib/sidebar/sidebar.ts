import { ChangeDetectionStrategy, Component, Directive, model } from '@angular/core';

@Directive({ selector: '[gSidebarHeader]', host: { class: 'g-sidebar__header' } })
export class GSidebarHeader {}

@Directive({ selector: '[gSidebarFooter]', host: { class: 'g-sidebar__footer' } })
export class GSidebarFooter {}

// KHÔNG tự đặt role="navigation" — <g-sidebar> có thể chứa cả header/footer/nút thu gọn,
// không chỉ danh sách điều hướng. Consumer bọc phần điều hướng trong <nav> (hoặc thêm role)
// khi thực sự cần — cùng lý do GTopbar không tự đặt role="banner".
@Component({
  selector: 'g-sidebar',
  // Plan 9 Task 1: header + nút toggle nay chung MỘT HÀNG trên cùng (.g-sidebar__top), không
  // còn hai slot rời rạc như Plan 8. `select="g-sidebar-toggle"` chọn theo tên thẻ của component
  // GSidebarToggle — Angular content projection hỗ trợ selector là tên thẻ (không chỉ class/attr),
  // đã xác nhận hoạt động bằng test + trình duyệt thật (xem task-1-report.md). Consumer đặt
  // <g-sidebar-toggle> ở bất kỳ đâu trong <g-sidebar> vẫn luôn rơi vào hàng top này, giữ đúng
  // hành vi v1 "vị trí trong markup không quan trọng".
  // Vòng đổi mặc định: toggle nay đứng TRƯỚC header (đồng nhất với demo dashboard — nút toggle
  // nằm trái brand trên topbar) — thứ tự ng-content quyết định thứ tự hiển thị, không phải thứ
  // tự markup consumer viết (selector-based projection).
  template: `
    <div class="g-sidebar__top">
      <ng-content select="g-sidebar-toggle" />
      <ng-content select="[gSidebarHeader]" />
    </div>
    <div class="g-sidebar__body"><ng-content /></div>
    <ng-content select="[gSidebarFooter]" />
  `,
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-sidebar',
    '[class.g-sidebar--collapsed]': 'collapsed()',
  },
})
export class GSidebar {
  readonly collapsed = model(false);
}
