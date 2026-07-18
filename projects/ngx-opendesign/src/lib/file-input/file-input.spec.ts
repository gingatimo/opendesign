import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GFileInput } from './file-input';

@Component({
  imports: [GFileInput],
  template: `<g-file-input [(files)]="files" [multiple]="multiple()" [disabled]="disabled()" />`,
})
class Host {
  files = signal<File[]>([]);
  multiple = signal(false);
  disabled = signal(false);
}

function setNativeFiles(input: HTMLInputElement, files: File[]) {
  const list = { length: files.length, item: (i: number) => files[i] } as unknown as FileList;
  files.forEach((f, i) => ((list as unknown as Record<number, File>)[i] = f));
  Object.defineProperty(input, 'files', { value: list, configurable: true });
  input.dispatchEvent(new Event('change'));
}

describe('GFileInput', () => {
  it('mặc định hiện "Chưa chọn tệp"', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    expect(f.nativeElement.querySelector('.g-file-input__name').textContent.trim()).toBe(
      'Chưa chọn tệp',
    );
  });
  it('change native input → cập nhật files model + hiện tên (1 file)', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const input = f.nativeElement.querySelector('input[type=file]') as HTMLInputElement;
    setNativeFiles(input, [new File(['a'], 'anh.png', { type: 'image/png' })]);
    f.detectChanges();
    expect(f.componentInstance.files().length).toBe(1);
    expect(f.nativeElement.querySelector('.g-file-input__name').textContent.trim()).toBe('anh.png');
  });
  it('multiple=true → nhận nhiều file; label "N tệp"', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.multiple.set(true);
    f.detectChanges();
    const input = f.nativeElement.querySelector('input[type=file]') as HTMLInputElement;
    setNativeFiles(input, [new File(['a'], 'a.png'), new File(['b'], 'b.png')]);
    f.detectChanges();
    expect(f.componentInstance.files().length).toBe(2);
    expect(f.nativeElement.querySelector('.g-file-input__name').textContent.trim()).toBe(
      '2 tệp đã chọn',
    );
  });
  it('multiple=false (mặc định) → chỉ lấy file đầu dù chọn nhiều', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const input = f.nativeElement.querySelector('input[type=file]') as HTMLInputElement;
    setNativeFiles(input, [new File(['a'], 'a.png'), new File(['b'], 'b.png')]);
    f.detectChanges();
    expect(f.componentInstance.files().length).toBe(1);
  });
  it('drop file → cập nhật files (kéo-thả)', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const zone = f.nativeElement.querySelector('.g-file-input') as HTMLElement;
    const files = [new File(['a'], 'keo.png', { type: 'image/png' })];
    const list = { length: 1, item: () => files[0], 0: files[0] } as unknown as FileList;
    const ev = Object.assign(new Event('drop', { bubbles: true }), {
      dataTransfer: { files: list },
      preventDefault: vi.fn(),
    });
    zone.dispatchEvent(ev as Event);
    f.detectChanges();
    expect(f.componentInstance.files()[0].name).toBe('keo.png');
  });
  it('disabled → nút bị disabled', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.disabled.set(true);
    f.detectChanges();
    expect(
      (f.nativeElement.querySelector('.g-file-input__button') as HTMLButtonElement).disabled,
    ).toBe(true);
  });
});
