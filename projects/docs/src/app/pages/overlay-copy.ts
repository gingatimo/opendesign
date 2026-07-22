import { GDrawerSide, GToastPosition } from 'ngx-opendesign';
import { ApiRow } from '../shared/api-table';

interface OverlayPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  accessibilityTitle: string;
  accessibility: string[];
  apiRows: ApiRow[];
}

interface DialogCopy extends OverlayPageCopy {
  demo: {
    trigger: string;
    title: string;
    message: string;
    cancel: string;
    delete: string;
    result: string;
    deleted: string;
    canceled: string;
  };
}

interface TooltipCopy extends OverlayPageCopy {
  demo: {
    save: string;
    saveTip: string;
    bottom: string;
    bottomTip: string;
    settings: string;
    settingsTip: string;
    topLeft: string;
    topLeftTip: string;
    topRight: string;
    topRightTip: string;
    bottomLeft: string;
    bottomLeftTip: string;
    bottomRight: string;
    bottomRightTip: string;
  };
}

interface ToastCopy extends OverlayPageCopy {
  positionTitle: string;
  positionIntro: string;
  demo: {
    normalButton: string;
    normalMessage: string;
    successButton: string;
    successMessage: string;
    dangerButton: string;
    dangerMessage: string;
    titledButton: string;
    persistentButton: string;
    title: string;
    titledMessage: string;
    persistentMessage: string;
    positionLabels: Record<GToastPosition, string>;
    positionTrigger: string;
    positionedMessage: (label: string) => string;
  };
}

interface DrawerCopy extends OverlayPageCopy {
  placementTitle: string;
  placementIntro: string;
  demo: {
    left: string;
    right: string;
    bottom: string;
    top: string;
    ariaLabel: string;
    headings: Record<GDrawerSide, string>;
    body: string;
    close: string;
  };
}

interface ContextMenuCopy extends OverlayPageCopy {
  demo: {
    target: string;
    lastAction: string;
    none: string;
    edit: string;
    copy: string;
    rename: string;
    delete: string;
  };
}

interface OverlayCopy {
  dialog: DialogCopy;
  tooltip: TooltipCopy;
  toast: ToastCopy;
  drawer: DrawerCopy;
  contextMenu: ContextMenuCopy;
}

