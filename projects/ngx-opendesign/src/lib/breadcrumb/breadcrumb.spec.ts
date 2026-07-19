import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GBreadcrumb, GBreadcrumbItem } from './breadcrumb';

@Component({
  imports: [GBreadcrumb, GBreadcrumbItem],
  template: `
    <nav g-breadcrumb aria-label="Breadcrumb">
      <a g-breadcrumb-item href="/">Trang chủ</a>
      <a g-breadcrumb-item href="/sp">Sản phẩm</a>
      <span g-breadcrumb-item aria-current="page">Chi tiết</span>
    </nav>
  `,
})
class Host {}

describe('GBreadcrumb', () => {
  it('nav mang class g-breadcrumb + giữ aria-label', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const nav = f.nativeElement.querySelector('nav') as HTMLElement;
    expect(nav.classList.contains('g-breadcrumb')).toBe(true);
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('mỗi mục mang class g-breadcrumb-item; mục cuối có aria-current', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const items = f.nativeElement.querySelectorAll('.g-breadcrumb-item');
    expect(items.length).toBe(3);
    expect(items[2].getAttribute('aria-current')).toBe('page');
    expect(items[2].tagName).toBe('SPAN');
  });
});
