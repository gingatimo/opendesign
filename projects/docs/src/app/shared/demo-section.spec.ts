import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DemoSection } from './demo-section';

@Component({
  imports: [DemoSection],
  template: `
    <docs-demo-section>
      <button>Nội dung demo</button>
    </docs-demo-section>
  `,
})
class HostComponent {}

describe('DemoSection', () => {
  it('render nội dung projected bên trong section.docs-demo', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const section: HTMLElement = fixture.nativeElement.querySelector('section.docs-demo');
    expect(section).toBeTruthy();
    expect(section.querySelector('button')?.textContent).toContain('Nội dung demo');
  });
});
