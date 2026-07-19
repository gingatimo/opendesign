import {
  type GIconGlyph,
  gIconGrid,
  gIconImage,
  gIconLayout,
  gIconLink,
  gIconTable,
} from 'ngx-opendesign';

// Kiểu icon nav — định nghĩa ở đây để nav-icons.ts và app.ts dùng chung (tránh vòng import).
export type NavIcon =
  | 'home'
  | 'mau-sac'
  | 'typography'
  | 'radius-spacing'
  | 'dark-mode'
  | 'button'
  | 'icon-button'
  | 'input'
  | 'textarea'
  | 'checkbox'
  | 'toggle'
  | 'radio'
  | 'select'
  | 'file-input'
  | 'datepicker'
  | 'slider'
  | 'badge'
  | 'spinner'
  | 'progress'
  | 'chip'
  | 'avatar'
  | 'card'
  | 'icon'
  | 'image-preview'
  | 'image-slider'
  | 'media-player'
  | 'divider'
  | 'fab'
  | 'grid'
  | 'dialog'
  | 'tooltip'
  | 'toast'
  | 'drawer'
  | 'tabs'
  | 'stepper'
  | 'topbar'
  | 'sidebar'
  | 'link'
  | 'menu'
  | 'breadcrumb'
  | 'pagination'
  | 'container'
  | 'stack'
  | 'layout'
  | 'table'
  | 'playbook';

const VB = '0 0 24 24';

