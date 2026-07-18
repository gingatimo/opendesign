import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GStep } from './step';
import { GStepper } from './stepper';

@Component({
  imports: [GStepper, GStep],
  template: `
    <g-stepper [(activeStep)]="active">
      <g-step label="Một"><p>ND-mot</p></g-step>
      <g-step label="Hai"><p>ND-hai</p></g-step>
      <g-step label="Ba"><p>ND-ba</p></g-step>
    </g-stepper>
  `,
})
class Host {
  active = signal(0);
}

describe('GStepper', () => {
  it('chỉ render nội dung bước active', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    expect(f.nativeElement.textContent).toContain('ND-mot');
    expect(f.nativeElement.textContent).not.toContain('ND-hai');
  });
  it('đổi activeStep → render nội dung bước mới; model hai chiều', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    f.componentInstance.active.set(1);
    f.detectChanges();
    expect(f.nativeElement.textContent).toContain('ND-hai');
    expect(f.nativeElement.textContent).not.toContain('ND-mot');
  });
  it('click header bước → set activeStep (emit) và render nội dung bước đó', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const headers = f.nativeElement.querySelectorAll(
      '.g-stepper__header',
    ) as NodeListOf<HTMLButtonElement>;
    headers[2].click();
    f.detectChanges();
    expect(f.componentInstance.active()).toBe(2);
    expect(f.nativeElement.textContent).toContain('ND-ba');
  });
  it('trạng thái completed/active/upcoming + aria-current', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.active.set(1);
    f.detectChanges();
    const steps = f.nativeElement.querySelectorAll('.g-stepper__step');
    expect(steps[0].classList.contains('g-stepper__step--completed')).toBe(true);
    expect(steps[1].classList.contains('g-stepper__step--active')).toBe(true);
    expect(steps[2].classList.contains('g-stepper__step--upcoming')).toBe(true);
    expect(steps[1].getAttribute('aria-current')).toBe('step');
  });
  it('activeStep ngoài khoảng → rơi về 0', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.active.set(9);
    f.detectChanges();
    expect(f.nativeElement.textContent).toContain('ND-mot');
  });
  it('panel nội dung liên kết ARIA với header bước active (role=group, aria-labelledby ↔ aria-controls)', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.active.set(1);
    f.detectChanges();
    const panel = f.nativeElement.querySelector('.g-stepper__panel') as HTMLElement;
    const activeHeader = f.nativeElement.querySelectorAll('.g-stepper__header')[1] as HTMLElement;
    expect(panel.getAttribute('role')).toBe('group');
    expect(panel.id).toBeTruthy();
    expect(panel.getAttribute('aria-labelledby')).toBe(activeHeader.id);
    expect(activeHeader.getAttribute('aria-controls')).toBe(panel.id);
  });
});
