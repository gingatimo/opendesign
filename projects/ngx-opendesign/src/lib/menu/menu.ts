import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Đăng ký của một GSubmenu đang mở — GMenu dùng để điều phối single-open cho dropdown ngang. */
export interface GSubmenuEntry {
  el: HTMLElement;
  close: () => void;
}

// Menu điều hướng. orientation='vertical' (mặc định) → danh sách dọc, mục cha (GSubmenu) mở/gập inline
// (accordion, cho phép nhiều mục cùng mở). orientation='horizontal' → thanh ngang, mục cha bung dropdown
// (single-open: mở mục mới đóng mục ANH-EM đang mở). GSubmenu inject GMenu để đọc orientation + điều phối.
// Style mục (.g-menu-item) ở opendesign.scss GLOBAL vì áp cho cả mục chiếu vào lẫn nút toggle của GSubmenu.
@Component({
  selector: 'g-menu',
  template: `<ng-content />`,
  host: {
    class: 'g-menu',
    '[class.g-menu--horizontal]': `orientation() === 'horizontal'`,
  },
  styleUrl: './menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GMenu {
  readonly orientation = input<'vertical' | 'horizontal'>('vertical');

  private readonly openEntries = new Set<GSubmenuEntry>();

  // Khi một submenu mở: đóng các submenu ANH-EM đang mở (không đóng tổ tiên/hậu duệ — để submenu lồng
  // vẫn bung được bên trong submenu cha). Dùng {el, close} thay vì tham chiếu GSubmenu để tránh vòng import.
  openSubmenu(entry: GSubmenuEntry): void {
    for (const other of [...this.openEntries]) {
      if (other !== entry && !other.el.contains(entry.el) && !entry.el.contains(other.el)) {
        other.close();
      }
    }
    this.openEntries.add(entry);
  }
  closeSubmenu(entry: GSubmenuEntry): void {
    this.openEntries.delete(entry);
  }
}

// Mục lá của menu: <a g-menu-item routerLink> hoặc <button g-menu-item>. Thuần trình bày (style global).
@Component({
  selector: 'a[g-menu-item], button[g-menu-item]',
  template: `<ng-content />`,
  host: { class: 'g-menu-item' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GMenuItem {}
