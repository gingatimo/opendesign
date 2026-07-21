/** Chuỗi hiển thị của thư viện, nhóm theo component. Mọi khoá BẮT BUỘC — thiếu là TypeScript báo lỗi ngay,
 *  nhờ vậy thêm component mới không thể quên cập nhật gói ngôn ngữ. */
export interface GLocaleStrings {
  common: {
    close: string;
    cancel: string;
    apply: string;
    remove: string;
    previous: string;
    next: string;
    search: string;
    loading: string;
  };
  alert: {
    neutral: string;
    success: string;
    warning: string;
    danger: string;
    close: string;
  };
  chips: { add: string; remove: (label: string) => string };
  progress: { label: string };
  sidebar: { expand: string; collapse: string };
  orgChart: { toggleBranch: string };
  reorderList: { dragHandle: string };
}

export interface GLocale {
  /** BCP-47, dùng cho mọi API Intl: 'en-US', 'vi-VN', 'ja-JP'… */
  tag: string;
  /** 0 = Chủ nhật … 6 = Thứ bảy. Không suy ra từ `tag` vì Intl.Locale.getWeekInfo() chưa đủ phổ biến. */
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  strings: GLocaleStrings;
}