// Glyph icon nav — DOCS-LOCAL (không thêm vào bộ icon public của lib). Dữ liệu port thẳng từ các <svg>
// trước đây trong app.html. Vài icon vốn có fill/opacity riêng (chấm image-preview/stepper đặc, gạch mờ
// divider) → GIcon chỉ vẽ stroke nên xấp xỉ (chấm r nhỏ với stroke-width 2 trông gần như đặc).
export const NAV_ICON_GLYPHS: Record<NavIcon, GIconGlyph> = {
  home: {
    viewBox: VB,
    paths: ['M3 11 12 3l9 8', 'M5 10v10a1 1 0 0 0 1 1h3v-6h6v6h3a1 1 0 0 0 1-1V10'],
  },
  'mau-sac': { viewBox: VB, paths: ['M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z'] },
  typography: { viewBox: VB, paths: ['M4 7V4h16v3', 'M12 4v16', 'M9 20h6'] },
  'radius-spacing': { viewBox: VB, paths: ['M4 20V9a5 5 0 0 1 5-5h11'] },
  'dark-mode': { viewBox: VB, paths: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'] },
  button: { viewBox: VB, rects: [{ x: 4, y: 7, width: 16, height: 10, rx: 5 }] },
  'icon-button': { viewBox: VB, paths: ['M12 9v6M9 12h6'], circles: [{ cx: 12, cy: 12, r: 8 }] },
  input: { viewBox: VB, paths: ['M8 11v2'], rects: [{ x: 3, y: 7, width: 18, height: 10, rx: 2 }] },
  textarea: {
    viewBox: VB,
    paths: ['M7 9h10M7 13h10M7 17h6'],
    rects: [{ x: 3, y: 4, width: 18, height: 16, rx: 2 }],
  },
  checkbox: {
    viewBox: VB,
    paths: ['M9 11l3 3 10-10', 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
  },
  toggle: {
    viewBox: VB,
    rects: [{ x: 1, y: 5, width: 22, height: 14, rx: 7 }],
    circles: [{ cx: 16, cy: 12, r: 3 }],
  },
  radio: {
    viewBox: VB,
    circles: [
      { cx: 12, cy: 12, r: 9 },
      { cx: 12, cy: 12, r: 3 },
    ],
  },
  select: {
    viewBox: VB,
    paths: ['M9 12l3 3 3-3'],
    rects: [{ x: 3, y: 7, width: 18, height: 10, rx: 2 }],
  },
  'file-input': {
    viewBox: VB,
    paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
  },
  badge: {
    viewBox: VB,
    rects: [{ x: 4, y: 6, width: 12, height: 12, rx: 2 }],
    circles: [{ cx: 18, cy: 6, r: 3 }],
  },
  spinner: { viewBox: VB, paths: ['M21 12a9 9 0 1 1-9-9'] },
  progress: {
    viewBox: VB,
    paths: ['M3 12h10'],
    rects: [{ x: 3, y: 10, width: 18, height: 4, rx: 2 }],
  },
  chip: {
    viewBox: VB,
    paths: ['M17 10l4 4m0-4l-4 4'],
    rects: [{ x: 2, y: 8, width: 14, height: 8, rx: 4 }],
  },
  avatar: { viewBox: VB, paths: ['M20 21a8 8 0 1 0-16 0'], circles: [{ cx: 12, cy: 7, r: 4 }] },
  card: { viewBox: VB, paths: ['M3 10h18'], rects: [{ x: 3, y: 5, width: 18, height: 14, rx: 2 }] },
  icon: { viewBox: VB, paths: ['M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z'] },
  'image-preview': gIconImage,
  'image-slider': {
    viewBox: VB,
    paths: ['M7 10l-2 2 2 2', 'M17 10l2 2-2 2'],
    rects: [{ x: 3, y: 6, width: 18, height: 12, rx: 2 }],
  },
  'media-player': {
    viewBox: VB,
    paths: ['M10 9l5 3-5 3z'],
    rects: [{ x: 3, y: 5, width: 18, height: 14, rx: 2 }],
  },
  divider: { viewBox: VB, paths: ['M3 12h18', 'M6 7h4', 'M14 17h4'] },
  fab: { viewBox: VB, paths: ['M12 8v8M8 12h8'], circles: [{ cx: 12, cy: 12, r: 9 }] },
  grid: gIconGrid,
  datepicker: {
    viewBox: VB,
    paths: ['M16 2v4M8 2v4M3 10h18'],
    rects: [{ x: 3, y: 4, width: 18, height: 18, rx: 2 }],
  },
  slider: { viewBox: VB, paths: ['M3 12h18'], circles: [{ cx: 9, cy: 12, r: 3 }] },
  dialog: {
    viewBox: VB,
    rects: [
      { x: 3, y: 4, width: 18, height: 16, rx: 2 },
      { x: 8, y: 9, width: 8, height: 6, rx: 1 },
    ],
  },
  tooltip: {
    viewBox: VB,
    paths: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
  },
  toast: {
    viewBox: VB,
    paths: ['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 0 1-3.46 0'],
  },
  drawer: {
    viewBox: VB,
    paths: ['M15 4v16'],
    rects: [{ x: 3, y: 4, width: 18, height: 16, rx: 2 }],
  },
  tabs: {
    viewBox: VB,
    paths: ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'],
  },
  stepper: {
    viewBox: VB,
    paths: ['M6 6h12M6 12h12M6 18h12'],
    circles: [
      { cx: 4, cy: 6, r: 1.5 },
      { cx: 4, cy: 12, r: 1.5 },
      { cx: 4, cy: 18, r: 1.5 },
    ],
  },
  topbar: {
    viewBox: VB,
    paths: ['M3 15h18M3 19h12'],
    rects: [{ x: 3, y: 5, width: 18, height: 5, rx: 2 }],
  },
  sidebar: {
    viewBox: VB,
    paths: ['M10 4v16'],
    rects: [{ x: 4, y: 4, width: 16, height: 16, rx: 2 }],
  },
  link: gIconLink,
  menu: { viewBox: VB, paths: ['M3 5h13', 'M3 12h13', 'M3 19h13', 'M19 9l2.5 3-2.5 3'] },
  breadcrumb: { viewBox: VB, paths: ['M4 12h4', 'M16 12h4', 'M10 8l3 4-3 4'] },
  pagination: { viewBox: VB, paths: ['M4 12h2m4 0h2m4 0h2', 'M5 8l-3 4 3 4M19 8l3 4-3 4'] },
  container: {
    viewBox: VB,
    rects: [
      { x: 2, y: 4, width: 20, height: 16, rx: 2 },
      { x: 7, y: 8, width: 10, height: 8, rx: 1 },
    ],
  },
  stack: {
    viewBox: VB,
    rects: [
      { x: 4, y: 3, width: 16, height: 4, rx: 1 },
      { x: 4, y: 10, width: 16, height: 4, rx: 1 },
      { x: 4, y: 17, width: 16, height: 4, rx: 1 },
    ],
  },
  layout: gIconLayout,
  table: gIconTable,
  playbook: {
    viewBox: VB,
    rects: [
      { x: 3, y: 3, width: 7, height: 9, rx: 1 },
      { x: 14, y: 3, width: 7, height: 5, rx: 1 },
      { x: 14, y: 12, width: 7, height: 9, rx: 1 },
      { x: 3, y: 16, width: 7, height: 5, rx: 1 },
    ],
  },
};
