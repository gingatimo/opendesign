import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GLineChart } from './line-chart';

describe('GLineChart', () => {
  it('aria-label mặc định theo locale, input truyền tay thì thắng', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(GLineChart);
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector('svg') as SVGElement;
    expect(svg.getAttribute('aria-label')).toBe('Line chart');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(svg.getAttribute('aria-label')).toBe('Biểu đồ đường');

    fixture.componentRef.setInput('ariaLabel', 'Doanh thu theo quý');
    fixture.detectChanges();
    expect(svg.getAttribute('aria-label')).toBe('Doanh thu theo quý');
  });
});
