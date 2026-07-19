import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  GBadge,
  GCard,
  GCardHeader,
  GIcon,
  GIconButton,
  gIconCart,
  gIconMenu,
  gIconPanelLeftClose,
  gIconPanelLeftOpen,
  gIconUser,
  GProgress,
  GSidebar,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GTopbar,
  GTopbarEnd,
  GTopbarStart,
} from 'ngx-opendesign';
import { iconBell } from '../../core/demo-icons';

@Component({
  selector: 'docs-dashboard-layout-demo',
  imports: [
    GTopbar,
    GTopbarStart,
    GTopbarEnd,
    GSidebar,
    GSidebarItem,
    GSidebarItemIcon,
    GSidebarItemLabel,
    GIconButton,
    GIcon,
    GCard,
    GCardHeader,
    GBadge,
    GProgress,
  ],
  template: `
    <div class="dashboard-layout-demo__frame">
      <g-topbar class="dashboard-layout-demo__topbar">
        <div gTopbarStart class="dashboard-layout-demo__brand-group">
          <button
            g-icon-button
            variant="ghost"
            size="sm"
            [attr.aria-label]="collapsed() ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên'"
            (click)="collapsed.set(!collapsed())"
          >
            <g-icon [icon]="collapsed() ? iconPanelOpen : iconPanelClose" size="sm" />
          </button>
          <span class="dashboard-layout-demo__brand">Acme Inc.</span>
        </div>
        <div gTopbarEnd>
          <button g-icon-button aria-label="Thông báo" size="sm">
            <g-icon [icon]="iconBell" size="sm" />
          </button>
        </div>
      </g-topbar>

      <div class="dashboard-layout-demo__body">
        <g-sidebar [(collapsed)]="collapsed">
          <a g-sidebar-item href="#" class="g-active" aria-current="page">
            <g-icon gSidebarItemIcon [icon]="iconMenu" />
            <span gSidebarItemLabel>Tổng quan</span>
          </a>
          <a g-sidebar-item href="#">
            <g-icon gSidebarItemIcon [icon]="iconCart" />
            <span gSidebarItemLabel>Đơn hàng</span>
          </a>
          <a g-sidebar-item href="#">
            <g-icon gSidebarItemIcon [icon]="iconUser" />
            <span gSidebarItemLabel>Khách hàng</span>
          </a>
        </g-sidebar>

        <main class="dashboard-layout-demo__main">
          <div class="dashboard-layout-demo__stats">
            <g-card>
              <div gCardHeader>Doanh thu tháng</div>
              <p class="dashboard-layout-demo__stat-value">128,4tr ₫</p>
              <g-badge variant="success">+12% so với tháng trước</g-badge>
            </g-card>

            <g-card>
              <div gCardHeader>Đơn hàng mới</div>
              <p class="dashboard-layout-demo__stat-value">342</p>
              <g-badge variant="warning">-4% so với tháng trước</g-badge>
            </g-card>

            <g-card>
              <div gCardHeader>Tiến độ mục tiêu quý</div>
              <g-progress [value]="68" aria-label="Tiến độ mục tiêu quý" />
            </g-card>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: `
    .dashboard-layout-demo__frame {
      display: flex;
      flex-direction: column;
      height: 420px;
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
      overflow: hidden;
    }
    // Toggle icon trong topbar (padding mặc định --g-space-6 = 24px) lệch cột với icon nav
    // trong sidebar thu gọn. Đo trực tiếp trên trình duyệt thật (Chromium, xem
    // tt-align-report.md) — KHÔNG suy từ CSS trên giấy: item thu gọn thực tế không co giãn hết
    // bề rộng .g-sidebar__body (width:100% của item chỉ ra 40px dù body rộng 55px, item nằm sát
    // trái), nên tâm icon nav đo được cách mép sidebar 28px chứ không phải 36px như tính lý
    // thuyết (sidebarWidth/2). Padding-left 24px cho toggle cx lệch nav icon cx 8px; đổi còn
    // --g-space-3 (12px) khớp đúng 28px (±0px khi đo cx thật).
    .dashboard-layout-demo__topbar {
      padding-left: var(--g-space-3);
    }
    .dashboard-layout-demo__brand-group {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
    }
    .dashboard-layout-demo__brand {
      font-weight: 500;
    }
    .dashboard-layout-demo__body {
      display: flex;
      flex: 1;
      min-height: 0;
    }
    .dashboard-layout-demo__main {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      padding: var(--g-space-4);
    }
    .dashboard-layout-demo__stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--g-space-4);
    }
    .dashboard-layout-demo__stat-value {
      margin: 0 0 var(--g-space-2);
      font-size: var(--g-font-size-lg);
      font-weight: 600;
      color: var(--g-text);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutDemo {
  protected readonly collapsed = signal(false);
  protected readonly iconPanelOpen = gIconPanelLeftOpen;
  protected readonly iconPanelClose = gIconPanelLeftClose;
  protected readonly iconBell = iconBell;
  protected readonly iconMenu = gIconMenu;
  protected readonly iconCart = gIconCart;
  protected readonly iconUser = gIconUser;
}
