import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
  it('mặc định size md, role status, aria-label tiếng Việt mặc định', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const spinner: HTMLElement = fixture.debugElement.query(By.directive(GSpinner)).nativeElement;
    expect(spinner.classList).toContain('g-spinner');
    expect(spinner.classList).toContain('g-spinner--md');
    expect(spinner.getAttribute('role')).toBe('status');
    expect(spinner.getAttribute('aria-label')).toBe('Đang tải');
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
});
