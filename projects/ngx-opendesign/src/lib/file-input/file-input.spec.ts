import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GFileInput } from './file-input';

@Component({
  imports: [GFileInput],
  template: `<g-file-input
    [(files)]="files"
    [multiple]="multiple()"
    [disabled]="disabled()"
    [showFileList]="showFileList()"
  />`,
})
class Host {
  files = signal<File[]>([]);
  multiple = signal(false);
  disabled = signal(false);
  showFileList = signal(true);
}

function setNativeFiles(input: HTMLInputElement, files: File[]) {
  const list = { length: files.length, item: (i: number) => files[i] } as unknown as FileList;
  files.forEach((f, i) => ((list as unknown as Record<number, File>)[i] = f));
  Object.defineProperty(input, 'files', { value: list, configurable: true });
  input.dispatchEvent(new Event('change'));
}

function fileOf(name: string, size: number): File {
  const f = new File(['x'], name, { type: 'text/plain' });
  Object.defineProperty(f, 'size', { value: size, configurable: true });
  return f;
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

  it('multi: nối thêm qua nhiều lần chọn, khử trùng theo name+size', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.multiple.set(true);
    f.detectChanges();
    const input = f.nativeElement.querySelector('input[type=file]') as HTMLInputElement;
    setNativeFiles(input, [new File(['a'], 'a.png')]);
    f.detectChanges();
    // lần 2: a trùng (cùng name+size), b mới → danh sách [a, b]
    setNativeFiles(input, [new File(['a'], 'a.png'), new File(['b'], 'b.png')]);
    f.detectChanges();
    expect(f.componentInstance.files().map((x) => x.name)).toEqual(['a.png', 'b.png']);
  });

  it('single: chọn mới thay thế danh sách cũ', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const input = f.nativeElement.querySelector('input[type=file]') as HTMLInputElement;
    setNativeFiles(input, [new File(['a'], 'a.png')]);
    f.detectChanges();
    setNativeFiles(input, [new File(['b'], 'b.png')]);
    f.detectChanges();
    expect(f.componentInstance.files().map((x) => x.name)).toEqual(['b.png']);
  });

  it('multi: nút xoá loại đúng phần tử khỏi danh sách', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.multiple.set(true);
    f.componentInstance.files.set([fileOf('a.txt', 1), fileOf('b.txt', 2), fileOf('c.txt', 3)]);
    f.detectChanges();
    const removeBtns = f.nativeElement.querySelectorAll('.g-file-input__remove');
    expect(removeBtns.length).toBe(3);
    (removeBtns[1] as HTMLButtonElement).click();
    f.detectChanges();
    expect(f.componentInstance.files().map((x) => x.name)).toEqual(['a.txt', 'c.txt']);
  });

  it('multi: hiện dung lượng đã format (KB/MB)', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.multiple.set(true);
    f.componentInstance.files.set([fileOf('big.bin', 1536), fileOf('huge.bin', 3 * 1024 * 1024)]);
    f.detectChanges();
    const sizes = Array.from(f.nativeElement.querySelectorAll('.g-file-input__item-size')).map(
      (el) => (el as HTMLElement).textContent!.trim(),
    );
    expect(sizes).toEqual(['1.5 KB', '3 MB']);
  });

  it('multi + showFileList mặc định → hiện danh sách + nút xoá', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.multiple.set(true);
    f.componentInstance.files.set([fileOf('a.txt', 1)]);
    f.detectChanges();
    expect(f.nativeElement.querySelector('.g-file-input__list')).not.toBeNull();
    expect(f.nativeElement.querySelector('.g-file-input__remove')).not.toBeNull();
  });

  it('multi + showFileList=false → ẩn danh sách dựng sẵn', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.multiple.set(true);
    f.componentInstance.showFileList.set(false);
    f.componentInstance.files.set([fileOf('a.txt', 1)]);
    f.detectChanges();
    expect(f.nativeElement.querySelector('.g-file-input__list')).toBeNull();
  });
});
