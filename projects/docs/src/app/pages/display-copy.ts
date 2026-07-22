import { ApiRow } from '../shared/api-table';

interface DisplayPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  accessibilityTitle: string;
  accessibility: string[];
  apiRows: ApiRow[];
}

interface ProgressCopy extends DisplayPageCopy {
  circleTitle: string;
  circleIntro: string;
  circleApiTitle: string;
  circleApiRows: ApiRow[];
  demo: {
    upload: string;
    profile: string;
    processing: string;
    countdown: string;
    unit: string;
    pause: string;
    rerun: string;
    resume: string;
    reset: string;
  };
}

interface IconCopy extends DisplayPageCopy {
  setTitle: string;
  setIntro: string;
  usageTitle: string;
  fromSetTitle: string;
  fromSetIntro: string;
  customTitle: string;
  customIntro: string;
  fromSetSnippet: string;
  customGlyphSnippet: string;
  treeTitle: string;
  treeIntro: string;
  treeProof: string;
  demo: {
    copyLabel: (name: string) => string;
    copied: string;
  };
}

interface SectionedCopy extends DisplayPageCopy {
  usageTitle: string;
  usageIntro: string;
}

interface DisplayCopy {
  alert: DisplayPageCopy & {
    demo: {
      neutral: string;
      savedHeading: string;
      saved: string;
      expiringHeading: string;
      expiring: string;
      failedHeading: string;
      failed: string;
      showAgain: string;
    };
  };
  badge: DisplayPageCopy & {
    demo: {
      neutral: string;
      success: string;
      warning: string;
      danger: string;
    };
  };
  spinner: DisplayPageCopy & {
    demo: {
      productList: string;
    };
  };
  progress: ProgressCopy;
  skeleton: DisplayPageCopy;
  timeline: DisplayPageCopy & {
    demo: {
      placedTitle: string;
      placedBody: string;
      packedTitle: string;
      packedBody: string;
      delayedTitle: string;
      delayedBody: string;
      waitingTitle: string;
      waitingBody: string;
    };
  };
  chip: DisplayPageCopy & {
    demo: {
      design: string;
      remove: (tag: string) => string;
      disabled: string;
    };
  };
  avatar: DisplayPageCopy & {
    demo: {
      names: string[];
    };
  };
  card: DisplayPageCopy & {
    demo: {
      simple: string;
      header: string;
      body: string;
      footer: string;
    };
  };
  icon: IconCopy;
  imagePreview: DisplayPageCopy;
  imageSlider: DisplayPageCopy;
  carousel: SectionedCopy & {
    demo: {
      equalCaption: string;
      overlayCaption: string;
      mixedCaption: string;
      card: (n: number) => string;
      credit: string;
      vertical: string;
    };
  };
  coverflow: SectionedCopy & {
    demo: {
      equalCaption: string;
      mixedCaption: string;
      credit: string;
      vertical: string;
    };
  };
  gallery: DisplayPageCopy & {
    demo: {
      image: (index: number) => string;
    };
  };
  mediaPlayer: DisplayPageCopy & {
    note: string;
  };
  terminal: DisplayPageCopy & {
    demo: {
      lines: { text: string; kind: 'command' | 'output' | 'success' | 'error' }[];
      ran: (command: string) => string;
    };
  };
  divider: DisplayPageCopy & {
    demo: {
      above: string;
      below: string;
      or: string;
      itemA: string;
      itemB: string;
      itemC: string;
    };
  };
}

