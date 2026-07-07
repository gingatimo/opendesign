import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GButton, gIconDownload, GIcon, gIconPlus, gIconTrash } from 'ngx-opendesign';

@Component({
  selector: 'docs-button-icon-text-demo',
  imports: [GButton, GIcon],
  template: `
    <button g-button>
      <g-icon [icon]="gIconPlus" />
      Thêm mới
    </button>
    <button g-button variant="outline">
      <g-icon [icon]="gIconDownload" />
      Tải xuống
    </button>
    <button g-button variant="danger">
      <g-icon [icon]="gIconTrash" />
      Xóa
    </button>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconTextDemo {
  protected readonly gIconPlus = gIconPlus;
  protected readonly gIconDownload = gIconDownload;
  protected readonly gIconTrash = gIconTrash;
}
