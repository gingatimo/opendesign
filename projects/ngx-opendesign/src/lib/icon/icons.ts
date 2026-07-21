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
  /**
   * TÔ ĐẶC thay vì viền: GIcon vẽ hình với `fill: currentColor; stroke: none` thay cho mặc định
   * `fill: none; stroke: currentColor`. Dùng cho icon vốn là khối đặc (vd. tam giác sắp xếp
   * gIconAngleUp/Down). Đa số icon để trống (viền) — giữ phong cách outline nhất quán.
   */
  filled?: boolean;
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

// Double-chevron (« ») — về trang đầu / tới trang cuối trong GPagination.
export const gIconChevronsLeft: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M17 18l-6-6 6-6', 'M11 18l-6-6 6-6'],
};

export const gIconChevronsRight: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M7 18l6-6-6-6', 'M13 18l6-6-6-6'],
};

// Angle up/down — TAM GIÁC TÔ ĐẶC (▲▼), dùng cho chỉ báo sắp xếp (GSortHeader) và tái dùng chung.
// Tam giác đặc khớp với mask trong .g-sort-header (opendesign.scss) — sửa hình thì sửa cả hai chỗ.
export const gIconAngleUp: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  filled: true,
  paths: ['M12 8l6 8H6z'],
};

export const gIconAngleDown: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  filled: true,
  paths: ['M6 8h12l-6 8z'],
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
  // Lưới thật: hàng header + 1 hàng, 3 cột → trông giống bảng hơn (trước chỉ 1 vạch ngang + 1 dọc).
  paths: ['M3 9h18', 'M3 15h18', 'M9 4v16', 'M15 4v16'],
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

// ----- Media player -----

export const gIconPlay: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M8 5v14l11-7z'],
};

export const gIconPause: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M9 5v14', 'M15 5v14'],
};

// Nón loa dùng chung cho volume/mute — chỉ khác phần sóng/dấu X bên phải (xem lý do gom hằng ở
// PANEL_RECT phía trên).
const SPEAKER_CONE = 'M11 5 6 9H2v6h4l5 4z';

export const gIconVolume: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [SPEAKER_CONE, 'M15.54 8.46a5 5 0 0 1 0 7.07', 'M19.07 4.93a10 10 0 0 1 0 14.14'],
};

export const gIconVolumeMute: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [SPEAKER_CONE, 'M22 9l-6 6', 'M16 9l6 6'],
};

export const gIconMaximize: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M8 3H5a2 2 0 0 0-2 2v3',
    'M21 8V5a2 2 0 0 0-2-2h-3',
    'M3 16v3a2 2 0 0 0 2 2h3',
    'M16 21h3a2 2 0 0 0 2-2v-3',
  ],
};

// Bốn góc chụm vào trong — cặp với gIconMaximize (thu nhỏ/thoát toàn màn hình).
export const gIconMinimize: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M8 3v3a2 2 0 0 1-2 2H3',
    'M21 8h-3a2 2 0 0 1-2-2V3',
    'M3 16h3a2 2 0 0 1 2 2v3',
    'M16 21v-3a2 2 0 0 1 2-2h3',
  ],
};

// Kính lúp + dấu cộng/trừ (dùng cho lightbox/xem ảnh).
export const gIconZoomIn: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['m21 21-4.3-4.3', 'M11 8v6', 'M8 11h6'],
  circles: [{ cx: 11, cy: 11, r: 7 }],
};

export const gIconZoomOut: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['m21 21-4.3-4.3', 'M8 11h6'],
  circles: [{ cx: 11, cy: 11, r: 7 }],
};

// Đồng hồ — vòng tròn + 2 kim (dùng cho GTimePicker).
export const gIconClock: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M12 7v5l3 2'],
  circles: [{ cx: 12, cy: 12, r: 9 }],
};

// Máy bay giấy (gửi) — nút gửi trong chat/bình luận.
export const gIconSend: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M22 2L11 13', 'M22 2L15 22L11 13L2 9L22 2Z'],
};

