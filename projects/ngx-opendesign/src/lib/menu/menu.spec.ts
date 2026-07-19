import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GMenu, GMenuItem } from './menu';
import { GSubmenu } from './submenu';

@Component({
  imports: [GMenu, GMenuItem, GSubmenu],
  template: `
    <g-menu [orientation]="orientation">
      <a g-menu-item href="/">Trang chủ</a>
      <g-submenu label="Cài đặt">
        <a g-menu-item href="/a">Hồ sơ</a>
        <a g-menu-item href="/b">Bảo mật</a>
      </g-submenu>
    </g-menu>
  `,
})
class Host {
  orientation: 'vertical' | 'horizontal' = 'vertical';
}

function setup(orientation: 'vertical' | 'horizontal' = 'vertical') {
  const f = TestBed.createComponent(Host);
  f.componentInstance.orientation = orientation;
  f.detectChanges();
  const submenu = f.nativeElement.querySelector('g-submenu') as HTMLElement;
  const toggle = submenu.querySelector('.g-submenu__toggle') as HTMLButtonElement;
  return { f, submenu, toggle };
}

describe('GMenu / GSubmenu', () => {
  it('GMenu horizontal → host class g-menu--horizontal', () => {
    const { f } = setup('horizontal');
    expect(f.nativeElement.querySelector('g-menu').classList.contains('g-menu--horizontal')).toBe(
      true,
    );
  });

  it('GSubmenu: click toggle mở (aria-expanded + class --open), click lại đóng', () => {
    const { f, submenu, toggle } = setup();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(submenu.classList.contains('g-submenu--open')).toBe(false);

    toggle.click();
    f.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(submenu.classList.contains('g-submenu--open')).toBe(true);

    toggle.click();
    f.detectChanges();
    expect(submenu.classList.contains('g-submenu--open')).toBe(false);
  });

  it('horizontal: click ra ngoài đóng dropdown', () => {
    const { f, submenu, toggle } = setup('horizontal');
    toggle.click();
    f.detectChanges();
    expect(submenu.classList.contains('g-submenu--open')).toBe(true);

    document.body.click();
    f.detectChanges();
    expect(submenu.classList.contains('g-submenu--open')).toBe(false);
  });

  it('vertical: click ra ngoài KHÔNG đóng accordion', () => {
    const { f, submenu, toggle } = setup('vertical');
    toggle.click();
    f.detectChanges();
    expect(submenu.classList.contains('g-submenu--open')).toBe(true);

    document.body.click();
    f.detectChanges();
    expect(submenu.classList.contains('g-submenu--open')).toBe(true);
  });
});
