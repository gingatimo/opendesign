import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import ActionExpandPage from './action-expand.page';
import ButtonPage from './button.page';
import FabPage from './fab.page';
import IconButtonPage from './icon-button.page';

function renderEn<T>(component: Type<T>): HTMLElement {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  TestBed.inject(GLocaleService).use(gLocaleEn);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('button pages i18n', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideGLocale(gLocaleVi),
      ],
    });
  });

  it('dịch trang Button và demo sang tiếng Anh', () => {
    const text = renderEn(ButtonPage).textContent ?? '';

    expect(text).toContain('Pill buttons for actions');
    expect(text).toContain('Icon with text');
    expect(text).toContain('Save changes');
    expect(text).toContain('Name');
    expect(text).toContain('Visual style of the button.');
    expect(text).not.toContain('Lưu thay đổi');
  });

  it('dịch trang Icon Button và aria-label demo sang tiếng Anh', () => {
    const el = renderEn(IconButtonPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Round icon-only button');
    expect(text).toContain('Built-in icon set');
    expect(text).toContain('Required: aria-label or aria-labelledby');
    expect(el.querySelector('button[aria-label="Add new"]')).toBeTruthy();
    expect(text).not.toContain('Nút tròn chỉ chứa icon');
  });

  it('dịch trang Fab và demo sang tiếng Anh', () => {
    const el = renderEn(FabPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Floating Action Button');
    expect(text).toContain('fixed to the bottom-right');
    expect(text).toContain('Clicked: 0 times.');
    expect(el.querySelector('button[aria-label="Add new"]')).toBeTruthy();
    expect(text).not.toContain('Nút hành động nổi cố định');
  });

  it('dịch trang Action Expand và demo sang tiếng Anh', () => {
    const text = renderEn(ActionExpandPage).textContent ?? '';

    expect(text).toContain('Expanding action button');
    expect(text).toContain('Default — expands to the right');
    expect(text).toContain('Hover or Tab into the round button to expand.');
    expect(text).toContain('Emits the selected item.');
    expect(text).not.toContain('Nút hành động bung');
  });
});
