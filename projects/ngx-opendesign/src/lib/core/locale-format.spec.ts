import { monthNames, weekdayNames, formatDateFor, formatNumberFor } from './locale-format';

describe('formatDateFor', () => {
  it('cùng một Date ra thứ tự ngày/tháng khác nhau theo locale', () => {
    const d = new Date(2026, 6, 5); // 5 tháng 7 năm 2026
    expect(formatDateFor('vi-VN', d)).toBe('05/07/2026');
    expect(formatDateFor('en-US', d)).toBe('07/05/2026');
  });

  it('luôn ra năm 4 chữ số (không dùng dateStyle short)', () => {
    expect(formatDateFor('en-US', new Date(2026, 0, 9))).toContain('2026');
  });
});

describe('formatNumberFor', () => {
  it('dấu phân cách nghìn theo locale', () => {
    expect(formatNumberFor('en-US', 1234567)).toBe('1,234,567');
    expect(formatNumberFor('vi-VN', 1234567)).toBe('1.234.567');
  });

  it('dấu thập phân theo locale', () => {
    expect(formatNumberFor('en-US', 2.5)).toBe('2.5');
    expect(formatNumberFor('vi-VN', 2.5)).toBe('2,5');
  });
});

describe('weekdayNames', () => {
  it('trả đủ 7 tên, bắt đầu đúng ngày đầu tuần', () => {
    const sunFirst = weekdayNames('en-US', 0);
    const monFirst = weekdayNames('en-US', 1);
    expect(sunFirst.length).toBe(7);
    expect(monFirst[0]).toBe(sunFirst[1]); // xoay đúng một ngày
    expect(monFirst[6]).toBe(sunFirst[0]);
  });

  it('đổi theo ngôn ngữ', () => {
    expect(weekdayNames('en-US', 0)[0]).toBe('Sun');
    expect(weekdayNames('vi-VN', 0)[0]).not.toBe('Sun');
  });
});

describe('monthNames', () => {
  it('trả 12 tên tháng theo locale', () => {
    const en = monthNames('en-US');
    expect(en.length).toBe(12);
    expect(en[0]).toBe('Jan');
    expect(monthNames('vi-VN')[0]).not.toBe('Jan');
  });
});
