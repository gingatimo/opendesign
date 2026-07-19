import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GDrawer, GDrawerSide } from './drawer';

@Component({
  imports: [GDrawer],
  template: `
    <g-drawer
      [(open)]="open"
      [side]="side()"
      [size]="size()"
      [disableClose]="disableClose()"
      ariaLabel="Ngăn kéo"
    >
      <button type="button">Nội dung</button>
    </g-drawer>
  `,
})
class Host {
  open = signal(false);
  side = signal<GDrawerSide>('right');
  size = signal<string | undefined>(undefined);
  disableClose = signal(false);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const hostEl = f.nativeElement.querySelector('g-drawer') as HTMLElement;
  const panel = hostEl.querySelector('.g-drawer__panel') as HTMLElement;
  const backdrop = hostEl.querySelector('.g-drawer__backdrop') as HTMLElement;
  return { f, hostEl, panel, backdrop };
}

describe('GDrawer', () => {
  it('mặc định đóng: không có class open, panel inert, side=right', () => {
    const { hostEl, panel } = setup();
    expect(hostEl.classList.contains('g-drawer--open')).toBe(false);
    expect(hostEl.classList.contains('g-drawer--right')).toBe(true);
    expect(panel.hasAttribute('inert')).toBe(true);
  });

  it('panel là dialog có nhãn', () => {
    const { panel } = setup();
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(panel.getAttribute('aria-modal')).toBe('true');
    expect(panel.getAttribute('aria-label')).toBe('Ngăn kéo');
  });

  it('open=true → class open + bỏ inert', () => {
    const { f, hostEl, panel } = setup();
    f.componentInstance.open.set(true);
    f.detectChanges();
    expect(hostEl.classList.contains('g-drawer--open')).toBe(true);
    expect(panel.hasAttribute('inert')).toBe(false);
  });

  it('side đổi → đổi class modifier', () => {
    const { f, hostEl } = setup();
    f.componentInstance.side.set('bottom');
    f.detectChanges();
    expect(hostEl.classList.contains('g-drawer--bottom')).toBe(true);
    expect(hostEl.classList.contains('g-drawer--right')).toBe(false);
  });

  it('thanh grab chỉ hiện khi side=bottom', () => {
    const { f, hostEl } = setup();
    expect(hostEl.querySelector('.g-drawer__handle')).toBeNull();
    f.componentInstance.side.set('bottom');
    f.detectChanges();
    expect(hostEl.querySelector('.g-drawer__handle')).not.toBeNull();
  });

  it('click backdrop đóng drawer', () => {
    const { f, backdrop } = setup();
    f.componentInstance.open.set(true);
    f.detectChanges();
    backdrop.click();
    f.detectChanges();
    expect(f.componentInstance.open()).toBe(false);
  });

  it('Escape đóng drawer', () => {
    const { f } = setup();
    f.componentInstance.open.set(true);
    f.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    f.detectChanges();
    expect(f.componentInstance.open()).toBe(false);
  });

  it('disableClose: backdrop + Escape KHÔNG đóng', () => {
    const { f, backdrop } = setup();
    f.componentInstance.disableClose.set(true);
    f.componentInstance.open.set(true);
    f.detectChanges();
    backdrop.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    f.detectChanges();
    expect(f.componentInstance.open()).toBe(true);
  });

  it('size áp inline width cho side ngang', () => {
    const { f, panel } = setup();
    f.componentInstance.side.set('right');
    f.componentInstance.size.set('400px');
    f.detectChanges();
    expect(panel.style.width).toBe('400px');
    expect(panel.style.height).toBe('');
  });

  it('size áp inline height cho side dọc (bottom)', () => {
    const { f, panel } = setup();
    f.componentInstance.side.set('bottom');
    f.componentInstance.size.set('50vh');
    f.detectChanges();
    expect(panel.style.height).toBe('50vh');
    expect(panel.style.width).toBe('');
  });
});
