import { ApiRow } from '../shared/api-table';

interface LayoutPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  accessibilityTitle: string;
  accessibility: string[];
  apiRows: ApiRow[];
}

interface ContainerCopy extends LayoutPageCopy {
  demo: {
    body: string;
    note: string;
  };
}

interface StackCopy extends LayoutPageCopy {
  wrapTitle: string;
  wrapIntro: string;
  demo: {
    rows: string[];
    columns: string[];
    tags: string[];
  };
}

interface GridCopy extends LayoutPageCopy {
  demo: {
    equalTitle: string;
    responsiveTitle: string;
    cell: (n: number) => string;
  };
}

interface AppLayoutCopy extends LayoutPageCopy {
  regionsTitle: string;
  regions: string[];
  demo: {
    app: string;
    notifications: string;
    home: string;
    reports: string;
    settings: string;
    overview: string;
    contentIntro: string;
    layoutIntro: string;
    scrollTitle: string;
    scrollReason: string;
    technique: string;
    tryScrollTitle: string;
    tryScroll: string;
    filler: string;
    bottom: string;
  };
}

interface SplitterCopy extends LayoutPageCopy {
  demo: {
    horizontalCaption: string;
    verticalCaption: string;
    panel1: string;
    panel2: string;
    top: string;
    middle: string;
    bottom: string;
  };
}

interface ScrollPanelCopy extends LayoutPageCopy {
  demo: {
    paragraphs: string[];
  };
}

interface LayoutCopy {
  container: ContainerCopy;
  stack: StackCopy;
  grid: GridCopy;
  layout: AppLayoutCopy;
  splitter: SplitterCopy;
  scrollPanel: ScrollPanelCopy;
}

