import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GLink } from './link';

@Component({
  imports: [GLink],
  template: `<a gLink href="https://example.com">Xem thêm</a>`,
})
class HostComponent {}

describe('GLink', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const link: HTMLAnchorElement = fixture.debugElement.query(By.directive(GLink)).nativeElement;
    return { fixture, link };
  }

  it('gắn class g-link lên thẻ <a>', () => {
    const { link } = setup();
    expect(link.classList).toContain('g-link');
  });

  it('không tự thêm role — giữ nguyên role "link" ngầm định của <a href> native', () => {
    const { link } = setup();
    expect(link.getAttribute('role')).toBeNull();
    expect(link.tagName).toBe('A');
  });

  it('không can thiệp href/nội dung — <a> vẫn hoạt động như thẻ native', () => {
    const { link } = setup();
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(link.textContent).toContain('Xem thêm');
  });
});
