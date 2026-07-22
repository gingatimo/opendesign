import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
  GLocaleService,
} from 'ngx-opendesign';
import { iconBell } from '../../core/demo-icons';
import { playbookCopyFor } from '../../pages/playbook/playbook-copy';

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
            [attr.aria-label]="collapsed() ? copy().expandSidebar : copy().collapseSidebar"
            (click)="collapsed.set(!collapsed())"
          >
            <g-icon [icon]="collapsed() ? iconPanelOpen : iconPanelClose" size="sm" />
          </button>
          <span class="dashboard-layout-demo__brand">Acme Inc.</span>
        </div>
        <div gTopbarEnd>
          <button g-icon-button [attr.aria-label]="copy().notifications" size="sm">
            <g-icon [icon]="iconBell" size="sm" />
          </button>
        </div>
      </g-topbar>

      <div class="dashboard-layout-demo__body">
        <g-sidebar [(collapsed)]="collapsed">
          <a g-sidebar-item href="#" class="g-active" aria-current="page">
            <g-icon gSidebarItemIcon [icon]="iconMenu" />
            <span gSidebarItemLabel>{{ copy().overview }}</span>
          </a>
          <a g-sidebar-item href="#">
            <g-icon gSidebarItemIcon [icon]="iconCart" />
            <span gSidebarItemLabel>{{ copy().orders }}</span>
          </a>
          <a g-sidebar-item href="#">
            <g-icon gSidebarItemIcon [icon]="iconUser" />
            <span gSidebarItemLabel>{{ copy().customers }}</span>
          </a>
        </g-sidebar>

        <main class="dashboard-layout-demo__main">
          <div class="dashboard-layout-demo__stats">
            <g-card>
              <div gCardHeader>{{ copy().monthlyRevenue }}</div>
              <p class="dashboard-layout-demo__stat-value">{{ copy().revenueValue }}</p>
              <g-badge variant="success">{{ copy().revenueDelta }}</g-badge>
            </g-card>

            <g-card>
              <div gCardHeader>{{ copy().newOrders }}</div>
              <p class="dashboard-layout-demo__stat-value">{{ copy().ordersValue }}</p>
              <g-badge variant="warning">{{ copy().ordersDelta }}</g-badge>
            </g-card>

            <g-card>
              <div gCardHeader>{{ copy().quarterGoal }}</div>
              <g-progress [value]="68" [attr.aria-label]="copy().quarterGoal" />
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
    // Align the topbar toggle with collapsed sidebar icons based on measured Chromium pixels,
    // not paper math: collapsed items do not stretch to the full sidebar body width.
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
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => playbookCopyFor(this.i18n.tag()).dashboard);
  protected readonly collapsed = signal(false);
  protected readonly iconPanelOpen = gIconPanelLeftOpen;
  protected readonly iconPanelClose = gIconPanelLeftClose;
  protected readonly iconBell = iconBell;
  protected readonly iconMenu = gIconMenu;
  protected readonly iconCart = gIconCart;
  protected readonly iconUser = gIconUser;
}
