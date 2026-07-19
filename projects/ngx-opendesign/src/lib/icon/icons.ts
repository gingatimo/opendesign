/**
 * Icon set của OpenDesign — dữ liệu hình học có cấu trúc, KHÔNG phải chuỗi HTML/SVG thô.
 *
 * GIcon render icon bằng binding thường ([attr.d], [attr.cx]...), không dùng innerHTML hay
 * bypassSecurityTrustHtml: nếu GIcon nhận chuỗi HTML rồi bypass sanitizer, bất kỳ consumer nào
 * truyền chuỗi từ nguồn không tin cậy (API, CMS, input người dùng) đều mở lỗ XSS mà không biết.
 *
 * Cấu trúc chọn: { viewBox, paths?, circles?, rects? } thay vì chỉ `paths: string[]`. Đa số icon
 * (mũi tên, dấu cộng, chevron...) chỉ cần path. Nhưng icon có hình tròn thật (search, user, cart,
 * sun) quy tự nhiên về <circle>, và icon có khung chữ nhật bo góc (panelLeftClose/panelLeftOpen)
 * quy tự nhiên về <rect rx>. Quy đổi rect bo góc sang path đòi tính tay lệnh arc (A) — dễ sai và
 * không cách nào tự kiểm chứng bằng mắt trong môi trường này (jsdom không có layout/render engine).
 * Dùng <rect>/<circle> thật, do trình duyệt tự vẽ, loại bỏ hẳn rủi ro đó.
 *
 * Tree-shaking: mỗi icon là một `export const` riêng — KHÔNG gom vào object/map lớn. Gom lại
 * (vd. `export const ICONS = { menu: ..., x: ... }`) sẽ kéo cả set vào bundle của bất kỳ consumer
 * nào import dù chỉ một icon, vì bundler không tree-shake được các thuộc tính của một object.
 */
export interface GIconGlyph {
  viewBox: string;
  paths?: readonly string[];
  circles?: readonly { cx: number; cy: number; r: number }[];
  rects?: readonly { x: number; y: number; width: number; height: number; rx?: number }[];
}

const VIEW_BOX_24 = '0 0 24 24';

export const gIconMenu: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M3 12h18M3 6h18M3 18h18'],
};

export const gIconX: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M18 6 6 18', 'M6 6l12 12'],
};

export const gIconChevronLeft: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M15 18l-6-6 6-6'],
};

export const gIconChevronRight: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M9 18l6-6-6-6'],
};

export const gIconChevronUp: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M18 15l-6-6-6 6'],
};

export const gIconChevronDown: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M6 9l6 6 6-6'],
};

// Angle up/down — caret nhọn hơn chevron một chút, dùng cho chỉ báo sắp xếp (GSortHeader) và tái dùng
// chung. Path này khớp với mask trong .g-sort-header (opendesign.scss) — sửa path thì sửa cả hai chỗ.
export const gIconAngleUp: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M7 14l5-5 5 5'],
};

export const gIconAngleDown: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M7 10l5 5 5-5'],
};

export const gIconCheck: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M20 6L9 17l-5-5'],
};

export const gIconPlus: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M12 5v14M5 12h14'],
};

export const gIconMinus: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M5 12h14'],
};

export const gIconSearch: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['m21 21-4.3-4.3'],
  circles: [{ cx: 11, cy: 11, r: 7 }],
};

export const gIconUser: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M20 21a8 8 0 1 0-16 0'],
  circles: [{ cx: 12, cy: 7, r: 4 }],
};

export const gIconCart: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6'],
  circles: [
    { cx: 9, cy: 21, r: 1 },
    { cx: 20, cy: 21, r: 1 },
  ],
};

export const gIconSettings: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.55 1z',
  ],
  circles: [{ cx: 12, cy: 12, r: 3 }],
};

export const gIconHome: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22v-10h6v10'],
};

export const gIconEye: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'],
  circles: [{ cx: 12, cy: 12, r: 3 }],
};

export const gIconEyeOff: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M2 2l20 20'],
  circles: [{ cx: 12, cy: 12, r: 3 }],
};

export const gIconSun: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M12 1v2',
    'M12 21v2',
    'M4.22 4.22l1.42 1.42',
    'M18.36 18.36l1.42 1.42',
    'M1 12h2',
    'M21 12h2',
    'M4.22 19.78l1.42-1.42',
    'M18.36 5.64l1.42-1.42',
  ],
  circles: [{ cx: 12, cy: 12, r: 5 }],
};

export const gIconMoon: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'],
};

export const gIconInfo: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M12 16v-4', 'M12 8h.01'],
  circles: [{ cx: 12, cy: 12, r: 10 }],
};

export const gIconWarning: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    'M12 9v4',
    'M12 17h.01',
  ],
};

export const gIconError: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M15 9l-6 6', 'M9 9l6 6'],
  circles: [{ cx: 12, cy: 12, r: 10 }],
};

export const gIconSuccess: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M16 9l-5.5 6.5L8 13'],
  circles: [{ cx: 12, cy: 12, r: 10 }],
};

export const gIconTrash: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M3 6h18',
    'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6',
    'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    'M10 11v6',
    'M14 11v6',
  ],
};

export const gIconEdit: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z'],
};

export const gIconDownload: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
};

export const gIconUpload: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
};

export const gIconFile: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6'],
};

export const gIconCalendar: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M16 2v4', 'M8 2v4', 'M3 10h18'],
  rects: [{ x: 3, y: 4, width: 18, height: 18, rx: 2 }],
};

export const gIconBell: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 0 1-3.46 0'],
};

export const gIconCopy: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2'],
  rects: [{ x: 8, y: 8, width: 14, height: 14, rx: 2 }],
};

export const gIconLink: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
    'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71',
  ],
};

export const gIconImage: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 15l-5-5L5 21'],
  circles: [{ cx: 8.5, cy: 8.5, r: 1.5 }],
  rects: [{ x: 3, y: 3, width: 18, height: 18, rx: 2 }],
};

export const gIconGrid: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [
    { x: 3, y: 3, width: 7, height: 7, rx: 1 },
    { x: 14, y: 3, width: 7, height: 7, rx: 1 },
    { x: 3, y: 14, width: 7, height: 7, rx: 1 },
    { x: 14, y: 14, width: 7, height: 7, rx: 1 },
  ],
};

export const gIconLayout: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M3 9h18', 'M9 9v12'],
  rects: [{ x: 3, y: 3, width: 18, height: 18, rx: 2 }],
};

export const gIconTable: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M3 10h18M9 10v10'],
  rects: [{ x: 3, y: 4, width: 18, height: 16, rx: 2 }],
};

/**
 * Khung ngoài + vạch dọc dùng chung cho panelLeftClose/panelLeftOpen — bo góc thật qua <rect rx>
 * (không quy về path), xem lý do ở JSDoc GIconGlyph phía trên.
 */
const PANEL_RECT = { x: 3, y: 3, width: 18, height: 18, rx: 2 } as const;
const PANEL_DIVIDER = 'M9 3v18';

export const gIconPanelLeftClose: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [PANEL_DIVIDER, 'M16 15l-3-3 3-3'],
  rects: [PANEL_RECT],
};

export const gIconPanelLeftOpen: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [PANEL_DIVIDER, 'M14 9l3 3-3 3'],
  rects: [PANEL_RECT],
};
