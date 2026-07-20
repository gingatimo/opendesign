import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  GIcon,
  GIconButton,
  GIconGlyph,
  gIconMoon,
  gIconSun,
  GSidebar,
  GSidebarHeader,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GSidebarToggle,
} from 'ngx-opendesign';
import { ThemeService } from './core/theme.service';
import { NAV_ICON_GLYPHS, NavIcon } from './core/nav-icons';

interface NavLink {
  path: string;
  label: string;
  icon: NavIcon;
  exact?: boolean;
}

interface NavGroup {
  title: string;
  links: NavLink[];
}

/** Xếp link trong một nhóm theo alphabet. Gọi lúc khởi tạo nên thêm link mới luôn vào đúng chỗ. */
function sortByLabel(links: NavLink[]): NavLink[] {
  return [...links].sort((a, b) => a.label.localeCompare(b.label, 'vi'));
}

@Component({
  selector: 'docs-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    GIcon,
    GIconButton,
    GSidebar,
    GSidebarHeader,
    GSidebarItem,
    GSidebarItemIcon,
    GSidebarItemLabel,
    GSidebarToggle,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly iconMoon = gIconMoon;
  protected readonly iconSun = gIconSun;

  /** Glyph docs-local cho icon nav (xem core/nav-icons.ts) — dùng với <g-icon>. */
  protected navGlyph(icon: NavIcon): GIconGlyph {
    return NAV_ICON_GLYPHS[icon];
  }

  protected readonly navGroups: NavGroup[] = [
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
      ]),
    },
    {
      title: 'Nút',
      links: sortByLabel([
        { path: '/components/button', label: 'Button', icon: 'button' },
        { path: '/components/icon-button', label: 'Icon Button', icon: 'icon-button' },
        { path: '/components/fab', label: 'Fab', icon: 'fab' },
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
      ],
    },
  ];
}
