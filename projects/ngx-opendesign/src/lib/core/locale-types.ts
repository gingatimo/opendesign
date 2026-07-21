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
  pagination: { label: string; first: string; previous: string; next: string; last: string };
  carousel: { roleDescription: string; label: string; previous: string; next: string };
  coverflow: { roleDescription: string; label: string; previous: string; next: string };
  imageSlider: {
    roleDescription: string;
    label: string;
    previous: string;
    next: string;
    zoom: string;
    goTo: (position: number) => string;
  };
  imagePreview: {
    remove: (position: number) => string;
    view: (position: number) => string;
    zoom: string;
  };
  lightbox: { label: string; zoomIn: string; zoomOut: string; previous: string; next: string };
  select: { searchPlaceholder: string; noResults: string };
  searchField: { fieldLabel: string; valueLabel: string };
  otp: { charLabel: (position: number) => string };
  rating: {
    label: string;
    // value là CHUỖI ĐÃ ĐỊNH DẠNG (qua GLocaleService.formatNumber), không phải number — gói ngôn
    // ngữ là dữ liệu thuần, không được phụ thuộc service nên không thể tự quyết dấu thập phân.
    valueText: (value: string, max: number) => string;
  };
  colorPicker: { open: string; area: string; hue: string; hex: string };
  timePicker: { open: string; hours: string; minutes: string };
  datepicker: {
    open: string;
    openRange: string;
    selectMonth: string;
    selectYear: string;
    prevMonth: string;
    nextMonth: string;
    prevYear: string;
    nextYear: string;
    prevYearPage: string;
    nextYearPage: string;
  };
  mediaPlayer: {
    play: string;
    pause: string;
    volume: string;
    fullscreen: string;
    exitFullscreen: string;
  };
  chart: {
    download: string;
    zoomIn: string;
    zoomOut: string;
    scaleLow: string;
    scaleHigh: string;
    contributionUnit: string;
    aria: {
      line: string;
      bar: string;
      stackedBar: string;
      pie: string;
      donut: string;
      polar: string;
      radar: string;
      honeycomb: string;
      heatmap: string;
      calendarHeatmap: string;
    };
  };
}

export interface GLocale {
  /** BCP-47, dùng cho mọi API Intl: 'en-US', 'vi-VN', 'ja-JP'… */
  tag: string;
  /** 0 = Chủ nhật … 6 = Thứ bảy. Không suy ra từ `tag` vì Intl.Locale.getWeekInfo() chưa đủ phổ biến. */
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  strings: GLocaleStrings;
}
