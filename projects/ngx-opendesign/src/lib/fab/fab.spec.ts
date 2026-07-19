import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GFab } from './fab';

@Component({
  imports: [GFab],
  template: `<button g-fab [position]="position" [extended]="extended" aria-label="Thêm">
    +
  </button>`,
})
class Host {
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' = 'bottom-right';
  extended = false;
}

describe('GFab', () => {
  it('mặc định: class g-fab + g-fab--bottom-right, không extended', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const btn = f.nativeElement.querySelector('button[g-fab]') as HTMLElement;
    expect(btn.classList.contains('g-fab')).toBe(true);
    expect(btn.classList.contains('g-fab--bottom-right')).toBe(true);
    expect(btn.classList.contains('g-fab--extended')).toBe(false);
  });

  it('position + extended đổi class', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.position = 'top-left';
    f.componentInstance.extended = true;
    f.detectChanges();
    const btn = f.nativeElement.querySelector('button[g-fab]') as HTMLElement;
    expect(btn.classList.contains('g-fab--top-left')).toBe(true);
    expect(btn.classList.contains('g-fab--extended')).toBe(true);
    expect(btn.classList.contains('g-fab--bottom-right')).toBe(false);
  });
});
