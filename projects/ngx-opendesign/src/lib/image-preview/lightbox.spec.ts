import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GLightbox } from './lightbox';

function setup(urls: string[], startIndex = 0) {
  const close = vi.fn();
  TestBed.configureTestingModule({
    providers: [
      { provide: DIALOG_DATA, useValue: { urls, startIndex } },
      { provide: DialogRef, useValue: { close } },
    ],
  });
  const f = TestBed.createComponent(GLightbox);
  f.detectChanges();
  return {
    f,
    close,
    img: () => f.nativeElement.querySelector('.g-lightbox__img') as HTMLImageElement,
  };
}

describe('GLightbox', () => {
  it('hiện ảnh theo startIndex; alt "Image k of N"', () => {
    const { img } = setup(['a.png', 'b.png', 'c.png'], 1);
    expect(img().getAttribute('src')).toBe('b.png');
    expect(img().getAttribute('alt')).toBe('Image 2 of 3');
  });
  it('nút sau/trước đổi ảnh, vòng lại ở hai đầu', () => {
    const { f, img } = setup(['a.png', 'b.png'], 0);
    (f.nativeElement.querySelector('.g-lightbox__nav--next') as HTMLButtonElement).click();
    f.detectChanges();
    expect(img().getAttribute('src')).toBe('b.png');
    (f.nativeElement.querySelector('.g-lightbox__nav--next') as HTMLButtonElement).click(); // vòng lại
    f.detectChanges();
    expect(img().getAttribute('src')).toBe('a.png');
  });
  it('nút phóng to tăng scale (transform); double số lần vẫn ≤ max', () => {
    const { f, img } = setup(['a.png']);
    const zoomIn = [...f.nativeElement.querySelectorAll('.g-lightbox__toolbar button')].find(
      (b: HTMLButtonElement) => b.getAttribute('aria-label') === 'Zoom in',
    ) as HTMLButtonElement;
    for (let i = 0; i < 10; i++) zoomIn.click();
    f.detectChanges();
    expect(img().style.transform).toContain('scale(4)'); // clamp max 4
  });
  it('chỉ 1 ảnh → không có nút điều hướng', () => {
    const { f } = setup(['a.png']);
    expect(f.nativeElement.querySelector('.g-lightbox__nav')).toBeNull();
  });
  it('nút đóng gọi dialogRef.close', () => {
    const { f, close } = setup(['a.png']);
    const closeBtn = [...f.nativeElement.querySelectorAll('.g-lightbox__toolbar button')].find(
      (b: HTMLButtonElement) => b.getAttribute('aria-label') === 'Close',
    ) as HTMLButtonElement;
    closeBtn.click();
    expect(close).toHaveBeenCalled();
  });
});
