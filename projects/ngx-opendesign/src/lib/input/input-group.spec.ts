import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GInputGroup, GInputPrefix, GInputSuffix } from './input-group';
import { GInput } from './input';
import { GIcon } from '../icon/icon';
import { GIconButton } from '../icon-button/icon-button';
import { gIconEye, gIconEyeOff, gIconSearch } from '../icon/icons';

@Component({
  imports: [GInputGroup, GInputPrefix, GInput, GIcon],
  template: `
    <g-input-group>
      <g-icon gInputPrefix [icon]="search" />
      <input gInput placeholder="Tìm kiếm" />
    </g-input-group>
  `,
})
class TimKiemHost {
  protected readonly search = gIconSearch;
}

@Component({
  imports: [GInputGroup, GInputSuffix, GInput, GIcon, GIconButton, ReactiveFormsModule],
  template: `
    <g-input-group>
      <input gInput [formControl]="control" [type]="an() ? 'password' : 'text'" />
      <button
        type="button"
        g-icon-button
        gInputSuffix
        size="sm"
        [attr.aria-label]="an() ? 'Hiện mật khẩu' : 'Ẩn mật khẩu'"
        (click)="an.set(!an())"
      >
        <g-icon [icon]="an() ? gIconEye : gIconEyeOff" />
      </button>
    </g-input-group>
  `,
})
class MatKhauHost {
  readonly control = new FormControl('', { nonNullable: true });
  protected readonly an = signal(true);
  protected readonly gIconEye = gIconEye;
  protected readonly gIconEyeOff = gIconEyeOff;
}

describe('GInputGroup', () => {
  it('render nhóm với prefix icon: icon aria-hidden, input vẫn là input[gInput]', () => {
    const fixture = TestBed.createComponent(TimKiemHost);
    fixture.detectChanges();
    const group: HTMLElement = fixture.debugElement.query(By.directive(GInputGroup)).nativeElement;
    expect(group.classList).toContain('g-input-group');

    const icon: HTMLElement = fixture.debugElement.query(By.directive(GIcon)).nativeElement;
    expect(icon.getAttribute('aria-hidden')).toBe('true');

    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    expect(input.classList).toContain('g-input');
  });

  it('prefix render trước input trong DOM (thứ tự tab đúng)', () => {
    const fixture = TestBed.createComponent(TimKiemHost);
    fixture.detectChanges();
    const group: HTMLElement = fixture.debugElement.query(By.directive(GInputGroup)).nativeElement;
    const children = Array.from(group.querySelectorAll('g-icon, input'));
    expect(children[0].tagName.toLowerCase()).toBe('g-icon');
    expect(children[1].tagName.toLowerCase()).toBe('input');
  });

  it('nhóm với suffix là nút: button type="button" có aria-label, đứng SAU input trong DOM', () => {
    const fixture = TestBed.createComponent(MatKhauHost);
    fixture.detectChanges();
    const group: HTMLElement = fixture.debugElement.query(By.directive(GInputGroup)).nativeElement;

    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('aria-label')).toBe('Hiện mật khẩu');

    const children = Array.from(group.querySelectorAll('input, button'));
    expect(children[0].tagName.toLowerCase()).toBe('input');
    expect(children[1].tagName.toLowerCase()).toBe('button');
  });

  it('ô mật khẩu: bấm nút đổi type password↔text và aria-label đổi theo', () => {
    const fixture = TestBed.createComponent(MatKhauHost);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(input.type).toBe('password');
    expect(button.getAttribute('aria-label')).toBe('Hiện mật khẩu');

    button.click();
    fixture.detectChanges();
    expect(input.type).toBe('text');
    expect(button.getAttribute('aria-label')).toBe('Ẩn mật khẩu');

    button.click();
    fixture.detectChanges();
    expect(input.type).toBe('password');
    expect(button.getAttribute('aria-label')).toBe('Hiện mật khẩu');
  });

  it('[formControl] round-trip bình thường qua input trong nhóm (CVA không gãy)', () => {
    const fixture = TestBed.createComponent(MatKhauHost);
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    input.value = 'bí mật';
    input.dispatchEvent(new Event('input'));
    expect(fixture.componentInstance.control.value).toBe('bí mật');

    fixture.componentInstance.control.setValue('reset lại');
    fixture.detectChanges();
    expect(input.value).toBe('reset lại');
  });

  it('label consumer vẫn trỏ đúng input dù có lớp g-input-group bọc ngoài', () => {
    @Component({
      imports: [GInputGroup, GInputPrefix, GIcon, GInput],
      template: `
        <label for="tim-kiem">Tìm kiếm</label>
        <g-input-group>
          <g-icon gInputPrefix [icon]="search" />
          <input id="tim-kiem" gInput />
        </g-input-group>
      `,
    })
    class LabelHost {
      protected readonly search = gIconSearch;
    }

    const fixture = TestBed.createComponent(LabelHost);
    fixture.detectChanges();
    const label: HTMLLabelElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(label.control?.tagName.toLowerCase()).toBe('input');
    expect(label.control?.id).toBe('tim-kiem');
  });
});
