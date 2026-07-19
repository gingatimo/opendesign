import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GIcon } from '../icon/icon';
import type { GIconGlyph } from '../icon/icons';

export interface GDockItem {
  icon: GIconGlyph;
  label: string;
  onClick?: () => void;
}

// Thanh dock kiểu macOS: hàng icon. Item đang hover phóng to ICON (không phóng các item hàng xóm,
// không tô nền) và icon trồi hẳn lên trên thanh — hover thuần bằng CSS nên không cần theo dõi chuột
// bằng JS. position='bottom' cố định giữa dưới màn hình. Nhãn hiện phía trên khi hover.
@Component({
  selector: 'g-dock-menu',
  imports: [GIcon],
  template: `
    <ul class="g-dock-menu__list">
      @for (item of items(); track $index) {
        <li class="g-dock-menu__item">
          <span class="g-dock-menu__tooltip">{{ item.label }}</span>
          <button
            type="button"
            class="g-dock-menu__btn"
            [attr.aria-label]="item.label"
            (click)="activate(item)"
          >
            <g-icon [icon]="item.icon" />
          </button>
        </li>
      }
    </ul>
  `,
  host: {
    class: 'g-dock-menu',
    '[class.g-dock-menu--bottom]': `position() === 'bottom'`,
  },
  styleUrl: './dock-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GDockMenu {
  readonly items = input<GDockItem[]>([]);
  readonly position = input<'bottom' | 'static'>('static');

  protected activate(item: GDockItem): void {
    item.onClick?.();
  }
}
