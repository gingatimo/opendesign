import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { GToggle } from './toggle';

@Component({
  imports: [GToggle, ReactiveFormsModule],
  template: `<g-toggle [formControl]="control"></g-toggle>`,
})
class HostComponent {
  readonly control = new FormControl(false, { nonNullable: true });
}

@Component({
  imports: [GToggle],
  template: `<g-toggle aria-label="Bật thông báo"></g-toggle>`,
})
class HostWithAriaLabelComponent {}

describe('GToggle', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GToggle)).nativeElement;
    return { fixture, host };
  }

  it('mặc định role switch, aria-checked false', () => {
    const { host } = setup();
    expect(host.getAttribute('role')).toBe('switch');
    expect(host.getAttribute('aria-checked')).toBe('false');
  });

  it('click chuyển aria-checked + cập nhật FormControl', () => {
    const { fixture, host } = setup();
    host.click();
    fixture.detectChanges();
    expect(host.getAttribute('aria-checked')).toBe('true');
    expect(fixture.componentInstance.control.value).toBe(true);
  });

  it('phím Space cũng toggle được', () => {
    const { fixture, host } = setup();
    const event = new KeyboardEvent('keydown', { key: ' ', cancelable: true });
    host.dispatchEvent(event);
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe(true);
  });

  it('cảnh báo dev khi thiếu aria-label/aria-labelledby', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    setup();
    expect(warnSpy).toHaveBeenCalledWith(
      '[OpenDesign] GToggle: toggle needs aria-label or aria-labelledby',
    );
    warnSpy.mockRestore();
  });

  it('không cảnh báo khi có aria-label', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const fixture = TestBed.createComponent(HostWithAriaLabelComponent);
    fixture.detectChanges();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
