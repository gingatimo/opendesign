import { ApiRow } from '../shared/api-table';

interface ActionExpandCopy {
  title: string;
  intro: string;
  apiTitle: string;
  accessibilityTitle: string;
  accessibility: string[];
  apiRows: ApiRow[];
  demo: {
    defaultCaption: string;
    endCaption: string;
    label: string;
    picked: (label: string) => string;
    empty: string;
  };
}

interface ButtonGroupCopy {
  button: {
    title: string;
    intro: string;
    iconTitle: string;
    iconBody: string;
    iconNote: string;
    apiTitle: string;
    accessibilityTitle: string;
    accessibility: string[];
    apiRows: ApiRow[];
    demo: {
      save: string;
      draft: string;
      cancel: string;
      skip: string;
      delete: string;
      saving: string;
      small: string;
      large: string;
      disabled: string;
      create: string;
      download: string;
    };
  };
  iconButton: {
    title: string;
    introPrefix: string;
    iconSetLink: string;
    introSuffix: string;
    apiTitle: string;
    accessibilityTitle: string;
    accessibility: string[];
    apiRows: ApiRow[];
    demo: {
      add: string;
      search: string;
      close: string;
    };
  };
  fab: {
    title: string;
    intro: string;
    apiTitle: string;
    accessibilityTitle: string;
    accessibility: string[];
    apiRows: ApiRow[];
    demo: {
      intro: string;
      add: string;
      clicked: (count: number) => string;
    };
  };
  actionExpand: ActionExpandCopy;
}

