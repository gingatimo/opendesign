import { TestBed } from '@angular/core/testing';
import { GImageSlider } from './image-slider';

interface SliderInternals {
  index: () => number;
  prev(): void;
  next(): void;
  goTo(i: number): void;
  canPrev: () => boolean;
  canNext: () => boolean;
}

function make(images: string[], loop = false) {
  const f = TestBed.createComponent(GImageSlider);
  f.componentRef.setInput('images', images);
  f.componentRef.setInput('loop', loop);
  f.detectChanges();
  return { f, cmp: f.componentInstance as unknown as SliderInternals };
}

describe('GImageSlider', () => {
  const imgs = ['a', 'b', 'c'];

  it('next tăng index, dừng ở cuối khi không loop', () => {
    const { cmp } = make(imgs);
    expect(cmp.index()).toBe(0);
    cmp.next();
    expect(cmp.index()).toBe(1);
    cmp.next();
    cmp.next();
    expect(cmp.index()).toBe(2); // clamp
  });

  it('prev dừng ở đầu khi không loop', () => {
    const { cmp } = make(imgs);
    cmp.prev();
    expect(cmp.index()).toBe(0);
  });

  it('loop: next từ cuối về đầu, prev từ đầu về cuối', () => {
    const { cmp } = make(imgs, true);
    cmp.prev();
    expect(cmp.index()).toBe(2);
    cmp.next();
    expect(cmp.index()).toBe(0);
  });

  it('canPrev/canNext theo biên khi không loop', () => {
    const { cmp } = make(imgs);
    expect(cmp.canPrev()).toBe(false);
    expect(cmp.canNext()).toBe(true);
    cmp.goTo(2);
    expect(cmp.canNext()).toBe(false);
    expect(cmp.canPrev()).toBe(true);
  });

  it('loop: canPrev/canNext luôn true', () => {
    const { cmp } = make(imgs, true);
    expect(cmp.canPrev()).toBe(true);
    expect(cmp.canNext()).toBe(true);
  });

  it('clamp index khi danh sách ảnh co lại', () => {
    const { f, cmp } = make(imgs);
    cmp.goTo(2);
    f.componentRef.setInput('images', ['a']);
    f.detectChanges();
    expect(cmp.index()).toBe(0);
  });

  it('≤1 ảnh: ẩn nav và dots', () => {
    const { f } = make(['a']);
    expect(f.nativeElement.querySelector('.g-image-slider__nav')).toBeNull();
    expect(f.nativeElement.querySelector('.g-image-slider__dots')).toBeNull();
  });

  it('0 ảnh: không render region', () => {
    const { f } = make([]);
    expect(f.nativeElement.querySelector('.g-image-slider')).toBeNull();
  });

  it('lightbox=false: ảnh là <img>, không có nút zoom', () => {
    const { f } = make(imgs);
    expect(f.nativeElement.querySelector('.g-image-slider__zoom')).toBeNull();
    expect(f.nativeElement.querySelector('.g-image-slider__img')).not.toBeNull();
  });
});