const VI_LAYOUT: LayoutCopy = {
  container: {
    title: 'Container',
    intro:
      'Directive gContainer gắn class .g-container lên phần tử bất kỳ — giới hạn chiều rộng tối đa và canh giữa theo chiều ngang, giúp vùng nội dung đọc dễ hơn trên màn hình rộng. Không có input, không có output — thuần bố cục.',
    apiTitle: 'API — GContainer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Thuần bố cục — không đặt role hay thuộc tính ARIA nào lên phần tử host, không ảnh hưởng tới accessibility tree.',
    ],
    apiRows: [
      {
        name: '[gContainer]',
        type: '(directive)',
        default: '—',
        description: 'Gắn class .g-container lên phần tử host — không có input, không có output.',
      },
      {
        name: '--g-container-max-width',
        type: 'token CSS',
        default: '960px',
        description: 'Chiều rộng tối đa của .g-container — ghi đè để đổi ngưỡng canh giữa.',
      },
    ],
    demo: {
      body: 'Nội dung bên trong gContainer bị giới hạn chiều rộng tối đa và canh giữa theo chiều ngang — chiều rộng tối đa lấy từ token --g-container-max-width (mặc định 960px, demo này ghi đè xuống 480px để thấy rõ hiệu ứng).',
      note: 'Khi vùng chứa rộng hơn giá trị này, khoảng trống hai bên tự chia đều.',
    },
  },
  stack: {
    title: 'Stack',
    intro:
      'Component g-stack xếp các phần tử con theo flexbox — dọc (column) hoặc ngang (row), với khoảng cách đều nhau theo thang token --g-space-N.',
    wrapTitle: 'Wrap & căn chỉnh',
    wrapIntro:
      'Xếp ngang với [wrap]="true" để các phần tử tự xuống dòng khi hết chỗ; kết hợp align/justify để căn theo hai trục.',
    apiTitle: 'API — GStack',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Thuần bố cục — không đặt role hay thuộc tính ARIA nào lên phần tử host, không ảnh hưởng tới accessibility tree.',
    ],
    apiRows: [
      {
        name: 'direction',
        type: `'vertical' | 'horizontal'`,
        default: `'vertical'`,
        description: 'Hướng xếp: vertical → flex-direction column, horizontal → row.',
      },
      {
        name: 'gap',
        type: 'number (0–8)',
        default: '4',
        description: 'Khoảng cách giữa các phần tử con, map tới token --g-space-N. 0 → không giãn.',
      },
      {
        name: 'align',
        type: 'string',
        default: '—',
        description: 'Giá trị CSS align-items tuỳ chọn.',
      },
      {
        name: 'justify',
        type: 'string',
        default: '—',
        description: 'Giá trị CSS justify-content tuỳ chọn.',
      },
      {
        name: 'wrap',
        type: 'boolean',
        default: 'false',
        description: 'Cho phép xuống dòng (flex-wrap: wrap) khi các phần tử tràn khỏi trục chính.',
      },
    ],
    demo: {
      rows: ['Hàng 1', 'Hàng 2', 'Hàng 3'],
      columns: ['Cột 1', 'Cột 2', 'Cột 3'],
      tags: [
        'Angular',
        'Signals',
        'Standalone',
        'Zoneless',
        'OnPush',
        'Design System',
        'Accessibility',
        'Tree-shakable',
        'TypeScript',
        'CSS Grid',
      ],
    },
  },
  grid: {
    title: 'Grid',
    intro:
      'Primitive bố cục lưới CSS. Đặt cols để có số cột đều nhau, hoặc minColWidth để lưới tự xếp số cột theo bề rộng khả dụng (responsive auto-fill). Khoảng cách gap theo thang token --g-space-N.',
    apiTitle: 'API — GGrid',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Thuần bố cục — không đặt role hay ARIA nào lên host, không ảnh hưởng accessibility tree.',
    ],
    apiRows: [
      {
        name: 'cols',
        type: 'number',
        default: '2',
        description: 'Số cột đều nhau (repeat(cols, 1fr)). Bị bỏ qua khi có minColWidth.',
      },
      {
        name: 'minColWidth',
        type: 'string',
        default: '—',
        description:
          'Bề rộng tối thiểu mỗi cột (vd "200px") → responsive repeat(auto-fill, minmax(min, 1fr)).',
      },
      {
        name: 'gap',
        type: 'number (0–8)',
        default: '4',
        description: 'Khoảng cách hàng/cột, map tới token --g-space-N. 0 → không giãn.',
      },
    ],
    demo: {
      equalTitle: '3 cột đều',
      responsiveTitle: 'Responsive — tự xếp theo bề rộng tối thiểu 160px',
      cell: (n: number) => `Ô ${n}`,
    },
  },
  layout: {
    title: 'Layout',
    intro:
      'Component g-layout dựng app-shell: topbar (đỉnh) + sidebar (trái) + nội dung — ba region chiếu qua content projection, không có input. Bố cục lưới CSS tự chọn theo region nào thực sự có mặt trong markup. Chỉ vùng nội dung cuộn; topbar và sidebar luôn đứng yên.',
    apiTitle: 'API — GLayout',
    regionsTitle: '3 vùng qua content projection',
    regions: [
      '<g-topbar> — đặt làm con trực tiếp của <g-layout> để chiếu vào vùng đỉnh, chiều rộng đầy đủ.',
      '<g-sidebar> — đặt làm con trực tiếp để chiếu vào vùng trái, chiều cao đầy đủ.',
      'Mọi nội dung khác tự rơi vào vùng nội dung .g-layout__main, phần duy nhất có overflow: auto.',
    ],
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'g-layout thuần bố cục — không đặt role hay thuộc tính ARIA nào lên host hay các vùng con. Mỗi region giữ nguyên semantics của chính component đó; nội dung trong vùng content nên tự bọc trong <main> hoặc thẻ ngữ nghĩa phù hợp.',
    ],
    apiRows: [
      {
        name: 'g-layout',
        type: '(component)',
        default: '—',
        description:
          'Container app-shell, không có input. Bố cục quyết định bởi region nào được projected.',
      },
    ],
    demo: {
      app: 'Ứng dụng',
      notifications: 'Thông báo',
      home: 'Trang chủ',
      reports: 'Báo cáo',
      settings: 'Cài đặt',
      overview: 'Tổng quan',
      contentIntro:
        'Đây là vùng nội dung chính của app-shell — phần DUY NHẤT cuộn khi nội dung dài hơn khung hiển thị. Topbar phía trên và sidebar bên trái đứng yên, không cuộn theo.',
      layoutIntro:
        'g-layout tự chọn bố cục lưới dựa trên những region đang có mặt: chỉ cần đặt <g-topbar> và/hoặc <g-sidebar> làm con trực tiếp, phần còn lại tự rơi vào vùng nội dung cuộn được.',
      scrollTitle: 'Vì sao chỉ content cuộn',
      scrollReason:
        'Trong một app-shell thật, topbar thường mang logo/điều hướng nhanh, sidebar mang menu chính — cả hai cần đứng yên để người dùng luôn thấy được, kể cả khi đang đọc một trang nội dung rất dài.',
      technique:
        'Kỹ thuật: .g-layout cố định chiều cao bằng 100vh và overflow: hidden; chỉ .g-layout__main có overflow: auto.',
      tryScrollTitle: 'Thử cuộn',
      tryScroll:
        'Cuộn xuống trong khung demo này để thấy topbar và sidebar giữ nguyên vị trí, chỉ phần chữ bên dưới di chuyển.',
      filler:
        'Đoạn văn này chỉ để kéo dài nội dung cho đủ chiều cao cuộn — không mang thông tin gì thêm ngoài việc minh hoạ hành vi cuộn độc lập của vùng content.',
      bottom:
        'Tiếp tục cuộn xuống dưới cùng để xác nhận toàn bộ nội dung đã hiển thị hết, trong khi topbar và sidebar không hề nhúc nhích.',
    },
  },
  splitter: {
    title: 'Splitter',
    intro:
      'Bố cục chia panel có thanh kéo (gutter) để đổi kích thước hai bên. Mỗi panel chiếu qua <ng-template gSplitterPanel>; Splitter tự chèn gutter giữa các panel liền kề và hỗ trợ N panel. Kéo gutter chỉ đổi cặp panel hai bên nó, tổng giữ nguyên; kéo bằng chuột, cảm ứng, hoặc phím ←/→ (dọc: ↑/↓).',
    apiTitle: 'API — GSplitter',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mỗi gutter là role="separator" có tabindex, aria-orientation và aria-valuenow; chỉnh bằng phím mũi tên.',
    ],
    apiRows: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: "Chiều chia: 'horizontal' cạnh nhau, 'vertical' xếp chồng.",
      },
      {
        name: 'sizes',
        type: 'number[]',
        default: 'chia đều',
        description: 'Kích thước ban đầu mỗi panel (trọng số, thường cộng = 100).',
      },
      {
        name: 'minSize',
        type: 'number',
        default: '8',
        description: 'Trọng số tối thiểu mỗi panel (chặn kéo thu về 0).',
      },
      {
        name: 'sizeChange',
        type: 'output<number[]>',
        default: '—',
        description: 'Phát mảng trọng số mới mỗi khi kéo/nhấn phím đổi kích thước.',
      },
    ],
    demo: {
      horizontalCaption: 'Ngang — kéo thanh giữa để đổi chiều rộng hai bên',
      verticalCaption: 'Dọc + nhiều panel (kéo từng thanh)',
      panel1: 'Panel 1',
      panel2: 'Panel 2',
      top: 'Trên',
      middle: 'Giữa',
      bottom: 'Dưới',
    },
  },
  scrollPanel: {
    title: 'Scroll Panel',
    intro:
      'Vùng cuộn với thanh cuộn mảnh theo theme. Thuần CSS (scrollbar-width/scrollbar-color) — không dùng JavaScript để vẽ scrollbar tuỳ chỉnh. Đặt maxHeight hoặc height để giới hạn kích thước rồi cuộn nội dung chiếu bên trong.',
    apiTitle: 'API — GScrollPanel',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Cuộn bằng chuột/trackpad hoạt động ngay trên vùng chứa; nếu cần cuộn bằng bàn phím, hãy đảm bảo nội dung bên trong có phần tử focus được vì bản thân g-scroll-panel không tự thêm tabindex.',
      'Không thêm role hay landmark nào — đây là vùng cuộn thuần bố cục, dùng ARIA landmark riêng ở phía consumer nếu nội dung bên trong cần được công bố.',
    ],
    apiRows: [
      {
        name: 'maxHeight',
        type: 'string',
        default: '—',
        description: 'Chiều cao tối đa (vd "180px"); nội dung vượt quá sẽ cuộn bên trong.',
      },
      {
        name: 'height',
        type: 'string',
        default: '—',
        description: 'Chiều cao cố định cho vùng cuộn (vd "240px").',
      },
    ],
    demo: {
      paragraphs: [
        'OpenDesign là một thư viện component cho Angular, tập trung vào thẩm mỹ hiện đại: control dạng pill, bề mặt bo góc nhỏ, và chuyển động mượt mà.',
        'Mỗi component được xây dựng với signal, OnPush, và tuân thủ các pattern ARIA để đảm bảo khả năng truy cập cho người dùng bàn phím và trình đọc màn hình.',
        'Thanh cuộn của g-scroll-panel dùng thuần CSS (scrollbar-width/scrollbar-color) theo theme hiện tại, không cần JavaScript để vẽ scrollbar tuỳ chỉnh.',
        'Khi nội dung bên trong vượt quá maxHeight đã đặt, vùng chứa sẽ tự động hiện thanh cuộn dọc thay vì đẩy layout xung quanh giãn ra.',
        'Cuộn xuống để xem hết đoạn văn bản minh hoạ này.',
      ],
    },
  },
};

