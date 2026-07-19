import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  GDockItem,
  GDockMenu,
  gIconBell,
  gIconCopy,
  gIconGrid,
  gIconImage,
  gIconLink,
} from 'ngx-opendesign';

@Component({
  selector: 'docs-dock-menu-basic-demo',
  imports: [GDockMenu],
  template: `<g-dock-menu [items]="items" />`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockMenuBasicDemo {
  protected readonly items: GDockItem[] = [
    { icon: gIconGrid, label: 'Bảng điều khiển' },
    { icon: gIconImage, label: 'Hình ảnh' },
    { icon: gIconLink, label: 'Liên kết' },
    { icon: gIconCopy, label: 'Sao chép' },
    { icon: gIconBell, label: 'Thông báo' },
  ];
}
