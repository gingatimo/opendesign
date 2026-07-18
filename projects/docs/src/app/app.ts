import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  GIconButton,
  GSidebar,
  GSidebarHeader,
  GSidebarItem,
  GSidebarItemIcon,
  GSidebarItemLabel,
  GSidebarToggle,
} from 'ngx-opendesign';
import { ThemeService } from './core/theme.service';

// Task 9 (spec 2c mục 3): icon RIÊNG cho từng LINK, không còn dùng chung icon của cả nhóm — thu
// gọn sidebar mới phân biệt được item nào với item nào (trước đó @switch (group.icon) khiến 4
// item "Nền tảng" hiện cùng một icon con mắt, 6 item "Form" hiện cùng một icon gạch ngang).
type NavIcon =
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
  | 'badge'
  | 'spinner'
  | 'progress'
  | 'chip'
  | 'avatar'
  | 'card'
  | 'icon'
  | 'dialog'
  | 'tooltip'
  | 'toast'
  | 'tabs'
  | 'stepper'
  | 'topbar'
  | 'sidebar'
  | 'link'
  | 'container'
  | 'stack'
  | 'layout'
  | 'table'
  | 'playbook';

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
      ]),
    },
    {
      title: 'Hiển thị',
      links: sortByLabel([
        { path: '/components/badge', label: 'Badge', icon: 'badge' },
        { path: '/components/spinner', label: 'Spinner', icon: 'spinner' },
        { path: '/components/progress', label: 'Progress', icon: 'progress' },
        { path: '/components/chip', label: 'Chip', icon: 'chip' },
        { path: '/components/avatar', label: 'Avatar', icon: 'avatar' },
        { path: '/components/card', label: 'Card', icon: 'card' },
        { path: '/components/icon', label: 'Icon', icon: 'icon' },
      ]),
    },
    {
      title: 'Overlay',
      links: sortByLabel([
        { path: '/components/dialog', label: 'Dialog', icon: 'dialog' },
        { path: '/components/tooltip', label: 'Tooltip', icon: 'tooltip' },
        { path: '/components/toast', label: 'Toast', icon: 'toast' },
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
      ]),
    },
    {
      title: 'Cấu trúc',
      links: sortByLabel([
        { path: '/components/container', label: 'Container', icon: 'container' },
        { path: '/components/stack', label: 'Stack', icon: 'stack' },
        { path: '/components/layout', label: 'Layout', icon: 'layout' },
      ]),
    },
    {
      title: 'Dữ liệu',
      links: sortByLabel([{ path: '/components/table', label: 'Table', icon: 'table' }]),
    },
    // Nhóm riêng, đặt cuối: đây là phần "ráp lại" sau khi đã học từng component riêng lẻ ở các
    // nhóm trên — không thuộc phân loại theo LOẠI component nào ở trên nên không gộp vào "Bắt đầu".
    {
      title: 'Playbook',
      links: [{ path: '/playbook', label: 'Playbook', icon: 'playbook' }],
    },
  ];
}
