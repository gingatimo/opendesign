import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { GIcon } from '../icon/icon';
import type { GIconGlyph } from '../icon/icons';

export interface GDockItem {
  icon: GIconGlyph;
  label: string;
  onClick?: () => void;
}

// Thanh dock kiểu macOS: hàng icon, item đang hover phóng to, các item hàng xóm phóng vơi dần theo
// khoảng cách. position='bottom' cố định giữa dưới màn hình. Nhãn hiện phía trên khi hover.
@Component({
  selector: 'g-dock-menu',
  imports: [GIcon],
  template: `
    <ul class="g-dock-menu__list" (mouseleave)="hovered.set(-1)">
      @for (item of items(); track $index; let i = $index) {
        <li
          class="g-dock-menu__item"
          [style.--g-dock-scale]="scaleFor(i)"
          (mouseenter)="hovered.set(i)"
        >
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

  protected readonly hovered = signal(-1);

  // Hệ số phóng theo khoảng cách tới item đang hover (giảm dần).
  protected scaleFor(i: number): number {
    const h = this.hovered();
    if (h < 0) return 1;
    const dist = Math.abs(i - h);
    if (dist === 0) return 1.5;
    if (dist === 1) return 1.3;
    if (dist === 2) return 1.15;
    return 1;
  }

  protected activate(item: GDockItem): void {
    item.onClick?.();
  }
}
