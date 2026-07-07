import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GRadioGroup } from './radio-group';
import { GRadio } from './radio';

@Component({
  imports: [GRadioGroup, GRadio, ReactiveFormsModule],
  template: `
    <g-radio-group [formControl]="control">
      <g-radio value="a">A</g-radio>
      <g-radio value="b">B</g-radio>
      <g-radio value="c">C</g-radio>
    </g-radio-group>
  `,
})
class HostComponent {
  readonly control = new FormControl<string | null>(null);
}

@Component({
  imports: [GRadioGroup, GRadio, ReactiveFormsModule],
  template: `
    <g-radio-group [formControl]="control">
      <g-radio value="a">A</g-radio>
      <g-radio value="b" disabled>B</g-radio>
      <g-radio value="c">C</g-radio>
    </g-radio-group>
  `,
})
class DisabledMiddleHostComponent {
  readonly control = new FormControl<string | null>(null);
}

describe('GRadioGroup + GRadio', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const group: HTMLElement = fixture.debugElement.query(By.directive(GRadioGroup)).nativeElement;
    const radios: HTMLElement[] = fixture.debugElement
      .queryAll(By.directive(GRadio))
      .map((d) => d.nativeElement);
    return { fixture, group, radios };
  }

  it('group có role radiogroup', () => {
    const { group } = setup();
    expect(group.getAttribute('role')).toBe('radiogroup');
  });

  it('radio đầu tiên có tabindex 0 khi chưa chọn gì, còn lại -1', () => {
    const { radios } = setup();
    expect(radios[0].getAttribute('tabindex')).toBe('0');
    expect(radios[1].getAttribute('tabindex')).toBe('-1');
    expect(radios[2].getAttribute('tabindex')).toBe('-1');
  });

  it('click một radio: aria-checked đúng, cập nhật FormControl, roving tabindex chuyển', () => {
    const { fixture, radios } = setup();
    radios[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('b');
    expect(radios[1].getAttribute('aria-checked')).toBe('true');
    expect(radios[0].getAttribute('aria-checked')).toBe('false');
    expect(radios[1].getAttribute('tabindex')).toBe('0');
    expect(radios[0].getAttribute('tabindex')).toBe('-1');
  });

  it('mũi tên phải trên radio đang chọn di chuyển sang radio kế tiếp', () => {
    const { fixture, radios } = setup();
    radios[0].click();
    fixture.detectChanges();
    radios[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('b');
  });

  it('mũi tên phải ở radio cuối vòng về radio đầu', () => {
    const { fixture, radios } = setup();
    radios[2].click();
    fixture.detectChanges();
    radios[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('a');
  });

  it('FormControl.setValue("c") cập nhật lại UI (writeValue)', () => {
    const { fixture, radios } = setup();
    fixture.componentInstance.control.setValue('c');
    fixture.detectChanges();
    expect(radios[2].getAttribute('aria-checked')).toBe('true');
  });

  it('mũi tên phải bỏ qua radio disabled ở giữa, nhảy thẳng sang radio kế tiếp còn bật', () => {
    const fixture = TestBed.createComponent(DisabledMiddleHostComponent);
    fixture.detectChanges();
    const radios = fixture.debugElement.queryAll(By.directive(GRadio)).map((d) => d.nativeElement);
    radios[0].click();
    fixture.detectChanges();
    radios[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('c');
  });

  it('control.disable(): mỗi radio có tabindex -1, class + aria-disabled; mũi tên không đổi giá trị', () => {
    const { fixture, radios } = setup();
    fixture.componentInstance.control.disable();
    fixture.detectChanges();

    radios.forEach((radio) => {
      expect(radio.getAttribute('tabindex')).toBe('-1');
      expect(radio.classList).toContain('g-radio--disabled');
      expect(radio.getAttribute('aria-disabled')).toBe('true');
    });

    radios[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBeNull();
  });

  it('focusout trên group đánh dấu control touched dù không radio nào được chọn', () => {
    const { fixture, group } = setup();
    expect(fixture.componentInstance.control.touched).toBe(false);
    group.dispatchEvent(new FocusEvent('focusout'));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.touched).toBe(true);
  });

  it('control.setValue với giá trị không khớp radio nào: radio đầu tiên còn bật vẫn có tabindex 0', () => {
    const { fixture, radios } = setup();
    // Giá trị "stale"/chưa load kịp option tương ứng — không radio nào isSelected() true,
    // nhưng nhóm vẫn phải reachable bằng bàn phím.
    fixture.componentInstance.control.setValue('khong-ton-tai');
    fixture.detectChanges();
    expect(radios[0].getAttribute('tabindex')).toBe('0');
  });
});
