import type { GIconGlyph } from 'ngx-opendesign';

// Chuông thông báo giờ là icon PUBLIC (gIconBell) — tái dùng thay vì định nghĩa lại.
export { gIconBell as iconBell } from 'ngx-opendesign';

// Glyph DOCS-LOCAL còn lại cho demo — biến thể home/báo cáo dùng riêng cho ảnh minh hoạ app-shell.
const VB = '0 0 24 24';

export const iconHomeAlt: GIconGlyph = {
  viewBox: VB,
  paths: ['M3 11 12 3l9 8', 'M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10'],
};

export const iconReport: GIconGlyph = {
  viewBox: VB,
  paths: ['M3 12h10'],
  rects: [{ x: 3, y: 10, width: 18, height: 4, rx: 2 }],
};
