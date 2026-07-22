import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GIcon,
  GIconButton,
  gIconSettings,
  GLayout,
  GLocaleService,
  GSidebar,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GTopbar,
  GTopbarEnd,
  GTopbarStart,
} from 'ngx-opendesign';
import { iconBell, iconHomeAlt, iconReport } from '../../core/demo-icons';
import { layoutCopyFor } from '../../pages/layout-copy';

@Component({
  selector: 'docs-layout-basic-demo',
  imports: [
    GLayout,
    GTopbar,
    GTopbarStart,
    GTopbarEnd,
    GSidebar,
    GSidebarItem,
    GSidebarItemIcon,
    GSidebarItemLabel,
    GIconButton,
    GIcon,
  ],
  template: `
    <g-layout>
      <g-topbar>
        <div gTopbarStart class="brand">{{ copy().app }}</div>
        <div gTopbarEnd>
          <button g-icon-button [attr.aria-label]="copy().notifications">
            <g-icon [icon]="iconBell" />
          </button>
        </div>
      </g-topbar>

      <g-sidebar>
        <a g-sidebar-item href="#" class="g-active" aria-current="page">
          <g-icon gSidebarItemIcon [icon]="iconHome" />
          <span gSidebarItemLabel>{{ copy().home }}</span>
        </a>
        <a g-sidebar-item href="#">
          <g-icon gSidebarItemIcon [icon]="iconReport" />
          <span gSidebarItemLabel>{{ copy().reports }}</span>
        </a>
        <a g-sidebar-item href="#">
          <g-icon gSidebarItemIcon [icon]="iconSettings" />
          <span gSidebarItemLabel>{{ copy().settings }}</span>
        </a>
      </g-sidebar>

      <main>
        <h2>{{ copy().overview }}</h2>
        <p>{{ copy().contentIntro }}</p>
        <p>{{ copy().layoutIntro }}</p>
        <h2>{{ copy().scrollTitle }}</h2>
        <p>{{ copy().scrollReason }}</p>
        <p>{{ copy().technique }}</p>
        <h2>{{ copy().tryScrollTitle }}</h2>
        <p>{{ copy().tryScroll }}</p>
        <p>{{ copy().filler }}</p>
        <p>{{ copy().bottom }}</p>
      </main>
    </g-layout>
  `,
  styles: `
    :host {
      display: block;
      height: 460px;
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
      overflow: hidden;
    }

    // .g-layout defaults to 100vh in opendesign.scss, which would break this fixed 460px demo.
    // A scoped element selector still reaches the child component host because Angular adds the
    // parent component's emulated encapsulation attribute to every host element created here.
    // This compiles to "g-layout[_ngcontent-xxx]", with higher specificity than global ".g-layout".
    g-layout {
      height: 100%;
    }

    .brand {
      font-weight: 500;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => layoutCopyFor(this.i18n.tag()).layout.demo);
  protected readonly iconBell = iconBell;
  protected readonly iconHome = iconHomeAlt;
  protected readonly iconReport = iconReport;
  protected readonly iconSettings = gIconSettings;
}
