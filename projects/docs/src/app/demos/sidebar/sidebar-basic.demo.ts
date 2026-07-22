import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  GIcon,
  gIconMenu,
  gIconSettings,
  gIconUser,
  GLocaleService,
  GSidebar,
  GSidebarFooter,
  GSidebarHeader,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GSidebarToggle,
} from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

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
          <span gSidebarItemLabel>{{ copy().home }}</span>
        </a>
        <a g-sidebar-item href="#">
          <g-icon gSidebarItemIcon [icon]="iconSettings" />
          <span gSidebarItemLabel>{{ copy().settings }}</span>
        </a>
        <a g-sidebar-item href="#">
          <g-icon gSidebarItemIcon [icon]="iconUser" />
          <span gSidebarItemLabel>{{ copy().members }}</span>
        </a>

        <div gSidebarFooter>{{ copy().footer }}</div>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).sidebar.demo);
  protected readonly collapsed = signal(false);
  protected readonly iconMenu = gIconMenu;
  protected readonly iconSettings = gIconSettings;
  protected readonly iconUser = gIconUser;
}
