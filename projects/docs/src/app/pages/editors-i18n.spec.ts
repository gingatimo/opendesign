import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import CodeEditorPage from './code-editor.page';
import RichTextEditorPage from './rich-text-editor.page';

function renderEn<T>(component: Type<T>): HTMLElement {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  TestBed.inject(GLocaleService).use(gLocaleEn);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('editor pages i18n', () => {
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

  it('dịch trang Code Editor và demo sang tiếng Anh', () => {
    const fixture = TestBed.createComponent(CodeEditorPage);
    fixture.detectChanges();
    TestBed.inject(GLocaleService).use(gLocaleEn);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';

    expect(text).toContain('Lightweight code editor');
    expect(text).toContain('TypeScript example');
    expect(text).toContain('createCounter');
    expect(text).toContain('Accessible label');
    expect(el.querySelector('[role="tablist"][aria-label="Code language"]')).toBeTruthy();
    expect(el.querySelector('textarea[aria-label="TypeScript example"]')).toBeTruthy();

    const plainTab = Array.from(el.querySelectorAll<HTMLButtonElement>('[role="tab"]')).find(
      (tab) => tab.textContent?.trim() === 'Plain',
    );
    plainTab?.click();
    fixture.detectChanges();

    expect(el.textContent ?? '').toContain('design system for Angular');
    expect(el.querySelector('textarea[aria-label="Plain text sample"]')).toBeTruthy();
    expect(text).not.toContain('Trình soạn code');
    expect(text).not.toContain('Giá trị');
  });

  it('dịch trang Rich Text Editor và demo sang tiếng Anh', () => {
    const el = renderEn(RichTextEditorPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Angular-only WYSIWYG rich text editor');
    expect(text).toContain('Keyboard and accessibility');
    expect(text).toContain('View generated HTML');
    expect(text).toContain('Hello editor');
    expect(text).toContain('Security');
    expect(text).toContain('Why keep document.execCommand?');
    expect(text).toContain('Sanitized HTML value');
    expect(
      el.querySelector('[role="textbox"][aria-label="Rich text editing example"]'),
    ).toBeTruthy();
    expect(text).not.toContain('Ví dụ soạn văn bản');
    expect(text).not.toContain('Xin chào');
  });
});
