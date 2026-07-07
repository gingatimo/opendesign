import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GInput } from './input';

@Component({
  imports: [GInput, ReactiveFormsModule],
  template: `<input gInput [formControl]="control" />`,
})
class HostComponent {
  readonly control = new FormControl('', { nonNullable: true });
}

describe('GInput', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    return { fixture, input };
  }

  it('có class g-input, pill theo token', () => {
    const { input } = setup();
    expect(input.classList).toContain('g-input');
  });

  it('gõ vào input cập nhật FormControl (CVA)', () => {
    const { fixture, input } = setup();
    input.value = 'xin chào';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.control.value).toBe('xin chào');
  });

  it('FormControl.setValue cập nhật lại giá trị input (writeValue)', () => {
    const { fixture, input } = setup();
    fixture.componentInstance.control.setValue('reset');
    fixture.detectChanges();
    expect(input.value).toBe('reset');
  });

  it('invalid + touched: có class g-input--invalid', () => {
    const { fixture, input } = setup();
    fixture.componentInstance.control.setValidators(() => ({ required: true }));
    fixture.componentInstance.control.updateValueAndValidity();
    fixture.componentInstance.control.markAsTouched();
    input.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(input.classList).toContain('g-input--invalid');
  });

  it('invalid nhưng chưa touched: không có class g-input--invalid', () => {
    const { fixture, input } = setup();
    fixture.componentInstance.control.setValidators(() => ({ required: true }));
    fixture.componentInstance.control.updateValueAndValidity();
    fixture.detectChanges();
    expect(input.classList).not.toContain('g-input--invalid');
  });

  it('control.markAsTouched() (không dispatch DOM event, ví dụ form.markAllAsTouched()) vẫn cập nhật class g-input--invalid', () => {
    const { fixture, input } = setup();
    fixture.componentInstance.control.setValidators(() => ({ required: true }));
    fixture.componentInstance.control.updateValueAndValidity();
    fixture.componentInstance.control.markAsTouched();
    fixture.detectChanges();
    expect(input.classList).toContain('g-input--invalid');
  });

  it('control.disable() vô hiệu hóa input native', () => {
    const { fixture, input } = setup();
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});
