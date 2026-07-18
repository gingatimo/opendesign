import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GLayout } from './layout';

@Component({
  imports: [GLayout],
  template: `<g-layout><div class="topbar-slot">tb</div><main>nội dung</main></g-layout>`,
})
class Host {}

describe('GLayout', () => {
  it('bọc nội dung mặc định vào .g-layout__main (vùng cuộn)', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const main = f.nativeElement.querySelector('.g-layout__main') as HTMLElement;
    expect(main).not.toBeNull();
    expect(main.textContent).toContain('nội dung');
  });
  it('host mang class g-layout', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    expect(f.nativeElement.querySelector('.g-layout')).not.toBeNull();
  });
});
