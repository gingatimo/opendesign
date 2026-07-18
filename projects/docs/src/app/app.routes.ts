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
    path: 'components/badge',
    loadComponent: () => import('./pages/badge.page'),
    title: 'Badge — OpenDesign',
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
    path: 'playbook',
    loadComponent: () => import('./pages/playbook.page'),
    title: 'Playbook — OpenDesign',
  },
];
