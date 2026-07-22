import { TestBed } from '@angular/core/testing';
import { GLocaleService } from 'ngx-opendesign';
import { appConfig } from './app.config';
import { App } from './app';
import I18nPage from './pages/foundations/i18n.page';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: appConfig.providers });
  });

  it('render topbar có brand OpenDesign', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.docs-brand')?.textContent).toContain('OpenDesign');
  });

  it('sidebar chiếu đủ các nhóm điều hướng, bọc trong <nav> có aria-label', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const nav = el.querySelector('g-sidebar nav');
    expect(nav?.getAttribute('aria-label')).toBeTruthy();
    expect(nav?.textContent).toContain('Trang chủ');
    expect(nav?.textContent).toContain('i18n');
    expect(nav?.textContent).toContain('Button');
    expect(nav?.textContent).toContain('Sidebar');
  });

  it('có skip link là phần tử đầu tiên, trỏ tới #main-content — main nhận được focus', async () => {
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

  it('khởi tạo tiếng Việt và bộ đổi ngôn ngữ dùng GTabs', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const i18n = TestBed.inject(GLocaleService);
    const el: HTMLElement = fixture.nativeElement;
    const tablist = el.querySelector('.docs-language-tabs [role="tablist"]') as HTMLElement;
    const tabs = Array.from(
      el.querySelectorAll<HTMLButtonElement>('.docs-language-tabs [role="tab"]'),
    );
    const [viTab, enTab] = tabs;

    expect(i18n.tag()).toBe('vi-VN');
    expect(tablist.getAttribute('aria-label')).toBe('Ngôn ngữ');
    expect(tabs.map((tab) => tab.textContent?.trim())).toEqual(['VI', 'EN']);
    expect(viTab.getAttribute('aria-selected')).toBe('true');
    expect(enTab.getAttribute('aria-selected')).toBe('false');

    enTab.click();
    fixture.detectChanges();

    expect(i18n.tag()).toBe('en-US');
    expect(viTab.getAttribute('aria-selected')).toBe('false');
    expect(enTab.getAttribute('aria-selected')).toBe('true');
  });

  it('trang i18n liệt kê các khoá locale mới nhất', () => {
    const fixture = TestBed.createComponent(I18nPage);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    const codes = Array.from(fixture.nativeElement.querySelectorAll('code')).map((el) =>
      (el as HTMLElement).textContent?.trim(),
    );

    expect(text).toContain('terminal');
    expect(codes).toContain('commandInput');
    expect(text).toContain('stepSlider');
    expect(codes).toContain('label');
    expect(text).toContain('editor');
    expect(codes).toContain('placeholder');
  });
});