const VI_DISPLAY: DisplayCopy = {
  alert: {
    title: 'Alert',
    intro:
      'Thông báo dạng khối inline (callout) đặt ngay trong nội dung, dùng cho ghi chú, cảnh báo và lỗi. Khác GToast nổi tạm thời qua overlay và GBadge là nhãn nhỏ. Mỗi mức độ neutral / success / warning / danger có màu và icon riêng; dismissible thêm nút đóng.',
    apiTitle: 'API — GAlert',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Icon chỉ trang trí (aria-hidden). Mức độ được truyền cho screen reader qua tiền tố ẩn như "Lưu ý:", "Cảnh báo:", "Lỗi:" để không phụ thuộc vào màu sắc.',
      'Nút đóng có aria-label="Đóng thông báo".',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'neutral' | 'success' | 'warning' | 'danger'",
        default: "'neutral'",
        description: 'Mức độ, quyết định màu và icon (neutral = ghi chú, danger = lỗi).',
      },
      {
        name: 'heading',
        type: 'string',
        default: '—',
        description: 'Dòng tiêu đề đậm phía trên nội dung (tùy chọn).',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        description: 'Hiện nút đóng ở góc phải.',
      },
      {
        name: '[(open)]',
        type: 'boolean',
        default: 'true',
        description: 'Hiển thị hay không; nút đóng đặt về false, hai chiều để consumer điều khiển.',
      },
      {
        name: '<ng-content>',
        type: 'slot',
        default: '—',
        description: 'Nội dung thông báo.',
      },
    ],
    demo: {
      neutral: 'Ghi chú trung lập — thông tin bổ sung cho người dùng.',
      savedHeading: 'Đã lưu',
      saved: 'Thay đổi của bạn đã được lưu thành công.',
      expiringHeading: 'Sắp hết hạn',
      expiring: 'Phiên đăng nhập sẽ hết hạn trong 5 phút. Hãy lưu công việc để tránh mất dữ liệu.',
      failedHeading: 'Không thể xử lý',
      failed: 'Máy chủ trả về lỗi 500. Vui lòng thử lại sau ít phút.',
      showAgain: 'Hiện lại thông báo lỗi',
    },
  },
  badge: {
    title: 'Badge',
    intro: 'Nhãn nhỏ dạng pill để đánh dấu trạng thái hoặc phân loại.',
    apiTitle: 'API — GBadge',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Badge là nhãn tĩnh nên không mang role riêng; nội dung chữ chính là tên của nó.',
      'Dùng chữ trong badge để diễn đạt trạng thái, không chỉ dựa vào màu.',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'neutral' | 'success' | 'warning' | 'danger'",
        default: "'neutral'",
        description: 'Bộ màu trạng thái của badge.',
      },
    ],
    demo: {
      neutral: 'Mặc định',
      success: 'Thành công',
      warning: 'Cảnh báo',
      danger: 'Lỗi',
    },
  },
  spinner: {
    title: 'Spinner',
    intro: 'Chỉ báo đang tải dạng vòng xoay, dùng khi chờ dữ liệu hoặc thao tác bất đồng bộ.',
    apiTitle: 'API — GSpinner',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Host mang role="status" để trình đọc màn hình thông báo khi nội dung đang tải.',
      'Nếu không tự đặt aria-label hoặc aria-labelledby, component tự gán aria-label="Đang tải".',
      'Nên tự đặt aria-label cụ thể hơn khi ngữ cảnh cần.',
      'SVG bên trong chỉ mang tính trang trí, đã đặt aria-hidden="true".',
      'Tôn trọng prefers-reduced-motion: khi bật, animation xoay chậm lại thay vì dừng hẳn.',
    ],
    apiRows: [
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: "'md'",
        description: 'Cỡ vòng xoay: sm 16px, md 24px, lg 32px, xl 48px, 2xl 64px.',
      },
    ],
    demo: {
      productList: 'Đang tải danh sách sản phẩm',
    },
  },
  progress: {
    title: 'Progress',
    intro: 'Thanh tiến độ hiển thị tỉ lệ hoàn thành, hỗ trợ cả trạng thái không xác định.',
    circleTitle: 'Vòng tròn (đếm ngược)',
    circleIntro:
      'GProgressCircle vẽ tiến độ dạng vòng tròn. [value] 0-100 quyết định độ dài cung, phần còn lại là track mờ. Nội dung chiếu vào giữa vòng qua <ng-content>; [size] và [stroke] chỉnh đường kính và độ dày nét.',
    apiTitle: 'API — GProgress',
    circleApiTitle: 'API — GProgressCircle',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Host mang role="progressbar" cùng aria-valuemin="0" và aria-valuemax="100".',
      'aria-valuenow phản ánh giá trị đã kẹp về khoảng 0-100; khi indeterminate thì bỏ aria-valuenow theo chuẩn ARIA.',
      'Nếu không tự đặt aria-label hoặc aria-labelledby, component tự gán aria-label="Tiến độ".',
      'Tôn trọng prefers-reduced-motion: khi bật, animation ở trạng thái indeterminate chậm lại.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'number',
        default: '0',
        description: 'Giá trị tiến độ, tự kẹp về khoảng 0-100.',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Hiển thị trạng thái tiến độ không xác định.',
      },
    ],
    circleApiRows: [
      {
        name: 'value',
        type: 'number',
        default: '0',
        description: 'Giá trị tiến độ 0-100 (tự kẹp), quyết định độ dài cung tròn.',
      },
      {
        name: 'size',
        type: 'number',
        default: '96',
        description: 'Đường kính vòng tròn (px).',
      },
      {
        name: 'stroke',
        type: 'number',
        default: '6',
        description: 'Độ dày nét vòng tròn (px).',
      },
      {
        name: '<ng-content>',
        type: 'slot',
        default: '—',
        description: 'Nội dung chiếu vào giữa vòng (số đếm ngược, phần trăm, icon...).',
      },
    ],
    demo: {
      upload: 'Tiến độ tải lên',
      profile: 'Tiến độ hoàn thành hồ sơ',
      processing: 'Đang xử lý',
      countdown: 'Đếm ngược',
      unit: 'giây',
      pause: 'Tạm dừng',
      rerun: 'Chạy lại',
      resume: 'Tiếp tục',
      reset: 'Đặt lại',
    },
  },
  skeleton: {
    title: 'Skeleton',
    intro:
      'Khối placeholder hiển thị trong lúc tải dữ liệu, có hiệu ứng shimmer. Ba biến thể text / circular / rectangular; ghép nhiều khối để dựng khung của nội dung sắp hiện.',
    apiTitle: 'API — GSkeleton',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Skeleton là aria-hidden (thuần trang trí). Thông báo trạng thái tải cho screen reader ở vùng bao, ví dụ aria-busy="true" hoặc live region riêng.',
      'Tôn trọng prefers-reduced-motion: tắt hiệu ứng shimmer, khối vẫn hiển thị.',
    ],
    apiRows: [
      {
        name: 'variant',
        type: `'text' | 'circular' | 'rectangular'`,
        default: `'text'`,
        description: 'Hình dạng khối placeholder.',
      },
      {
        name: 'width',
        type: 'string',
        default: '—',
        description: 'Chiều rộng, ví dụ "100%", "48px". Không đặt thì theo mặc định của biến thể.',
      },
      {
        name: 'height',
        type: 'string',
        default: '—',
        description: 'Chiều cao, ví dụ "120px". Không đặt thì theo mặc định của biến thể.',
      },
      {
        name: 'lines',
        type: 'number',
        default: '1',
        description: 'Số dòng cho variant text (> 1 render nhiều dòng, dòng cuối ngắn 60%).',
      },
    ],
  },
  timeline: {
    title: 'Timeline',
    intro:
      'Dòng thời gian dọc, dùng để hiển thị chuỗi sự kiện theo thứ tự. g-timeline là container xếp dọc; mỗi g-timeline-item tự vẽ marker và đường nối, rồi bỏ đường nối ở item cuối.',
    apiTitle: 'API — GTimeline, GTimelineItem',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Cấu trúc là các khối nội dung tuần tự trong DOM; thứ tự đọc khớp với thứ tự trực quan trên trục dọc.',
      'Marker mặc định chỉ mang tính trang trí; nếu thay bằng icon qua [gTimelineMarker], hãy đảm bảo icon có nhãn phù hợp hoặc aria-hidden nếu chỉ trang trí.',
    ],
    apiRows: [
      {
        name: 'g-timeline',
        type: '(component)',
        default: '—',
        description: 'Container xếp dọc các mốc thời gian, không có input.',
      },
      {
        name: 'g-timeline-item',
        type: '(component)',
        default: '—',
        description: 'Một mốc thời gian: cột marker + đường nối, cùng nội dung chiếu.',
      },
      {
        name: 'status (item)',
        type: `'default' | 'success' | 'warning' | 'danger'`,
        default: `'default'`,
        description: 'Trạng thái mốc, tô màu marker.',
      },
      {
        name: '[gTimelineMarker]',
        type: '(projection)',
        default: '—',
        description: 'Chiếu phần tử tùy chọn để thay marker chấm tròn mặc định.',
      },
    ],
    demo: {
      placedTitle: 'Đặt hàng thành công',
      placedBody: 'Đơn hàng #10234 đã được tạo lúc 08:15, 19/07/2026.',
      packedTitle: 'Đã đóng gói',
      packedBody: 'Kho xác nhận đơn và hoàn tất đóng gói sản phẩm.',
      delayedTitle: 'Vận chuyển bị chậm',
      delayedBody: 'Đơn hàng gặp sự cố thời tiết, dự kiến trễ 1 ngày.',
      waitingTitle: 'Chờ giao hàng',
      waitingBody: 'Đơn sẽ được giao trong hôm nay hoặc ngày mai.',
    },
  },
  chip: {
    title: 'Chip',
    intro: 'Nhãn nhỏ dạng pill cho các mục có thể xóa, ví dụ tag hoặc bộ lọc đang chọn.',
    apiTitle: 'API — GChip',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Khi removable, nút xóa là <button type="button"> native nên có sẵn focus bằng Tab và kích hoạt bằng Enter/Space.',
      'Nút xóa mang aria-label, mặc định là "Xóa", có thể tùy biến qua removeLabel.',
      'Khi disabled, nút xóa bị vô hiệu hóa bằng attribute disabled native.',
      'Trong danh sách nhiều chip có thể xóa, hãy đặt removeLabel riêng cho từng chip để người dùng screen reader phân biệt được nút nào xóa mục nào.',
    ],
    apiRows: [
      {
        name: 'removable',
        type: 'boolean',
        default: 'false',
        description: 'Hiện nút xóa bên trong chip.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Vô hiệu hóa nút xóa.',
      },
      {
        name: 'removeLabel',
        type: 'string',
        default: "'Xóa'",
        description: 'aria-label của nút xóa; nên đặt riêng cho từng chip trong danh sách.',
      },
      {
        name: 'removed',
        type: 'output<void>',
        default: '—',
        description: 'Phát ra khi người dùng bấm nút xóa.',
      },
    ],
    demo: {
      design: 'Thiết kế',
      remove: (tag: string) => 'Xóa ' + tag,
      disabled: 'Không xóa được',
    },
  },
  avatar: {
    title: 'Avatar',
    intro:
      'Hiển thị ảnh đại diện của người dùng, tự động fallback về chữ cái đầu khi không có ảnh.',
    apiTitle: 'API — GAvatar',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Host mang role="img" cùng aria-label là giá trị của name, giúp avatar luôn có một accessible name.',
      'Vì host đã là role="img", nội dung bên trong là presentational; ảnh dùng alt="" để tránh đọc lặp tên.',
      'Khi ảnh lỗi tải, component fallback về chữ cái đầu của name mà vẫn giữ accessible name.',
    ],
    apiRows: [
      {
        name: 'name',
        type: 'string',
        default: '(bắt buộc)',
        description: 'Tên người dùng, dùng để tính chữ cái đầu và làm accessible name.',
      },
      {
        name: 'src',
        type: 'string | undefined',
        default: 'undefined',
        description: 'Đường dẫn ảnh đại diện; nếu thiếu hoặc lỗi tải sẽ fallback về chữ cái đầu.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Cỡ avatar.',
      },
      {
        name: 'shape',
        type: "'circle' | 'square'",
        default: "'circle'",
        description: 'Hình dạng: tròn hoặc vuông bo góc nhẹ.',
      },
    ],
    demo: {
      names: [
        'Nguyễn Văn An',
        'Trần Thị Bình',
        'Lê Hoàng Cường',
        'Ảnh lỗi',
        'Phạm Vuông',
        'Đỗ Vuông Lớn',
      ],
    },
  },
  card: {
    title: 'Card',
    intro: 'Bề mặt chứa nội dung, có thể thêm phần đầu và phần chân tùy chọn.',
    apiTitle: 'API — GCard, GCardHeader, GCardFooter',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'GCard là bề mặt thuần túy, cố ý không đặt role để tránh tạo landmark thừa cho screen reader.',
      'Nếu card là một vùng có ý nghĩa điều hướng hoặc cần được công bố riêng, hãy tự thêm role/aria-label phù hợp ở consumer.',
    ],
    apiRows: [
      {
        name: 'g-card',
        type: '(component)',
        default: '—',
        description: 'Container chính, không có input.',
      },
      {
        name: '[gCardHeader]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu phần đầu của card, không có input.',
      },
      {
        name: '[gCardFooter]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu phần chân của card, không có input.',
      },
    ],
    demo: {
      simple: 'Thẻ đơn giản chỉ có nội dung.',
      header: 'Thông tin tài khoản',
      body: 'Thẻ đầy đủ với phần đầu và phần chân.',
      footer: 'Cập nhật 2 giờ trước',
    },
  },
  icon: {
    title: 'Icon',
    intro:
      'g-icon render icon set có sẵn của OpenDesign — 116 icon. Mỗi icon là dữ liệu hình học có cấu trúc, không phải chuỗi HTML/SVG thô hay font icon, nên không cần innerHTML hay bypassSecurityTrustHtml.',
    setTitle: 'Toàn bộ icon set',
    setIntro: 'Tên bên dưới mỗi icon là hằng cần import từ ngx-opendesign; bấm vào ô để copy tên.',
    usageTitle: 'Hai cách dùng',
    fromSetTitle: '1. Icon từ set',
    fromSetIntro:
      'Import hằng icon cần dùng từ ngx-opendesign, truyền vào input icon của <g-icon>:',
    customTitle: '2. Icon ngoài set: tự định nghĩa glyph',
    customIntro:
      'Với icon không có trong set, tự định nghĩa một hằng GIconGlyph rồi truyền vào <g-icon [icon]>. Cách này giữ mọi icon đi qua cùng component và cùng behavior theming/a11y/XSS.',
    fromSetSnippet: `import { Component } from '@angular/core';
import { GIcon, gIconSearch } from 'ngx-opendesign';

@Component({
  selector: 'app-vi-du',
  imports: [GIcon],
  template: \`<g-icon [icon]="gIconSearch" size="sm" />\`,
})
export class ViDuComponent {
  protected readonly gIconSearch = gIconSearch;
}`,
    customGlyphSnippet: `import { Component } from '@angular/core';
import { GIcon, GIconGlyph } from 'ngx-opendesign';

const iconDongHo: GIconGlyph = {
  viewBox: '0 0 24 24',
  paths: ['M12 7v5l3 2'],
  circles: [{ cx: 12, cy: 12, r: 9 }],
};

@Component({
  selector: 'app-vi-du',
  imports: [GIcon],
  template: \`<g-icon [icon]="iconDongHo" />\`,
})
export class ViDuComponent {
  protected readonly iconDongHo = iconDongHo;
}`,
    apiTitle: 'API — GIcon',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mặc định g-icon là trang trí: host tự mang aria-hidden="true" và không có role.',
      'Khi icon đứng một mình mang nghĩa, đặt aria-label hoặc aria-labelledby trên <g-icon>; host tự chuyển sang role="img" và gỡ aria-hidden nếu có.',
      'SVG con luôn có aria-hidden="true" và focusable="false"; accessible name nếu có luôn tới từ host.',
    ],
    treeTitle: 'Tree-shaking',
    treeIntro:
      'Mỗi icon là một export const riêng ở module icons.ts, không gom vào object/map dùng chung, để bundler loại bỏ import không dùng tới.',
    treeProof:
      'Đã kiểm chứng bằng bundle production thật: app chỉ import một icon không chứa path của các icon không dùng, còn app import cả bộ icon thì có đầy đủ các path đối chứng.',
    apiRows: [
      {
        name: 'icon',
        type: 'GIconGlyph',
        default: '—',
        description:
          'Bắt buộc. Hằng gIconXxx từ ngx-opendesign, hoặc glyph { viewBox, paths?, circles?, rects? } tự định nghĩa.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Cỡ icon: 16 / 20 / 24px.',
      },
    ],
    demo: {
      copyLabel: (name: string) => 'Copy ' + name,
      copied: 'Đã copy',
    },
  },
  imagePreview: {
    title: 'Image Preview',
    intro:
      'Lưới thumbnail cho danh sách ảnh, nhận string (URL) hoặc File. Click một thumbnail mở lightbox toàn màn hình: zoom bằng cuộn chuột/nút/double-click, pan khi đã zoom, chuyển ảnh trước/sau nếu có nhiều ảnh.',
    apiTitle: 'API — GImagePreview',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mỗi thumbnail là <button>, ảnh bên trong có alt mô tả.',
      'Lightbox mở qua overlay CDK có focus trap và tự trả focus lại thumbnail khi đóng.',
      'Phím tắt trong lightbox: ←/→ chuyển ảnh, +/-/0 zoom vào/ra/về mặc định, Esc đóng.',
    ],
    apiRows: [
      {
        name: 'images',
        type: '(string | File)[]',
        default: '[]',
        description: 'Danh sách ảnh hiển thị, URL dạng string hoặc File.',
      },
      {
        name: 'removable',
        type: 'boolean',
        default: 'false',
        description: 'Hiện nút xóa trên từng thumbnail.',
      },
      {
        name: '(remove)',
        type: 'number',
        default: '—',
        description: 'Phát ra khi bấm nút xóa, kèm index ảnh trong images.',
      },
    ],
  },
  imageSlider: {
    title: 'Image Slider',
    intro:
      'Băng chuyền ảnh, một ảnh mỗi khung, chuyển trước/sau bằng nút, chấm chỉ vị trí bên dưới hoặc phím ←/→. Nhận string (URL) hoặc File. Bật loop để cuộn vòng, lightbox để click ảnh mở xem toàn màn hình.',
    apiTitle: 'API — GImageSlider',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Vùng băng chuyền là role="region" có aria-roledescription và nhận phím ←/→ để chuyển ảnh.',
      'Nút điều hướng là <button> có nhãn "Ảnh trước"/"Ảnh sau", tự vô hiệu ở hai đầu khi không bật loop.',
      'Mỗi chấm là <button> nhãn "Tới ảnh N"; chấm của ảnh hiện tại đánh dấu aria-current.',
      'Một vùng aria-live ẩn thông báo "Ảnh N/M" mỗi khi đổi ảnh.',
    ],
    apiRows: [
      {
        name: 'images',
        type: '(string | File)[]',
        default: '[]',
        description: 'Danh sách ảnh, URL dạng string hoặc File.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Cuộn vòng: từ ảnh cuối bấm sau quay về đầu.',
      },
      {
        name: 'lightbox',
        type: 'boolean',
        default: 'false',
        description: 'Bấm ảnh đang xem mở lightbox toàn màn hình.',
      },
    ],
  },
  carousel: {
    title: 'Carousel',
    intro:
      'Băng chuyền ngang cho nội dung bất kỳ, chiếu các card vào qua <ng-content>. Track dùng scroll-snap; item giữ bề rộng tự nhiên nên item cùng kích thước lẫn khác kích thước đều chạy đúng.',
    usageTitle: 'Cách dùng',
    usageIntro:
      'Đặt các item làm con trực tiếp của <g-carousel> và cho mỗi item một bề rộng. Carousel tự lo cuộn/snap/nút; item có thể là card, sản phẩm, biểu đồ...',
    apiTitle: 'API — GCarousel',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Track là vùng cuộn có tabindex="0" + role="group"; focus vào track rồi dùng phím ←/→ để cuộn.',
      'Hai nút điều hướng có aria-label và tự disabled/ẩn ở biên.',
    ],
    apiRows: [
      {
        name: 'navPlacement',
        type: "'overlay' | 'flanking'",
        default: "'flanking'",
        description: "Vị trí nút prev/next. 'flanking' nằm ngoài track; 'overlay' đè lên track.",
      },
      {
        name: 'align',
        type: "'stretch' | 'start' | 'center' | 'end'",
        default: "'stretch'",
        description: 'Căn item theo trục dọc khi các item khác chiều cao.',
      },
      {
        name: 'center',
        type: 'boolean',
        default: 'false',
        description: 'Căn giữa các item khi chúng vừa khung.',
      },
    ],
    demo: {
      equalCaption: 'Item cùng kích thước — nút flanking mặc định',
      overlayCaption: 'Nút overlay — đè lên track, mờ nhẹ lúc nghỉ, rê vào hiện rõ',
      mixedCaption: 'Item khác kích thước — thẻ ngang xen thẻ dọc',
      card: (n: number) => `Thẻ ${n}`,
      credit: 'Thẻ tín dụng',
      vertical: 'Thẻ dọc',
    },
  },
  coverflow: {
    title: 'Coverflow',
    intro:
      'Băng chuyền tâm điểm: khung hiện 3 card, card ở giữa phóng to, hai bên peek một phần card trước/sau. Chạy theo active index, có thể bấm nút, bấm card bên cạnh, hoặc dùng phím ←/→.',
    usageTitle: 'Cách dùng',
    usageIntro:
      'Đặt các card làm con trực tiếp của <g-coverflow> và cho mỗi card một bề rộng nhỏ hơn khung để lộ peek hai bên. Track tự dịch để card active nằm chính giữa.',
    apiTitle: 'API — GCoverflow',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Track có role="group" + aria-roledescription="băng chuyền tâm điểm"; tabindex="0" để focus rồi dùng phím ←/→ chuyển card.',
      'Hai nút điều hướng có aria-label và tự disabled/ẩn ở biên.',
    ],
    apiRows: [
      {
        name: 'active',
        type: 'number',
        default: '0',
        description: 'Chỉ số card đang ở giữa (two-way [(active)]).',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Quay vòng: next ở cuối về card đầu, prev ở đầu tới card cuối.',
      },
    ],
    demo: {
      equalCaption: 'Card cùng kích thước — loop + dot điều hướng',
      mixedCaption: 'Card khác kích thước — thẻ ngang xen thẻ dọc',
      credit: 'Thẻ tín dụng',
      vertical: 'Thẻ dọc',
    },
  },
  gallery: {
    title: 'Gallery',
    intro:
      'Gallery ảnh kiểu trang bán hàng: một ảnh chính lớn và dải thumbnail bên dưới. Bấm thumbnail để đổi ảnh chính; bấm ảnh chính mở lightbox. Nhận URL hoặc File.',
    apiTitle: 'API — GGallery',
    accessibilityTitle: 'Accessibility',
    accessibility: [],
    apiRows: [
      {
        name: 'images',
        type: '(string | File)[]',
        default: '[]',
        description: 'Danh sách ảnh, URL chuỗi hoặc File.',
      },
    ],
    demo: {
      image: (index: number) => 'Ảnh ' + index,
    },
  },
  mediaPlayer: {
    title: 'Media Player',
    intro:
      'Trình phát bọc <audio>/<video> native và dựng control bar riêng theo brand: play/pause, thời gian, thanh tua, mute + âm lượng, và nút toàn màn hình cho video.',
    apiTitle: 'API — GMediaPlayer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mỗi nút điều khiển có aria-label tiếng Việt và đổi theo trạng thái.',
      'Thanh tua và thanh âm lượng là input[type="range"] gốc nên điều khiển được bằng bàn phím.',
    ],
    apiRows: [
      {
        name: 'src',
        type: 'string (required)',
        default: '—',
        description: 'URL của tệp media.',
      },
      {
        name: 'type',
        type: `'audio' | 'video'`,
        default: `'audio'`,
        description: 'Render thẻ <audio> hay <video>.',
      },
      {
        name: 'poster',
        type: 'string',
        default: '—',
        description: 'Ảnh nền hiển thị trước khi phát video.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Tự phát lại từ đầu khi kết thúc.',
      },
    ],
    note: 'Asset trong demo là tệp mẫu công khai (SoundHelix, Google sample videos) — chỉ để minh họa.',
  },
  terminal: {
    title: 'Terminal',
    intro:
      'Khung terminal giả lập cửa sổ dòng lệnh: thanh tiêu đề, vùng log mono cuộn được, và dòng nhập lệnh có ký hiệu prompt. Nền tối cố định, data-driven qua [lines], gõ lệnh + Enter phát (run).',
    apiTitle: 'API — GTerminal',
    accessibilityTitle: 'Accessibility',
    accessibility: [],
    apiRows: [
      {
        name: 'lines',
        type: 'GTerminalLine[]',
        default: '[]',
        description:
          'Các dòng log. Mỗi dòng `{ text, kind? }`, kind: command | output | success | error.',
      },
      {
        name: 'run',
        type: 'output<string>',
        default: '—',
        description: 'Phát chuỗi lệnh khi gõ + Enter; consumer nối kết quả vào `lines`.',
      },
      {
        name: 'title',
        type: 'string',
        default: "'Terminal'",
        description: 'Tên hiển thị ở thanh tiêu đề.',
      },
      {
        name: 'prompt',
        type: 'string',
        default: "'$'",
        description: 'Ký hiệu prompt trước ô nhập.',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'true',
        description: 'Có ô nhập lệnh hay không.',
      },
    ],
    demo: {
      lines: [
        { text: 'opendesign@dev ~ %', kind: 'output' },
        { text: 'ng build ngx-opendesign', kind: 'command' },
        { text: '✔ Building Angular Package', kind: 'success' },
        { text: 'Build at: 2026-07-20 — Time: 1245ms', kind: 'output' },
        { text: 'npm test', kind: 'command' },
        { text: '✖ 1 test failed', kind: 'error' },
        { text: 'Thử gõ một lệnh rồi Enter...', kind: 'output' },
      ],
      ran: (command: string) => 'Đã chạy: ' + command + ' (kết quả mẫu)',
    },
  },
  divider: {
    title: 'Divider',
    intro:
      'Vạch phân cách giữa các khối nội dung. Ngang chiếm hết bề rộng; dọc dùng trong hàng ngang để ngăn các mục. Có thể đặt nhãn ở giữa qua nội dung chiếu.',
    apiTitle: 'API — GDivider',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Host mang role="separator" và aria-orientation theo hướng, để công nghệ hỗ trợ hiểu đây là ranh giới phân tách.',
      'Nhãn nếu có là nội dung văn bản bình thường, đọc được cùng ngữ cảnh xung quanh.',
    ],
    apiRows: [
      {
        name: 'orientation',
        type: `'horizontal' | 'vertical'`,
        default: `'horizontal'`,
        description: 'Hướng vạch. Dọc cần đặt trong một hàng flex có chiều cao xác định.',
      },
    ],
    demo: {
      above: 'Đoạn nội dung phía trên.',
      below: 'Đoạn nội dung phía dưới.',
      or: 'HOẶC',
      itemA: 'Mục A',
      itemB: 'Mục B',
      itemC: 'Mục C',
    },
  },
};

