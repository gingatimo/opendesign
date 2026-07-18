import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GStack } from './stack';

@Component({
  imports: [GStack],
  template: `<g-stack id="s" [direction]="dir()" [gap]="gap()">a</g-stack>`,
})
class Host {
  dir = signal<'vertical' | 'horizontal'>('vertical');
  gap = signal(4);
}

describe('GStack', () => {
  it('mặc định flex-direction column, gap var(--g-space-4)', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const el = f.nativeElement.querySelector('#s') as HTMLElement;
    expect(el.style.display).toBe('flex');
    expect(el.style.flexDirection).toBe('column');
    expect(el.style.gap).toBe('var(--g-space-4)');
  });
  it('direction=horizontal → flex-direction row', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.dir.set('horizontal');
    f.detectChanges();
    const el = f.nativeElement.querySelector('#s') as HTMLElement;
    expect(el.style.flexDirection).toBe('row');
  });
  it('gap=0 → gap 0px', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.gap.set(0);
    f.detectChanges();
    const el = f.nativeElement.querySelector('#s') as HTMLElement;
    expect(el.style.gap).toBe('0px');
  });
});
