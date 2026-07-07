import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('opendesign-theme');
    document.documentElement.removeAttribute('data-g-theme');
  });

  it('mặc định light, không set attribute dark', () => {
    const service = TestBed.inject(ThemeService);
    const doc = TestBed.inject(DOCUMENT);
    expect(service.theme()).toBe('light');
    expect(doc.documentElement.getAttribute('data-g-theme')).toBeNull();
  });

  it('toggle chuyển sang dark: set attribute + persist', () => {
    const service = TestBed.inject(ThemeService);
    const doc = TestBed.inject(DOCUMENT);
    service.toggle();
    TestBed.tick();
    expect(service.theme()).toBe('dark');
    expect(doc.documentElement.getAttribute('data-g-theme')).toBe('dark');
    expect(localStorage.getItem('opendesign-theme')).toBe('dark');
  });

  it('khởi tạo đọc lại theme đã lưu', () => {
    localStorage.setItem('opendesign-theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
  });
});
