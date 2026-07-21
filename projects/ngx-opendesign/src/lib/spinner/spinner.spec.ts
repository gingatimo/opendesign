import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GSpinner } from './spinner';

@Component({
  imports: [GSpinner],
  template: `<g-spinner />`,
})
class HostComponent {}

@Component({
  imports: [GSpinner],
  template: `<g-spinner size="lg" aria-label="Đang gửi biểu mẫu" />`,
})
class CustomLabelHostComponent {}

describe('GSpinner', () => {
  it('mặc định size md, role status, aria-label mặc định theo gói ngôn ngữ', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = fixture.debugElement.query(By.directive(GSpinner)).nativeElement;
    expect(spinner.classList).toContain('g-spinner');
    expect(spinner.classList).toContain('g-spinner--md');
    expect(spinner.getAttribute('role')).toBe('status');
    expect(spinner.getAttribute('aria-label')).toBe('Loading');
  });

  it('SVG bên trong là trang trí (aria-hidden)', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = fixture.debugElement.query(By.directive(GSpinner)).nativeElement;
    const svg = spinner.querySelector('svg');
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
  });

  it('consumer ghi đè được aria-label; đổi size qua input', () => {
    const fixture = TestBed.createComponent(CustomLabelHostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = fixture.debugElement.query(By.directive(GSpinner)).nativeElement;
    expect(spinner.getAttribute('aria-label')).toBe('Đang gửi biểu mẫu');
    expect(spinner.classList).toContain('g-spinner--lg');
  });

  // Bài học review Task 3: aria-label mặc định trước đây chỉ đặt MỘT LẦN lúc mount trong
  // afterNextRender nên đổi ngôn ngữ lúc chạy không kéo theo nhãn — trái mục tiêu số 1 của i18n.
  it('đổi ngôn ngữ lúc chạy thì aria-label mặc định đổi theo', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = fixture.debugElement.query(By.directive(GSpinner)).nativeElement;
    expect(spinner.getAttribute('aria-label')).toBe('Loading');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(spinner.getAttribute('aria-label')).toBe('Đang tải');
  });

  it('consumer tự đặt aria-label thì đổi ngôn ngữ KHÔNG được ghi đè', () => {
    const fixture = TestBed.createComponent(CustomLabelHostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = fixture.debugElement.query(By.directive(GSpinner)).nativeElement;
    expect(spinner.getAttribute('aria-label')).toBe('Đang gửi biểu mẫu');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(spinner.getAttribute('aria-label')).toBe('Đang gửi biểu mẫu');
  });
});
