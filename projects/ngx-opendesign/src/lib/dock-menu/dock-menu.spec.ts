import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GDockMenu, GDockItem } from './dock-menu';
import { gIconBell, gIconCopy, gIconLink } from '../icon/icons';

interface DockApi {
  hovered: { set: (n: number) => void };
  scaleFor: (i: number) => number;
}

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
  const btns = f.nativeElement.querySelectorAll('.g-dock-menu__btn') as NodeListOf<HTMLButtonElement>;
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

  it('scaleFor: hover item phóng to, hàng xóm vơi dần', () => {
    const { f } = setup();
    const dock = f.debugElement.query(By.directive(GDockMenu))
      .componentInstance as unknown as DockApi;
    dock.hovered.set(1);
    expect(dock.scaleFor(1)).toBe(1.5);
    expect(dock.scaleFor(0)).toBe(1.3);
    expect(dock.scaleFor(2)).toBe(1.3);
    dock.hovered.set(-1); // không hover → tất cả về 1
    expect(dock.scaleFor(0)).toBe(1);
  });
});
