import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GTerminal } from './terminal';

describe('GTerminal', () => {
  it('nhãn ô lệnh đổi theo ngôn ngữ và giữ title consumer', () => {
    const fixture = TestBed.createComponent(GTerminal);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('.g-terminal__input') as HTMLInputElement;
    expect(input.getAttribute('aria-label')).toBe('Terminal — Enter command');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(input.getAttribute('aria-label')).toBe('Terminal — Nhập lệnh');

    fixture.componentRef.setInput('title', 'Bảng điều khiển');
    fixture.detectChanges();
    expect(input.getAttribute('aria-label')).toBe('Bảng điều khiển — Nhập lệnh');
  });
});
