import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GDivider } from './divider';

@Component({
  imports: [GDivider],
  template: `<g-divider [orientation]="orientation">{{ label }}</g-divider>`,
})
class Host {
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  label = '';
}

describe('GDivider', () => {
  it('mặc định: role=separator, aria-orientation=horizontal, 2 line', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const host = f.nativeElement.querySelector('g-divider') as HTMLElement;
    expect(host.getAttribute('role')).toBe('separator');
    expect(host.getAttribute('aria-orientation')).toBe('horizontal');
    expect(host.classList.contains('g-divider--vertical')).toBe(false);
    expect(host.querySelectorAll('.g-divider__line').length).toBe(2);
  });

  it('vertical → class + aria-orientation', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.orientation = 'vertical';
    f.detectChanges();
    const host = f.nativeElement.querySelector('g-divider') as HTMLElement;
    expect(host.classList.contains('g-divider--vertical')).toBe(true);
    expect(host.getAttribute('aria-orientation')).toBe('vertical');
  });
});
