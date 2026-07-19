import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GDockMenu, GDockItem } from './dock-menu';
import { gIconBell, gIconCopy, gIconLink } from '../icon/icons';

@Component({
  imports: [GDockMenu],
  template: `<g-dock-menu [items]="items()" />`,
})
class Host {
  clicked = '';
  items = signal<GDockItem[]>([
    { icon: gIconBell, label: 'Thông báo', onClick: () => (this.clicked = 'bell') },
    { icon: gIconCopy, label: 'Sao chép' },
    { icon: gIconLink, label: 'Liên kết' },
  ]);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const btns = f.nativeElement.querySelectorAll(
    '.g-dock-menu__btn',
  ) as NodeListOf<HTMLButtonElement>;
  return { f, btns };
}

describe('GDockMenu', () => {
  it('render item với aria-label + icon', () => {
    const { btns } = setup();
    expect(btns.length).toBe(3);
    expect(btns[0].getAttribute('aria-label')).toBe('Thông báo');
    expect(btns[0].querySelector('g-icon')).not.toBeNull();
  });

  it('click gọi onClick của item', () => {
    const { f, btns } = setup();
    btns[0].click();
    expect(f.componentInstance.clicked).toBe('bell');
  });

  // Phóng to icon khi hover là hiệu ứng CSS thuần (transform trên g-icon) — kiểm bằng trình duyệt
  // thật, jsdom không tính layout/hover nên không phủ ở đây.
});
