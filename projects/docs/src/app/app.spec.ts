import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('render topbar có brand OpenDesign', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.docs-brand')?.textContent).toContain('OpenDesign');
  });

  it('sidebar chiếu đủ các nhóm điều hướng, bọc trong <nav> có aria-label', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const nav = el.querySelector('g-sidebar nav');
    expect(nav?.getAttribute('aria-label')).toBeTruthy();
    expect(nav?.textContent).toContain('Trang chủ');
    expect(nav?.textContent).toContain('Button');
    expect(nav?.textContent).toContain('Sidebar');
  });

  it('có skip link là phần tử đầu tiên, trỏ tới #main-content — main nhận được focus', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const skipLink = el.querySelector('a.docs-skip-link') as HTMLAnchorElement;
    expect(skipLink).not.toBeNull();
    expect(skipLink.getAttribute('href')).toBe('#main-content');
    expect(el.firstElementChild).toBe(skipLink);
    const main = el.querySelector('#main-content') as HTMLElement;
    expect(main).not.toBeNull();
    expect(main.tagName).toBe('MAIN');
    expect(main.getAttribute('tabindex')).toBe('-1');
  });
});
