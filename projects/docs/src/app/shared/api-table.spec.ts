import { TestBed } from '@angular/core/testing';
import { ApiTable } from './api-table';

describe('ApiTable', () => {
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
});
