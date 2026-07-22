interface TokenCopyRow {
  name: string;
  value: string;
  description: string;
}

export interface FoundationCopy {
  colors: {
    title: string;
    intro: string;
    semanticTitle: string;
    stateTitle: string;
    stateBody: string;
    principlesTitle: string;
    principles: string[];
    semanticRows: TokenCopyRow[];
    stateRows: TokenCopyRow[];
  };
  darkMode: {
    intro: string;
    enableTitle: string;
    enableBody: string;
    themeServiceTitle: string;
    themeServiceBody: string;
    colorSchemeTitle: string;
    colorSchemeBody: string;
    colorSchemeIntro: string;
    colorSchemeDecision: string;
    note: string;
    overrideTitle: string;
    overrideBody: string;
    toggleSnippet: string;
    colorSchemeSnippet: string;
    overrideSnippet: string;
  };
  radiusSpacing: {
    title: string;
    intro: string;
    radiusTitle: string;
    radiusNote: string;
    controlTitle: string;
    spacingTitle: string;
    elevationMotionTitle: string;
    radiusRows: TokenCopyRow[];
    controlRows: TokenCopyRow[];
    spacingRows: TokenCopyRow[];
    elevationMotionRows: TokenCopyRow[];
  };
  typography: {
    title: string;
    intro: string;
    samples: string[];
    tokenTitle: string;
    whereTitle: string;
    whereItems: string[];
    rows: TokenCopyRow[];
  };
}

