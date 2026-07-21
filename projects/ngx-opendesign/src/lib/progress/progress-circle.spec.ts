import { TestBed } from '@angular/core/testing';
import { GLocaleService } from '../core/locale';
import { gLocaleVi } from '../locales/vi';
import { GProgressCircle } from './progress-circle';

// LƯU Ý: file này chưa từng tồn tại trong repo trước fix này (giống tình huống alert.spec.ts ở
// Task 3 gốc — xem task-3-report.md). Chỉ tạo đúng 2 test chứng minh hành vi mới (aria-label phản
// ứng theo đổi ngôn ngữ), không tự thêm test khác cho value/size/stroke/... vì ngoài phạm vi fix này.
describe('GProgressCircle', () => {
  // Bài học review Task 3: aria-label mặc định trước đây chỉ đặt MỘT LẦN lúc mount trong
  // afterNextRender nên đổi ngôn ngữ lúc chạy không kéo theo nhãn — trái mục tiêu số 1 của i18n.
  it('đổi ngôn ngữ lúc chạy thì aria-label mặc định đổi theo', () => {
    const fixture = TestBed.createComponent(GProgressCircle);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('aria-label')).toBe('Progress');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(el.getAttribute('aria-label')).toBe('Tiến độ');
  });

  it('consumer tự đặt aria-label thì đổi ngôn ngữ KHÔNG được ghi đè', () => {
    const fixture = TestBed.createComponent(GProgressCircle);
    fixture.nativeElement.setAttribute('aria-label', 'Đang tải dữ liệu');
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.getAttribute('aria-label')).toBe('Đang tải dữ liệu');

    TestBed.inject(GLocaleService).use(gLocaleVi);
    fixture.detectChanges();
    expect(el.getAttribute('aria-label')).toBe('Đang tải dữ liệu');
  });
});
