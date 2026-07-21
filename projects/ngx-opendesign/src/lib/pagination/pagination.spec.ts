import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
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

  // Bài học review Task 3 (xem spinner.spec.ts): nav/aria-label phải đọc qua t() trong template
  // (không phải đặt một lần lúc mount) để đổi ngôn ngữ lúc chạy được phản ánh ngay.
  it('đổi ngôn ngữ lúc chạy thì aria-label của nav và các nút đổi theo', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const nav = f.nativeElement.querySelector('.g-pagination') as HTMLElement;
    const first = f.nativeElement.querySelector('.g-pagination__first') as HTMLElement;
    const prev = f.nativeElement.querySelector('.g-pagination__prev') as HTMLElement;
    const next = f.nativeElement.querySelector('.g-pagination__next') as HTMLElement;
    const last = f.nativeElement.querySelector('.g-pagination__last') as HTMLElement;
    expect(nav.getAttribute('aria-label')).toBe('Pagination');
    expect(first.getAttribute('aria-label')).toBe('First page');
    expect(prev.getAttribute('aria-label')).toBe('Previous page');
    expect(next.getAttribute('aria-label')).toBe('Next page');
    expect(last.getAttribute('aria-label')).toBe('Last page');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    f.detectChanges();
    expect(nav.getAttribute('aria-label')).toBe('Phân trang');
    expect(first.getAttribute('aria-label')).toBe('Trang đầu');
    expect(prev.getAttribute('aria-label')).toBe('Trang trước');
    expect(next.getAttribute('aria-label')).toBe('Trang sau');
    expect(last.getAttribute('aria-label')).toBe('Trang cuối');
  });
});
