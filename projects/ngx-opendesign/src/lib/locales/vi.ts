import { GLocale } from '../core/locale-types';

export const gLocaleVi: GLocale = {
  tag: 'vi-VN',
  firstDayOfWeek: 1,
  strings: {
    common: {
      close: 'Đóng',
      cancel: 'Huỷ',
      apply: 'Áp dụng',
      remove: 'Xoá',
      previous: 'Trước',
      next: 'Sau',
      search: 'Tìm kiếm',
      loading: 'Đang tải',
    },
    alert: {
      neutral: 'Lưu ý',
      success: 'Thành công',
      warning: 'Cảnh báo',
      danger: 'Lỗi',
      close: 'Đóng thông báo',
    },
    chips: { add: 'Thêm mục', remove: (label: string) => `Xóa ${label}` },
    progress: { label: 'Tiến độ' },
    sidebar: { expand: 'Mở rộng thanh bên', collapse: 'Thu gọn thanh bên' },
    orgChart: { toggleBranch: 'Thu gọn / mở nhánh con' },
    reorderList: { dragHandle: 'Kéo để sắp xếp lại' },
  },
};