// Micro — nhập giọng nói (vd. nút mic mặc định trong ô chat khi chưa gõ chữ).
export const gIconMic: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 9, y: 2, width: 6, height: 11, rx: 3 }],
  paths: ['M5 11v1a7 7 0 0 0 14 0v-1', 'M12 19v3', 'M8 22h8'],
};

// ----- Phản ứng (favorite / like / dislike) -----

// Trái tim — yêu thích/favorite.
export const gIconHeart: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  ],
};

// Ngón cái lên — thích/like.
export const gIconThumbsUp: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z',
    'M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3',
  ],
};

// Ngón cái xuống — không thích/dislike.
export const gIconThumbsDown: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z',
    'M17 2h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3',
  ],
};

// ===== Liên lạc & xã hội =====

// Phong bì — email.
export const gIconMail: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 2, y: 4, width: 20, height: 16, rx: 2 }],
  paths: ['M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'],
};

// Ống nghe điện thoại.
export const gIconPhone: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
  ],
};

// Bong bóng chat — tin nhắn/bình luận.
export const gIconMessageCircle: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z',
  ],
};

// Chia sẻ — 3 nút nối bằng 2 đường.
export const gIconShare: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  circles: [
    { cx: 18, cy: 5, r: 3 },
    { cx: 6, cy: 12, r: 3 },
    { cx: 18, cy: 19, r: 3 },
  ],
  paths: ['M8.59 13.51l6.83 3.98', 'M15.41 6.51l-6.82 3.98'],
};

// Cờ đánh dấu (bookmark) — lưu/ghim.
export const gIconBookmark: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'],
};

// Ngôi sao viền — yêu thích/xếp hạng (GRating vẽ sao TÔ ĐẶC riêng, đây là bản outline dùng chung).
export const gIconStar: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z',
  ],
};

// Ký hiệu @ — tên người dùng/email.
export const gIconAtSign: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  circles: [{ cx: 12, cy: 12, r: 4 }],
  paths: ['M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94'],
};

// Địa cầu — ngôn ngữ/website.
export const gIconGlobe: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  circles: [{ cx: 12, cy: 12, r: 10 }],
  paths: [
    'M2 12h20',
    'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
  ],
};

// ===== File & dữ liệu =====

// Thư mục.
export const gIconFolder: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'],
};

// Thư mục đang mở.
export const gIconFolderOpen: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
  ],
};

// Tài liệu có dòng chữ.
export const gIconFileText: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
    'M14 2v6h6',
    'M16 13H8',
    'M16 17H8',
    'M10 9H8',
  ],
};

// Đĩa mềm — lưu (save).
export const gIconSave: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z',
    'M17 21v-8H7v8',
    'M7 3v5h8',
  ],
};

// Bảng kẹp (clipboard) — dán/sao chép nội dung.
export const gIconClipboard: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'],
  rects: [{ x: 8, y: 2, width: 8, height: 4, rx: 1 }],
};

// Phễu lọc (filter).
export const gIconFilter: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
};

// Máy in.
export const gIconPrinter: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M6 9V2h12v7',
    'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2',
  ],
  rects: [{ x: 6, y: 14, width: 12, height: 8 }],
};

// ===== Thương mại =====

// Thẻ tín dụng.
export const gIconCreditCard: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 1, y: 4, width: 22, height: 16, rx: 2 }],
  paths: ['M1 10h22'],
};

// Nhãn giá (tag).
export const gIconTag: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
    'M7 7h.01',
  ],
};

// Thùng hàng (package) — đơn hàng/vận chuyển.
export const gIconPackage: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M16.5 9.4L7.5 4.21',
    'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z',
    'M3.27 6.96L12 12.01l8.73-5.05',
    'M12 22.08V12',
  ],
};

// Hộp quà (gift).
export const gIconGift: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M20 12v10H4V12',
    'M12 22V7',
    'M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z',
    'M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z',
  ],
  rects: [{ x: 2, y: 7, width: 20, height: 5 }],
};

