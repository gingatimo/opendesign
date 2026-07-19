import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GScrollPanel } from './scroll-panel';

@Component({
  imports: [GScrollPanel],
  template: `<g-scroll-panel maxHeight="200px"><p>Nội dung dài</p></g-scroll-panel>`,
})
class Host {}

describe('GScrollPanel', () => {
  it('render nội dung chiếu + áp max-height', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const el = f.nativeElement.querySelector('g-scroll-panel') as HTMLElement;
    expect(el.textContent).toContain('Nội dung dài');
    expect(el.style.maxHeight).toBe('200px');
  });
});
