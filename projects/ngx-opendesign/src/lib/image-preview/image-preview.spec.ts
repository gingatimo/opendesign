import { Dialog } from '@angular/cdk/dialog';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { GImagePreview } from './image-preview';

@Component({
  imports: [GImagePreview],
  template: `<g-image-preview
    [images]="imgs()"
    [removable]="rm()"
    (remove)="removed = removed.concat($event)"
  />`,
})
class Host {
  imgs = signal<(string | File)[]>(['a.png', 'b.png']);
  rm = signal(false);
  removed: number[] = [];
}

// LƯU Ý: urls được set trong effect → dùng TestBed.tick() để flush effect + re-render (idiom repo,
// như toast.spec) trước khi đọc DOM thumbnail.
describe('GImagePreview', () => {
  it('render số thumbnail = số images (string url dùng thẳng)', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    TestBed.tick();
    const imgs = f.nativeElement.querySelectorAll('.g-image-preview__thumb img');
    expect(imgs.length).toBe(2);
    expect(imgs[0].getAttribute('src')).toBe('a.png');
  });
  it('removable → có nút xoá, click phát remove với index; không kích hoạt lightbox', () => {
    const openSpy = vi.fn();
    TestBed.overrideProvider(Dialog, { useValue: { open: openSpy } });
    const f = TestBed.createComponent(Host);
    f.componentInstance.rm.set(true);
    f.detectChanges();
    TestBed.tick();
    const rmBtns = f.nativeElement.querySelectorAll('.g-image-preview__remove');
    expect(rmBtns.length).toBe(2);
    (rmBtns[1] as HTMLButtonElement).click();
    expect(f.componentInstance.removed).toEqual([1]);
    expect(openSpy).not.toHaveBeenCalled();
  });
  it('click thumbnail mở lightbox qua Dialog.open (index đúng)', () => {
    const openSpy = vi.fn();
    TestBed.overrideProvider(Dialog, { useValue: { open: openSpy } });
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    TestBed.tick();
    (f.nativeElement.querySelectorAll('.g-image-preview__thumb')[1] as HTMLButtonElement).click();
    expect(openSpy).toHaveBeenCalled();
    const config = openSpy.mock.calls[0][1];
    const data = config.data;
    expect(data.startIndex).toBe(1);
    expect(data.urls).toEqual(['a.png', 'b.png']);
    expect(config.ariaLabel).toBeUndefined();
    expect(config.ariaLabelledBy).toBe(data.labelId);
  });
});
