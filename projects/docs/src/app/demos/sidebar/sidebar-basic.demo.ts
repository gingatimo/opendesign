import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
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
  ],
  template: `
    <div class="demo-frame">
      <g-sidebar [(collapsed)]="collapsed">
        <g-sidebar-toggle />
        <div gSidebarHeader>OpenDesign</div>

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
          <span gSidebarItemLabel>Trang chủ</span>
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
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z"
            />
          </svg>
          <span gSidebarItemLabel>Cài đặt</span>
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
}
