import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GContainer } from './container';

@Component({ imports: [GContainer], template: `<div gContainer id="x">nội dung</div>` })
class Host {}

describe('GContainer', () => {
  it('gắn class g-container lên phần tử host', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const el = f.nativeElement.querySelector('#x') as HTMLElement;
    expect(el.classList.contains('g-container')).toBe(true);
  });
});
