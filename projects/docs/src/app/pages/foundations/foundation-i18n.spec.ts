import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import ColorsPage from './colors.page';
import DarkModePage from './dark-mode.page';
import RadiusSpacingPage from './radius-spacing.page';
import TypographyPage from './typography.page';

function render<T>(component: Type<T>): HTMLElement {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  TestBed.inject(GLocaleService).use(gLocaleEn);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('foundation pages i18n', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideGLocale(gLocaleVi)] });
  });

  it('dịch trang màu sắc sang tiếng Anh', () => {
    const text = render(ColorsPage).textContent ?? '';

    expect(text).toContain('Colors');
    expect(text).toContain('Semantic colors');
    expect(text).toContain('Value');
    expect(text).toContain('Description');
    expect(text).toContain('Page background.');
    expect(text).not.toContain('Màu sắc');
  });

  it('dịch trang dark mode sang tiếng Anh', () => {
    const text = render(DarkModePage).textContent ?? '';

    expect(text).toContain('How to enable');
    expect(text).toContain('Sample ThemeService');
    expect(text).toContain('remove it to return to light');
    expect(text).not.toContain('Cách bật');
  });

  it('dịch trang radius & spacing sang tiếng Anh', () => {
    const text = render(RadiusSpacingPage).textContent ?? '';

    expect(text).toContain('Large radii are central');
    expect(text).toContain('Fully rounded');
    expect(text).toContain('Default control height.');
    expect(text).not.toContain('Bo góc lớn');
  });

  it('dịch trang typography sang tiếng Anh', () => {
    const text = render(TypographyPage).textContent ?? '';

    expect(text).toContain('OpenDesign uses a system font stack');
    expect(text).toContain('Where to use them');
    expect(text).toContain('Size xs');
    expect(text).not.toContain('Cỡ xs');
  });
});
