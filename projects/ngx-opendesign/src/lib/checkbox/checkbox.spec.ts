import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GCheckbox } from './checkbox';

@Component({
  imports: [GCheckbox, ReactiveFormsModule],
  template: `<g-checkbox [formControl]="control">Đồng ý</g-checkbox>`,
})
class HostComponent {
  readonly control = new FormControl(false, { nonNullable: true });
}

@Component({
  imports: [GCheckbox],
  template: `<g-checkbox [indeterminate]="true">Một phần</g-checkbox>`,
})
class IndeterminateHostComponent {}

describe('GCheckbox', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GCheckbox)).nativeElement;
    return { fixture, host };
  }

  it('mặc định role checkbox, aria-checked false', () => {
    const { host } = setup();
    expect(host.getAttribute('role')).toBe('checkbox');
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

  it('indeterminate: aria-checked = mixed', () => {
    const fixture = TestBed.createComponent(IndeterminateHostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GCheckbox)).nativeElement;
    expect(host.getAttribute('aria-checked')).toBe('mixed');
  });

  it('click khi đang indeterminate: xóa indeterminate, aria-checked phản ánh giá trị mới thay vì vẫn "mixed"', () => {
    const fixture = TestBed.createComponent(IndeterminateHostComponent);
    fixture.detectChanges();
    const host: HTMLElement = fixture.debugElement.query(By.directive(GCheckbox)).nativeElement;
    host.click();
    fixture.detectChanges();
    expect(host.getAttribute('aria-checked')).not.toBe('mixed');
    expect(host.getAttribute('aria-checked')).toBe('true');
  });

  it('FormControl.disable() đặt aria-disabled', () => {
    const { fixture, host } = setup();
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    expect(host.getAttribute('aria-disabled')).toBe('true');
  });
});