const VI_FOUNDATIONS: FoundationCopy = {
  colors: {
    title: 'Màu sắc',
    intro:
      "Màu là biến CSS --g-*, định nghĩa trong opendesign.scss — một bảng cho giao diện sáng, một bảng override trong [data-g-theme='dark']. Component không tự chọn màu, chỉ đọc token, nên toàn bộ trang đổi màu đồng loạt khi bạn đổi theme. Ô màu ở các bảng dưới đây đọc token sống nên đổi theo theme hiện tại; mã hex liệt kê kế bên luôn là giá trị của bảng sáng (dùng để tham khảo, không phải giá trị đang hiển thị khi ở chế độ tối).",
    semanticTitle: 'Màu semantic',
    stateTitle: 'Màu trạng thái',
    stateBody:
      'Mỗi trạng thái (thành công/cảnh báo/lỗi) có ba token: chữ, nền nhạt, và màu đặc (solid).',
    principlesTitle: 'Nguyên tắc',
    principles: [
      'Bảng màu của OpenDesign đơn sắc tối giản — --g-primary và các token chữ/nền/viền đều là sắc độ xám. Màu chỉ xuất hiện ở nhóm trạng thái (success/warning/danger).',
      'Đừng dùng màu làm kênh thông tin duy nhất: chữ hoặc icon phải tự nói lên trạng thái, màu chỉ là gia cố trực quan (vd. Badge variant="danger" vẫn cần chữ "Lỗi", không chỉ badge đỏ trống).',
    ],
    semanticRows: [
      { name: '--g-bg', value: '#ffffff', description: 'Nền trang.' },
      { name: '--g-surface', value: '#f5f5f6', description: 'Nền bề mặt (card, nền phụ).' },
      {
        name: '--g-surface-raised',
        value: '#ffffff',
        description: 'Nền bề mặt nổi (dialog, toast).',
      },
      { name: '--g-text', value: '#18181b', description: 'Màu chữ chính.' },
      { name: '--g-text-muted', value: '#71717a', description: 'Màu chữ phụ, ít nhấn mạnh.' },
      { name: '--g-border', value: '#e4e4e7', description: 'Viền mặc định.' },
      {
        name: '--g-border-strong',
        value: '#d4d4d8',
        description: 'Viền đậm hơn (hover, nhấn mạnh).',
      },
      {
        name: '--g-primary',
        value: '#141416',
        description: 'Màu chủ đạo — nút chính, trạng thái được chọn.',
      },
      { name: '--g-primary-hover', value: '#2d2d30', description: 'Màu chủ đạo khi hover.' },
      {
        name: '--g-on-primary',
        value: '#ffffff',
        description: 'Màu chữ/icon đặt trên nền primary.',
      },
      { name: '--g-secondary-bg', value: '#ececee', description: 'Nền nút/thành phần phụ.' },
      {
        name: '--g-secondary-text',
        value: '#3f3f46',
        description: 'Màu chữ trên nền secondary.',
      },
    ],
    stateRows: [
      { name: '--g-success-text', value: '#15803d', description: 'Chữ trạng thái thành công.' },
      { name: '--g-success-bg', value: '#e8f7ee', description: 'Nền nhạt trạng thái thành công.' },
      {
        name: '--g-success-solid',
        value: '#16a34a',
        description: 'Màu đặc trạng thái thành công.',
      },
      { name: '--g-warning-text', value: '#a16207', description: 'Chữ trạng thái cảnh báo.' },
      { name: '--g-warning-bg', value: '#fcf4e0', description: 'Nền nhạt trạng thái cảnh báo.' },
      { name: '--g-warning-solid', value: '#d97706', description: 'Màu đặc trạng thái cảnh báo.' },
      { name: '--g-danger-text', value: '#b91c1c', description: 'Chữ trạng thái lỗi.' },
      { name: '--g-danger-bg', value: '#fdecec', description: 'Nền nhạt trạng thái lỗi.' },
      { name: '--g-danger-solid', value: '#dc2626', description: 'Màu đặc trạng thái lỗi.' },
    ],
  },
  darkMode: {
    intro:
      'OpenDesign có sẵn hai bảng màu — sáng (mặc định) và tối. Đổi theme bằng một thuộc tính trên thẻ <html>, không cần build lại hay sửa component nào: mọi component đều đọc token --g-* nên tự đổi màu đồng loạt.',
    enableTitle: 'Cách bật',
    enableBody:
      'Đặt data-g-theme="dark" lên <html>. Gỡ thuộc tính (hoặc đặt giá trị khác "dark") để quay về giao diện sáng:',
    themeServiceTitle: 'ThemeService mẫu',
    themeServiceBody:
      'OpenDesign không đi kèm service quản lý theme — tự viết một service nhỏ như sau là đủ:',
    colorSchemeTitle: 'color-scheme: UI gốc của trình duyệt cũng phải đổi theo',
    colorSchemeBody:
      'CSS variable (--g-*) chỉ đổi màu những gì component tự vẽ. Có một lớp giao diện CSS variable không với tới được: những phần do chính trình duyệt vẽ — thanh cuộn là rõ nhất, cùng với ô chọn ngày/giờ (<input type="date">), nền gợi ý autofill, và gạch chân từ bị đánh dấu sai chính tả (spellcheck). Thuộc tính CSS color-scheme báo cho trình duyệt biết bề mặt hiện tại đang sáng hay tối, để nó tự vẽ những phần đó theo đúng theme.',
    colorSchemeIntro: 'OpenDesign khai báo sẵn trong opendesign.scss:',
    colorSchemeDecision:
      'Cố ý dùng giá trị đơn (light hoặc dark) thay vì light dark: theme của OpenDesign do bạn (qua data-g-theme) quyết định, không chạy theo prefers-color-scheme của hệ điều hành — nên phải khai báo đúng cái đang thực sự hiển thị, không phải "cả hai đều được".',
    note: 'Kết quả: bật chế độ tối là thanh cuộn tối theo ngay, và vẫn giữ đúng kiểu thanh cuộn quen thuộc của từng hệ điều hành (macOS vẫn là overlay tự ẩn). Nếu muốn thanh cuộn mảnh hơn hoặc đổi màu riêng, dùng scrollbar-width và scrollbar-color ở phía ứng dụng — lưu ý trên macOS phải đặt scrollbar-width thì màu tùy chỉnh mới hiện, và điều đó sẽ ép thanh cuộn luôn hiện thay vì tự ẩn.',
    overrideTitle: 'Ghi đè token cho từng theme',
    overrideBody:
      "Token là CSS custom property nên ghi đè bằng CSS thuần sau khi import opendesign.css. Ghi đè trong [data-g-theme='dark'] để chỉ áp dụng cho giao diện tối:",
    toggleSnippet: `document.documentElement.setAttribute('data-g-theme', 'dark');
// ...hoặc gỡ để quay về sáng:
document.documentElement.removeAttribute('data-g-theme');`,
    colorSchemeSnippet: `:root {
  color-scheme: light;
  /* ...token màu sáng */
}

[data-g-theme='dark'] {
  color-scheme: dark;
  /* ...token màu tối */
}`,
    overrideSnippet: `/* Ghi đè sau khi import opendesign.css */
:root {
  --g-primary: #4f46e5;
  --g-primary-hover: #4338ca;
  --g-radius-sm: 12px;
}

[data-g-theme='dark'] {
  --g-primary: #818cf8;
  --g-primary-hover: #a5b4fc;
}`,
  },
  radiusSpacing: {
    title: 'Radius & Spacing',
    intro:
      'Bo góc lớn là linh hồn thẩm mỹ của OpenDesign; spacing theo thang bậc 4px giữ nhịp đều trên toàn bộ giao diện.',
    radiusTitle: 'Radius',
    radiusNote:
      'Nguyên tắc: --g-radius-pill cho control tương tác (button, input, chip, tab), --g-radius-sm cho bề mặt chứa nội dung (textarea, tooltip, card), --g-radius-md cho panel nổi (dialog, toast).',
    controlTitle: 'Control height',
    spacingTitle: 'Spacing',
    elevationMotionTitle: 'Elevation & Motion',
    radiusRows: [
      {
        name: '--g-radius-pill',
        value: '9999px',
        description: 'Bo tròn hoàn toàn — control tương tác.',
      },
      { name: '--g-radius-sm', value: '8px', description: 'Bo góc nhỏ — bề mặt chứa nội dung.' },
      { name: '--g-radius-md', value: '12px', description: 'Bo góc vừa — panel nổi.' },
    ],
    controlRows: [
      { name: '--g-control-sm', value: '32px', description: 'Chiều cao control nhỏ.' },
      { name: '--g-control-md', value: '40px', description: 'Chiều cao control mặc định.' },
      { name: '--g-control-lg', value: '48px', description: 'Chiều cao control lớn.' },
    ],
    spacingRows: [
      { name: '--g-space-1', value: '4px', description: 'Bậc 1.' },
      { name: '--g-space-2', value: '8px', description: 'Bậc 2.' },
      { name: '--g-space-3', value: '12px', description: 'Bậc 3.' },
      { name: '--g-space-4', value: '16px', description: 'Bậc 4.' },
      { name: '--g-space-5', value: '20px', description: 'Bậc 5.' },
      { name: '--g-space-6', value: '24px', description: 'Bậc 6.' },
      { name: '--g-space-7', value: '32px', description: 'Bậc 7.' },
      { name: '--g-space-8', value: '40px', description: 'Bậc 8.' },
    ],
    elevationMotionRows: [
      {
        name: '--g-shadow-sm',
        value: '0 1px 2px rgb(0 0 0 / 0.06)',
        description: 'Bóng đổ nhẹ.',
      },
      {
        name: '--g-shadow-md',
        value: '0 4px 12px rgb(0 0 0 / 0.1)',
        description: 'Bóng đổ vừa.',
      },
      {
        name: '--g-shadow-lg',
        value: '0 12px 32px rgb(0 0 0 / 0.16)',
        description: 'Bóng đổ mạnh — dialog.',
      },
      { name: '--g-duration-fast', value: '120ms', description: 'Thời lượng transition nhanh.' },
      { name: '--g-duration-base', value: '200ms', description: 'Thời lượng transition mặc định.' },
      { name: '--g-ease', value: 'cubic-bezier(0.2, 0, 0, 1)', description: 'Easing dùng chung.' },
      {
        name: '--g-focus-ring',
        value: '0 0 0 2px var(--g-bg), 0 0 0 4px var(--g-primary)',
        description:
          'box-shadow cho trạng thái :focus-visible. Mọi component đều dùng token này; gán trực tiếp nếu bạn tự làm control cần khớp theme.',
      },
    ],
  },
  typography: {
    title: 'Typography',
    intro:
      'OpenDesign dùng system font stack — không tải font ngoài, không có flash-of-unstyled-text, và render tiếng Việt (dấu, thanh điệu) tốt trên mọi hệ điều hành bằng đúng font mặc định của máy người dùng.',
    samples: [
      'Cỡ xs (12px) — Sương mù trên đỉnh núi tan dần lúc bình minh.',
      'Cỡ sm (13px) — Sương mù trên đỉnh núi tan dần lúc bình minh.',
      'Cỡ md (14px) — Sương mù trên đỉnh núi tan dần lúc bình minh.',
      'Cỡ lg (16px) — Sương mù trên đỉnh núi tan dần lúc bình minh.',
    ],
    tokenTitle: 'Token',
    whereTitle: 'Dùng ở đâu',
    whereItems: [
      '--g-font-size-xs/sm: chữ phụ, nhãn, timestamp.',
      '--g-font-size-md: cỡ mặc định cho control (input, button) và nội dung.',
      '--g-font-size-lg: tiêu đề nhỏ, tagline.',
    ],
    rows: [
      {
        name: '--g-font-family',
        value: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
        description: 'System font stack — không tải font ngoài.',
      },
      { name: '--g-font-size-xs', value: '12px', description: 'Cỡ chữ nhỏ nhất.' },
      { name: '--g-font-size-sm', value: '13px', description: 'Cỡ chữ phụ.' },
      { name: '--g-font-size-md', value: '14px', description: 'Cỡ chữ mặc định.' },
      { name: '--g-font-size-lg', value: '16px', description: 'Cỡ chữ lớn nhất.' },
    ],
  },
};

