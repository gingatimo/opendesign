import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  GIcon,
  gIconMenu,
  gIconSettings,
  gIconUser,
  GSidebar,
  GSidebarFooter,
  GSidebarHeader,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GSidebarToggle,
} from 'ngx-opendesign';

@Component({
  selector: 'docs-sidebar-basic-demo',
  imports: [
    GSidebar,
    GSidebarHeader,
    GSidebarFooter,
    GSidebarItem,
    GSidebarItemIcon,
    GSidebarItemLabel,
    GSidebarToggle,
    GIcon,
  ],
  template: `
    <div class="demo-frame">
      <g-sidebar [(collapsed)]="collapsed">
        <g-sidebar-toggle />
        <div gSidebarHeader>OpenDesign</div>

        <a g-sidebar-item href="#" class="g-active" aria-current="page">
          <g-icon gSidebarItemIcon [icon]="iconMenu" />
          <span gSidebarItemLabel>Trang chủ</span>
        </a>
        <a g-sidebar-item href="#">
          <g-icon gSidebarItemIcon [icon]="iconSettings" />
          <span gSidebarItemLabel>Cài đặt</span>
        </a>
        <a g-sidebar-item href="#">
          <g-icon gSidebarItemIcon [icon]="iconUser" />
          <span gSidebarItemLabel>Thành viên</span>
        </a>

        <div gSidebarFooter>Trợ giúp &amp; phản hồi</div>
      </g-sidebar>
    </div>
  `,
  styles: `
    .demo-frame {
      height: 320px;
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
      overflow: hidden;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarBasicDemo {
  protected readonly collapsed = signal(false);
  protected readonly iconMenu = gIconMenu;
  protected readonly iconSettings = gIconSettings;
  protected readonly iconUser = gIconUser;
}
