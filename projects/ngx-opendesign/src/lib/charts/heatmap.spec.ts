import { calendarWeeks, dayKey } from './calendar-heatmap';
import { HEAT_LEVELS, heatColor, heatLevel } from './chart-utils';

describe('heatLevel', () => {
  it('0 và giá trị âm đều là bậc 0 (ô trống)', () => {
    expect(heatLevel(0, 10)).toBe(0);
    expect(heatLevel(-5, 10)).toBe(0);
  });

  it('chia bậc theo TỈ LỆ với giá trị lớn nhất', () => {
    expect(heatLevel(10, 10)).toBe(HEAT_LEVELS);
    expect(heatLevel(5, 10)).toBe(2);
    expect(heatLevel(1, 100)).toBe(1); // rất nhỏ vẫn phải nhìn thấy được
  });

  it('không vượt quá số bậc dù giá trị lớn hơn max', () => {
    expect(heatLevel(999, 10)).toBe(HEAT_LEVELS);
  });

  it('max = 0 thì mọi ô đều trống (không chia cho 0)', () => {
    expect(heatLevel(3, 0)).toBe(0);
  });
});

describe('heatColor', () => {
  it('bậc 0 dùng nền trống, các bậc sau pha đậm dần từ màu gốc', () => {
    expect(heatColor(0)).toContain('--g-secondary-bg');
    const level1 = heatColor(1, 'var(--brand)');
    const level4 = heatColor(HEAT_LEVELS, 'var(--brand)');
    expect(level1).toContain('var(--brand) 25%');
    expect(level4).toContain('var(--brand) 100%');
  });
});

describe('calendarWeeks', () => {
  it('mỗi tuần đủ 7 ô và luôn bắt đầu từ Chủ nhật', () => {
    const weeks = calendarWeeks(new Date(2026, 6, 1), new Date(2026, 6, 31));
    expect(weeks.every((w) => w.length === 7)).toBe(true);
    for (const week of weeks) {
      const firstReal = week.find((d): d is Date => d !== null)!;
      expect(week.indexOf(firstReal)).toBe(firstReal.getDay());
    }
  });

  it('để null cho ngày nằm ngoài khoảng, nhờ vậy lưới không lệch hàng', () => {
    // 1/7/2026 là thứ Tư → 3 ô đầu (CN, T2, T3) của tuần đầu phải là null.
    const weeks = calendarWeeks(new Date(2026, 6, 1), new Date(2026, 6, 10));
    expect(weeks[0].slice(0, 3).every((d) => d === null)).toBe(true);
    expect(weeks[0][3]).not.toBeNull();
  });

  it('phủ đủ mọi ngày trong khoảng', () => {
    const weeks = calendarWeeks(new Date(2026, 0, 1), new Date(2026, 0, 31));
    const days = weeks.flat().filter((d): d is Date => d !== null);
    expect(days.length).toBe(31);
  });
});

describe('dayKey', () => {
  it('dùng giờ ĐỊA PHƯƠNG — chuỗi và Date cùng ngày cho cùng khoá', () => {
    expect(dayKey('2026-07-03')).toBe('2026-07-03');
    expect(dayKey(new Date(2026, 6, 3, 23, 30))).toBe('2026-07-03');
  });

  it('đệm 0 cho tháng/ngày một chữ số', () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
