import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GStepSlider } from './step-slider';

describe('GStepSlider', () => {
  it('nhãn mặc định đổi theo ngôn ngữ, còn input consumer giữ nguyên', () => {
    const fixture = TestBed.createComponent(GStepSlider);
    fixture.detectChanges();
    const track = fixture.nativeElement.querySelector('.g-step-slider__track') as HTMLElement;
    expect(track.getAttribute('aria-label')).toBe('Level');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(track.getAttribute('aria-label')).toBe('Mức');

    fixture.componentRef.setInput('ariaLabel', 'Độ ưu tiên');
    fixture.detectChanges();
    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(track.getAttribute('aria-label')).toBe('Độ ưu tiên');
  });
});