const VI_OVERLAY: OverlayCopy = {
  dialog: {
    title: 'Dialog',
    intro:
      'Hộp thoại modal, dựng trên @angular/cdk/dialog. Mở bằng GDialogService.open(), nhận kết quả khi đóng qua GDialogRef.',
    apiTitle: 'API — GDialogService',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Panel có role="dialog" và aria-modal="true".',
      'Focus chuyển vào trong dialog khi mở, và trở lại phần tử trigger khi đóng.',
      'Phím Esc đóng dialog, trừ khi disableClose: true.',
      'Bắt buộc truyền ariaLabel hoặc ariaLabelledBy để dialog có tên cho screen reader.',
    ],
    apiRows: [
      {
        name: 'GDialogService.open(component, config)',
        type: '(component: ComponentType<T>, config?: GDialogConfig<D>) => GDialogRef<R>',
        default: '—',
        description: 'Mở dialog với component đã cho, trả về GDialogRef để theo dõi kết quả.',
      },
      {
        name: 'GDialogService.closeAll()',
        type: '() => void',
        default: '—',
        description: 'Đóng toàn bộ dialog đang mở.',
      },
      {
        name: 'GDialogConfig.data',
        type: 'D',
        default: '—',
        description: 'Data truyền vào component bên trong dialog, inject bằng G_DIALOG_DATA.',
      },
      {
        name: 'GDialogConfig.width',
        type: 'string',
        default: '—',
        description: "Chiều rộng panel, ví dụ '480px'.",
      },
      {
        name: 'GDialogConfig.disableClose',
        type: 'boolean',
        default: 'false',
        description: 'true = Esc và click backdrop không đóng dialog.',
      },
      {
        name: 'GDialogConfig.ariaLabel',
        type: 'string',
        default: '—',
        description: 'Tên dialog cho screen reader. Bắt buộc có ariaLabel hoặc ariaLabelledBy.',
      },
      {
        name: 'GDialogConfig.ariaLabelledBy',
        type: 'string',
        default: '—',
        description:
          'id của phần tử làm tiêu đề dialog. Bắt buộc có ariaLabel hoặc ariaLabelledBy.',
      },
      {
        name: 'GDialogRef.close(result?)',
        type: '(result?: R) => void',
        default: '—',
        description: 'Đóng dialog, phát result qua afterClosed().',
      },
      {
        name: 'GDialogRef.afterClosed()',
        type: '() => Observable<R | undefined>',
        default: '—',
        description: 'Observable phát giá trị khi dialog đóng.',
      },
      {
        name: 'G_DIALOG_DATA',
        type: 'InjectionToken<unknown>',
        default: '—',
        description: 'Token để component bên trong dialog inject data.',
      },
    ],
    demo: {
      trigger: 'Xóa tài liệu',
      title: 'Xóa tài liệu?',
      message: 'Hành động này không thể hoàn tác.',
      cancel: 'Hủy',
      delete: 'Xóa',
      result: 'Kết quả:',
      deleted: 'đã xóa',
      canceled: 'đã hủy',
    },
  },
  tooltip: {
    title: 'Tooltip',
    intro:
      'Directive [gTooltip] gắn một chú thích ngắn lên phần tử trigger, dựng trên @angular/cdk/overlay.',
    apiTitle: 'API — GTooltip',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Panel tooltip có role="tooltip".',
      'Khi hiện, trigger có aria-describedby trỏ đúng tới id của panel và được gỡ khi tooltip ẩn.',
      'Mở được bằng cả hover lẫn focus, nên người dùng bàn phím vẫn thấy được tooltip.',
      'Dismissible — phím Esc luôn đóng được tooltip bất kể focus đang ở đâu.',
      'Hoverable — con trỏ có thể di chuyển từ trigger vào tooltip mà tooltip không biến mất.',
      'Persistent — tooltip chỉ ẩn khi cả hover và focus đều không còn.',
      'Nội dung tooltip là chuỗi text thuần; nếu cần link hoặc nút bên trong, đó là popover chứ không phải tooltip.',
      'Vị trí thực tế do CDK Overlay tính toán lúc chạy trong trình duyệt thật.',
    ],
    apiRows: [
      {
        name: 'gTooltip',
        type: 'string',
        default: "''",
        description: 'Nội dung tooltip. Rỗng nghĩa là không hiện gì.',
      },
      {
        name: 'gTooltipPosition',
        type: "'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
        default: "'top'",
        description: 'Hướng ưu tiên; CDK tự chuyển sang hướng khác nếu không đủ chỗ.',
      },
    ],
    demo: {
      save: 'Lưu',
      saveTip: 'Lưu tài liệu hiện tại',
      bottom: 'Dưới',
      bottomTip: 'Ở phía dưới',
      settings: 'Cài đặt',
      settingsTip: 'Mở cài đặt',
      topLeft: 'Trên-trái',
      topLeftTip: 'Góc trên trái',
      topRight: 'Trên-phải',
      topRightTip: 'Góc trên phải',
      bottomLeft: 'Dưới-trái',
      bottomLeftTip: 'Góc dưới trái',
      bottomRight: 'Dưới-phải',
      bottomRightTip: 'Góc dưới phải',
    },
  },
  toast: {
    title: 'Toast',
    intro:
      'Thông báo ngắn, xếp chồng ở góc màn hình, tự đóng sau một khoảng thời gian. Mở bằng GToastService.show().',
    positionTitle: 'Vị trí',
    positionIntro:
      'Toast mặc định hiện ở góc trên-phải (top-right). Đổi vị trí bằng GToastService.setPosition(); áp dụng cho những lần show() kế tiếp và cập nhật ngay nếu đang có toast mở.',
    apiTitle: 'API — GToastService',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Nội dung được đọc qua LiveAnnouncer của CDK ngay khi toast xuất hiện.',
      'Live region của LiveAnnouncer tồn tại trước khi nội dung được chèn, giúp screen reader đọc ổn định.',
      'variant="danger" dùng politeness assertive; các variant còn lại dùng polite.',
      'Panel toast không tự đặt aria-live hay role="alert" để tránh screen reader đọc hai lần.',
      'Nút đóng là <button> native, có aria-label="Đóng".',
      'Với nội dung quan trọng, nên dùng duration: 0 để người dùng có đủ thời gian đọc.',
    ],
    apiRows: [
      {
        name: 'GToastService.show(config)',
        type: '(config: GToastConfig) => string',
        default: '—',
        description: 'Hiện một toast mới, trả về id của toast đó để dùng với dismiss(id).',
      },
      {
        name: 'GToastService.dismiss(id)',
        type: '(id: string) => void',
        default: '—',
        description: 'Đóng một toast theo id.',
      },
      {
        name: 'GToastService.dismissAll()',
        type: '() => void',
        default: '—',
        description: 'Đóng toàn bộ toast đang mở.',
      },
      {
        name: 'GToastService.setPosition(position)',
        type: '(position: GToastPosition) => void',
        default: '—',
        description: 'Đổi góc màn hình hiện toast.',
      },
      {
        name: 'GToastPosition',
        type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
        default: "'top-right'",
        description: 'Góc màn hình hiện toast.',
      },
      {
        name: 'GToastConfig.message',
        type: 'string',
        default: '—',
        description: 'Nội dung thông báo.',
      },
      {
        name: 'GToastConfig.title',
        type: 'string',
        default: '—',
        description: 'Tiêu đề tùy chọn, hiển thị đậm phía trên message.',
      },
      {
        name: 'GToastConfig.variant',
        type: "'neutral' | 'success' | 'warning' | 'danger'",
        default: "'neutral'",
        description: 'Kiểu hiển thị; danger dùng politeness assertive khi đọc.',
      },
      {
        name: 'GToastConfig.duration',
        type: 'number',
        default: '4000',
        description: 'Thời gian (ms) trước khi tự đóng. 0 = không tự đóng.',
      },
    ],
    demo: {
      normalButton: 'Thông báo thường',
      normalMessage: 'Đã lưu thay đổi',
      successButton: 'Thành công',
      successMessage: 'Tải lên thành công',
      dangerButton: 'Lỗi',
      dangerMessage: 'Lưu thất bại, thử lại sau',
      titledButton: 'Có tiêu đề',
      persistentButton: 'Không tự đóng',
      title: 'Đã lưu đơn hàng',
      titledMessage: 'Đơn #1234 đã được lưu và gửi email xác nhận.',
      persistentMessage: 'Thông báo này ở lại tới khi bạn đóng.',
      positionLabels: {
        'top-left': 'Trên trái',
        'top-center': 'Trên giữa',
        'top-right': 'Trên phải (mặc định)',
        'bottom-left': 'Dưới trái',
        'bottom-center': 'Dưới giữa',
        'bottom-right': 'Dưới phải',
      },
      positionTrigger: 'Bắn toast ở vị trí đã chọn',
      positionedMessage: (label: string) => `Toast ở vị trí "${label}"`,
    },
  },
  drawer: {
    title: 'Drawer',
    intro:
      'Panel trượt từ mép màn hình kèm nền mờ, gộp bottom sheet và side panel vào một component. Chọn mép bằng side; mở/đóng hai chiều qua [(open)].',
    placementTitle: 'Lưu ý khi đặt',
    placementIntro:
      'Panel dùng position: fixed neo theo viewport. Đặt <g-drawer> ở nhánh DOM không có tổ tiên bị transform/filter để mép neo không lệch.',
    apiTitle: 'API — GDrawer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Panel là role="dialog" aria-modal="true"; cấp tên qua ariaLabel.',
      'Focus bị giữ trong panel khi mở; đóng thì trả focus về nơi vừa rời.',
      'Esc và bấm nền đóng drawer, trừ khi disableClose. Panel inert khi đóng và scroll body bị khóa khi mở.',
      'prefers-reduced-motion: tắt hiệu ứng trượt.',
    ],
    apiRows: [
      {
        name: 'open',
        type: 'boolean (model)',
        default: 'false',
        description: 'Trạng thái mở, two-way binding qua [(open)].',
      },
      {
        name: 'side',
        type: `'bottom' | 'left' | 'right' | 'top'`,
        default: `'right'`,
        description: 'Mép neo. bottom = bottom sheet, left/right = side panel, top = sheet trên.',
      },
      {
        name: 'size',
        type: 'string',
        default: '—',
        description: 'Chiều rộng (left/right) hoặc chiều cao (bottom/top), ví dụ "360px", "45vh".',
      },
      {
        name: 'disableClose',
        type: 'boolean',
        default: 'false',
        description: 'Chặn đóng bằng Esc và bấm nền.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Tên của panel dialog cho screen reader.',
      },
    ],
    demo: {
      left: 'Trái',
      right: 'Phải',
      bottom: 'Bottom sheet',
      top: 'Trên',
      ariaLabel: 'Ngăn kéo minh họa',
      headings: {
        left: 'Side panel — trái',
        right: 'Side panel — phải',
        bottom: 'Bottom sheet',
        top: 'Sheet — trên',
      },
      body: 'Nội dung ngăn kéo. Đóng bằng phím Esc, bấm ra vùng nền, hoặc nút dưới đây.',
      close: 'Đóng',
    },
  },
  contextMenu: {
    title: 'Context Menu',
    intro:
      'Menu ngữ cảnh (chuột phải): gắn directive [gContextMenu]="tpl" lên phần tử. Chuột phải mở menu ngay tại vị trí con trỏ bằng CDK Overlay và tự lật hướng nếu thiếu chỗ.',
    apiTitle: 'API — gContextMenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [],
    apiRows: [
      {
        name: 'gContextMenu',
        type: 'TemplateRef',
        default: '(bắt buộc)',
        description:
          'Template nội dung menu; thường là các <button g-menu-item>. Mở tại vị trí chuột phải.',
      },
    ],
    demo: {
      target: 'Chuột phải vào vùng này',
      lastAction: 'Hành động gần nhất:',
      none: '(chưa có)',
      edit: 'Sửa',
      copy: 'Sao chép',
      rename: 'Đổi tên',
      delete: 'Xóa',
    },
  },
};

