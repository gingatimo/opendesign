// Hàm ngày thuần (không phụ thuộc Angular) cho GDatepicker. So sánh theo NGÀY (bỏ giờ/phút).

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
}

// addMonths nhưng KẸP ngày về ngày cuối tháng đích (tránh tràn: 31/8 +1 tháng = 30/9, KHÔNG phải 1/10).
export function addMonthsClamped(d: Date, n: number): Date {
  const y = d.getFullYear();
  const m = d.getMonth() + n;
  const lastDay = new Date(y, m + 1, 0).getDate();
  return new Date(y, m, Math.min(d.getDate(), lastDay));
}

export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

// So theo ngày (bỏ giờ): a < b?
export function isBeforeDay(a: Date, b: Date): boolean {
  const da = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const db = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return da < db;
}

// d nằm trong [min, max] theo ngày (bao gồm biên). min/max tuỳ chọn.
export function inRange(d: Date, min?: Date, max?: Date): boolean {
  if (min && isBeforeDay(d, min)) return false;
  if (max && isBeforeDay(max, d)) return false;
  return true;
}

// d nằm HẲN GIỮA a và b theo ngày (không tính hai biên). Dùng cho tô dải date-range. a/b null → false.
export function isBetween(d: Date, a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false;
  const lo = isBeforeDay(a, b) ? a : b;
  const hi = isBeforeDay(a, b) ? b : a;
  return isBeforeDay(lo, d) && isBeforeDay(d, hi);
}

/** 42 ô (6 tuần) phủ trọn tháng chứa `anchor`. `firstDayOfWeek` theo locale: 0 = Chủ nhật. */
export function buildMonthGrid(anchor: Date, firstDayOfWeek: number): Date[] {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  // Lùi về ngày đầu tuần chứa mùng 1. Cộng 7 trước khi lấy dư để không ra số âm.
  const offset = (first.getDay() - firstDayOfWeek + 7) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - offset);
  return Array.from(
    { length: 42 },
    (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i),
  );
}
