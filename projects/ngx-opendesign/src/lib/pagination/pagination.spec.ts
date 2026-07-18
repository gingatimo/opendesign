import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GPagination } from './pagination';

@Component({
  imports: [GPagination],
  template: `<g-pagination [(page)]="page" [pageCount]="count()" />`,
})
class Host {
  page = signal(1);
  count = signal(10);
}

describe('GPagination', () => {
  it('nút trang hiện tại có aria-current=page', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.page.set(3);
    f.detectChanges();
    const cur = f.nativeElement.querySelector('[aria-current="page"]') as HTMLElement;
    expect(cur.textContent?.trim()).toBe('3');
  });
  it('nhiều trang → có ellipsis (…) và luôn hiện trang 1 và trang cuối', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.page.set(5);
    f.detectChanges();
    const txt = f.nativeElement.textContent as string;
    expect(txt).toContain('…');
    expect(txt).toContain('1');
    expect(txt).toContain('10');
  });
  it('nút Trước disabled ở trang 1; Sau disabled ở trang cuối', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const prev = f.nativeElement.querySelector('.g-pagination__prev') as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    f.componentInstance.page.set(10);
    f.detectChanges();
    const next = f.nativeElement.querySelector('.g-pagination__next') as HTMLButtonElement;
    expect(next.disabled).toBe(true);
  });
  it('click nút số trang → cập nhật model page', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const btns = [
      ...f.nativeElement.querySelectorAll('.g-pagination__page'),
    ] as HTMLButtonElement[];
    btns.find((b) => b.textContent?.trim() === '2')!.click();
    f.detectChanges();
    expect(f.componentInstance.page()).toBe(2);
  });
});
