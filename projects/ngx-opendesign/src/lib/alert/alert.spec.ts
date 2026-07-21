import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GAlert } from './alert';

describe('GAlert', () => {
  it('đổi gói ngôn ngữ thì DOM đổi theo', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(GAlert);
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('.g-alert__close') as HTMLElement;
    expect(btn.getAttribute('aria-label')).toBe('Dismiss');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(btn.getAttribute('aria-label')).toBe('Đóng thông báo');
  });
});
