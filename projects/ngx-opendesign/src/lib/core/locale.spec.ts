import { TestBed } from '@angular/core/testing';
import { GLocaleService, provideGLocale } from './locale';
import { gLocaleEn } from '../locales/en';
import { gLocaleVi } from '../locales/vi';
import { weekdayNames } from './locale-format';

describe('GLocaleService', () => {
  it('mặc định là tiếng Anh khi không khai báo gì', () => {
    TestBed.configureTestingModule({});
    const i18n = TestBed.inject(GLocaleService);
    expect(i18n.tag()).toBe('en-US');
    expect(i18n.strings().common.close).toBe('Close');
  });

  it('provideGLocale đổi được gói mặc định', () => {
    TestBed.configureTestingModule({ providers: [provideGLocale(gLocaleVi)] });
    const i18n = TestBed.inject(GLocaleService);
    expect(i18n.tag()).toBe('vi-VN');
    expect(i18n.strings().common.close).toBe('Đóng');
  });

  it('use() đổi ngôn ngữ lúc chạy', () => {
    TestBed.configureTestingModule({});
    const i18n = TestBed.inject(GLocaleService);
    i18n.use(gLocaleVi);
    expect(i18n.strings().common.cancel).toBe('Huỷ');
    i18n.use(gLocaleEn);
    expect(i18n.strings().common.cancel).toBe('Cancel');
  });

  it('firstDayOfWeek khác nhau giữa en và vi', () => {
    TestBed.configureTestingModule({});
    const i18n = TestBed.inject(GLocaleService);
    expect(i18n.firstDayOfWeek()).toBe(0); // en-US: Chủ nhật
    i18n.use(gLocaleVi);
    expect(i18n.firstDayOfWeek()).toBe(1); // vi-VN: Thứ hai
  });

  it('formatDate đổi theo ngôn ngữ đang dùng', () => {
    TestBed.configureTestingModule({});
    const i18n = TestBed.inject(GLocaleService);
    const d = new Date(2026, 6, 5);
    expect(i18n.formatDate(d)).toBe('07/05/2026');
    i18n.use(gLocaleVi);
    expect(i18n.formatDate(d)).toBe('05/07/2026');
  });

  it('weekdayNames xoay theo ngày đầu tuần của gói', () => {
    TestBed.configureTestingModule({});
    const i18n = TestBed.inject(GLocaleService);
    i18n.use(gLocaleVi);
    // So sánh cùng tiếng Việt để tách riêng phép xoay khỏi phép dịch: gLocaleVi có firstDayOfWeek = 1
    // (Thứ hai), nên vị trí 0 của service phải trùng vị trí 1 của danh sách bắt đầu Chủ nhật.
    const sunFirst = weekdayNames('vi-VN', 0);
    expect(i18n.weekdayNames()[0]).toBe(sunFirst[1]);
  });

  it('weekdayNamesFor cho phép component tự chọn ngày đầu tuần', () => {
    TestBed.configureTestingModule({});
    const i18n = TestBed.inject(GLocaleService);

    expect(i18n.weekdayNamesFor(1)).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

    i18n.use(gLocaleVi);

    expect(i18n.weekdayNamesFor(1)).toEqual(['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']);
  });
});
