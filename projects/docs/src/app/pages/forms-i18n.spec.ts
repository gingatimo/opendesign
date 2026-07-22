import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import CheckboxPage from './checkbox.page';
import InputPage from './input.page';
import RadioPage from './radio.page';
import SelectPage from './select.page';
import TextareaPage from './textarea.page';
import TogglePage from './toggle.page';

function renderEn<T>(component: Type<T>): HTMLElement {
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  TestBed.inject(GLocaleService).use(gLocaleEn);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

describe('form pages i18n', () => {
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

  it('dịch trang Input và demo sang tiếng Anh', () => {
    const el = renderEn(InputPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Native input directive');
    expect(text).toContain('Input with icon — GInputGroup');
    expect(text).toContain('Projected prefix element');
    expect(el.querySelector('input[placeholder="Your name"]')).toBeTruthy();
    expect(el.querySelector('input[placeholder="Search"]')).toBeTruthy();
    expect(el.querySelector('button[aria-label="Show password"]')).toBeTruthy();
    expect(text).not.toContain('Nhập tên của bạn');
  });

  it('dịch trang Textarea và demo sang tiếng Anh', () => {
    const el = renderEn(TextareaPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Native textarea directive');
    expect(text).toContain('Resizable vertically');
    expect(el.querySelector('textarea[placeholder="Add a note..."]')).toBeTruthy();
    expect(text).not.toContain('Nhập ghi chú');
  });

  it('dịch trang Checkbox và demo sang tiếng Anh', () => {
    const text = renderEn(CheckboxPage).textContent ?? '';

    expect(text).toContain('Independent single-item selection');
    expect(text).toContain('I agree to the terms');
    expect(text).toContain('Partially selected');
    expect(text).toContain('Show the partially selected state.');
    expect(text).not.toContain('Tôi đồng ý với điều khoản');
  });

  it('dịch trang Toggle và aria-label demo sang tiếng Anh', () => {
    const el = renderEn(TogglePage);
    const text = el.textContent ?? '';

    expect(text).toContain('On/off switch');
    expect(text).toContain('Required: aria-label or aria-labelledby');
    expect(el.querySelector('g-toggle[aria-label="Enable notifications"]')).toBeTruthy();
    expect(text).not.toContain('Công tắc bật/tắt');
  });

  it('dịch trang Radio và demo sang tiếng Anh', () => {
    const text = renderEn(RadioPage).textContent ?? '';

    expect(text).toContain('contains g-radio options');
    expect(text).toContain('Free');
    expect(text).toContain('(required)');
    expect(text).toContain('Arrow keys move and select');
    expect(text).not.toContain('Miễn phí');
  });

  it('dịch trang Select và demo sang tiếng Anh', () => {
    const el = renderEn(SelectPage);
    const text = el.textContent ?? '';

    expect(text).toContain('Pill trigger');
    expect(text).toContain('Search');
    expect(text).toContain('Multiple selection');
    expect(text).toContain('Selected: none');
    expect(el.querySelector('g-select[placeholder="Choose a country"]')).toBeTruthy();
    expect(text).toContain('Text shown before a value is selected.');
    expect(text).not.toContain('Chọn quốc gia');
  });
});