const EN_OVERLAY: OverlayCopy = {
  dialog: {
    title: 'Dialog',
    intro:
      'Modal dialog built on @angular/cdk/dialog. Open it with GDialogService.open(), then receive the close result through GDialogRef.',
    apiTitle: 'API — GDialogService',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The panel has role="dialog" and aria-modal="true".',
      'Focus moves into the dialog when it opens, then returns to the trigger when it closes.',
      'Esc closes the dialog unless disableClose is true.',
      'Pass ariaLabel or ariaLabelledBy so the dialog has an accessible name.',
    ],
    apiRows: [
      {
        name: 'GDialogService.open(component, config)',
        type: '(component: ComponentType<T>, config?: GDialogConfig<D>) => GDialogRef<R>',
        default: '—',
        description:
          'Opens a dialog with the given component and returns GDialogRef for the result.',
      },
      {
        name: 'GDialogService.closeAll()',
        type: '() => void',
        default: '—',
        description: 'Closes every open dialog.',
      },
      {
        name: 'GDialogConfig.data',
        type: 'D',
        default: '—',
        description: 'Data passed into the dialog content component through G_DIALOG_DATA.',
      },
      {
        name: 'GDialogConfig.width',
        type: 'string',
        default: '—',
        description: "Panel width, for example '480px'.",
      },
      {
        name: 'GDialogConfig.disableClose',
        type: 'boolean',
        default: 'false',
        description: 'true means Esc and backdrop click do not close the dialog.',
      },
      {
        name: 'GDialogConfig.ariaLabel',
        type: 'string',
        default: '—',
        description: 'Screen-reader name for the dialog. Required with ariaLabelledBy absent.',
      },
      {
        name: 'GDialogConfig.ariaLabelledBy',
        type: 'string',
        default: '—',
        description: 'id of the element that labels the dialog. Required with ariaLabel absent.',
      },
      {
        name: 'GDialogRef.close(result?)',
        type: '(result?: R) => void',
        default: '—',
        description: 'Closes the dialog and emits result through afterClosed().',
      },
      {
        name: 'GDialogRef.afterClosed()',
        type: '() => Observable<R | undefined>',
        default: '—',
        description: 'Observable that emits when the dialog closes.',
      },
      {
        name: 'G_DIALOG_DATA',
        type: 'InjectionToken<unknown>',
        default: '—',
        description: 'Token used by the dialog content component to inject data.',
      },
    ],
    demo: {
      trigger: 'Delete document',
      title: 'Delete document?',
      message: 'This action cannot be undone.',
      cancel: 'Cancel',
      delete: 'Delete',
      result: 'Result:',
      deleted: 'deleted',
      canceled: 'canceled',
    },
  },
  tooltip: {
    title: 'Tooltip',
    intro:
      'Short tooltip directive attached to a trigger element, implemented with @angular/cdk/overlay.',
    apiTitle: 'API — GTooltip',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The tooltip panel has role="tooltip".',
      'When visible, the trigger points aria-describedby to the panel id; the attribute is removed when hidden.',
      'It opens on hover and focus, so keyboard users can reach the same information.',
      'Dismissible — Esc closes the tooltip regardless of current focus.',
      'Hoverable — the pointer can move from trigger to tooltip without dismissing it.',
      'Persistent — the tooltip hides only after both hover and focus are gone.',
      'Tooltip content is plain text. If you need links or buttons inside, use a popover instead.',
      'Final geometry is calculated by CDK Overlay in the real browser.',
    ],
    apiRows: [
      {
        name: 'gTooltip',
        type: 'string',
        default: "''",
        description: 'Tooltip content. Empty means nothing is shown.',
      },
      {
        name: 'gTooltipPosition',
        type: "'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'",
        default: "'top'",
        description: 'Preferred placement; CDK flips to another side when space is limited.',
      },
    ],
    demo: {
      save: 'Save',
      saveTip: 'Save the current document',
      bottom: 'Bottom',
      bottomTip: 'Shown below',
      settings: 'Settings',
      settingsTip: 'Open settings',
      topLeft: 'Top-left',
      topLeftTip: 'Top-left corner',
      topRight: 'Top-right',
      topRightTip: 'Top-right corner',
      bottomLeft: 'Bottom-left',
      bottomLeftTip: 'Bottom-left corner',
      bottomRight: 'Bottom-right',
      bottomRightTip: 'Bottom-right corner',
    },
  },
  toast: {
    title: 'Toast',
    intro:
      'Short stacked notification shown in a screen corner and dismissed after a duration. Open one with GToastService.show().',
    positionTitle: 'Position',
    positionIntro:
      'Toasts appear at top-right by default. Change the corner with GToastService.setPosition(); it applies to future show() calls and updates open toasts immediately.',
    apiTitle: 'API — GToastService',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Content is announced through the CDK LiveAnnouncer as soon as the toast appears.',
      'The LiveAnnouncer region already exists before text is inserted, so screen readers announce reliably.',
      'variant="danger" uses assertive politeness; other variants use polite.',
      'The toast panel does not set aria-live or role="alert" itself, avoiding duplicate announcements.',
      'The close control is a native <button> with aria-label="Close".',
      'For important content, use duration: 0 so users have enough time to read it.',
    ],
    apiRows: [
      {
        name: 'GToastService.show(config)',
        type: '(config: GToastConfig) => string',
        default: '—',
        description: 'Shows a new toast and returns its id for dismiss(id).',
      },
      {
        name: 'GToastService.dismiss(id)',
        type: '(id: string) => void',
        default: '—',
        description: 'Dismisses one toast by id.',
      },
      {
        name: 'GToastService.dismissAll()',
        type: '() => void',
        default: '—',
        description: 'Dismisses every open toast.',
      },
      {
        name: 'GToastService.setPosition(position)',
        type: '(position: GToastPosition) => void',
        default: '—',
        description: 'Changes the screen corner used for toasts.',
      },
      {
        name: 'GToastPosition',
        type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'",
        default: "'top-right'",
        description: 'Screen corner used for toast placement.',
      },
      {
        name: 'GToastConfig.message',
        type: 'string',
        default: '—',
        description: 'Message content.',
      },
      {
        name: 'GToastConfig.title',
        type: 'string',
        default: '—',
        description: 'Optional title shown above the message.',
      },
      {
        name: 'GToastConfig.variant',
        type: "'neutral' | 'success' | 'warning' | 'danger'",
        default: "'neutral'",
        description: 'Visual tone; danger is announced assertively.',
      },
      {
        name: 'GToastConfig.duration',
        type: 'number',
        default: '4000',
        description: 'Milliseconds before auto-dismiss. 0 means persistent.',
      },
    ],
    demo: {
      normalButton: 'Normal notification',
      normalMessage: 'Changes saved',
      successButton: 'Success',
      successMessage: 'Upload completed',
      dangerButton: 'Error',
      dangerMessage: 'Save failed, try again later',
      titledButton: 'With title',
      persistentButton: 'Persistent',
      title: 'Order saved',
      titledMessage: 'Order #1234 was saved and confirmation email was sent.',
      persistentMessage: 'This notification stays until you close it.',
      positionLabels: {
        'top-left': 'Top left',
        'top-center': 'Top center',
        'top-right': 'Top right (default)',
        'bottom-left': 'Bottom left',
        'bottom-center': 'Bottom center',
        'bottom-right': 'Bottom right',
      },
      positionTrigger: 'Show toast at the selected position',
      positionedMessage: (label: string) => `Toast at "${label}"`,
    },
  },
  drawer: {
    title: 'Drawer',
    intro:
      'Sliding panel from a screen edge with a backdrop, covering bottom sheet and side panel use cases in one component. Choose the edge with side and bind open state through [(open)].',
    placementTitle: 'Placement note',
    placementIntro:
      'The panel uses position: fixed against the viewport. Place <g-drawer> in a DOM branch without transformed or filtered ancestors so the anchored edge stays correct.',
    apiTitle: 'API — GDrawer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The panel is role="dialog" with aria-modal="true"; provide its name through ariaLabel.',
      'Focus is trapped while the panel is open, then returns to the previous focus location on close.',
      'Esc and backdrop click close the drawer unless disableClose is set. The closed panel is inert and body scroll is locked while open.',
      'prefers-reduced-motion disables the slide animation.',
    ],
    apiRows: [
      {
        name: 'open',
        type: 'boolean (model)',
        default: 'false',
        description: 'Open state, two-way bound with [(open)].',
      },
      {
        name: 'side',
        type: `'bottom' | 'left' | 'right' | 'top'`,
        default: `'right'`,
        description: 'Edge the panel anchors to.',
      },
      {
        name: 'size',
        type: 'string',
        default: '—',
        description:
          'Width for left/right or height for bottom/top, for example "360px" or "45vh".',
      },
      {
        name: 'disableClose',
        type: 'boolean',
        default: 'false',
        description: 'Prevents closing with Esc and backdrop click.',
      },
      {
        name: 'ariaLabel',
        type: 'string',
        default: '—',
        description: 'Accessible name for the dialog panel.',
      },
    ],
    demo: {
      left: 'Left',
      right: 'Right',
      bottom: 'Bottom sheet',
      top: 'Top',
      ariaLabel: 'Demo drawer',
      headings: {
        left: 'Side panel — left',
        right: 'Side panel — right',
        bottom: 'Bottom sheet',
        top: 'Sheet — top',
      },
      body: 'Drawer content. Close with Esc, backdrop click, or the button below.',
      close: 'Close',
    },
  },
  contextMenu: {
    title: 'Context Menu',
    intro:
      'Right-click context menu: attach [gContextMenu]="tpl" to an element. Right-click opens the menu at the pointer position through CDK Overlay, with automatic fallback placement near viewport edges.',
    apiTitle: 'API — gContextMenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [],
    apiRows: [
      {
        name: 'gContextMenu',
        type: 'TemplateRef',
        default: '(required)',
        description:
          'Template for the menu content, usually <button g-menu-item> actions. Opens at the right-click position.',
      },
    ],
    demo: {
      target: 'Right-click this area',
      lastAction: 'Last action:',
      none: '(none)',
      edit: 'Edit',
      copy: 'Copy',
      rename: 'Rename',
      delete: 'Delete',
    },
  },
};

export function overlayCopyFor(tag: string): OverlayCopy {
  return tag.startsWith('en') ? EN_OVERLAY : VI_OVERLAY;
}