const EN_DISPLAY: DisplayCopy = {
  alert: {
    title: 'Alert',
    intro:
      'Inline block notification (callout) placed in content for notes, warnings, and errors. Unlike GToast, it stays in flow; unlike GBadge, it carries full message content. Each severity has its own color and icon, and dismissible adds a close button.',
    apiTitle: 'API — GAlert',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The icon is decorative (aria-hidden). Severity is exposed through hidden text such as "Note:", "Warning:", or "Error:" so meaning is not color-only.',
      'The close button has aria-label="Close alert".',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'neutral' | 'success' | 'warning' | 'danger'",
        default: "'neutral'",
        description: 'Visual severity.',
      },
      {
        name: 'heading',
        type: 'string',
        default: '—',
        description: 'Optional bold heading shown above the content.',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        description: 'Shows a close button at the right edge.',
      },
      {
        name: '[(open)]',
        type: 'boolean',
        default: 'true',
        description: 'Controls visibility. The close button sets it to false.',
      },
      {
        name: '<ng-content>',
        type: 'slot',
        default: '—',
        description: 'Alert content.',
      },
    ],
    demo: {
      neutral: 'Neutral note — supplemental information for the user.',
      savedHeading: 'Saved',
      saved: 'Your changes were saved successfully.',
      expiringHeading: 'Expiring soon',
      expiring: 'Your session expires in 5 minutes. Save your work to avoid losing data.',
      failedHeading: 'Cannot process',
      failed: 'Server returned a 500 error. Please try again in a few minutes.',
      showAgain: 'Show error again',
    },
  },
  badge: {
    title: 'Badge',
    intro: 'Small pill label for status, state, or categorization.',
    apiTitle: 'API — GBadge',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Badge is static text and does not add a role; the visible text is its accessible name.',
      'Do not rely on color alone. The badge text should state the status.',
    ],
    apiRows: [
      {
        name: 'variant',
        type: "'neutral' | 'success' | 'warning' | 'danger'",
        default: "'neutral'",
        description: 'Visual tone of the badge.',
      },
    ],
    demo: {
      neutral: 'Default',
      success: 'Success',
      warning: 'Warning',
      danger: 'Error',
    },
  },
  spinner: {
    title: 'Spinner',
    intro: 'Circular loading indicator for pending data or asynchronous work.',
    apiTitle: 'API — GSpinner',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The host uses role="status" so screen readers can announce loading content.',
      'If aria-label or aria-labelledby is not provided, the component sets aria-label="Loading".',
      'Provide a more specific aria-label when the context needs it.',
      'The inner SVG is decorative and has aria-hidden="true".',
      'prefers-reduced-motion is respected by slowing the animation.',
    ],
    apiRows: [
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg' | 'xl' | '2xl'",
        default: "'md'",
        description: 'Spinner size: sm 16px, md 24px, lg 32px, xl 48px, 2xl 64px.',
      },
    ],
    demo: {
      productList: 'Loading product list',
    },
  },
  progress: {
    title: 'Progress',
    intro: 'Progress indicators show completion percentage and support indeterminate state.',
    circleTitle: 'Circle (countdown)',
    circleIntro:
      'GProgressCircle draws circular progress. [value] 0-100 controls the arc length; the rest is a muted track. Projected content is placed in the center through <ng-content>, while [size] and [stroke] control diameter and stroke width.',
    apiTitle: 'API — GProgress',
    circleApiTitle: 'API — GProgressCircle',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The host uses role="progressbar" with aria-valuemin="0" and aria-valuemax="100".',
      'aria-valuenow reflects the clamped 0-100 value; indeterminate progress omits aria-valuenow.',
      'If aria-label or aria-labelledby is not provided, the component sets aria-label="Progress".',
      'prefers-reduced-motion is respected by slowing indeterminate animation.',
    ],
    apiRows: [
      {
        name: 'value',
        type: 'number',
        default: '0',
        description: 'Progress value, clamped to 0-100.',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Shows an indeterminate progress animation.',
      },
    ],
    circleApiRows: [
      {
        name: 'value',
        type: 'number',
        default: '0',
        description: 'Progress value 0-100, clamped before drawing the arc.',
      },
      {
        name: 'size',
        type: 'number',
        default: '96',
        description: 'Diameter of the circle in pixels.',
      },
      {
        name: 'stroke',
        type: 'number',
        default: '6',
        description: 'Stroke width in pixels.',
      },
      {
        name: '<ng-content>',
        type: 'slot',
        default: '—',
        description: 'Content projected into the center of the circle.',
      },
    ],
    demo: {
      upload: 'Upload progress',
      profile: 'Profile completion progress',
      processing: 'Processing',
      countdown: 'Countdown',
      unit: 'seconds',
      pause: 'Pause',
      rerun: 'Run again',
      resume: 'Resume',
      reset: 'Reset',
    },
  },
  skeleton: {
    title: 'Skeleton',
    intro:
      'Placeholder loading state shown while data is loading. Use text, circular, or rectangular blocks, and compose multiple blocks to match the layout that will appear.',
    apiTitle: 'API — GSkeleton',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Skeleton is aria-hidden because it is decorative. Announce loading state on the wrapper with aria-busy="true" or a separate live region.',
      'prefers-reduced-motion is respected by disabling shimmer while keeping the block visible.',
    ],
    apiRows: [
      {
        name: 'variant',
        type: `'text' | 'circular' | 'rectangular'`,
        default: `'text'`,
        description: 'Shape of the placeholder block.',
      },
      {
        name: 'width',
        type: 'string',
        default: '—',
        description: 'Width, for example "100%" or "48px".',
      },
      {
        name: 'height',
        type: 'string',
        default: '—',
        description: 'Height, for example "120px".',
      },
      {
        name: 'lines',
        type: 'number',
        default: '1',
        description: 'Number of text lines. Multiple lines render with a shorter last line.',
      },
    ],
  },
  timeline: {
    title: 'Timeline',
    intro:
      'Vertical event timeline for ordered event sequences. g-timeline stacks items vertically; each g-timeline-item draws its marker and connector, then removes the connector on the last item.',
    apiTitle: 'API — GTimeline, GTimelineItem',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The DOM order matches the visual vertical order, so screen readers encounter events in sequence.',
      'The default marker is decorative. If you project an icon through [gTimelineMarker], ensure it has an appropriate label or aria-hidden when decorative.',
    ],
    apiRows: [
      {
        name: 'g-timeline',
        type: '(component)',
        default: '—',
        description: 'Vertical container for timeline events. No inputs.',
      },
      {
        name: 'g-timeline-item',
        type: '(component)',
        default: '—',
        description: 'A timeline event: marker column, connector, and projected content.',
      },
      {
        name: 'status (item)',
        type: `'default' | 'success' | 'warning' | 'danger'`,
        default: `'default'`,
        description: 'Event status used to color the marker.',
      },
      {
        name: '[gTimelineMarker]',
        type: '(projection)',
        default: '—',
        description: 'Optional projected element that replaces the default dot marker.',
      },
    ],
    demo: {
      placedTitle: 'Order placed',
      placedBody: 'Order #10234 was created at 08:15, 19/07/2026.',
      packedTitle: 'Packed',
      packedBody: 'Warehouse confirmed the order and finished packing the products.',
      delayedTitle: 'Shipment delayed',
      delayedBody: 'Weather disruption detected. Expected delay: 1 day.',
      waitingTitle: 'Waiting for delivery',
      waitingBody: 'The order will be delivered today or tomorrow.',
    },
  },
  chip: {
    title: 'Chip',
    intro: 'Small removable pill label for tags, selected filters, or compact item tokens.',
    apiTitle: 'API — GChip',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'When removable, the remove control is a native <button type="button"> with Tab focus and Enter/Space activation.',
      'The remove button has an aria-label, defaults to "Remove", and can be customized with removeLabel.',
      'When disabled, the remove button uses the native disabled attribute.',
      'In lists, set removeLabel per chip, such as "Remove Angular", so screen reader users can identify each button.',
    ],
    apiRows: [
      {
        name: 'removable',
        type: 'boolean',
        default: 'false',
        description: 'Shows a remove button inside the chip.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the remove button.',
      },
      {
        name: 'removeLabel',
        type: 'string',
        default: "'Remove'",
        description: 'aria-label for the remove button. Set it per chip in lists.',
      },
      {
        name: 'removed',
        type: 'output<void>',
        default: '—',
        description: 'Emits when the user presses the remove button.',
      },
    ],
    demo: {
      design: 'Design',
      remove: (tag: string) => 'Remove ' + tag,
      disabled: 'Cannot remove',
    },
  },
  avatar: {
    title: 'Avatar',
    intro: 'User avatar that shows an image when available and falls back to initials.',
    apiTitle: 'API — GAvatar',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The host uses role="img" and aria-label from name, giving the avatar exactly one accessible name.',
      'Because the host is role="img", inner content is presentational. Images use alt="" to avoid repeating the name.',
      'If the image fails to load, the component falls back to initials while preserving the accessible name.',
    ],
    apiRows: [
      {
        name: 'name',
        type: 'string',
        default: '(required)',
        description: 'User name used to derive initials and provide the accessible name.',
      },
      {
        name: 'src',
        type: 'string | undefined',
        default: 'undefined',
        description: 'Avatar image URL. Missing or failed images fall back to initials.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Avatar size.',
      },
      {
        name: 'shape',
        type: "'circle' | 'square'",
        default: "'circle'",
        description: 'Shape: circle or softly rounded square.',
      },
    ],
    demo: {
      names: [
        'Alex Nguyen',
        'Bianca Tran',
        'Chris Le',
        'Broken image',
        'Square avatar',
        'Large square',
      ],
    },
  },
  card: {
    title: 'Card',
    intro: 'Content surface with optional header and footer sections.',
    apiTitle: 'API — GCard, GCardHeader, GCardFooter',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'GCard is a presentation surface and intentionally does not set a role to avoid extra landmarks.',
      'If your card is a named navigational or semantic region, add the relevant role and aria-label from the consumer side.',
    ],
    apiRows: [
      {
        name: 'g-card',
        type: '(component)',
        default: '—',
        description: 'Main container. No inputs.',
      },
      {
        name: '[gCardHeader]',
        type: '(directive)',
        default: '—',
        description: 'Marks the card header section. No inputs.',
      },
      {
        name: '[gCardFooter]',
        type: '(directive)',
        default: '—',
        description: 'Marks the card footer section. No inputs.',
      },
    ],
    demo: {
      simple: 'Simple card with content only.',
      header: 'Account information',
      body: 'Full card with a header and footer.',
      footer: 'Updated 2 hours ago',
    },
  },
  icon: {
    title: 'Icon',
    intro:
      'Tree-shakable icon set for OpenDesign. Each icon is structured geometry data, not raw HTML/SVG or an icon font, so GIcon renders it with normal bindings without innerHTML or bypassSecurityTrustHtml.',
    setTitle: 'Complete icon set',
    setIntro:
      'The name under each icon is the exported constant to import from ngx-opendesign. Click a cell to copy the name.',
    usageTitle: 'Two usage patterns',
    fromSetTitle: '1. Icon from the set',
    fromSetIntro:
      'Import the icon constant from ngx-opendesign and pass it to the icon input on <g-icon>:',
    customTitle: '2. Custom glyph outside the set',
    customIntro:
      'For an icon outside the set, define a GIconGlyph constant and pass it to <g-icon [icon]>. This keeps sizing, theming, accessibility, and XSS behavior consistent.',
    fromSetSnippet: `import { Component } from '@angular/core';
import { GIcon, gIconSearch } from 'ngx-opendesign';

@Component({
  selector: 'app-example',
  imports: [GIcon],
  template: \`<g-icon [icon]="gIconSearch" size="sm" />\`,
})
export class ExampleComponent {
  protected readonly gIconSearch = gIconSearch;
}`,
    customGlyphSnippet: `import { Component } from '@angular/core';
import { GIcon, GIconGlyph } from 'ngx-opendesign';

const clockIcon: GIconGlyph = {
  viewBox: '0 0 24 24',
  paths: ['M12 7v5l3 2'],
  circles: [{ cx: 12, cy: 12, r: 9 }],
};

@Component({
  selector: 'app-example',
  imports: [GIcon],
  template: \`<g-icon [icon]="clockIcon" />\`,
})
export class ExampleComponent {
  protected readonly clockIcon = clockIcon;
}`,
    apiTitle: 'API — GIcon',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'By default, g-icon is decorative: the host has aria-hidden="true" and no role.',
      'When an icon stands alone and carries meaning, set aria-label or aria-labelledby on <g-icon>. The host switches to role="img" and removes aria-hidden.',
      'The inner SVG always has aria-hidden="true" and focusable="false"; the accessible name always comes from the host.',
    ],
    treeTitle: 'Tree-shaking',
    treeIntro:
      'Each icon is its own export const in icons.ts instead of one shared object/map, so ESM bundlers can remove unused icon exports.',
    treeProof:
      'This was verified with a real production bundle: an app importing one icon did not contain path data for unused icons, while a control build importing the full set did.',
    apiRows: [
      {
        name: 'icon',
        type: 'GIconGlyph',
        default: '—',
        description:
          'Required. A gIconXxx constant from ngx-opendesign, or a custom glyph { viewBox, paths?, circles?, rects? }.',
      },
      {
        name: 'size',
        type: "'sm' | 'md' | 'lg'",
        default: "'md'",
        description: 'Icon size: 16 / 20 / 24px.',
      },
    ],
    demo: {
      copyLabel: (name: string) => 'Copy ' + name,
      copied: 'Copied',
    },
  },
  imagePreview: {
    title: 'Image Preview',
    intro:
      'Thumbnail grid for image lists. It accepts string URLs or File values. Clicking a thumbnail opens a fullscreen lightbox with wheel/button/double-click zoom, pan after zooming, and previous/next navigation when multiple images exist.',
    apiTitle: 'API — GImagePreview',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Each thumbnail is a <button>, and the image inside has descriptive alt text.',
      'The lightbox opens through a CDK overlay with focus trap and restores focus to the thumbnail on close.',
      'Lightbox shortcuts: ←/→ switch images, +/-/0 zoom in/out/reset, Esc closes.',
    ],
    apiRows: [
      {
        name: 'images',
        type: '(string | File)[]',
        default: '[]',
        description: 'Images to show: string URLs or File values.',
      },
      {
        name: 'removable',
        type: 'boolean',
        default: 'false',
        description: 'Shows a remove button on each thumbnail.',
      },
      {
        name: '(remove)',
        type: 'number',
        default: '—',
        description: 'Emits when the remove button is pressed, with the image index.',
      },
    ],
  },
  imageSlider: {
    title: 'Image Slider',
    intro:
      'One-image-per-frame slider with previous/next buttons, position dots, and ←/→ keyboard support. It accepts string URLs or File values. Enable loop for wraparound and lightbox to open the active image fullscreen.',
    apiTitle: 'API — GImageSlider',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The slider region has role="region", aria-roledescription, and ←/→ keyboard handling.',
      'Previous/next controls are <button> elements labeled "Previous image" and "Next image"; they disable at the ends when loop is off.',
      'Each dot is a <button> labeled "Go to image N"; the current dot is marked with aria-current.',
      'A hidden aria-live region announces "Image N/M" after each change.',
    ],
    apiRows: [
      {
        name: 'images',
        type: '(string | File)[]',
        default: '[]',
        description: 'Images to show: string URLs or File values.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Wraparound navigation from last to first and first to last.',
      },
      {
        name: 'lightbox',
        type: 'boolean',
        default: 'false',
        description: 'Clicking the active image opens a fullscreen lightbox.',
      },
    ],
  },
  carousel: {
    title: 'Carousel',
    intro:
      'Horizontal carousel for any content projected through <ng-content>. The track uses scroll-snap; each item keeps its natural width, so equal-size and mixed-size cards both work.',
    usageTitle: 'Usage',
    usageIntro:
      'Place items directly inside <g-carousel> and give each item a width. Carousel handles scrolling, snap, and controls; items can be cards, products, charts, or other content.',
    apiTitle: 'API — GCarousel',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The track is a scroll region with tabindex="0" and role="group"; focus it and use ←/→ to scroll.',
      'The navigation buttons have aria-label and disable/hide at the edges.',
    ],
    apiRows: [
      {
        name: 'navPlacement',
        type: "'overlay' | 'flanking'",
        default: "'flanking'",
        description:
          "Where prev/next buttons are placed. 'flanking' sits outside the track; 'overlay' sits over it.",
      },
      {
        name: 'align',
        type: "'stretch' | 'start' | 'center' | 'end'",
        default: "'stretch'",
        description: 'Cross-axis item alignment when items have different heights.',
      },
      {
        name: 'center',
        type: 'boolean',
        default: 'false',
        description: 'Centers items when they fit inside the frame.',
      },
    ],
    demo: {
      equalCaption: 'Equal-size items — flanking buttons by default',
      overlayCaption: 'Overlay buttons — sit over the track and brighten on hover/focus',
      mixedCaption: 'Mixed-size items — horizontal cards mixed with vertical cards',
      card: (n: number) => `Card ${n}`,
      credit: 'Credit card',
      vertical: 'Vertical card',
    },
  },
  coverflow: {
    title: 'Coverflow',
    intro:
      'Focused carousel: the frame shows three cards, the center card is active and enlarged, and the previous/next cards peek from the sides. It moves by active index through buttons, adjacent-card clicks, or ←/→ keys.',
    usageTitle: 'Usage',
    usageIntro:
      'Place cards directly inside <g-coverflow> and give each card a width smaller than the frame so side cards can peek. The track centers the active card.',
    apiTitle: 'API — GCoverflow',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The track has role="group" and aria-roledescription="focused carousel"; tabindex="0" lets users focus it and move with ←/→.',
      'The navigation buttons have aria-label and disable/hide at the edges.',
    ],
    apiRows: [
      {
        name: 'active',
        type: 'number',
        default: '0',
        description: 'Active card index (two-way [(active)]).',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Wraparound navigation and dot controls.',
      },
    ],
    demo: {
      equalCaption: 'Same-size cards — loop + dot navigation',
      mixedCaption: 'Mixed-size cards — horizontal credit cards mixed with vertical cards',
      credit: 'Credit card',
      vertical: 'Vertical card',
    },
  },
  gallery: {
    title: 'Gallery',
    intro:
      'Product-style image gallery: one large main image plus a thumbnail strip below. Click a thumbnail to change the main image; click the main image to open the lightbox. Accepts URL strings or File values.',
    apiTitle: 'API — GGallery',
    accessibilityTitle: 'Accessibility',
    accessibility: [],
    apiRows: [
      {
        name: 'images',
        type: '(string | File)[]',
        default: '[]',
        description: 'String URL or File images to show.',
      },
    ],
    demo: {
      image: (index: number) => 'Image ' + index,
    },
  },
  mediaPlayer: {
    title: 'Media Player',
    intro:
      'Branded wrapper around native <audio>/<video>. It hides the browser controls and renders an OpenDesign control bar with Play/Pause, time, seek, mute, volume, and fullscreen for video.',
    apiTitle: 'API — GMediaPlayer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Each control button has an aria-label that changes with state: Play/Pause, Mute/Unmute, Fullscreen/Exit fullscreen.',
      'Seek and volume are native input[type="range"] controls, keyboard-accessible with arrow keys.',
    ],
    apiRows: [
      {
        name: 'src',
        type: 'string (required)',
        default: '—',
        description: 'Media file URL.',
      },
      {
        name: 'type',
        type: `'audio' | 'video'`,
        default: `'audio'`,
        description: 'Renders an <audio> or <video> element.',
      },
      {
        name: 'poster',
        type: 'string',
        default: '—',
        description: 'Poster image shown before video playback.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Restarts playback from the beginning when media ends.',
      },
    ],
    note: 'Public sample files are used in the demo (SoundHelix, Google sample videos) for illustration only.',
  },
  terminal: {
    title: 'Terminal',
    intro:
      'Simulated command-line window with a title bar, scrollable mono log, and prompt input. The dark surface is fixed across themes. It is data-driven through [lines], and pressing Enter emits (run).',
    apiTitle: 'API — GTerminal',
    accessibilityTitle: 'Accessibility',
    accessibility: [],
    apiRows: [
      {
        name: 'lines',
        type: 'GTerminalLine[]',
        default: '[]',
        description:
          'Log lines. Each line is `{ text, kind? }`; kind can be command, output, success, or error.',
      },
      {
        name: 'run',
        type: 'output<string>',
        default: '—',
        description: 'Emits the command string after typing and pressing Enter.',
      },
      {
        name: 'title',
        type: 'string',
        default: "'Terminal'",
        description: 'Title shown in the terminal title bar.',
      },
      {
        name: 'prompt',
        type: 'string',
        default: "'$'",
        description: 'Prompt text shown before the input.',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'true',
        description: 'Whether the command input is rendered.',
      },
    ],
    demo: {
      lines: [
        { text: 'opendesign@dev ~ %', kind: 'output' },
        { text: 'ng build ngx-opendesign', kind: 'command' },
        { text: '✔ Building Angular Package', kind: 'success' },
        { text: 'Build at: 2026-07-20 — Time: 1245ms', kind: 'output' },
        { text: 'npm test', kind: 'command' },
        { text: '✖ 1 test failed', kind: 'error' },
        { text: 'Try typing a command and press Enter...', kind: 'output' },
      ],
      ran: (command: string) => 'Ran: ' + command + ' (sample output)',
    },
  },
  divider: {
    title: 'Divider',
    intro:
      'Separator line between content blocks. Horizontal is the default and fills available width; vertical works inside horizontal rows. A projected label can sit in the middle.',
    apiTitle: 'API — GDivider',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The host uses role="separator" and aria-orientation so assistive technology understands the boundary.',
      'A label, when present, is normal text and is read with the surrounding context.',
    ],
    apiRows: [
      {
        name: 'orientation',
        type: `'horizontal' | 'vertical'`,
        default: `'horizontal'`,
        description: 'Line orientation.',
      },
    ],
    demo: {
      above: 'Content above.',
      below: 'Content below.',
      or: 'OR',
      itemA: 'Item A',
      itemB: 'Item B',
      itemC: 'Item C',
    },
  },
};

export function displayCopyFor(tag: string): DisplayCopy {
  return tag.startsWith('en') ? EN_DISPLAY : VI_DISPLAY;
}