// Ví tiền (wallet).
export const gIconWallet: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M21 12V7H5a2 2 0 0 1 0-4h14v4',
    'M3 5v14a2 2 0 0 0 2 2h16v-5',
    'M18 12a2 2 0 0 0 0 4h4v-4z',
  ],
};

// Xe tải (giao hàng/vận chuyển).
export const gIconTruck: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 1, y: 3, width: 15, height: 13 }],
  paths: ['M16 8h4l3 3v5h-7V8'],
  circles: [
    { cx: 5.5, cy: 18.5, r: 2.5 },
    { cx: 18.5, cy: 18.5, r: 2.5 },
  ],
};

// ===== Media & thiết bị =====

// Máy ảnh.
export const gIconCamera: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'],
  circles: [{ cx: 12, cy: 13, r: 4 }],
};

// Máy quay (video).
export const gIconVideo: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M23 7l-7 5 7 5V7z'],
  rects: [{ x: 1, y: 5, width: 15, height: 14, rx: 2 }],
};

// Màn hình máy tính (monitor).
export const gIconMonitor: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 2, y: 3, width: 20, height: 14, rx: 2 }],
  paths: ['M8 21h8', 'M12 17v4'],
};

// Điện thoại di động.
export const gIconSmartphone: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 5, y: 2, width: 14, height: 20, rx: 2 }],
  paths: ['M12 18h.01'],
};

// Wi-Fi (sóng).
export const gIconWifi: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M5 12.55a11 11 0 0 1 14.08 0',
    'M1.42 9a16 16 0 0 1 21.16 0',
    'M8.53 16.11a6 6 0 0 1 6.95 0',
    'M12 20h.01',
  ],
};

// Đám mây (cloud) — lưu trữ/đồng bộ.
export const gIconCloud: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'],
};

// Pin (battery).
export const gIconBattery: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 1, y: 6, width: 18, height: 12, rx: 2 }],
  paths: ['M23 13v-2'],
};

// ===== Bản đồ & vị trí =====

// Ghim bản đồ (map pin) — địa điểm.
export const gIconMapPin: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'],
  circles: [{ cx: 12, cy: 10, r: 3 }],
};

// Bản đồ gấp.
export const gIconMap: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z', 'M8 2v16', 'M16 6v16'],
};

// La bàn (compass) — điều hướng.
export const gIconCompass: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  circles: [{ cx: 12, cy: 12, r: 10 }],
  paths: ['M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z'],
};

// ===== Hành động & UI =====

// Ba chấm ngang (⋯) — menu thêm/kebab ngang.
export const gIconMoreHorizontal: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  circles: [
    { cx: 5, cy: 12, r: 1 },
    { cx: 12, cy: 12, r: 1 },
    { cx: 19, cy: 12, r: 1 },
  ],
};

// Ba chấm dọc (⋮) — menu thêm/kebab dọc.
export const gIconMoreVertical: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  circles: [
    { cx: 12, cy: 5, r: 1 },
    { cx: 12, cy: 12, r: 1 },
    { cx: 12, cy: 19, r: 1 },
  ],
};

// Làm mới (refresh) — tải lại.
export const gIconRefresh: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M23 4v6h-6',
    'M1 20v-6h6',
    'M3.51 9a9 9 0 0 1 14.85-3.36L23 10',
    'M1 14l4.64 4.36A9 9 0 0 0 20.49 15',
  ],
};

// Liên kết ngoài (external link) — mở tab/trang mới.
export const gIconExternalLink: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'],
};

// Đăng xuất (log out).
export const gIconLogOut: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
};

// Đăng nhập (log in).
export const gIconLogIn: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', 'M10 17l5-5-5-5', 'M15 12H3'],
};

// Ổ khoá đóng (lock).
export const gIconLock: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 3, y: 11, width: 18, height: 11, rx: 2 }],
  paths: ['M7 11V7a5 5 0 0 1 10 0v4'],
};

// Ổ khoá mở (unlock).
export const gIconUnlock: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  rects: [{ x: 3, y: 11, width: 18, height: 11, rx: 2 }],
  paths: ['M7 11V7a5 5 0 0 1 9.9-1'],
};