const VI_BUTTONS: ButtonGroupCopy = {
  button: {
    title: 'Button',
    intro:
      'Nút pill cho hành động. Dùng attribute selector trên <button> hoặc <a> để giữ semantics native.',
    iconTitle: 'Icon kèm chữ',
    iconBody:
      '<g-button> chiếu nội dung nguyên vẹn (<ng-content />), là display: inline-flex kèm gap — đặt <g-icon> ngay cạnh chữ là canh giữa dọc và có khoảng cách đúng, không cần CSS thêm:',
    iconNote:
      'Icon ở đây là trang trí (chữ trong nút đã tự là accessible name) nên để <g-icon> ở chế độ mặc định, không cần aria-label.',
    apiTitle: 'API — GButton',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Dùng phần tử native nên hành vi bàn phím/focus là chuẩn trình duyệt.',
      'Trạng thái loading đặt aria-busy="true" và chặn tương tác.',
      'Vô hiệu hóa bằng attribute disabled native.',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
        default: "'primary'",
        description: 'Kiểu hiển thị của nút.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Cỡ nút (32/40/48px).',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Hiện spinner, chặn click, đặt aria-busy.',
      },
    ],
    demo: {
      save: 'Lưu thay đổi',
      draft: 'Nháp',
      cancel: 'Hủy',
      skip: 'Bỏ qua',
      delete: 'Xóa',
      saving: 'Đang lưu',
      small: 'Nhỏ',
      large: 'Lớn',
      disabled: 'Vô hiệu',
      create: 'Thêm mới',
      download: 'Tải xuống',
    },
  },
  iconButton: {
    title: 'Icon Button',
    introPrefix:
      'Nút tròn chỉ chứa icon, chiếu vào qua <ng-content> — dùng <g-icon> (như demo dưới) từ',
    iconSetLink: 'icon set có sẵn',
    introSuffix: 'của OpenDesign, hoặc SVG tự viết.',
    apiTitle: 'API — GIconButton',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Bắt buộc có aria-label hoặc aria-labelledby — thiếu sẽ có cảnh báo console ở dev mode.',
      'Icon SVG bên trong nên đặt aria-hidden="true".',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
        default: "'ghost'",
        description: 'Kiểu hiển thị của nút.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Cỡ nút (vuông, bo tròn 50%).',
      },
    ],
    demo: {
      add: 'Thêm mới',
      search: 'Tìm kiếm',
      close: 'Đóng',
    },
  },
  fab: {
    title: 'Fab',
    intro:
      'Nút hành động nổi (Floating Action Button) — một <button g-fab> cố định ở góc màn hình (position: fixed) cho hành động chính. Dạng tròn chỉ icon, hoặc extended dạng viên có icon kèm nhãn.',
    apiTitle: 'API — GFab',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Là <button> thật — hỗ trợ bàn phím và focus mặc định. Dạng tròn chỉ có icon bắt buộc phải cấp aria-label; dạng extended có nhãn văn bản nên tự đủ tên.',
      'Consumer tự gắn (click) cho hành động.',
    ],
    apiRows: [
      {
        name: 'position',
        type: `'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'`,
        default: `'bottom-right'`,
        description: 'Góc màn hình nút bám vào (cố định theo viewport).',
      },
      {
        name: 'extended',
        type: 'boolean',
        default: 'false',
        description: 'Dạng viên có nhãn (icon + text) thay vì tròn chỉ icon.',
      },
    ],
    demo: {
      intro:
        'Nút hành động nổi cố định ở góc phải-dưới màn hình (cuộn trang vẫn giữ nguyên vị trí).',
      add: 'Thêm mới',
      clicked: (count: number) => `Đã bấm: ${count} lần.`,
    },
  },
  actionExpand: {
    title: 'Action Expand',
    intro:
      'Nút hành động bung: cùng một hành động nhưng nhiều "type" (vd. Tải xuống → PDF/SVG/PNG). Lúc đầu thu gọn thành icon tròn; khi rê chuột / focus (bàn phím) hoặc chạm → bung, lộ các nút lựa chọn kiểu tab. align chỉnh hướng bung: phải (start, mặc định) hoặc trái (end, hợp khi đặt sát mép phải như góc chart). Phát (action) với item được chọn ({ label, value, icon? }).',
    apiTitle: 'API — GActionExpand',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Nút tròn (trigger) là điểm vào bàn phím: Tab tới nó → bung (aria-expanded) → Tab tiếp vào các nút lựa chọn. Khi thu gọn, các nút lựa chọn có tabindex="-1" nên không lọt vào tab order.',
      'Cả cụm là role="group" với aria-label.',
    ],
    apiRows: [
      {
        name: 'actions',
        type: 'GActionExpandItem[]',
        default: '[]',
        description: 'Các lựa chọn { label, value, icon? } hiện khi bung.',
      },
      {
        name: 'icon',
        type: 'GIconGlyph',
        default: 'gIconDownload',
        description: 'Icon lúc thu gọn (tròn).',
      },
      {
        name: 'label',
        type: 'string',
        default: "'Hành động'",
        description: 'Nhãn a11y cho cụm + trigger.',
      },
      {
        name: 'align',
        type: "'start' | 'end'",
        default: "'start'",
        description:
          "Hướng bung: 'start' (trigger trái, bung phải) hoặc 'end' (trigger phải, bung sang trái — hợp khi đặt sát mép phải như góc chart).",
      },
      {
        name: '(action)',
        type: 'GActionExpandItem',
        default: '—',
        description: 'Phát item được chọn.',
      },
    ],
    demo: {
      defaultCaption: 'Mặc định — bung sang phải',
      endCaption: 'align="end" — bung sang trái (đặt sát mép phải, vd. góc chart)',
      label: 'Tải xuống',
      picked: (label: string) => `Đã chọn tải: ${label}`,
      empty: 'Rê chuột hoặc Tab vào nút tròn để bung.',
    },
  },
};

