import { TestBed } from '@angular/core/testing';
import { GLocaleService, gLocaleEn, gLocaleVi, provideGLocale } from 'ngx-opendesign';
import { ApiTable } from './api-table';

describe('ApiTable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideGLocale(gLocaleVi)] });
  });

  it('render mỗi row một dòng bảng', () => {
    const fixture = TestBed.createComponent(ApiTable);
    fixture.componentRef.setInput('rows', [
      { name: 'variant', type: 'GButtonVariant', default: "'primary'", description: 'Kiểu nút' },
      { name: 'size', type: 'GButtonSize', default: "'md'", description: 'Cỡ nút' },
    ]);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('variant');
    expect(rows[0].textContent).toContain('Kiểu nút');
  });

  it('đổi header bảng theo locale hiện hành', () => {
    const fixture = TestBed.createComponent(ApiTable);
    fixture.componentRef.setInput('rows', []);
    fixture.detectChanges();
    TestBed.inject(GLocaleService).use(gLocaleEn);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('thead')?.textContent ?? '';
    expect(header).toContain('Name');
    expect(header).toContain('Type');
    expect(header).toContain('Default');
    expect(header).toContain('Description');
    expect(header).not.toContain('Tên');
  });
});