const EN_FOUNDATIONS: FoundationCopy = {
  colors: {
    title: 'Colors',
    intro:
      "Colors are CSS variables named --g-*. They are defined in opendesign.scss with one palette for light mode and one override palette under [data-g-theme='dark']. Components do not choose colors directly; they read tokens, so the whole page updates together when the theme changes. The swatches below read live tokens and follow the current theme. The hex values beside them are always the light palette values for reference, not necessarily the color currently rendered in dark mode.",
    semanticTitle: 'Semantic colors',
    stateTitle: 'State colors',
    stateBody:
      'Each state (success/warning/danger) has three tokens: text, subtle background, and solid color.',
    principlesTitle: 'Principles',
    principles: [
      'OpenDesign uses a minimal monochrome base palette: --g-primary and the text/background/border tokens are gray-scale values. Color appears only in state groups (success/warning/danger).',
      'Do not use color as the only information channel. Text or an icon must communicate the state by itself; color only reinforces it visually. For example, a Badge with variant="danger" still needs text such as "Error", not an empty red badge.',
    ],
    semanticRows: [
      { name: '--g-bg', value: '#ffffff', description: 'Page background.' },
      {
        name: '--g-surface',
        value: '#f5f5f6',
        description: 'Surface background for cards and secondary areas.',
      },
      {
        name: '--g-surface-raised',
        value: '#ffffff',
        description: 'Raised surface background for dialogs and toasts.',
      },
      { name: '--g-text', value: '#18181b', description: 'Primary text color.' },
      { name: '--g-text-muted', value: '#71717a', description: 'Muted supporting text.' },
      { name: '--g-border', value: '#e4e4e7', description: 'Default border.' },
      {
        name: '--g-border-strong',
        value: '#d4d4d8',
        description: 'Stronger border for hover and emphasis.',
      },
      {
        name: '--g-primary',
        value: '#141416',
        description: 'Primary color for primary buttons and selected states.',
      },
      { name: '--g-primary-hover', value: '#2d2d30', description: 'Primary color on hover.' },
      {
        name: '--g-on-primary',
        value: '#ffffff',
        description: 'Text and icon color placed on primary backgrounds.',
      },
      {
        name: '--g-secondary-bg',
        value: '#ececee',
        description: 'Background for secondary controls.',
      },
      {
        name: '--g-secondary-text',
        value: '#3f3f46',
        description: 'Text color on secondary backgrounds.',
      },
    ],
    stateRows: [
      { name: '--g-success-text', value: '#15803d', description: 'Success state text.' },
      { name: '--g-success-bg', value: '#e8f7ee', description: 'Subtle success background.' },
      { name: '--g-success-solid', value: '#16a34a', description: 'Solid success color.' },
      { name: '--g-warning-text', value: '#a16207', description: 'Warning state text.' },
      { name: '--g-warning-bg', value: '#fcf4e0', description: 'Subtle warning background.' },
      { name: '--g-warning-solid', value: '#d97706', description: 'Solid warning color.' },
      { name: '--g-danger-text', value: '#b91c1c', description: 'Danger state text.' },
      { name: '--g-danger-bg', value: '#fdecec', description: 'Subtle danger background.' },
      { name: '--g-danger-solid', value: '#dc2626', description: 'Solid danger color.' },
    ],
  },
  darkMode: {
    intro:
      'OpenDesign ships with two palettes: light (default) and dark. Switch theme with one attribute on the <html> element. No rebuild or component edits are required because every component reads --g-* tokens and updates together.',
    enableTitle: 'How to enable',
    enableBody:
      'Set data-g-theme="dark" on <html>. Remove the attribute (or set a value other than "dark") to return to light mode:',
    themeServiceTitle: 'Sample ThemeService',
    themeServiceBody:
      'OpenDesign does not ship a theme manager. A small app-level service like this is enough:',
    colorSchemeTitle: 'color-scheme: native browser UI should follow too',
    colorSchemeBody:
      'CSS variables (--g-*) only recolor what components draw themselves. Some UI is drawn by the browser: scrollbars are the clearest example, along with date/time inputs, autofill backgrounds, and spellcheck underlines. The CSS color-scheme property tells the browser whether the current surface is light or dark so it can draw those native pieces in the right theme.',
    colorSchemeIntro: 'OpenDesign declares this in opendesign.scss:',
    colorSchemeDecision:
      'The theme intentionally uses a single value (light or dark) instead of light dark. OpenDesign theme selection is controlled by you through data-g-theme, not by the operating system prefers-color-scheme setting, so the declaration must match what is actually rendered.',
    note: 'Result: enabling dark mode also makes scrollbars dark while preserving the native scrollbar behavior of each operating system. For thinner or custom-colored scrollbars, use scrollbar-width and scrollbar-color in the app. On macOS, setting scrollbar-width is what makes custom colors visible, and it also forces scrollbars to remain visible instead of overlaying and auto-hiding.',
    overrideTitle: 'Override tokens per theme',
    overrideBody:
      "Tokens are CSS custom properties, so override them with plain CSS after importing opendesign.css. Put overrides under [data-g-theme='dark'] when they should apply only to dark mode:",
    toggleSnippet: `document.documentElement.setAttribute('data-g-theme', 'dark');
// ...or remove it to return to light:
document.documentElement.removeAttribute('data-g-theme');`,
    colorSchemeSnippet: `:root {
  color-scheme: light;
  /* ...light color tokens */
}

[data-g-theme='dark'] {
  color-scheme: dark;
  /* ...dark color tokens */
}`,
    overrideSnippet: `/* Override after importing opendesign.css */
:root {
  --g-primary: #4f46e5;
  --g-primary-hover: #4338ca;
  --g-radius-sm: 12px;
}

[data-g-theme='dark'] {
  --g-primary: #818cf8;
  --g-primary-hover: #a5b4fc;
}`,
  },
  radiusSpacing: {
    title: 'Radius & Spacing',
    intro:
      'Large radii are central to OpenDesign’s visual language, while a 4px spacing scale keeps rhythm consistent across the interface.',
    radiusTitle: 'Radius',
    radiusNote:
      'Rule of thumb: use --g-radius-pill for interactive controls (button, input, chip, tab), --g-radius-sm for content surfaces (textarea, tooltip, card), and --g-radius-md for raised panels (dialog, toast).',
    controlTitle: 'Control height',
    spacingTitle: 'Spacing',
    elevationMotionTitle: 'Elevation & Motion',
    radiusRows: [
      {
        name: '--g-radius-pill',
        value: '9999px',
        description: 'Fully rounded — interactive controls.',
      },
      { name: '--g-radius-sm', value: '8px', description: 'Small radius — content surfaces.' },
      { name: '--g-radius-md', value: '12px', description: 'Medium radius — raised panels.' },
    ],
    controlRows: [
      { name: '--g-control-sm', value: '32px', description: 'Small control height.' },
      { name: '--g-control-md', value: '40px', description: 'Default control height.' },
      { name: '--g-control-lg', value: '48px', description: 'Large control height.' },
    ],
    spacingRows: [
      { name: '--g-space-1', value: '4px', description: 'Step 1.' },
      { name: '--g-space-2', value: '8px', description: 'Step 2.' },
      { name: '--g-space-3', value: '12px', description: 'Step 3.' },
      { name: '--g-space-4', value: '16px', description: 'Step 4.' },
      { name: '--g-space-5', value: '20px', description: 'Step 5.' },
      { name: '--g-space-6', value: '24px', description: 'Step 6.' },
      { name: '--g-space-7', value: '32px', description: 'Step 7.' },
      { name: '--g-space-8', value: '40px', description: 'Step 8.' },
    ],
    elevationMotionRows: [
      { name: '--g-shadow-sm', value: '0 1px 2px rgb(0 0 0 / 0.06)', description: 'Light shadow.' },
      {
        name: '--g-shadow-md',
        value: '0 4px 12px rgb(0 0 0 / 0.1)',
        description: 'Medium shadow.',
      },
      {
        name: '--g-shadow-lg',
        value: '0 12px 32px rgb(0 0 0 / 0.16)',
        description: 'Strong shadow for dialogs.',
      },
      { name: '--g-duration-fast', value: '120ms', description: 'Fast transition duration.' },
      { name: '--g-duration-base', value: '200ms', description: 'Default transition duration.' },
      {
        name: '--g-ease',
        value: 'cubic-bezier(0.2, 0, 0, 1)',
        description: 'Shared easing curve.',
      },
      {
        name: '--g-focus-ring',
        value: '0 0 0 2px var(--g-bg), 0 0 0 4px var(--g-primary)',
        description:
          'box-shadow for :focus-visible. Every component uses this token; assign it directly when you build a custom control that should match the theme.',
      },
    ],
  },
  typography: {
    title: 'Typography',
    intro:
      'OpenDesign uses a system font stack. It loads no external font, avoids flash-of-unstyled-text, and renders Vietnamese marks well on every operating system through the user’s native fonts.',
    samples: [
      'Size xs (12px) — Morning light clears the ridge line.',
      'Size sm (13px) — Morning light clears the ridge line.',
      'Size md (14px) — Morning light clears the ridge line.',
      'Size lg (16px) — Morning light clears the ridge line.',
    ],
    tokenTitle: 'Tokens',
    whereTitle: 'Where to use them',
    whereItems: [
      '--g-font-size-xs/sm: supporting text, labels, timestamps.',
      '--g-font-size-md: default size for controls (input, button) and body content.',
      '--g-font-size-lg: small headings and taglines.',
    ],
    rows: [
      {
        name: '--g-font-family',
        value: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
        description: 'System font stack with no external font download.',
      },
      { name: '--g-font-size-xs', value: '12px', description: 'Smallest text size.' },
      { name: '--g-font-size-sm', value: '13px', description: 'Supporting text size.' },
      { name: '--g-font-size-md', value: '14px', description: 'Default text size.' },
      { name: '--g-font-size-lg', value: '16px', description: 'Largest text size.' },
    ],
  },
};

export function foundationCopyFor(tag: string): FoundationCopy {
  return tag === 'vi-VN' ? VI_FOUNDATIONS : EN_FOUNDATIONS;
}
