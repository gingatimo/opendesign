// Hàm ngày thuần (không phụ thuộc Angular) cho GDatepicker. So sánh theo NGÀY (bỏ giờ/phút).

export function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}

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

// Lưới 6 tuần (42 ô) bắt đầu từ Thứ Hai của tuần chứa ngày 1 của tháng.
export function buildMonthGrid(month: Date): Date[] {
  const first = startOfMonth(month);
  // getDay(): 0=CN..6=T7. Muốn tuần bắt đầu T2 → offset = (getDay()+6)%7.
  const offset = (first.getDay() + 6) % 7;
  const start = addDays(first, -offset);
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
}
