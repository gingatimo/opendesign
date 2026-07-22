import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GRichTextEditor } from './rich-text-editor';

describe('GRichTextEditor', () => {
  it('nhãn toolbar và tên màu đổi theo ngôn ngữ', () => {
    TestBed.configureTestingModule({});
    const fixture = TestBed.createComponent(GRichTextEditor);
    fixture.detectChanges();
    const toolbar = fixture.nativeElement.querySelector('[role="toolbar"]') as HTMLElement;
    expect(toolbar.getAttribute('aria-label')).toBe('Formatting');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(toolbar.getAttribute('aria-label')).toBe('Định dạng');
  });

  it('placeholder mặc định đổi theo ngôn ngữ, còn input consumer giữ nguyên', () => {
    const fixture = TestBed.createComponent(GRichTextEditor);
    fixture.detectChanges();
    const editor = fixture.nativeElement.querySelector('.g-rte__body') as HTMLElement;
    expect(editor.getAttribute('data-placeholder')).toBe('Enter content…');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(editor.getAttribute('data-placeholder')).toBe('Nhập nội dung…');

    fixture.componentRef.setInput('placeholder', 'Nội dung tuỳ chỉnh');
    fixture.detectChanges();
    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(editor.getAttribute('data-placeholder')).toBe('Nội dung tuỳ chỉnh');
  });
});