const EN_BUTTONS: ButtonGroupCopy = {
  button: {
    title: 'Button',
    intro:
      'Pill buttons for actions. Use the attribute selector on <button> or <a> to keep native semantics.',
    iconTitle: 'Icon with text',
    iconBody:
      '<g-button> projects content as-is (<ng-content />), uses display: inline-flex with gap, and centers a <g-icon> beside text without extra CSS:',
    iconNote:
      'The icons here are decorative because the button text already provides the accessible name, so keep <g-icon> in its default mode without aria-label.',
    apiTitle: 'API — GButton',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Native elements provide standard keyboard and focus behavior.',
      'The loading state sets aria-busy="true" and blocks interaction.',
      'Disable the button with the native disabled attribute.',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
        default: "'primary'",
        description: 'Visual style of the button.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Button size (32/40/48px).',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Shows a spinner, blocks click, and sets aria-busy.',
      },
    ],
    demo: {
      save: 'Save changes',
      draft: 'Draft',
      cancel: 'Cancel',
      skip: 'Skip',
      delete: 'Delete',
      saving: 'Saving',
      small: 'Small',
      large: 'Large',
      disabled: 'Disabled',
      create: 'Create',
      download: 'Download',
    },
  },
  iconButton: {
    title: 'Icon Button',
    introPrefix:
      'Round icon-only button that projects content through <ng-content>. Use <g-icon> from the',
    iconSetLink: 'Built-in icon set',
    introSuffix: 'as shown below, or provide your own SVG.',
    apiTitle: 'API — GIconButton',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Required: aria-label or aria-labelledby. Missing names log a console warning in dev mode.',
      'Inner SVG icons should use aria-hidden="true".',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
        default: "'ghost'",
        description: 'Visual style of the button.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Button size (square, 50% rounded).',
      },
    ],
    demo: {
      add: 'Add new',
      search: 'Search',
      close: 'Close',
    },
  },
  fab: {
    title: 'Fab',
    intro:
      'Floating Action Button — a <button g-fab> fixed to a viewport corner (position: fixed) for the primary action. Use the round icon-only form or the extended pill form with icon and label.',
    apiTitle: 'API — GFab',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'It is a real <button>, so keyboard and focus behavior are native. The round icon-only form must provide aria-label; the extended form has visible text and therefore already has a name.',
      'Consumers attach (click) for the action.',
    ],
    apiRows: [
      {
        name: 'position',
        type: `'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'`,
        default: `'bottom-right'`,
        description: 'Viewport corner the button is fixed to.',
      },
      {
        name: 'extended',
        type: 'boolean',
        default: 'false',
        description: 'Pill form with label (icon + text) instead of round icon-only form.',
      },
    ],
    demo: {
      intro:
        'Floating action button fixed to the bottom-right of the viewport while the page scrolls.',
      add: 'Add new',
      clicked: (count: number) => `Clicked: ${count} times.`,
    },
  },
  actionExpand: {
    title: 'Action Expand',
    intro:
      'Expanding action button: one action with multiple types (for example Download → PDF/SVG/PNG). It starts as a round icon button; on hover/focus (keyboard) or touch, it expands to reveal tab-like action choices. align controls expansion direction: right (start, default) or left (end, useful near the right edge such as a chart corner). It emits (action) with the selected item ({ label, value, icon? }).',
    apiTitle: 'API — GActionExpand',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The round trigger is the keyboard entry point: Tab to it → it expands (aria-expanded) → Tab again into the action choices. When collapsed, choices use tabindex="-1" so they do not enter the tab order.',
      'The whole control is role="group" with aria-label.',
    ],
    apiRows: [
      {
        name: 'actions',
        type: 'GActionExpandItem[]',
        default: '[]',
        description: 'Choices { label, value, icon? } shown when expanded.',
      },
      {
        name: 'icon',
        type: 'GIconGlyph',
        default: 'gIconDownload',
        description: 'Icon shown in the collapsed round trigger.',
      },
      {
        name: 'label',
        type: 'string',
        default: "'Actions'",
        description: 'Accessible label for the group and trigger.',
      },
      {
        name: 'align',
        type: "'start' | 'end'",
        default: "'start'",
        description:
          "'start' expands right from a left trigger; 'end' expands left from a right trigger, useful near the right edge such as a chart corner.",
      },
      {
        name: '(action)',
        type: 'GActionExpandItem',
        default: '—',
        description: 'Emits the selected item.',
      },
    ],
    demo: {
      defaultCaption: 'Default — expands to the right',
      endCaption:
        'align="end" — expands to the left (near the right edge, for example a chart corner)',
      label: 'Download',
      picked: (label: string) => `Selected download: ${label}`,
      empty: 'Hover or Tab into the round button to expand.',
    },
  },
};

export function buttonCopyFor(tag: string): ButtonGroupCopy {
  return tag === 'vi-VN' ? VI_BUTTONS : EN_BUTTONS;
}
