import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GRating } from './rating';

describe('GRating', () => {
  it('số trong nhãn screen reader theo locale', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(GRating);
    fixture.componentRef.setInput('value', 2.5);
    fixture.componentRef.setInput('readonly', true);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('[role="img"]') as HTMLElement;
    expect(el.getAttribute('aria-label')).toBe('2.5 out of 5 stars');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(el.getAttribute('aria-label')).toBe('2,5 trên 5 sao');
  });
});
