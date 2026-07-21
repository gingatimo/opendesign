import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home.page'), title: 'OpenDesign' },
  {
    path: 'nen-tang/mau-sac',
    loadComponent: () => import('./pages/foundations/colors.page'),
    title: 'Màu sắc — OpenDesign',
  },
  {
    path: 'nen-tang/typography',
    loadComponent: () => import('./pages/foundations/typography.page'),
    title: 'Typography — OpenDesign',
  },
  {
    path: 'nen-tang/radius-spacing',
    loadComponent: () => import('./pages/foundations/radius-spacing.page'),
    title: 'Radius & Spacing — OpenDesign',
  },
  {
    path: 'nen-tang/dark-mode',
    loadComponent: () => import('./pages/foundations/dark-mode.page'),
    title: 'Dark mode — OpenDesign',
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/button.page'),
    title: 'Button — OpenDesign',
  },
  {
    path: 'components/icon-button',
    loadComponent: () => import('./pages/icon-button.page'),
    title: 'Icon Button — OpenDesign',
  },
  {
    path: 'components/action-expand',
    loadComponent: () => import('./pages/action-expand.page'),
    title: 'Action Expand — OpenDesign',
  },
  {
    path: 'components/icon',
    loadComponent: () => import('./pages/icon.page'),
    title: 'Icon — OpenDesign',
  },
  {
    path: 'components/input',
    loadComponent: () => import('./pages/input.page'),
    title: 'Input — OpenDesign',
  },
  {
    path: 'components/textarea',
    loadComponent: () => import('./pages/textarea.page'),
    title: 'Textarea — OpenDesign',
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/checkbox.page'),
    title: 'Checkbox — OpenDesign',
  },
  {
    path: 'components/toggle',
    loadComponent: () => import('./pages/toggle.page'),
    title: 'Toggle — OpenDesign',
  },
  {
    path: 'components/radio',
    loadComponent: () => import('./pages/radio.page'),
    title: 'Radio — OpenDesign',
  },
  {
    path: 'components/select',
    loadComponent: () => import('./pages/select.page'),
    title: 'Select — OpenDesign',
  },
  {
    path: 'components/search-field',
    loadComponent: () => import('./pages/search-field.page'),
    title: 'Search Field — OpenDesign',
  },
  {
    path: 'components/file-input',
    loadComponent: () => import('./pages/file-input.page'),
    title: 'File Input — OpenDesign',
  },
  {
    path: 'components/badge',
    loadComponent: () => import('./pages/badge.page'),
    title: 'Badge — OpenDesign',
  },
  {
    path: 'components/alert',
    loadComponent: () => import('./pages/alert.page'),
    title: 'Alert — OpenDesign',
  },
  {
    path: 'components/spinner',
    loadComponent: () => import('./pages/spinner.page'),
    title: 'Spinner — OpenDesign',
  },
  {
    path: 'components/progress',
    loadComponent: () => import('./pages/progress.page'),
    title: 'Progress — OpenDesign',
  },
  {
    path: 'components/skeleton',
    loadComponent: () => import('./pages/skeleton.page'),
    title: 'Skeleton — OpenDesign',
  },
  {
    path: 'components/chip',
    loadComponent: () => import('./pages/chip.page'),
    title: 'Chip — OpenDesign',
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./pages/avatar.page'),
    title: 'Avatar — OpenDesign',
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/card.page'),
    title: 'Card — OpenDesign',
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./pages/dialog.page'),
    title: 'Dialog — OpenDesign',
  },
  {
    path: 'components/tooltip',
    loadComponent: () => import('./pages/tooltip.page'),
    title: 'Tooltip — OpenDesign',
  },
  {
    path: 'components/toast',
    loadComponent: () => import('./pages/toast.page'),
    title: 'Toast — OpenDesign',
  },
  {
    path: 'components/drawer',
    loadComponent: () => import('./pages/drawer.page'),
    title: 'Drawer — OpenDesign',
  },
  {
    path: 'components/tabs',
    loadComponent: () => import('./pages/tabs.page'),
    title: 'Tabs — OpenDesign',
  },
  {
    path: 'components/stepper',
    loadComponent: () => import('./pages/stepper.page'),
    title: 'Stepper — OpenDesign',
  },
  {
    path: 'components/topbar',
    loadComponent: () => import('./pages/topbar.page'),
    title: 'Topbar — OpenDesign',
  },
  {
    path: 'components/sidebar',
    loadComponent: () => import('./pages/sidebar.page'),
    title: 'Sidebar — OpenDesign',
  },
  {
    path: 'components/link',
    loadComponent: () => import('./pages/link.page'),
    title: 'Link — OpenDesign',
  },
  {
    path: 'components/pagination',
    loadComponent: () => import('./pages/pagination.page'),
    title: 'Pagination — OpenDesign',
  },
  {
    path: 'components/container',
    loadComponent: () => import('./pages/container.page'),
    title: 'Container — OpenDesign',
  },
  {
    path: 'components/stack',
    loadComponent: () => import('./pages/stack.page'),
    title: 'Stack — OpenDesign',
  },
  {
    path: 'components/layout',
    loadComponent: () => import('./pages/layout.page'),
    title: 'Layout — OpenDesign',
  },
  {
    path: 'components/table',
    loadComponent: () => import('./pages/table.page'),
    title: 'Table — OpenDesign',
  },
  {
    path: 'components/org-chart',
    loadComponent: () => import('./pages/org-chart.page'),
    title: 'Organization Chart — OpenDesign',
  },
  {
    path: 'components/reorder-list',
    loadComponent: () => import('./pages/reorder-list.page'),
    title: 'Reorder List — OpenDesign',
  },
  {
    path: 'components/splitter',
    loadComponent: () => import('./pages/splitter.page'),
    title: 'Splitter — OpenDesign',
  },
  {
    path: 'components/scroll-panel',
    loadComponent: () => import('./pages/scroll-panel.page'),
    title: 'Scroll Panel — OpenDesign',
  },
  {
    path: 'components/timeline',
    loadComponent: () => import('./pages/timeline.page'),
    title: 'Timeline — OpenDesign',
  },
  {
    path: 'components/accordion',
    loadComponent: () => import('./pages/accordion.page'),
    title: 'Accordion — OpenDesign',
  },
  {
    path: 'components/input-otp',
    loadComponent: () => import('./pages/input-otp.page'),
    title: 'Input OTP — OpenDesign',
  },
  {
    path: 'components/chips',
    loadComponent: () => import('./pages/chips.page'),
    title: 'Chips — OpenDesign',
  },
  {
    path: 'components/cascade-select',
    loadComponent: () => import('./pages/cascade-select.page'),
    title: 'Cascade Select — OpenDesign',
  },
  {
    path: 'components/tree-select',
    loadComponent: () => import('./pages/tree-select.page'),
    title: 'Tree Select — OpenDesign',
  },
  {
    path: 'components/dock-menu',
    loadComponent: () => import('./pages/dock-menu.page'),
    title: 'Dock Menu — OpenDesign',
  },
  {
    path: 'components/image-preview',
    loadComponent: () => import('./pages/image-preview.page'),
    title: 'Image Preview — OpenDesign',
  },
  {
    path: 'components/image-slider',
    loadComponent: () => import('./pages/image-slider.page'),
    title: 'Image Slider — OpenDesign',
  },
  {
    path: 'components/carousel',
    loadComponent: () => import('./pages/carousel.page'),
    title: 'Carousel — OpenDesign',
  },
  {
    path: 'components/coverflow',
    loadComponent: () => import('./pages/coverflow.page'),
    title: 'Coverflow — OpenDesign',
  },
  {
    path: 'components/gallery',
    loadComponent: () => import('./pages/gallery.page'),
    title: 'Gallery — OpenDesign',
  },
  {
    path: 'components/media-player',
    loadComponent: () => import('./pages/media-player.page'),
    title: 'Media Player — OpenDesign',
  },
  {
    path: 'components/terminal',
    loadComponent: () => import('./pages/terminal.page'),
    title: 'Terminal — OpenDesign',
  },
  {
    path: 'components/divider',
    loadComponent: () => import('./pages/divider.page'),
    title: 'Divider — OpenDesign',
  },
  {
    path: 'components/fab',
    loadComponent: () => import('./pages/fab.page'),
    title: 'Fab — OpenDesign',
  },
  {
    path: 'components/grid',
    loadComponent: () => import('./pages/grid.page'),
    title: 'Grid — OpenDesign',
  },
  {
    path: 'components/datepicker',
    loadComponent: () => import('./pages/datepicker.page'),
    title: 'Datepicker — OpenDesign',
  },
  {
    path: 'components/slider',
    loadComponent: () => import('./pages/slider.page'),
    title: 'Slider — OpenDesign',
  },
  {
    path: 'components/step-slider',
    loadComponent: () => import('./pages/step-slider.page'),
    title: 'Step Slider — OpenDesign',
  },
  {
    path: 'components/rating',
    loadComponent: () => import('./pages/rating.page'),
    title: 'Rating — OpenDesign',
  },
  {
    path: 'components/line-chart',
    loadComponent: () => import('./pages/line-chart.page'),
    title: 'Line Chart — OpenDesign',
  },
  {
    path: 'components/bar-chart',
    loadComponent: () => import('./pages/bar-chart.page'),
    title: 'Bar Chart — OpenDesign',
  },
  {
    path: 'components/pie-chart',
    loadComponent: () => import('./pages/pie-chart.page'),
    title: 'Pie Chart — OpenDesign',
  },
  {
    path: 'components/donut-chart',
    loadComponent: () => import('./pages/donut-chart.page'),
    title: 'Donut Chart — OpenDesign',
  },
  {
    path: 'components/code-editor',
    loadComponent: () => import('./pages/code-editor.page'),
    title: 'Code Editor — OpenDesign',
  },
  {
    path: 'components/rich-text-editor',
    loadComponent: () => import('./pages/rich-text-editor.page'),
    title: 'Rich Text Editor — OpenDesign',
  },
  {
    path: 'components/time-picker',
    loadComponent: () => import('./pages/time-picker.page'),
    title: 'Time Picker — OpenDesign',
  },
  {
    path: 'components/date-range-picker',
    loadComponent: () => import('./pages/date-range-picker.page'),
    title: 'Date Range Picker — OpenDesign',
  },
  {
    path: 'components/color-picker',
    loadComponent: () => import('./pages/color-picker.page'),
    title: 'Color Picker — OpenDesign',
  },
  {
    path: 'components/menu',
    loadComponent: () => import('./pages/menu.page'),
    title: 'Menu — OpenDesign',
  },
  {
    path: 'components/context-menu',
    loadComponent: () => import('./pages/context-menu.page'),
    title: 'Context Menu — OpenDesign',
  },
  {
    path: 'components/breadcrumb',
    loadComponent: () => import('./pages/breadcrumb.page'),
    title: 'Breadcrumb — OpenDesign',
  },
  // Playbook: mỗi view phổ biến một trang riêng. /playbook cũ redirect về trang đầu để link cũ không 404.
  { path: 'playbook', pathMatch: 'full', redirectTo: 'playbook/dang-nhap' },
  {
    path: 'playbook/dang-nhap',
    loadComponent: () => import('./pages/playbook/login.page'),
    title: 'Playbook · Đăng nhập — OpenDesign',
  },
  {
    path: 'playbook/dashboard',
    loadComponent: () => import('./pages/playbook/dashboard.page'),
    title: 'Playbook · Dashboard — OpenDesign',
  },
  {
    path: 'playbook/danh-sach',
    loadComponent: () => import('./pages/playbook/list.page'),
    title: 'Playbook · Danh sách — OpenDesign',
  },
  {
    path: 'playbook/chi-tiet',
    loadComponent: () => import('./pages/playbook/detail.page'),
    title: 'Playbook · Chi tiết — OpenDesign',
  },
  {
    path: 'playbook/them-moi',
    loadComponent: () => import('./pages/playbook/create.page'),
    title: 'Playbook · Thêm mới — OpenDesign',
  },
  {
    path: 'playbook/chatbot',
    loadComponent: () => import('./pages/playbook/chatbot.page'),
    title: 'Playbook · Chatbot — OpenDesign',
  },
  {
    path: 'playbook/workspace',
    loadComponent: () => import('./pages/playbook/split-workspace.page'),
    title: 'Playbook · Chat + Terminal — OpenDesign',
  },
];