// Thanh trượt điều chỉnh (sliders) — cài đặt/tuỳ chỉnh.
export const gIconSliders: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M4 21v-7',
    'M4 10V3',
    'M12 21v-9',
    'M12 8V3',
    'M20 21v-5',
    'M20 12V3',
    'M1 14h6',
    'M9 8h6',
    'M17 16h6',
  ],
};

// ===== Khác phổ biến =====

// Tia sét (zap) — nhanh/năng lượng/nổi bật.
export const gIconZap: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'],
};

// Lá cờ (flag) — đánh dấu/báo cáo.
export const gIconFlag: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z', 'M4 22v-7'],
};

// Dấu hỏi trong vòng tròn (help) — trợ giúp.
export const gIconHelpCircle: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  circles: [{ cx: 12, cy: 12, r: 10 }],
  paths: ['M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
};

// Kẹp giấy (paperclip) — đính kèm.
export const gIconPaperclip: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48',
  ],
};

// Nhóm người (users) — nhiều người dùng.
export const gIconUsers: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
    'M23 21v-2a4 4 0 0 0-3-3.87',
    'M16 3.13a4 4 0 0 1 0 7.75',
  ],
  circles: [{ cx: 9, cy: 7, r: 4 }],
};

// Dấu ngoặc nhọn (code) — mã nguồn/kỹ thuật.
export const gIconCode: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
};

// Hoàn tác (undo) — mũi tên quay ngược sang trái.
export const gIconUndo: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M9 14L4 9l5-5', 'M20 20v-7a4 4 0 0 0-4-4H4'],
};

// Làm lại (redo) — mũi tên quay ngược sang phải.
export const gIconRedo: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M15 14l5-5-5-5', 'M4 20v-7a4 4 0 0 1 4-4h12'],
};

// Căn trái.
export const gIconAlignLeft: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 6H3', 'M17 10H3', 'M21 14H3', 'M17 18H3'],
};

// Căn giữa.
export const gIconAlignCenter: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 6H3', 'M18 10H6', 'M21 14H3', 'M18 18H6'],
};

// Căn phải.
export const gIconAlignRight: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M21 6H3', 'M21 10H7', 'M21 14H3', 'M21 18H7'],
};

// Bỏ liên kết (unlink) — mắt xích bị gạch chéo.
export const gIconUnlink: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M15 7h3a5 5 0 0 1 3.54 8.54', 'M9 17H6A5 5 0 0 1 6 7h3', 'M3 3l18 18'],
};

// Màu chữ — chữ A trên vạch màu.
export const gIconTextColor: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M5 21h14', 'M7 16l5-11 5 11', 'M9.2 12h5.6'],
};

// Gạch ngang chữ (strikethrough).
export const gIconStrikethrough: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M16 4H9a3 3 0 0 0-2.83 4', 'M14 12a4 4 0 0 1 0 8H6', 'M4 12h16'],
};

// Chỉ số dưới (subscript) — X nhỏ kèm số dưới chân.
export const gIconSubscript: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M4 5l8 8',
    'M12 5l-8 8',
    'M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07',
  ],
};

// Chỉ số trên (superscript).
export const gIconSuperscript: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M4 19l8-8',
    'M12 19l-8-8',
    'M20 12h-4c0-1.5.44-2 1.5-2.5S20 8.33 20 7c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07',
  ],
};

// Danh sách chấm.
export const gIconList: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
};

// Danh sách đánh số.
export const gIconListOrdered: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: [
    'M10 6h11',
    'M10 12h11',
    'M10 18h11',
    'M4 6h1v4',
    'M4 10h2',
    'M6 18H4c0-1 2-2 2-3s-1-1.5-2-1',
  ],
};

// Danh sách có ô đánh dấu (checklist).
export const gIconListChecks: GIconGlyph = {
  viewBox: VIEW_BOX_24,
  paths: ['M3 7l2 2 4-4', 'M3 17l2 2 4-4', 'M13 6h8', 'M13 12h8', 'M13 18h8'],
};
