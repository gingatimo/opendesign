import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GDockItem,
  GDockMenu,
  GLocaleService,
  gIconBell,
  gIconCopy,
  gIconGrid,
  gIconImage,
  gIconLink,
} from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-dock-menu-basic-demo',
  imports: [GDockMenu],
  template: `<g-dock-menu [items]="items()" />`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockMenuBasicDemo {
  private readonly i18n = inject(GLocaleService);
  private readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).dockMenu.demo);
  protected readonly items = computed<GDockItem[]>(() => [
    { icon: gIconGrid, label: this.copy().dashboard },
    { icon: gIconImage, label: this.copy().images },
    { icon: gIconLink, label: this.copy().links },
    { icon: gIconCopy, label: this.copy().copy },
    { icon: gIconBell, label: this.copy().notifications },
  ]);
}
