import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GChips } from './chips';

@Component({
  imports: [GChips, ReactiveFormsModule],
  template: `<g-chips [formControl]="control" [allowDuplicate]="dup()" />`,
})
class Host {
  control = new FormControl<string[]>([]);
  dup = signal(false);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const input = f.nativeElement.querySelector('.g-chips__input') as HTMLInputElement;
  return { f, input };
}

function enter(input: HTMLInputElement, text: string) {
  input.value = text;
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
}

describe('GChips', () => {
  it('Enter thêm chip vào value', () => {
    const { f, input } = setup();
    enter(input, 'Angular');
    f.detectChanges();
    expect(f.componentInstance.control.value).toEqual(['Angular']);
    expect(f.nativeElement.querySelectorAll('g-chip').length).toBe(1);
  });

  it('chống trùng (mặc định)', () => {
    const { f, input } = setup();
    enter(input, 'A');
    enter(input, 'A');
    f.detectChanges();
    expect(f.componentInstance.control.value).toEqual(['A']);
  });

  it('allowDuplicate cho phép trùng', () => {
    const { f, input } = setup();
    f.componentInstance.dup.set(true);
    f.detectChanges();
    enter(input, 'A');
    enter(input, 'A');
    f.detectChanges();
    expect(f.componentInstance.control.value).toEqual(['A', 'A']);
  });

  it('Backspace khi ô rỗng xoá chip cuối', () => {
    const { f, input } = setup();
    enter(input, 'X');
    enter(input, 'Y');
    input.value = '';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', cancelable: true }));
    f.detectChanges();
    expect(f.componentInstance.control.value).toEqual(['X']);
  });

  it('writeValue hiển thị chip từ control', () => {
    const { f } = setup();
    f.componentInstance.control.setValue(['P', 'Q']);
    f.detectChanges();
    expect(f.nativeElement.querySelectorAll('g-chip').length).toBe(2);
  });
});
