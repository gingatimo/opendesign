import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GSkeleton, GSkeletonVariant } from './skeleton';

@Component({
  imports: [GSkeleton],
  template: `<g-skeleton [variant]="variant()" [width]="width()" [lines]="lines()" />`,
})
class Host {
  variant = signal<GSkeletonVariant>('text');
  width = signal<string | undefined>(undefined);
  lines = signal(1);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const el = f.nativeElement.querySelector('g-skeleton') as HTMLElement;
  return { f, el };
}

describe('GSkeleton', () => {
  it('mặc định text, aria-hidden, không có dòng con (host là 1 bar)', () => {
    const { el } = setup();
    expect(el.classList.contains('g-skeleton--text')).toBe(true);
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.querySelectorAll('.g-skeleton__line').length).toBe(0);
  });

  it('circular / rectangular → class biến thể', () => {
    const { f, el } = setup();
    f.componentInstance.variant.set('circular');
    f.detectChanges();
    expect(el.classList.contains('g-skeleton--circular')).toBe(true);
    f.componentInstance.variant.set('rectangular');
    f.detectChanges();
    expect(el.classList.contains('g-skeleton--rectangular')).toBe(true);
  });

  it('width áp inline style', () => {
    const { f, el } = setup();
    f.componentInstance.width.set('120px');
    f.detectChanges();
    expect(el.style.width).toBe('120px');
  });

  it('text lines>1 → multiline + N dòng, dòng cuối --last', () => {
    const { f, el } = setup();
    f.componentInstance.lines.set(3);
    f.detectChanges();
    expect(el.classList.contains('g-skeleton--multiline')).toBe(true);
    const lines = el.querySelectorAll('.g-skeleton__line');
    expect(lines.length).toBe(3);
    expect(lines[2].classList.contains('g-skeleton__line--last')).toBe(true);
    expect(lines[0].classList.contains('g-skeleton__line--last')).toBe(false);
  });

  it('circular với lines>1 KHÔNG multiline (chỉ text mới nhiều dòng)', () => {
    const { f, el } = setup();
    f.componentInstance.variant.set('circular');
    f.componentInstance.lines.set(3);
    f.detectChanges();
    expect(el.classList.contains('g-skeleton--multiline')).toBe(false);
    expect(el.querySelectorAll('.g-skeleton__line').length).toBe(0);
  });
});
