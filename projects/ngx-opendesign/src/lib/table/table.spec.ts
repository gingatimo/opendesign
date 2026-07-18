import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GTable } from './table';

@Component({
  imports: [GTable],
  template: `<table gTable id="t" [striped]="striped()" [stickyHeader]="sticky()"><tbody><tr><td>x</td></tr></tbody></table>`,
})
class Host {
  striped = signal(false);
  sticky = signal(false);
}

describe('GTable', () => {
  it('gắn class g-table; striped/sticky mặc định tắt', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const t = f.nativeElement.querySelector('#t') as HTMLElement;
    expect(t.classList.contains('g-table')).toBe(true);
    expect(t.classList.contains('g-table--striped')).toBe(false);
    expect(t.classList.contains('g-table--sticky')).toBe(false);
  });
  it('striped=true, stickyHeader=true → thêm class tương ứng', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.striped.set(true);
    f.componentInstance.sticky.set(true);
    f.detectChanges();
    const t = f.nativeElement.querySelector('#t') as HTMLElement;
    expect(t.classList.contains('g-table--striped')).toBe(true);
    expect(t.classList.contains('g-table--sticky')).toBe(true);
  });
});
