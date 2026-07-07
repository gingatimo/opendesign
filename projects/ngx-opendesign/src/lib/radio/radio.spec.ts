import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GRadioGroup } from './radio-group';
import { GRadio } from './radio';

@Component({
  imports: [GRadioGroup, GRadio],
  template: `
    <g-radio-group>
      <g-radio value="a" disabled>A</g-radio>
      <g-radio value="b">B</g-radio>
    </g-radio-group>
  `,
})
class DisabledFirstHostComponent {}

describe('GRadio', () => {
  it('radio disabled không nhận roving tabindex 0 dù là radio đầu tiên trong DOM', () => {
    const fixture = TestBed.createComponent(DisabledFirstHostComponent);
    fixture.detectChanges();
    const radios = fixture.debugElement.queryAll(By.directive(GRadio)).map((d) => d.nativeElement);
    expect(radios[0].classList).toContain('g-radio--disabled');
    expect(radios[0].getAttribute('tabindex')).toBe('-1');
    expect(radios[1].getAttribute('tabindex')).toBe('0');
  });
});
