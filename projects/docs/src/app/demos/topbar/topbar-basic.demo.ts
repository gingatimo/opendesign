import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GIcon,
  GIconButton,
  GLocaleService,
  GTopbar,
  GTopbarCenter,
  GTopbarEnd,
  GTopbarStart,
} from 'ngx-opendesign';
import { iconBell } from '../../core/demo-icons';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-topbar-basic-demo',
  imports: [GTopbar, GTopbarStart, GTopbarCenter, GTopbarEnd, GIconButton, GIcon],
  template: `
    <p class="demo-caption">{{ copy().fullCaption }}</p>
    <g-topbar>
      <div gTopbarStart class="brand">OpenDesign</div>
      <nav gTopbarCenter [attr.aria-label]="copy().navLabel" class="links">
        <a href="#">{{ copy().docs }}</a>
        <a href="#">{{ copy().blog }}</a>
      </nav>
      <div gTopbarEnd>
        <button g-icon-button [attr.aria-label]="copy().notifications">
          <g-icon [icon]="iconBell" />
        </button>
      </div>
    </g-topbar>

    <p class="demo-caption">{{ copy().noCenterCaption }}</p>
    <g-topbar>
      <div gTopbarStart class="brand">OpenDesign</div>
      <div gTopbarEnd>
        <button g-icon-button [attr.aria-label]="copy().notifications">
          <g-icon [icon]="iconBell" />
        </button>
      </div>
    </g-topbar>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .demo-caption {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
    .brand {
      font-weight: 500;
    }
    .links {
      display: flex;
      gap: var(--g-space-4);
    }
    .links a {
      color: var(--g-text-muted);
      text-decoration: none;
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).topbar.demo);
  protected readonly iconBell = iconBell;
}
