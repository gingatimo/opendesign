import { ChangeDetectionStrategy, Component, Directive } from '@angular/core';

@Directive({ selector: '[gTopbarStart]', host: { class: 'g-topbar__start' } })
export class GTopbarStart {}

@Directive({ selector: '[gTopbarCenter]', host: { class: 'g-topbar__center' } })
export class GTopbarCenter {}

@Directive({ selector: '[gTopbarEnd]', host: { class: 'g-topbar__end' } })
export class GTopbarEnd {}

// KHÔNG tự đặt role="banner" — role đó chỉ đúng khi <g-topbar> là banner của TOÀN trang,
// không phải khi lồng trong một section. Thư viện không biết ngữ cảnh sử dụng, nên để
// consumer tự thêm role="banner" (hoặc bọc trong <header>) khi topbar thực sự đóng vai trò
// đó — cùng lý do GCard cố ý không đặt role.
@Component({
  selector: 'g-topbar',
  template: `
    <ng-content select="[gTopbarStart]" />
    <ng-content select="[gTopbarCenter]" />
    <ng-content select="[gTopbarEnd]" />
  `,
  styleUrl: './topbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-topbar' },
})
export class GTopbar {}
