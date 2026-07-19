import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Menu điều hướng. orientation='vertical' (mặc định) → danh sách dọc, mục cha (GSubmenu) mở/gập inline
// (accordion). orientation='horizontal' → thanh ngang, mục cha bung dropdown. GSubmenu inject GMenu để
// đọc orientation. Style mục (.g-menu-item) ở opendesign.scss GLOBAL vì áp cho cả mục chiếu vào lẫn nút
// toggle của GSubmenu.
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
}

// Mục lá của menu: <a g-menu-item routerLink> hoặc <button g-menu-item>. Thuần trình bày (style global).
@Component({
  selector: 'a[g-menu-item], button[g-menu-item]',
  template: `<ng-content />`,
  host: { class: 'g-menu-item' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GMenuItem {}
