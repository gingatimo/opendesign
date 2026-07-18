import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GSortHeader } from './sort-header';

@Component({
  imports: [GSortHeader],
  template: `<table>
    <thead>
      <tr>
        <th id="h" [gSortHeader]="sort()">Tên</th>
      </tr>
    </thead>
  </table>`,
})
class Host {
  sort = signal<'asc' | 'desc' | null>(null);
}

describe('GSortHeader', () => {
  it('sort=null → aria-sort=none; class g-sort-header', () => {
    const f = TestBed.createComponent(Host);
    f.detectChanges();
    const th = f.nativeElement.querySelector('#h') as HTMLElement;
    expect(th.classList.contains('g-sort-header')).toBe(true);
    expect(th.getAttribute('aria-sort')).toBe('none');
  });
  it('sort=asc → aria-sort=ascending; sort=desc → descending', () => {
    const f = TestBed.createComponent(Host);
    f.componentInstance.sort.set('asc');
    f.detectChanges();
    expect((f.nativeElement.querySelector('#h') as HTMLElement).getAttribute('aria-sort')).toBe(
      'ascending',
    );
    f.componentInstance.sort.set('desc');
    f.detectChanges();
    expect((f.nativeElement.querySelector('#h') as HTMLElement).getAttribute('aria-sort')).toBe(
      'descending',
    );
  });
});
