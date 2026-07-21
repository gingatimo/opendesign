import { GLocale } from '../core/locale-types';

export const gLocaleEn: GLocale = {
  tag: 'en-US',
  firstDayOfWeek: 0,
  strings: {
    common: {
      close: 'Close',
      cancel: 'Cancel',
      apply: 'Apply',
      remove: 'Remove',
      previous: 'Previous',
      next: 'Next',
      search: 'Search',
      loading: 'Loading',
    },
    alert: {
      neutral: 'Note',
      success: 'Success',
      warning: 'Warning',
      danger: 'Error',
      close: 'Dismiss',
    },
    chips: { add: 'Add item', remove: (label: string) => `Remove ${label}` },
    progress: { label: 'Progress' },
    sidebar: { expand: 'Expand sidebar', collapse: 'Collapse sidebar' },
    orgChart: { toggleBranch: 'Collapse or expand branch' },
    reorderList: { dragHandle: 'Drag to reorder' },
  },
};
