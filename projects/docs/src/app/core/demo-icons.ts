import type { GIconGlyph } from 'ngx-opendesign';

// Glyph DOCS-LOCAL cho các demo — icon không có trong bộ public của lib (chuông thông báo, biến thể
// home/báo cáo dùng riêng cho ảnh minh hoạ app-shell). Port thẳng từ <svg> cũ trong các demo.
const VB = '0 0 24 24';

export const iconBell: GIconGlyph = {
  viewBox: VB,
  paths: ['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.7 21a2 2 0 0 1-3.4 0'],
};

export const iconHomeAlt: GIconGlyph = {
  viewBox: VB,
  paths: ['M3 11 12 3l9 8', 'M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10'],
};

export const iconReport: GIconGlyph = {
  viewBox: VB,
  paths: ['M3 12h10'],
  rects: [{ x: 3, y: 10, width: 18, height: 4, rx: 2 }],
};
