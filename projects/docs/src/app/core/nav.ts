import { NavIcon } from './nav-icons';

export interface NavLink {
  path: string;
  label: string;
  icon: NavIcon;
  exact?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

/** Xếp link trong một nhóm theo alphabet. Gọi lúc khởi tạo nên thêm link mới luôn vào đúng chỗ. */
function sortByLabel(links: NavLink[], locale = 'vi'): NavLink[] {
  return [...links].sort((a, b) => a.label.localeCompare(b.label, locale));
}

// Nguồn DUY NHẤT của mục lục docs: sidebar và danh mục ở trang chủ cùng đọc từ đây. Trước đây trang
// chủ giữ danh sách riêng nên thêm component mới là hai chỗ lệch nhau ngay.
const NAV_GROUPS_VI: NavGroup[] = [
  {
    title: 'Bắt đầu',
    links: [{ path: '/', label: 'Trang chủ', icon: 'home', exact: true }],
  },
  {
    title: 'Nền tảng',
    links: sortByLabel([
      { path: '/nen-tang/mau-sac', label: 'Màu sắc', icon: 'mau-sac' },
      { path: '/nen-tang/typography', label: 'Typography', icon: 'typography' },
      { path: '/nen-tang/radius-spacing', label: 'Radius & spacing', icon: 'radius-spacing' },
      { path: '/nen-tang/dark-mode', label: 'Dark mode', icon: 'dark-mode' },
      { path: '/nen-tang/i18n', label: 'i18n', icon: 'i18n' },
    ]),
  },
  {
    title: 'Nút',
    links: sortByLabel([
      { path: '/components/button', label: 'Button', icon: 'button' },
      { path: '/components/icon-button', label: 'Icon Button', icon: 'icon-button' },
      { path: '/components/fab', label: 'Fab', icon: 'fab' },
      { path: '/components/action-expand', label: 'Action Expand', icon: 'action-expand' },
    ]),
  },
  {
    title: 'Form',
    links: sortByLabel([
      { path: '/components/input', label: 'Input', icon: 'input' },
      { path: '/components/textarea', label: 'Textarea', icon: 'textarea' },
      { path: '/components/checkbox', label: 'Checkbox', icon: 'checkbox' },
      { path: '/components/toggle', label: 'Toggle', icon: 'toggle' },
      { path: '/components/radio', label: 'Radio', icon: 'radio' },
      { path: '/components/select', label: 'Select', icon: 'select' },
      { path: '/components/search-field', label: 'Search Field', icon: 'search-field' },
      { path: '/components/file-input', label: 'File Input', icon: 'file-input' },
      { path: '/components/datepicker', label: 'Datepicker', icon: 'datepicker' },
      { path: '/components/slider', label: 'Slider', icon: 'slider' },
      { path: '/components/step-slider', label: 'Step Slider', icon: 'step-slider' },
      { path: '/components/rating', label: 'Rating', icon: 'rating' },
      { path: '/components/time-picker', label: 'Time Picker', icon: 'time-picker' },
      {
        path: '/components/date-range-picker',
        label: 'Date Range Picker',
        icon: 'date-range-picker',
      },
      { path: '/components/color-picker', label: 'Color Picker', icon: 'color-picker' },
      { path: '/components/input-otp', label: 'Input OTP', icon: 'input-otp' },
      { path: '/components/chips', label: 'Chips', icon: 'chips' },
      { path: '/components/cascade-select', label: 'Cascade Select', icon: 'cascade-select' },
      { path: '/components/tree-select', label: 'Tree Select', icon: 'tree-select' },
    ]),
  },
  {
    title: 'Hiển thị',
    links: sortByLabel([
      { path: '/components/alert', label: 'Alert', icon: 'alert' },
      { path: '/components/badge', label: 'Badge', icon: 'badge' },
      { path: '/components/spinner', label: 'Spinner', icon: 'spinner' },
      { path: '/components/progress', label: 'Progress', icon: 'progress' },
      { path: '/components/skeleton', label: 'Skeleton', icon: 'skeleton' },
      { path: '/components/timeline', label: 'Timeline', icon: 'timeline' },
      { path: '/components/chip', label: 'Chip', icon: 'chip' },
      { path: '/components/avatar', label: 'Avatar', icon: 'avatar' },
      { path: '/components/card', label: 'Card', icon: 'card' },
      { path: '/components/icon', label: 'Icon', icon: 'icon' },
      { path: '/components/image-preview', label: 'Image Preview', icon: 'image-preview' },
      { path: '/components/image-slider', label: 'Image Slider', icon: 'image-slider' },
      { path: '/components/carousel', label: 'Carousel', icon: 'carousel' },
      { path: '/components/coverflow', label: 'Coverflow', icon: 'coverflow' },
      { path: '/components/gallery', label: 'Gallery', icon: 'gallery' },
      { path: '/components/media-player', label: 'Media Player', icon: 'media-player' },
      { path: '/components/terminal', label: 'Terminal', icon: 'terminal' },
      { path: '/components/divider', label: 'Divider', icon: 'divider' },
    ]),
  },
  {
    title: 'Overlay',
    links: sortByLabel([
      { path: '/components/dialog', label: 'Dialog', icon: 'dialog' },
      { path: '/components/tooltip', label: 'Tooltip', icon: 'tooltip' },
      { path: '/components/toast', label: 'Toast', icon: 'toast' },
      { path: '/components/drawer', label: 'Drawer', icon: 'drawer' },
      { path: '/components/context-menu', label: 'Context Menu', icon: 'context-menu' },
    ]),
  },
  {
    title: 'Điều hướng',
    links: sortByLabel([
      { path: '/components/tabs', label: 'Tabs', icon: 'tabs' },
      { path: '/components/stepper', label: 'Stepper', icon: 'stepper' },
      { path: '/components/topbar', label: 'Topbar', icon: 'topbar' },
      { path: '/components/sidebar', label: 'Sidebar', icon: 'sidebar' },
      { path: '/components/link', label: 'Link', icon: 'link' },
      { path: '/components/menu', label: 'Menu', icon: 'menu' },
      { path: '/components/action-menu', label: 'Action Menu', icon: 'action-menu' },
      { path: '/components/breadcrumb', label: 'Breadcrumb', icon: 'breadcrumb' },
      { path: '/components/accordion', label: 'Accordion', icon: 'accordion' },
      { path: '/components/dock-menu', label: 'Dock Menu', icon: 'dock-menu' },
      { path: '/components/pagination', label: 'Pagination', icon: 'pagination' },
    ]),
  },
  {
    title: 'Cấu trúc',
    links: sortByLabel([
      { path: '/components/container', label: 'Container', icon: 'container' },
      { path: '/components/stack', label: 'Stack', icon: 'stack' },
      { path: '/components/grid', label: 'Grid', icon: 'grid' },
      { path: '/components/layout', label: 'Layout', icon: 'layout' },
      { path: '/components/splitter', label: 'Splitter', icon: 'splitter' },
      { path: '/components/scroll-panel', label: 'Scroll Panel', icon: 'scroll-panel' },
    ]),
  },
  {
    title: 'Dữ liệu',
    links: sortByLabel([
      { path: '/components/table', label: 'Table', icon: 'table' },
      { path: '/components/org-chart', label: 'Organization Chart', icon: 'org-chart' },
      { path: '/components/reorder-list', label: 'Reorder List', icon: 'reorder-list' },
    ]),
  },
  {
    title: 'Charts',
    links: sortByLabel([
      { path: '/components/line-chart', label: 'Line Chart', icon: 'line-chart' },
      { path: '/components/bar-chart', label: 'Bar Chart', icon: 'bar-chart' },
      { path: '/components/pie-chart', label: 'Pie Chart', icon: 'pie-chart' },
      { path: '/components/donut-chart', label: 'Donut Chart', icon: 'donut-chart' },
      { path: '/components/polar-chart', label: 'Polar Chart', icon: 'polar-chart' },
      { path: '/components/radar-chart', label: 'Radar Chart', icon: 'radar-chart' },
      { path: '/components/stacked-bar', label: 'Stacked Bar', icon: 'stacked-bar' },
      { path: '/components/heatmap-chart', label: 'Heatmap', icon: 'heatmap-chart' },
      {
        path: '/components/honeycomb-chart',
        label: 'Honeycomb Chart',
        icon: 'honeycomb-chart',
      },
      {
        path: '/components/calendar-heatmap',
        label: 'Calendar Heatmap',
        icon: 'calendar-heatmap',
      },
    ]),
  },
  {
    title: 'Editor',
    links: sortByLabel([
      { path: '/components/code-editor', label: 'Code Editor', icon: 'code-editor' },
      {
        path: '/components/rich-text-editor',
        label: 'Rich Text Editor',
        icon: 'rich-text-editor',
      },
    ]),
  },
  // Nhóm riêng, đặt cuối: đây là phần "ráp lại" sau khi đã học từng component riêng lẻ ở các
  // nhóm trên — không thuộc phân loại theo LOẠI component nào ở trên nên không gộp vào "Bắt đầu".
  {
    title: 'Playbook',
    // Giữ THỨ TỰ luồng CRUD (đăng nhập → dashboard → danh sách → chi tiết → thêm mới), KHÔNG
    // sortByLabel như các nhóm component — đọc theo hành trình dùng app tự nhiên hơn alphabet.
    links: [
      { path: '/playbook/dang-nhap', label: 'Đăng nhập', icon: 'pb-login' },
      { path: '/playbook/dashboard', label: 'Dashboard', icon: 'pb-dashboard' },
      { path: '/playbook/danh-sach', label: 'Danh sách', icon: 'pb-list' },
      { path: '/playbook/chi-tiet', label: 'Chi tiết', icon: 'pb-detail' },
      { path: '/playbook/them-moi', label: 'Thêm mới', icon: 'pb-create' },
      { path: '/playbook/chatbot', label: 'Chatbot', icon: 'pb-chatbot' },
      { path: '/playbook/workspace', label: 'Chat + Terminal', icon: 'pb-split' },
    ],
  },
];

const NAV_GROUPS_EN: NavGroup[] = [
  {
    title: 'Start',
    links: [{ path: '/', label: 'Home', icon: 'home', exact: true }],
  },
  {
    title: 'Foundations',
    links: sortByLabel(
      [
        { path: '/nen-tang/mau-sac', label: 'Colors', icon: 'mau-sac' },
        { path: '/nen-tang/typography', label: 'Typography', icon: 'typography' },
        { path: '/nen-tang/radius-spacing', label: 'Radius & spacing', icon: 'radius-spacing' },
        { path: '/nen-tang/dark-mode', label: 'Dark mode', icon: 'dark-mode' },
        { path: '/nen-tang/i18n', label: 'i18n', icon: 'i18n' },
      ],
      'en',
    ),
  },
  {
    title: 'Buttons',
    links: sortByLabel(
      [
        { path: '/components/button', label: 'Button', icon: 'button' },
        { path: '/components/icon-button', label: 'Icon Button', icon: 'icon-button' },
        { path: '/components/fab', label: 'Fab', icon: 'fab' },
        { path: '/components/action-expand', label: 'Action Expand', icon: 'action-expand' },
      ],
      'en',
    ),
  },
  {
    title: 'Forms',
    links: sortByLabel(
      [
        { path: '/components/input', label: 'Input', icon: 'input' },
        { path: '/components/textarea', label: 'Textarea', icon: 'textarea' },
        { path: '/components/checkbox', label: 'Checkbox', icon: 'checkbox' },
        { path: '/components/toggle', label: 'Toggle', icon: 'toggle' },
        { path: '/components/radio', label: 'Radio', icon: 'radio' },
        { path: '/components/select', label: 'Select', icon: 'select' },
        { path: '/components/search-field', label: 'Search Field', icon: 'search-field' },
        { path: '/components/file-input', label: 'File Input', icon: 'file-input' },
        { path: '/components/datepicker', label: 'Datepicker', icon: 'datepicker' },
        { path: '/components/slider', label: 'Slider', icon: 'slider' },
        { path: '/components/step-slider', label: 'Step Slider', icon: 'step-slider' },
        { path: '/components/rating', label: 'Rating', icon: 'rating' },
        { path: '/components/time-picker', label: 'Time Picker', icon: 'time-picker' },
        {
          path: '/components/date-range-picker',
          label: 'Date Range Picker',
          icon: 'date-range-picker',
        },
        { path: '/components/color-picker', label: 'Color Picker', icon: 'color-picker' },
        { path: '/components/input-otp', label: 'Input OTP', icon: 'input-otp' },
        { path: '/components/chips', label: 'Chips', icon: 'chips' },
        { path: '/components/cascade-select', label: 'Cascade Select', icon: 'cascade-select' },
        { path: '/components/tree-select', label: 'Tree Select', icon: 'tree-select' },
      ],
      'en',
    ),
  },
  {
    title: 'Display',
    links: sortByLabel(
      [
        { path: '/components/alert', label: 'Alert', icon: 'alert' },
        { path: '/components/badge', label: 'Badge', icon: 'badge' },
        { path: '/components/spinner', label: 'Spinner', icon: 'spinner' },
        { path: '/components/progress', label: 'Progress', icon: 'progress' },
        { path: '/components/skeleton', label: 'Skeleton', icon: 'skeleton' },
        { path: '/components/timeline', label: 'Timeline', icon: 'timeline' },
        { path: '/components/chip', label: 'Chip', icon: 'chip' },
        { path: '/components/avatar', label: 'Avatar', icon: 'avatar' },
        { path: '/components/card', label: 'Card', icon: 'card' },
        { path: '/components/icon', label: 'Icon', icon: 'icon' },
        { path: '/components/image-preview', label: 'Image Preview', icon: 'image-preview' },
        { path: '/components/image-slider', label: 'Image Slider', icon: 'image-slider' },
        { path: '/components/carousel', label: 'Carousel', icon: 'carousel' },
        { path: '/components/coverflow', label: 'Coverflow', icon: 'coverflow' },
        { path: '/components/gallery', label: 'Gallery', icon: 'gallery' },
        { path: '/components/media-player', label: 'Media Player', icon: 'media-player' },
        { path: '/components/terminal', label: 'Terminal', icon: 'terminal' },
        { path: '/components/divider', label: 'Divider', icon: 'divider' },
      ],
      'en',
    ),
  },
  {
    title: 'Overlay',
    links: sortByLabel(
      [
        { path: '/components/dialog', label: 'Dialog', icon: 'dialog' },
        { path: '/components/tooltip', label: 'Tooltip', icon: 'tooltip' },
        { path: '/components/toast', label: 'Toast', icon: 'toast' },
        { path: '/components/drawer', label: 'Drawer', icon: 'drawer' },
        { path: '/components/context-menu', label: 'Context Menu', icon: 'context-menu' },
      ],
      'en',
    ),
  },
  {
    title: 'Navigation',
    links: sortByLabel(
      [
        { path: '/components/tabs', label: 'Tabs', icon: 'tabs' },
        { path: '/components/stepper', label: 'Stepper', icon: 'stepper' },
        { path: '/components/topbar', label: 'Topbar', icon: 'topbar' },
        { path: '/components/sidebar', label: 'Sidebar', icon: 'sidebar' },
        { path: '/components/link', label: 'Link', icon: 'link' },
        { path: '/components/menu', label: 'Menu', icon: 'menu' },
        { path: '/components/action-menu', label: 'Action Menu', icon: 'action-menu' },
        { path: '/components/breadcrumb', label: 'Breadcrumb', icon: 'breadcrumb' },
        { path: '/components/accordion', label: 'Accordion', icon: 'accordion' },
        { path: '/components/dock-menu', label: 'Dock Menu', icon: 'dock-menu' },
        { path: '/components/pagination', label: 'Pagination', icon: 'pagination' },
      ],
      'en',
    ),
  },
  {
    title: 'Layout',
    links: sortByLabel(
      [
        { path: '/components/container', label: 'Container', icon: 'container' },
        { path: '/components/stack', label: 'Stack', icon: 'stack' },
        { path: '/components/grid', label: 'Grid', icon: 'grid' },
        { path: '/components/layout', label: 'Layout', icon: 'layout' },
        { path: '/components/splitter', label: 'Splitter', icon: 'splitter' },
        { path: '/components/scroll-panel', label: 'Scroll Panel', icon: 'scroll-panel' },
      ],
      'en',
    ),
  },
  {
    title: 'Data',
    links: sortByLabel(
      [
        { path: '/components/table', label: 'Table', icon: 'table' },
        { path: '/components/org-chart', label: 'Organization Chart', icon: 'org-chart' },
        { path: '/components/reorder-list', label: 'Reorder List', icon: 'reorder-list' },
      ],
      'en',
    ),
  },
  {
    title: 'Charts',
    links: sortByLabel(
      [
        { path: '/components/line-chart', label: 'Line Chart', icon: 'line-chart' },
        { path: '/components/bar-chart', label: 'Bar Chart', icon: 'bar-chart' },
        { path: '/components/pie-chart', label: 'Pie Chart', icon: 'pie-chart' },
        { path: '/components/donut-chart', label: 'Donut Chart', icon: 'donut-chart' },
        { path: '/components/polar-chart', label: 'Polar Chart', icon: 'polar-chart' },
        { path: '/components/radar-chart', label: 'Radar Chart', icon: 'radar-chart' },
        { path: '/components/stacked-bar', label: 'Stacked Bar', icon: 'stacked-bar' },
        { path: '/components/heatmap-chart', label: 'Heatmap', icon: 'heatmap-chart' },
        {
          path: '/components/honeycomb-chart',
          label: 'Honeycomb Chart',
          icon: 'honeycomb-chart',
        },
        {
          path: '/components/calendar-heatmap',
          label: 'Calendar Heatmap',
          icon: 'calendar-heatmap',
        },
      ],
      'en',
    ),
  },
  {
    title: 'Editors',
    links: sortByLabel(
      [
        { path: '/components/code-editor', label: 'Code Editor', icon: 'code-editor' },
        {
          path: '/components/rich-text-editor',
          label: 'Rich Text Editor',
          icon: 'rich-text-editor',
        },
      ],
      'en',
    ),
  },
  {
    title: 'Playbook',
    links: [
      { path: '/playbook/dang-nhap', label: 'Login', icon: 'pb-login' },
      { path: '/playbook/dashboard', label: 'Dashboard', icon: 'pb-dashboard' },
      { path: '/playbook/danh-sach', label: 'List', icon: 'pb-list' },
      { path: '/playbook/chi-tiet', label: 'Detail', icon: 'pb-detail' },
      { path: '/playbook/them-moi', label: 'Create', icon: 'pb-create' },
      { path: '/playbook/chatbot', label: 'Chatbot', icon: 'pb-chatbot' },
      { path: '/playbook/workspace', label: 'Chat + Terminal', icon: 'pb-split' },
    ],
  },
];

export function navGroupsFor(tag: string): NavGroup[] {
  return tag === 'vi-VN' ? NAV_GROUPS_VI : NAV_GROUPS_EN;
}

export const NAV_GROUPS = NAV_GROUPS_VI;
