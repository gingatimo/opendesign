import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GSearchField, GSearchFieldOption } from './search-field';

@Component({
  imports: [GSearchField],
  template: `<g-search-field [fields]="fields" (search)="onSearch($event)" />`,
})
class Host {
  fields: GSearchFieldOption[] = [
    { value: 'cusId', label: 'Customer ID' },
    { value: 'citizenId', label: 'Citizen ID' },
    { value: 'username', label: 'Username' },
  ];
  last: { field: unknown; value: string } | null = null;
  onSearch(e: { field: unknown; value: string }): void {
    this.last = e;
  }
}

function make() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const cmp = f.debugElement.query(By.directive(GSearchField)).componentInstance as GSearchField;
  return { f, cmp };
}

function enter(f: ReturnType<typeof make>['f']): void {
  const input = f.nativeElement.querySelector('.g-search-field__input') as HTMLInputElement;
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', cancelable: true }));
}

describe('GSearchField', () => {
  it('mặc định chọn trường ĐẦU TIÊN', () => {
    const { cmp } = make();
    expect(cmp.field()).toBe('cusId');
  });

  it('Enter phát (search) = { field, value }', () => {
    const { f, cmp } = make();
    cmp.query.set('12345');
    f.detectChanges();
    enter(f);
    expect(f.componentInstance.last).toEqual({ field: 'cusId', value: '12345' });
  });

  it('đổi field → search theo field mới', () => {
    const { f, cmp } = make();
    cmp.field.set('username');
    cmp.query.set('alice');
    f.detectChanges();
    enter(f);
    expect(f.componentInstance.last).toEqual({ field: 'username', value: 'alice' });
  });
});