const EN_LAYOUT: LayoutCopy = {
  container: {
    title: 'Container',
    intro:
      'Constrains max width and centers content horizontally. The gContainer directive adds the .g-container class to any element, making wide prose easier to read. It has no inputs or outputs; it is purely layout.',
    apiTitle: 'API — GContainer',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Pure layout — it does not set role or ARIA attributes on the host element and does not affect the accessibility tree.',
    ],
    apiRows: [
      {
        name: '[gContainer]',
        type: '(directive)',
        default: '—',
        description: 'Adds the .g-container class to the host element; no inputs and no outputs.',
      },
      {
        name: '--g-container-max-width',
        type: 'CSS token',
        default: '960px',
        description:
          'Maximum width of .g-container; override it to change the centering threshold.',
      },
    ],
    demo: {
      body: 'Content inside gContainer is capped at a maximum width and centered horizontally. The max width comes from --g-container-max-width (960px by default; this demo overrides it to 480px so the effect is visible).',
      note: 'When the containing area is wider than that value, the side space is split evenly.',
    },
  },
  stack: {
    title: 'Stack',
    intro:
      'Flexbox stack for arranging children vertically (column) or horizontally (row), with consistent spacing from the --g-space-N token scale.',
    wrapTitle: 'Wrap & alignment',
    wrapIntro:
      'Use [wrap]="true" in a horizontal stack so items move to the next line when space runs out; combine align and justify to align across both axes.',
    apiTitle: 'API — GStack',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Pure layout — it does not set role or ARIA attributes on the host element and does not affect the accessibility tree.',
    ],
    apiRows: [
      {
        name: 'direction',
        type: `'vertical' | 'horizontal'`,
        default: `'vertical'`,
        description: 'Layout direction: vertical → flex-direction column, horizontal → row.',
      },
      {
        name: 'gap',
        type: 'number (0–8)',
        default: '4',
        description: 'Maps to --g-space-N for spacing between children. 0 means no gap.',
      },
      {
        name: 'align',
        type: 'string',
        default: '—',
        description: 'Optional CSS align-items value.',
      },
      {
        name: 'justify',
        type: 'string',
        default: '—',
        description: 'Optional CSS justify-content value.',
      },
      {
        name: 'wrap',
        type: 'boolean',
        default: 'false',
        description: 'Enables flex-wrap: wrap when children overflow the main axis.',
      },
    ],
    demo: {
      rows: ['Row 1', 'Row 2', 'Row 3'],
      columns: ['Column 1', 'Column 2', 'Column 3'],
      tags: [
        'Angular',
        'Signals',
        'Standalone',
        'Zoneless',
        'OnPush',
        'Design System',
        'Accessibility',
        'Tree-shakable',
        'TypeScript',
        'CSS Grid',
      ],
    },
  },
  grid: {
    title: 'Grid',
    intro:
      'CSS grid layout primitive. Set cols for equal columns, or minColWidth to let the grid choose the number of columns from available width (responsive auto-fill). gap follows the --g-space-N token scale.',
    apiTitle: 'API — GGrid',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Pure layout — it does not set role or ARIA on the host and does not affect the accessibility tree.',
    ],
    apiRows: [
      {
        name: 'cols',
        type: 'number',
        default: '2',
        description:
          'Number of equal columns (repeat(cols, 1fr)). Ignored when minColWidth is set.',
      },
      {
        name: 'minColWidth',
        type: 'string',
        default: '—',
        description:
          'Minimum width for each column, for example "200px" → responsive repeat(auto-fill, minmax(min, 1fr)).',
      },
      {
        name: 'gap',
        type: 'number (0–8)',
        default: '4',
        description: 'Row/column gap mapped to --g-space-N. 0 means no gap.',
      },
    ],
    demo: {
      equalTitle: '3 equal columns',
      responsiveTitle: 'Responsive — fit columns from a 160px minimum width',
      cell: (n: number) => `Cell ${n}`,
    },
  },
  layout: {
    title: 'Layout',
    intro:
      'App-shell component: topbar, sidebar, and content projected into three regions with no inputs. CSS grid chooses the layout from the regions actually present in markup. Only the content region scrolls; topbar and sidebar stay fixed.',
    apiTitle: 'API — GLayout',
    regionsTitle: '3 projected regions',
    regions: [
      '<g-topbar> — direct child of <g-layout>, projected into the top region at full width.',
      '<g-sidebar> — direct child of <g-layout>, projected into the left region at full height.',
      'Everything else falls into the .g-layout__main content region, the only area with overflow: auto.',
    ],
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'g-layout is pure layout; it does not set role or ARIA attributes on the host or child regions. Each region keeps the semantics of its own component, and content should be wrapped in <main> or another suitable semantic element.',
    ],
    apiRows: [
      {
        name: 'g-layout',
        type: '(component)',
        default: '—',
        description:
          'Container app-shell with no inputs. Layout is determined by which regions are projected.',
      },
    ],
    demo: {
      app: 'Application',
      notifications: 'Notifications',
      home: 'Home',
      reports: 'Reports',
      settings: 'Settings',
      overview: 'Overview',
      contentIntro:
        'This is the main content area of the app shell — the only region that scrolls when content is taller than the frame. The topbar and left sidebar stay in place.',
      layoutIntro:
        'g-layout chooses its grid layout from the regions that are present: place <g-topbar> and/or <g-sidebar> as direct children, and everything else falls into the scrollable content region.',
      scrollTitle: 'Only content scrolls',
      scrollReason:
        'In a real app shell, the topbar usually carries brand and quick navigation while the sidebar carries the primary menu. Both should remain visible even while users read long content.',
      technique:
        'Technique: .g-layout fixes height with 100vh and overflow: hidden; only .g-layout__main has overflow: auto.',
      tryScrollTitle: 'Try scrolling',
      tryScroll:
        'Scroll inside this demo frame to see the topbar and sidebar stay in place while the text below moves.',
      filler:
        'This paragraph only extends the content enough to create scrolling; it exists to demonstrate independent content scrolling.',
      bottom:
        'Keep scrolling to the bottom to confirm all content remains reachable while topbar and sidebar do not move.',
    },
  },
  splitter: {
    title: 'Splitter',
    intro:
      'Resizable split-panel layout with gutters for resizing adjacent panels. Each panel is projected through <ng-template gSplitterPanel>; the splitter inserts gutters between neighboring panels and supports N panels. Dragging a gutter only changes the pair beside it while the total stays constant; mouse, touch, and arrow keys are supported.',
    apiTitle: 'API — GSplitter',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Each gutter is role="separator" with tabindex, aria-orientation, and aria-valuenow; arrow keys resize it.',
    ],
    apiRows: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: "Split direction: 'horizontal' side by side, 'vertical' stacked.",
      },
      {
        name: 'sizes',
        type: 'number[]',
        default: 'equal split',
        description: 'Initial size for each panel (weights, usually totaling 100).',
      },
      {
        name: 'minSize',
        type: 'number',
        default: '8',
        description: 'Minimum weight for each panel, preventing a panel from collapsing to 0.',
      },
      {
        name: 'sizeChange',
        type: 'output<number[]>',
        default: '—',
        description:
          'Emits the new weight array whenever dragging or keyboard resizing changes size.',
      },
    ],
    demo: {
      horizontalCaption: 'Horizontal — drag the middle gutter to resize both sides',
      verticalCaption: 'Vertical + multiple panels (drag each gutter)',
      panel1: 'Panel 1',
      panel2: 'Panel 2',
      top: 'Top',
      middle: 'Middle',
      bottom: 'Bottom',
    },
  },
  scrollPanel: {
    title: 'Scroll Panel',
    intro:
      'Scrollable region with a slim themed scrollbar. It uses pure CSS scrollbar-width/scrollbar-color rather than JavaScript-rendered custom scrollbars. Set maxHeight or height to constrain the box and scroll projected content inside it.',
    apiTitle: 'API — GScrollPanel',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mouse and trackpad scrolling work on the region. Keyboard scrolling requires focusable content inside because g-scroll-panel does not add tabindex by itself.',
      'No role or landmark is added; this is a pure layout scroll region. Consumers add ARIA landmarks when the content inside needs to be announced.',
    ],
    apiRows: [
      {
        name: 'maxHeight',
        type: 'string',
        default: '—',
        description: 'Maximum height, for example "180px"; overflowing content scrolls inside.',
      },
      {
        name: 'height',
        type: 'string',
        default: '—',
        description: 'Fixed height for the scroll region, for example "240px".',
      },
    ],
    demo: {
      paragraphs: [
        'OpenDesign is an Angular component library focused on modern aesthetics: pill-shaped controls, compact rounded surfaces, and smooth motion.',
        'Each component is built with signals, OnPush, and ARIA patterns to support keyboard and screen reader users.',
        'The g-scroll-panel scrollbar uses pure CSS (scrollbar-width/scrollbar-color) from the current theme, with no JavaScript-rendered custom scrollbar.',
        'When content exceeds the configured maxHeight, the container shows an internal vertical scrollbar instead of stretching surrounding layout.',
        'Scroll down to read the rest of this sample text.',
      ],
    },
  },
};

export function layoutCopyFor(tag: string): LayoutCopy {
  return tag.startsWith('en') ? EN_LAYOUT : VI_LAYOUT;
}
