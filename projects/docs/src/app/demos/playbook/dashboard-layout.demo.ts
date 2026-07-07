import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  GBadge,
  GCard,
  GCardHeader,
  GIconButton,
  GProgress,
  GSidebar,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GTopbar,
  GTopbarEnd,
  GTopbarStart,
} from 'ngx-opendesign';

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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              @if (collapsed()) {
                <path d="M14 9l3 3-3 3" />
              } @else {
                <path d="M16 15l-3-3 3-3" />
              }
            </svg>
          </button>
          <span class="dashboard-layout-demo__brand">Acme Inc.</span>
        </div>
        <div gTopbarEnd>
          <button g-icon-button aria-label="Thông báo" size="sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
          </button>
        </div>
      </g-topbar>

      <div class="dashboard-layout-demo__body">
        <g-sidebar [(collapsed)]="collapsed">
          <a g-sidebar-item href="#" class="g-active" aria-current="page">
            <svg
              gSidebarItemIcon
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
            <span gSidebarItemLabel>Tổng quan</span>
          </a>
          <a g-sidebar-item href="#">
            <svg
              gSidebarItemIcon
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            <span gSidebarItemLabel>Đơn hàng</span>
          </a>
          <a g-sidebar-item href="#">
            <svg
              gSidebarItemIcon
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M20 21a8 8 0 1 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
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
}
