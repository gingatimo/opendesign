import { TestBed } from '@angular/core/testing';
import { GLocaleService, provideGLocale } from './locale';
import { gLocaleEn } from '../locales/en';
import { gLocaleVi } from '../locales/vi';

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
});
