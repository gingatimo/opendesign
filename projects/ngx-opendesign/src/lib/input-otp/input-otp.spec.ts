import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GInputOtp } from './input-otp';

@Component({
  imports: [GInputOtp, ReactiveFormsModule],
  template: `<g-input-otp [formControl]="control" [length]="length()" [integerOnly]="int()" />`,
})
class Host {
  control = new FormControl('');
  length = signal(4);
  int = signal(false);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const boxes = f.nativeElement.querySelectorAll(
    '.g-input-otp__box',
  ) as NodeListOf<HTMLInputElement>;
  return { f, boxes };
}

function type(box: HTMLInputElement, ch: string) {
  box.value = ch;
  box.dispatchEvent(new Event('input'));
}

describe('GInputOtp', () => {
  it('render đúng số ô theo length', () => {
    const { boxes } = setup();
    expect(boxes.length).toBe(4);
  });

  it('gõ từng ô ghép thành value', () => {
    const { f, boxes } = setup();
    type(boxes[0], '1');
    type(boxes[1], '2');
    type(boxes[2], '3');
    f.detectChanges();
    expect(f.componentInstance.control.value).toBe('123');
  });

  it('integerOnly loại ký tự phi số', () => {
    const { f, boxes } = setup();
    f.componentInstance.int.set(true);
    f.detectChanges();
    type(boxes[0], 'a');
    f.detectChanges();
    expect(f.componentInstance.control.value).toBe('');
    type(boxes[0], '7');
    f.detectChanges();
    expect(f.componentInstance.control.value).toBe('7');
  });

  it('writeValue điền vào các ô', () => {
    const { f, boxes } = setup();
    f.componentInstance.control.setValue('ab');
    f.detectChanges();
    expect(boxes[0].value).toBe('a');
    expect(boxes[1].value).toBe('b');
    expect(boxes[2].value).toBe('');
  });

  it('paste rải chuỗi vào các ô', () => {
    const { f, boxes } = setup();
    // jsdom không có DataTransfer/ClipboardEvent.clipboardData nên mock tối giản (paste thật verify Chromium).
    const ev = new Event('paste', { cancelable: true }) as Event & {
      clipboardData: { getData: () => string };
    };
    ev.clipboardData = { getData: () => '9876' };
    boxes[0].dispatchEvent(ev);
    f.detectChanges();
    expect(f.componentInstance.control.value).toBe('9876');
  });

  it('Backspace ô rỗng xoá ký tự ô trước', () => {
    const { f, boxes } = setup();
    type(boxes[0], '1');
    type(boxes[1], '2');
    f.detectChanges();
    // box[2] rỗng, Backspace xoá box[1]
    boxes[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', cancelable: true }));
    f.detectChanges();
    expect(f.componentInstance.control.value).toBe('1');
  });
});
