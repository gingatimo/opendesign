import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { GIcon } from './icon';
import { gIconMenu, gIconPanelLeftClose, gIconSearch } from './icons';

@Component({
  imports: [GIcon],
  template: `<g-icon [icon]="menu" />`,
})
class TrangTriHost {
  protected readonly menu = gIconMenu;
}

@Component({
  imports: [GIcon],
  template: `<g-icon [icon]="menu" aria-label="Mở menu" />`,
})
class CoNhanHost {
  protected readonly menu = gIconMenu;
}

@Component({
  imports: [GIcon],
  template: `<g-icon [icon]="menu" aria-label="Cảnh báo" aria-hidden="true" />`,
})
class CoNhanNhungAriaHiddenHost {
  protected readonly menu = gIconMenu;
}

@Component({
  imports: [GIcon],
  template: `<g-icon [icon]="menu" size="lg" />`,
})
class SizeLgHost {
  protected readonly menu = gIconMenu;
}

@Component({
  imports: [GIcon],
  template: `<g-icon [icon]="search" />`,
})
class CirclesHost {
  protected readonly search = gIconSearch;
}

@Component({
  imports: [GIcon],
  template: `<g-icon [icon]="panel" />`,
})
class RectsHost {
  protected readonly panel = gIconPanelLeftClose;
}

describe('GIcon', () => {
  it('mặc định là trang trí: aria-hidden, không có role', () => {
    const fixture = TestBed.createComponent(TrangTriHost);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GIcon)).nativeElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.getAttribute('role')).toBeNull();
    expect(host.querySelector('svg')).not.toBeNull();
  });

  it('có aria-label: role=img và KHÔNG aria-hidden (hai thứ đó mâu thuẫn)', () => {
    const fixture = TestBed.createComponent(CoNhanHost);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GIcon)).nativeElement;
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Mở menu');
    expect(host.getAttribute('aria-hidden')).toBeNull();
  });

  it('consumer tự đặt cả aria-label lẫn aria-hidden="true": gỡ aria-hidden, giữ role=img + aria-label, và cảnh báo dev', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(CoNhanNhungAriaHiddenHost);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GIcon)).nativeElement;
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Cảnh báo');
    expect(host.getAttribute('aria-hidden')).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      '[OpenDesign] GIcon: icon has aria-label/aria-labelledby but its host also has aria-hidden="true"; removed aria-hidden because the two conflict (aria-hidden removes the element from the accessibility tree, making aria-label meaningless)',
    );
    warnSpy.mockRestore();
  });

  it('mặc định size md', () => {
    const fixture = TestBed.createComponent(TrangTriHost);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GIcon)).nativeElement;
    expect(host.classList).toContain('g-icon--md');
  });

  it('đổi size qua input: size="lg" ra class g-icon--lg (không còn g-icon--md)', () => {
    const fixture = TestBed.createComponent(SizeLgHost);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GIcon)).nativeElement;
    expect(host.classList).toContain('g-icon--lg');
    expect(host.classList).not.toContain('g-icon--md');
  });

  it('svg bên trong luôn aria-hidden và focusable=false', () => {
    const fixture = TestBed.createComponent(TrangTriHost);
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.directive(GIcon)).nativeElement.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.getAttribute('focusable')).toBe('false');
  });

  it('render đúng số path/circle/rect theo dữ liệu icon truyền vào', () => {
    const fixture = TestBed.createComponent(TrangTriHost);
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.directive(GIcon)).nativeElement.querySelector('svg');
    expect(svg?.querySelectorAll('path').length).toBe(gIconMenu.paths?.length ?? 0);
  });

  it('icon có circles (gIconSearch): render đúng <circle> với cx/cy/r từ dữ liệu', () => {
    const fixture = TestBed.createComponent(CirclesHost);
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.directive(GIcon)).nativeElement.querySelector('svg');
    const circles = svg?.querySelectorAll('circle');
    expect(circles?.length).toBe(gIconSearch.circles?.length ?? 0);
    const circleData = gIconSearch.circles![0];
    expect(circles?.[0].getAttribute('cx')).toBe(String(circleData.cx));
    expect(circles?.[0].getAttribute('cy')).toBe(String(circleData.cy));
    expect(circles?.[0].getAttribute('r')).toBe(String(circleData.r));
  });

  it('icon có rects (gIconPanelLeftClose): render đúng <rect> với x/y/width/height/rx từ dữ liệu', () => {
    const fixture = TestBed.createComponent(RectsHost);
    fixture.detectChanges();
    const svg = fixture.debugElement.query(By.directive(GIcon)).nativeElement.querySelector('svg');
    const rects = svg?.querySelectorAll('rect');
    expect(rects?.length).toBe(gIconPanelLeftClose.rects?.length ?? 0);
    const rectData = gIconPanelLeftClose.rects![0];
    expect(rects?.[0].getAttribute('x')).toBe(String(rectData.x));
    expect(rects?.[0].getAttribute('y')).toBe(String(rectData.y));
    expect(rects?.[0].getAttribute('width')).toBe(String(rectData.width));
    expect(rects?.[0].getAttribute('height')).toBe(String(rectData.height));
    expect(rects?.[0].getAttribute('rx')).toBe(String(rectData.rx));
  });
});
