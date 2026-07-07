import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GTextarea } from './textarea';

@Component({
  imports: [GTextarea, ReactiveFormsModule],
  template: `<textarea gTextarea [formControl]="control"></textarea>`,
})
class HostComponent {
  readonly control = new FormControl('', { nonNullable: true });
}

describe('GTextarea', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const textarea: HTMLTextAreaElement = fixture.debugElement.query(
      By.css('textarea'),
    ).nativeElement;
    return { fixture, textarea };
  }

  it('có class g-textarea', () => {
    const { textarea } = setup();
    expect(textarea.classList).toContain('g-textarea');
  });

  it('gõ vào textarea cập nhật FormControl (CVA)', () => {
    const { fixture, textarea } = setup();
    textarea.value = 'nhiều dòng';
    textarea.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.control.value).toBe('nhiều dòng');
  });

  it('invalid + touched: có class g-textarea--invalid', () => {
    const { fixture, textarea } = setup();
    fixture.componentInstance.control.setValidators(() => ({ required: true }));
    fixture.componentInstance.control.updateValueAndValidity();
    fixture.componentInstance.control.markAsTouched();
    textarea.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(textarea.classList).toContain('g-textarea--invalid');
  });

  it('control.markAsTouched() (không dispatch DOM event, ví dụ form.markAllAsTouched()) vẫn cập nhật class g-textarea--invalid', () => {
    const { fixture, textarea } = setup();
    fixture.componentInstance.control.setValidators(() => ({ required: true }));
    fixture.componentInstance.control.updateValueAndValidity();
    fixture.componentInstance.control.markAsTouched();
    fixture.detectChanges();
    expect(textarea.classList).toContain('g-textarea--invalid');
  });
});
