// Bọc Intl cho các thành phần cần định dạng theo locale.
//
// Vì sao KHÔNG để tên thứ/tháng trong gói ngôn ngữ: Intl đã có sẵn dữ liệu cho mọi locale, chép tay vào
// gói vừa thừa 19 chuỗi mỗi ngôn ngữ vừa khiến gói do người dùng tự viết (ja-JP, ko-KR…) phải tự dịch
// những thứ trình duyệt vốn biết.

/** Năm 4 chữ số cho MỌI locale. `dateStyle: 'short'` cho en-US ra "7/5/26" — năm 2 chữ số rất khó đọc
 *  trong ô của picker, nên chỉ định từng thành phần. */
const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export function formatDateFor(tag: string, d: Date): string {
  return new Intl.DateTimeFormat(tag, DATE_OPTIONS).format(d);
}

export function datePlaceholderFor(tag: string): string {
  return new Intl.DateTimeFormat(tag, DATE_OPTIONS)
    .formatToParts(new Date(2006, 10, 22))
    .map(({ type, value }) => {
      switch (type) {
        case 'day':
          return 'dd';
        case 'month':
          return 'MM';
        case 'year':
          return 'yyyy';
        default:
          return value;
      }
    })
    .join('');
}

export function formatNumberFor(tag: string, n: number): string {
  return new Intl.NumberFormat(tag).format(n);
}

// 7/1/2024 là Chủ nhật. Mốc cố định + timeZone UTC để tên thứ không lệch theo múi giờ máy chạy.
const SUNDAY_UTC = Date.UTC(2024, 0, 7);
const DAY_MS = 86_400_000;

export function weekdayNames(tag: string, firstDayOfWeek: number): string[] {
  const fmt = new Intl.DateTimeFormat(tag, { weekday: 'short', timeZone: 'UTC' });
  return Array.from({ length: 7 }, (_, i) =>
    compactWeekdayLabel(
      tag,
      fmt.format(new Date(SUNDAY_UTC + ((i + firstDayOfWeek) % 7) * DAY_MS)),
    ),
  );
}

export function monthNames(tag: string): string[] {
  const fmt = new Intl.DateTimeFormat(tag, { month: 'short', timeZone: 'UTC' });
  return Array.from({ length: 12 }, (_, m) =>
    compactMonthLabel(tag, fmt.format(new Date(Date.UTC(2024, m, 15)))),
  );
}

function compactMonthLabel(tag: string, label: string): string {
  if (!tag.toLowerCase().startsWith('vi')) return label;

  // Intl vi-VN trả `Tháng 7` ngay cả khi dùng month: 'short'; picker/chart cần nhãn đủ gọn.
  return label.replace(/^tháng\s+/i, 'Th ').replace(/^thg\s*/i, 'Th ');
}

function compactWeekdayLabel(tag: string, label: string): string {
  if (!tag.toLowerCase().startsWith('vi')) return label;

  return label.replace(/^thứ\s+/i, 'T');
}
