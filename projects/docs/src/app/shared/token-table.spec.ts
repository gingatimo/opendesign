import { TestBed } from '@angular/core/testing';
import { TokenTable } from './token-table';

describe('TokenTable', () => {
  it('render mỗi token một dòng, hiện tên và giá trị', () => {
    const fixture = TestBed.createComponent(TokenTable);
    fixture.componentRef.setInput('rows', [
      { name: '--g-primary', value: '#141416', description: 'Màu chủ đạo' },
      { name: '--g-bg', value: '#ffffff', description: 'Nền trang' },
    ]);
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('--g-primary');
    expect(rows[0].textContent).toContain('#141416');
    expect(rows[0].textContent).toContain('Màu chủ đạo');
  });

  it('preview="color": ô xem trước là trang trí (aria-hidden), không chiếm accessible name', () => {
    const fixture = TestBed.createComponent(TokenTable);
    fixture.componentRef.setInput('preview', 'color');
    fixture.componentRef.setInput('rows', [
      { name: '--g-primary', value: '#141416', description: 'Màu chủ đạo' },
    ]);
    fixture.detectChanges();
    const swatch = fixture.nativeElement.querySelector('.docs-token-table__swatch');
    expect(swatch).not.toBeNull();
    expect(swatch.getAttribute('aria-hidden')).toBe('true');
  });

  it('không có preview: không render ô xem trước', () => {
    const fixture = TestBed.createComponent(TokenTable);
    fixture.componentRef.setInput('rows', [
      { name: '--g-radius-pill', value: '9999px', description: 'Bo tròn hoàn toàn' },
    ]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.docs-token-table__swatch')).toBeNull();
  });
});
