import { formatDateFor } from '../core/locale-format';
import {
  addDays,
  addMonths,
  addMonthsClamped,
  buildMonthGrid,
  inRange,
  isBeforeDay,
  isSameDay,
  startOfMonth,
} from './date-utils';

describe('date-utils', () => {
  it('formatDate dd/MM/yyyy có padding', () => {
    expect(formatDateFor('vi-VN', new Date(2026, 6, 5))).toBe('05/07/2026'); // tháng 7 (index 6)
  });

  it('isSameDay bỏ giờ', () => {
    expect(isSameDay(new Date(2026, 6, 5, 9), new Date(2026, 6, 5, 23))).toBe(true);
    expect(isSameDay(new Date(2026, 6, 5), new Date(2026, 6, 6))).toBe(false);
  });

  it('startOfMonth', () => {
    expect(formatDateFor('vi-VN', startOfMonth(new Date(2026, 6, 20)))).toBe('01/07/2026');
  });

  it('addMonths / addDays vượt biên tháng', () => {
    expect(formatDateFor('vi-VN', addMonths(new Date(2026, 6, 15), 1))).toBe('15/08/2026');
    expect(formatDateFor('vi-VN', addDays(new Date(2026, 6, 31), 1))).toBe('01/08/2026');
  });

  it('addMonthsClamped kẹp ngày cuối tháng, không tràn', () => {
    // 31/8 + 1 tháng → 30/9 (không phải 1/10 như addMonths thường)
    expect(formatDateFor('vi-VN', addMonthsClamped(new Date(2026, 7, 31), 1))).toBe('30/09/2026');
    // 31/1 + 1 tháng → 28/2/2026 (2026 không nhuận)
    expect(formatDateFor('vi-VN', addMonthsClamped(new Date(2026, 0, 31), 1))).toBe('28/02/2026');
    // ngày trong biên giữ nguyên
    expect(formatDateFor('vi-VN', addMonthsClamped(new Date(2026, 6, 15), 1))).toBe('15/08/2026');
    // lùi tháng
    expect(formatDateFor('vi-VN', addMonthsClamped(new Date(2026, 2, 31), -1))).toBe('28/02/2026');
  });

  it('isBeforeDay / inRange', () => {
    expect(isBeforeDay(new Date(2026, 6, 4), new Date(2026, 6, 5))).toBe(true);
    expect(isBeforeDay(new Date(2026, 6, 5), new Date(2026, 6, 5))).toBe(false);
    expect(inRange(new Date(2026, 6, 5), new Date(2026, 6, 1), new Date(2026, 6, 10))).toBe(true);
    expect(inRange(new Date(2026, 6, 15), new Date(2026, 6, 1), new Date(2026, 6, 10))).toBe(false);
    expect(inRange(new Date(2026, 6, 15))).toBe(true); // không min/max
  });

  it('buildMonthGrid: 42 ô, bắt đầu Thứ Hai', () => {
    const grid = buildMonthGrid(new Date(2026, 6, 1), 1); // 1/7/2026 là Thứ Tư
    expect(grid.length).toBe(42);
    expect(grid[0].getDay()).toBe(1); // Thứ Hai
    expect(formatDateFor('vi-VN', grid[0])).toBe('29/06/2026'); // T2 tuần chứa 1/7
  });

  it('buildMonthGrid với firstDayOfWeek=0 thì ô đầu là Chủ nhật', () => {
    const grid = buildMonthGrid(new Date(2026, 6, 1), 0);
    expect(grid.length).toBe(42);
    expect(grid[0].getDay()).toBe(0);
    expect(formatDateFor('vi-VN', grid[0])).toBe('28/06/2026'); // Chủ nhật của tuần chứa 1/7
  });

  it('buildMonthGrid với firstDayOfWeek=1 thì ô đầu là Thứ hai', () => {
    const grid = buildMonthGrid(new Date(2026, 6, 1), 1);
    expect(grid[0].getDay()).toBe(1);
    expect(formatDateFor('vi-VN', grid[0])).toBe('29/06/2026');
  });
});
