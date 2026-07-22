import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GMenu, GMenuItem, GSubmenu } from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-menu-basic-demo',
  imports: [GMenu, GMenuItem, GSubmenu],
  template: `
    <div>
      <h4>{{ copy().verticalTitle }}</h4>
      <g-menu class="demo-menu-vertical">
        <a g-menu-item href="#">{{ copy().overview }}</a>
        <g-submenu [label]="copy().settings">
          <a g-menu-item href="#">{{ copy().profile }}</a>
          <a g-menu-item href="#">{{ copy().security }}</a>
          <g-submenu [label]="copy().advanced">
            <a g-menu-item href="#">API keys</a>
            <a g-menu-item href="#">Webhooks</a>
          </g-submenu>
        </g-submenu>
        <a g-menu-item href="#">{{ copy().help }}</a>
      </g-menu>
    </div>

    <div>
      <h4>{{ copy().horizontalTitle }}</h4>
      <g-menu orientation="horizontal">
        <a g-menu-item href="#">{{ copy().home }}</a>
        <g-submenu [label]="copy().products">
          <a g-menu-item href="#">{{ copy().phones }}</a>
          <a g-menu-item href="#">{{ copy().computers }}</a>
          <a g-menu-item href="#">{{ copy().accessories }}</a>
        </g-submenu>
        <g-submenu [label]="copy().support">
          <a g-menu-item href="#">{{ copy().contact }}</a>
          <a g-menu-item href="#">{{ copy().docs }}</a>
        </g-submenu>
      </g-menu>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-5);
    }
    h4 {
      margin: 0 0 var(--g-space-2);
    }
    .demo-menu-vertical {
      max-width: 260px;
      padding: var(--g-space-2);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).menu.demo);
}
