import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  Directive,
  ElementRef,
  inject,
} from '@angular/core';
import { GTooltip } from '../tooltip/tooltip';
import { GSidebar } from './sidebar';

// Selector kebab-case trên phần tử native (a[g-sidebar-item] / button[g-sidebar-item]) — giống
// hệt cách GButton/GIconButton đã làm (button[g-button], button[g-icon-button]). Vì eslint
// @angular-eslint/directive-selector bắt buộc camelCase, còn @angular-eslint/component-selector
// mới cho phép kebab-case, nên đây PHẢI là @Component (có view riêng, dù chỉ là <ng-content />),
// không thể là @Directive — khớp đúng tiền lệ đã có trong thư viện.
@Component({
  selector: 'a[g-sidebar-item], button[g-sidebar-item]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-sidebar-item' },
  hostDirectives: [GTooltip],
})
export class GSidebarItem {
  // optional: item phải dùng được độc lập ngoài <g-sidebar> (không có sidebar → không tooltip).
  private readonly sidebar = inject(GSidebar, { optional: true });
  private readonly tooltip = inject(GTooltip);
  private readonly label = contentChild(GSidebarItemLabel, { read: ElementRef });

  constructor() {
    // Thu gọn còn 72px thì nhãn bị ẩn trực quan, chỉ còn icon — tooltip là thứ duy nhất còn nói
    // được item này là gì. Sidebar mở rộng thì nhãn đã hiện rồi, tooltip chỉ là nhiễu.
    //
    // Đăng ký một HÀM chứ không truyền text: hàm được gọi lại mỗi lần hiện tooltip, nên vừa đọc
    // được collapsed() mới nhất, vừa đọc được text mới nhất. Text nhãn thường là interpolation
    // ({{ link.label }}) — text node đổi giá trị mà KHÔNG signal nào báo, nên cache lúc init sẽ
    // cho ra text cũ, còn cache cho đúng thì phải dựng MutationObserver. Đọc lười né cả hai.
    this.tooltip.gTooltipSetTextSource(() => {
      if (!this.sidebar?.collapsed()) return null;
      const text = this.label()?.nativeElement.textContent?.trim();
      return text ? text : null;
    });

    // Sidebar dọc, hẹp khi thu gọn: tooltip xổ sang PHẢI (trỏ vào vùng nội dung) thay vì lên
    // trên (mặc định GTooltip) — xổ lên trên sẽ chồng lên item liền kề trong danh sách dọc.
    this.tooltip.gTooltipSetPosition('right');
  }
}

@Directive({ selector: '[gSidebarItemIcon]', host: { class: 'g-sidebar-item__icon' } })
export class GSidebarItemIcon {}

// Xem báo cáo task-1-2-report.md — quyết định (a): bọc nhãn chữ trong directive riêng để có
// một phần tử ổn định làm điểm neo CSS visually-hidden khi sidebar thu gọn (text node trần
// không style trực tiếp được).
@Directive({ selector: '[gSidebarItemLabel]', host: { class: 'g-sidebar-item__label' } })
export class GSidebarItemLabel {}
