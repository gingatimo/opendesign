import { ApiRow } from '../shared/api-table';

interface NavigationPageCopy {
  title: string;
  intro: string;
  apiTitle: string;
  accessibilityTitle: string;
  accessibility: string[];
  apiRows: ApiRow[];
}

interface TabsCopy extends NavigationPageCopy {
  testNote: string;
  demo: {
    tablistLabel: string;
    overview: string;
    overviewContent: string;
    settings: string;
    settingsContent: string;
    advanced: string;
    advancedContent: string;
    history: string;
    historyContent: string;
  };
}

interface StepperCopy extends NavigationPageCopy {
  verticalTitle: string;
  verticalIntro: string;
  testNote: string;
  demo: {
    info: string;
    infoContent: string;
    payment: string;
    paymentContent: string;
    confirm: string;
    confirmContent: string;
    address: string;
    addressContent: string;
    verticalConfirmContent: string;
    back: string;
    next: string;
  };
}

interface TopbarCopy extends NavigationPageCopy {
  demo: {
    fullCaption: string;
    noCenterCaption: string;
    navLabel: string;
    docs: string;
    blog: string;
    notifications: string;
  };
}

interface SidebarCopy extends NavigationPageCopy {
  sections: { title: string; paragraphs: string[] }[];
  demo: {
    home: string;
    settings: string;
    members: string;
    footer: string;
  };
}

interface LinkCopy extends NavigationPageCopy {
  demo: {
    before: string;
    docs: string;
    middle: string;
    home: string;
    after: string;
  };
}

interface MenuCopy extends NavigationPageCopy {
  demo: {
    verticalTitle: string;
    horizontalTitle: string;
    overview: string;
    settings: string;
    profile: string;
    security: string;
    advanced: string;
    help: string;
    home: string;
    products: string;
    phones: string;
    computers: string;
    accessories: string;
    support: string;
    contact: string;
    docs: string;
  };
}

interface ActionMenuCopy extends NavigationPageCopy {
  demo: {
    defaultCaption: string;
    labelCaption: string;
    placementCaption: string;
    actionLabel: string;
    prompt: string;
    selected: string;
    home: string;
    products: string;
    supportLabel: string;
    items: { label: string; value: string }[];
    productsItems: { label: string; value: string }[];
    supportItems: { label: string; value: string }[];
  };
}

interface BreadcrumbCopy extends NavigationPageCopy {
  demo: {
    home: string;
    products: string;
    phones: string;
    current: string;
  };
}

interface AccordionCopy extends NavigationPageCopy {
  demo: {
    whatTitle: string;
    whatBody: string;
    keyboardTitle: string;
    keyboardBody: string;
    multipleTitle: string;
    multipleBody: string;
  };
}

interface DockMenuCopy extends NavigationPageCopy {
  demo: {
    dashboard: string;
    images: string;
    links: string;
    copy: string;
    notifications: string;
  };
}

interface PaginationCopy extends NavigationPageCopy {
  demo: {
    currentPage: string;
  };
}

export interface NavigationCopy {
  tabs: TabsCopy;
  stepper: StepperCopy;
  topbar: TopbarCopy;
  sidebar: SidebarCopy;
  link: LinkCopy;
  menu: MenuCopy;
  actionMenu: ActionMenuCopy;
  breadcrumb: BreadcrumbCopy;
  accordion: AccordionCopy;
  dockMenu: DockMenuCopy;
  pagination: PaginationCopy;
}

const VI_NAVIGATION: NavigationCopy = {
  tabs: {
    title: 'Tabs',
    intro:
      'Bộ chuyển tab dạng pill, theo đúng mẫu ARIA Tabs Pattern: role="tablist"/"tab"/"tabpanel", roving tabindex, và bàn phím đầy đủ.',
    apiTitle: 'API — GTabs, GTab',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Danh sách tab mang role="tablist", mỗi tab là role="tab". Mỗi tab render riêng một role="tabpanel" với id ổn định; aria-controls và aria-labelledby nối đúng cặp tab/panel. Chỉ panel đang chọn mới khởi tạo nội dung.',
      'Roving tabindex: tab đang chọn có tabindex="0", các tab còn lại tabindex="-1", nên vùng tab chỉ có một điểm dừng Tab.',
      'Mũi tên trái/phải di chuyển giữa các tab, bỏ qua tab disabled và vòng lại ở hai đầu. Home/End nhảy tới tab dùng được đầu tiên/cuối cùng.',
      'Nếu selectedIndex trỏ tới tab disabled hoặc ngoài khoảng hợp lệ, component tự rơi về tab dùng được đầu tiên.',
      'Tablist bắt buộc phải có tên accessible qua tablistLabel hoặc tablistLabelledBy trên <g-tabs>; đặt aria-label thẳng lên host <g-tabs> không có tác dụng.',
    ],
    testNote:
      'Toàn bộ khẳng định trên có test tương ứng trong projects/ngx-opendesign/src/lib/tabs/tabs.spec.ts.',
    apiRows: [
      {
        name: 'g-tabs / selectedIndex',
        type: 'number (model)',
        default: '0',
        description: 'Index tab đang chọn, two-way binding qua [(selectedIndex)].',
      },
      {
        name: 'g-tabs / tablistLabel',
        type: 'string',
        default: '—',
        description:
          'Tên accessible cho tablist, render thành aria-label. Cần tablistLabel hoặc tablistLabelledBy.',
      },
      {
        name: 'g-tabs / tablistLabelledBy',
        type: 'string',
        default: '—',
        description: 'Id phần tử làm tên accessible cho tablist, render thành aria-labelledby.',
      },
      {
        name: 'g-tab / label',
        type: 'string (required)',
        default: '—',
        description: 'Nhãn hiển thị trên tab.',
      },
      {
        name: 'g-tab / disabled',
        type: 'boolean',
        default: 'false',
        description: 'Vô hiệu hóa tab — không chọn được bằng click hay bàn phím.',
      },
    ],
    demo: {
      tablistLabel: 'Ví dụ tabs',
      overview: 'Tổng quan',
      overviewContent: 'Nội dung tổng quan của tab.',
      settings: 'Cài đặt',
      settingsContent: 'Nội dung cài đặt của tab.',
      advanced: 'Nâng cao',
      advancedContent: 'Nội dung nâng cao — tab này đang bị vô hiệu hoá.',
      history: 'Lịch sử',
      historyContent: 'Nội dung lịch sử của tab.',
    },
  },
  stepper: {
    title: 'Stepper',
    intro:
      'Wizard nhiều bước: thanh bước hiển thị tiến trình và chỉ khởi tạo nội dung của bước đang active. Header từng bước bấm được (non-linear); consumer tự gắn nút Tiếp/Quay lại bằng [(activeStep)].',
    verticalTitle: 'Dọc',
    verticalIntro:
      'Đặt orientation="vertical": các bước xếp chồng dọc, có đường nối dọc giữa các circle, nội dung bước đang chọn hiện ngay dưới header của bước đó.',
    apiTitle: 'API — GStepper, GStep',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Thanh bước là <ol> vì thứ tự các bước có ý nghĩa. Bước đang active có aria-current="step".',
      'Header mỗi bước là <button> native, có aria-label gồm số thứ tự, nhãn, trạng thái tùy chọn và trạng thái đã xong/đang chọn/chưa tới.',
      'Chỉ nội dung của bước đang active mới được khởi tạo, cùng cơ chế với GTabs.',
      'Nếu activeStep ngoài khoảng hợp lệ, component tự rơi về bước đầu tiên.',
    ],
    testNote:
      'Toàn bộ khẳng định trên có test tương ứng trong projects/ngx-opendesign/src/lib/stepper/stepper.spec.ts.',
    apiRows: [
      {
        name: 'g-stepper / activeStep',
        type: 'number (model)',
        default: '0',
        description: 'Index bước đang active (0-based), two-way binding qua [(activeStep)].',
      },
      {
        name: 'g-stepper / orientation',
        type: `'horizontal' | 'vertical'`,
        default: `'horizontal'`,
        description: 'Hướng bố cục thanh bước.',
      },
      {
        name: 'g-step / label',
        type: 'string (required)',
        default: '—',
        description: 'Nhãn hiển thị trên header của bước.',
      },
      {
        name: 'g-step / optional',
        type: 'boolean',
        default: 'false',
        description: 'Đánh dấu bước là tùy chọn — hiện thêm nhãn "(tùy chọn)".',
      },
    ],
    demo: {
      info: 'Thông tin',
      infoContent: 'Nhập thông tin cơ bản: họ tên, email, số điện thoại.',
      payment: 'Thanh toán',
      paymentContent: 'Chọn phương thức thanh toán và nhập chi tiết.',
      confirm: 'Xác nhận',
      confirmContent: 'Xem lại thông tin trước khi hoàn tất đơn hàng.',
      address: 'Địa chỉ',
      addressContent: 'Nhập địa chỉ giao hàng.',
      verticalConfirmContent: 'Xem lại trước khi hoàn tất.',
      back: 'Quay lại',
      next: 'Tiếp',
    },
  },
  topbar: {
    title: 'Topbar',
    intro:
      'Thanh ngang cố định đầu trang, chiếu nội dung qua 3 slot: [gTopbarStart], [gTopbarCenter], [gTopbarEnd]. Cả 3 slot đều tùy chọn.',
    apiTitle: 'API — GTopbar, GTopbarStart, GTopbarCenter, GTopbarEnd',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'g-topbar cố ý không tự đặt role="banner" vì role đó chỉ đúng khi topbar là banner của toàn trang. Nếu đúng ngữ cảnh, hãy bọc trong <header> hoặc tự thêm role="banner".',
      'Khi thiếu slot gTopbarCenter, slot gTopbarEnd vẫn tự đẩy sang mép phải mà không cần cấu hình thêm.',
    ],
    apiRows: [
      {
        name: 'g-topbar',
        type: '(component)',
        default: '—',
        description: 'Container chính, không có input.',
      },
      {
        name: '[gTopbarStart]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu nội dung bên trái (thường là thương hiệu/logo).',
      },
      {
        name: '[gTopbarCenter]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu nội dung ở giữa, tự canh giữa và chiếm không gian còn lại.',
      },
      {
        name: '[gTopbarEnd]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu nội dung bên phải, tự đẩy sát mép phải.',
      },
    ],
    demo: {
      fullCaption: 'Đủ 3 slot: start, center, end.',
      noCenterCaption: 'Biến thể thiếu slot center: end vẫn nằm sát phải.',
      navLabel: 'Điều hướng demo',
      docs: 'Tài liệu',
      blog: 'Blog',
      notifications: 'Thông báo',
    },
  },
  sidebar: {
    title: 'Sidebar',
    intro:
      'Sidebar điều hướng dọc, có thể thu gọn. Chứa danh sách GSidebarItem (phần tử <a>/<button> native), tùy chọn phần đầu/chân qua [gSidebarHeader]/[gSidebarFooter].',
    sections: [
      {
        title: 'Nút thu gọn',
        paragraphs: [
          'Đặt <g-sidebar-toggle /> vào bên trong <g-sidebar> để có nút thu gọn/mở lại. Nút inject GSidebar cha và đọc/ghi thẳng collapsed, nên dùng được cả khi bạn không gắn [(collapsed)]. Đặt ngoài <g-sidebar> thì no-op và cảnh báo ở dev mode.',
          'Nút nằm trong luồng ở hàng trên cùng .g-sidebar__top, trước header. Nó tái dùng style của g-sidebar-item nhưng tự canh theo trạng thái collapsed.',
          'Thư viện tự gộp [gSidebarHeader] và <g-sidebar-toggle /> vào cùng hàng; không cần bạn tự bọc flex row.',
        ],
      },
      {
        title: 'Header khi thu gọn',
        paragraphs: [
          'Khi collapsed=true, GSidebar tự ẩn trực quan [gSidebarHeader] bằng kỹ thuật visually-hidden, vẫn giữ trong DOM và accessibility tree.',
        ],
      },
      {
        title: 'Tooltip tự động khi thu gọn',
        paragraphs: [
          'Khi collapsed=true, GSidebarItem tự hiện tooltip lấy text từ [gSidebarItemLabel] khi hover/focus. Item ngoài <g-sidebar> hoặc không có [gSidebarItemLabel] thì không hiện.',
          'Nếu bạn tự gắn gTooltip lên g-sidebar-item thì giá trị đó luôn thắng ở cả hai trạng thái. Chỉ khi không gắn gTooltip, GSidebarItem mới tự dùng nhãn item làm text mặc định khi sidebar thu gọn.',
          'Text tooltip được đọc tại thời điểm hiện tooltip, nên nhãn động như {{ link.label }} luôn cho text mới nhất.',
        ],
      },
    ],
    apiTitle: 'API — GSidebar, GSidebarItem, GSidebarToggle',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'g-sidebar cố ý không tự đặt role="navigation"; hãy bọc phần điều hướng trong <nav aria-label="…"> khi cần landmark.',
      'Item đang active cần aria-current="page"; class="g-active" chỉ đổi màu/kiểu và không truyền ý nghĩa cho trình đọc màn hình.',
      'Nhãn chữ của item bắt buộc bọc trong <span gSidebarItemLabel>; đây là phần tử CSS dùng để ẩn trực quan khi collapsed mà vẫn giữ trong accessibility tree.',
      'Khi collapsed=true, test lib chứng minh label/header vẫn còn trong DOM; accessibility tree thật của Chromium đã xác minh item vẫn giữ accessible name đầy đủ.',
      '<g-sidebar-toggle /> đặt ARIA lên <button> native bên trong, tự đổi aria-label theo trạng thái và dùng icon aria-hidden.',
      'Tooltip tự động dùng lại GTooltip nên thừa hưởng hoverable, dismissible bằng Esc, persistent và aria-describedby.',
      'Nội dung custom khác trong body sidebar không tự ẩn khi collapsed; consumer tự viết CSS cho phần đó.',
      'Tôn trọng prefers-reduced-motion: animation thu/mở tắt hẳn khi người dùng giảm chuyển động.',
    ],
    apiRows: [
      {
        name: 'g-sidebar / collapsed',
        type: 'boolean (model)',
        default: 'false',
        description: 'Thu gọn sidebar (240px → 72px), two-way binding qua [(collapsed)].',
      },
      {
        name: '[gSidebarHeader]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu phần đầu sidebar, không có input.',
      },
      {
        name: '[gSidebarFooter]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu phần chân sidebar, không có input.',
      },
      {
        name: 'g-sidebar-item',
        type: '(component, a | button)',
        default: '—',
        description: 'Một mục điều hướng — chọn thẻ native theo ngữ nghĩa (link hoặc hành động).',
      },
      {
        name: '[gSidebarItemIcon]',
        type: '(directive)',
        default: '—',
        description: 'Đánh dấu icon SVG của item.',
      },
      {
        name: '[gSidebarItemLabel]',
        type: '(directive)',
        default: '—',
        description: 'Bắt buộc bọc nhãn chữ của item — điểm neo CSS để ẩn trực quan khi collapsed.',
      },
      {
        name: 'g-sidebar-toggle',
        type: '(component)',
        default: '—',
        description:
          'Hàng trên cùng trong sidebar, bấm để thu gọn/mở lại. Không input/output; đọc/ghi collapsed của <g-sidebar> cha.',
      },
    ],
    demo: {
      home: 'Trang chủ',
      settings: 'Cài đặt',
      members: 'Thành viên',
      footer: 'Trợ giúp & phản hồi',
    },
  },
  link: {
    title: 'Link',
    intro:
      'Directive gLink gắn class .g-link lên phần tử <a> native, dùng cho link đứng trong đoạn văn bản. Không có input, không tự thêm role hay can thiệp href/nội dung.',
    apiTitle: 'API — GLink',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Gạch chân luôn hiện, kể cả ở trạng thái nghỉ, để đáp ứng WCAG 1.4.1 Use of Color.',
      'Không tự thêm role; <a href> native đã có sẵn role "link". <a> không có href vẫn là generic theo HTML spec.',
      'Test lib chứng minh class g-link được gắn đúng, không ghi đè role và giữ nguyên href/nội dung.',
      'Không có variant "link ngoài" sẵn; nếu cần, tự thêm chữ mô tả hoặc icon ngay trong nội dung link.',
    ],
    apiRows: [
      {
        name: 'a[gLink]',
        type: '(directive)',
        default: '—',
        description: 'Gắn class .g-link lên phần tử <a> native — không có input, không có output.',
      },
    ],
    demo: {
      before: 'Đọc thêm về triết lý thiết kế tại',
      docs: 'tài liệu OpenDesign',
      middle: ', hoặc quay lại',
      home: 'trang chủ',
      after: '.',
    },
  },
  menu: {
    title: 'Menu',
    intro:
      'Menu điều hướng có mục con phân cấp. orientation="vertical" mở/gập mục con ngay tại chỗ; orientation="horizontal" bung dropdown nổi. Có thể lồng nhiều cấp <g-submenu>.',
    apiTitle: 'API — GMenu, GMenuItem, GSubmenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mục lá là <a g-menu-item>/<button g-menu-item> native, nên hỗ trợ bàn phím sẵn. Bọc <g-menu> trong <nav aria-label> nếu cần landmark.',
      'Nút mở mục con có aria-expanded phản ánh trạng thái; dropdown ngang đóng khi bấm ra ngoài hoặc nhấn Esc và trả focus về nút.',
    ],
    apiRows: [
      {
        name: 'g-menu / orientation',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description:
          'vertical → mục con mở/gập inline (accordion); horizontal → mục con bung dropdown.',
      },
      {
        name: 'g-menu-item',
        type: 'selector',
        default: '—',
        description: 'Mục lá — đặt trên <a> hoặc <button>.',
      },
      {
        name: 'g-submenu / label',
        type: 'string',
        default: '(bắt buộc)',
        description: 'Mục cha có con: nhãn hiển thị trên nút mở; các mục con chiếu vào bên trong.',
      },
    ],
    demo: {
      verticalTitle: 'Dọc — mở/gập (accordion)',
      horizontalTitle: 'Ngang — dropdown',
      overview: 'Tổng quan',
      settings: 'Cài đặt',
      profile: 'Hồ sơ',
      security: 'Bảo mật',
      advanced: 'Nâng cao',
      help: 'Trợ giúp',
      home: 'Trang chủ',
      products: 'Sản phẩm',
      phones: 'Điện thoại',
      computers: 'Máy tính',
      accessories: 'Phụ kiện',
      support: 'Hỗ trợ',
      contact: 'Liên hệ',
      docs: 'Tài liệu',
    },
  },
  actionMenu: {
    title: 'Action Menu',
    intro:
      'Dropdown menu điều hướng / hành động: bấm trigger để xổ danh sách ra một trong bốn góc và tự lật sang góc còn chỗ khi sát mép viewport. Trigger có variant icon hoặc label, và phát (action) với item được chọn.',
    apiTitle: 'API — GActionMenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Trigger có aria-haspopup="menu" và aria-expanded; panel role="menu", item role="menuitem".',
      'Bàn phím: mở thì focus vào item đầu; ↑/↓ điều hướng, Home/End, Esc đóng và trả focus, Enter/Space chọn.',
    ],
    apiRows: [
      {
        name: 'items',
        type: 'GActionMenuItem[]',
        default: '[]',
        description: 'Các mục { label, value, icon?, disabled? }.',
      },
      {
        name: 'variant',
        type: "'icon' | 'label'",
        default: "'icon'",
        description: "'icon' = nút tròn chỉ icon; 'label' = chữ lấy từ label + mũi tên lên/xuống.",
      },
      {
        name: 'icon',
        type: 'GIconGlyph',
        default: 'gIconMoreVertical',
        description: "Icon trigger khi variant='icon'.",
      },
      {
        name: 'placement',
        type: "'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'",
        default: "'auto'",
        description: 'Góc ưu tiên; nếu bị mép viewport cắt thì tự lật dọc, ngang hoặc cả hai.',
      },
      {
        name: 'label',
        type: 'string',
        default: "'Menu'",
        description: "Nhãn a11y khi variant='icon'; chữ hiển thị khi variant='label'.",
      },
      {
        name: '(action)',
        type: 'GActionMenuItem',
        default: '—',
        description: 'Phát item được chọn.',
      },
    ],
    demo: {
      defaultCaption: 'Mặc định — trigger là nút tròn chỉ có icon (⋮)',
      labelCaption: 'variant="label" — chữ + mũi tên lên/xuống, dùng cho menu ngang',
      placementCaption:
        'placement — 4 góc; góc nào bị mép viewport cắt thì tự lật sang góc còn chỗ',
      actionLabel: 'Tác vụ',
      prompt: 'Bấm icon ⋮ để mở menu (tự lật lên nếu sát mép dưới).',
      selected: 'Đã chọn:',
      home: 'Trang chủ',
      products: 'Sản phẩm',
      supportLabel: 'Hỗ trợ',
      items: [
        { label: 'Sửa', value: 'edit' },
        { label: 'Nhân bản', value: 'duplicate' },
        { label: 'Xoá', value: 'delete' },
      ],
      productsItems: [
        { label: 'Bảng giá', value: 'pricing' },
        { label: 'Tính năng', value: 'features' },
        { label: 'Tích hợp', value: 'integrations' },
      ],
      supportItems: [
        { label: 'Liên hệ', value: 'contact' },
        { label: 'Tài liệu', value: 'docs' },
      ],
    },
  },
  breadcrumb: {
    title: 'Breadcrumb',
    intro:
      'Đường dẫn phân cấp cho biết vị trí trang hiện tại. Đặt trên <nav> để có landmark điều hướng; dấu › giữa các mục tự chèn bằng CSS. Mục cuối dùng aria-current="page".',
    apiTitle: 'API — GBreadcrumb, GBreadcrumbItem',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Đặt g-breadcrumb trên <nav> kèm aria-label="Breadcrumb" để tạo landmark điều hướng có tên.',
      'Mục hiện tại là <span g-breadcrumb-item aria-current="page">, không phải link.',
      'Dấu phân cách › chèn bằng CSS ::before nên không lọt vào DOM/đọc màn hình.',
    ],
    apiRows: [
      {
        name: 'g-breadcrumb',
        type: 'selector',
        default: '—',
        description:
          'Đặt trên <nav> — container bọc các mục, tự dàn hàng ngang + chèn dấu phân cách.',
      },
      {
        name: 'g-breadcrumb-item',
        type: 'selector',
        default: '—',
        description:
          'Đặt trên <a> cho mục có link hoặc <span aria-current="page"> cho mục hiện tại.',
      },
    ],
    demo: {
      home: 'Trang chủ',
      products: 'Sản phẩm',
      phones: 'Điện thoại',
      current: 'iPhone 17',
    },
  },
  accordion: {
    title: 'Accordion',
    intro:
      'Danh sách panel gập/mở. Mặc định mở một panel sẽ đóng các panel khác; thêm multiple trên g-accordion để cho phép mở nhiều panel cùng lúc.',
    apiTitle: 'API — GAccordion, GAccordionPanel',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mỗi header là một <button> có aria-expanded và aria-controls trỏ tới vùng nội dung role="region" tương ứng.',
      'Điều hướng bàn phím giữa các header bằng ↑/↓/Home/End; mở/đóng bằng Enter hoặc Space. Nội dung panel đang đóng được đánh dấu inert.',
    ],
    apiRows: [
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: '(GAccordion) Cho phép mở nhiều panel cùng lúc thay vì chỉ một.',
      },
      {
        name: 'open',
        type: 'boolean (model)',
        default: 'false',
        description: '(GAccordionPanel) Trạng thái mở/đóng, two-way qua [(open)].',
      },
      {
        name: '[gAccordionHeader]',
        type: '(projection)',
        default: '—',
        description: '(GAccordionPanel) Chiếu nội dung tiêu đề hiển thị trong header.',
      },
    ],
    demo: {
      whatTitle: 'OpenDesign là gì?',
      whatBody:
        'Một thư viện component Angular với thẩm mỹ hiện đại, xây dựng bằng signal và tuân thủ các pattern ARIA.',
      keyboardTitle: 'Có hỗ trợ bàn phím không?',
      keyboardBody: 'Có. Header điều hướng bằng ↑/↓/Home/End, mở/đóng bằng Enter hoặc Space.',
      multipleTitle: 'Có thể mở nhiều panel cùng lúc?',
      multipleBody: 'Có, thêm thuộc tính multiple trên g-accordion.',
    },
  },
  dockMenu: {
    title: 'Dock Menu',
    intro:
      'Thanh menu kiểu macOS dock: hàng icon, mục đang hover phóng to icon và cho icon trồi lên trên thanh. Đặt position="bottom" để cố định giữa dưới màn hình.',
    apiTitle: 'API — GDockMenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Mỗi mục là một <button> có aria-label lấy từ label; nhãn cũng hiển thị dạng tooltip khi hover.',
      'Hiệu ứng phóng to icon chỉ là :hover thuần CSS; các mục vẫn dùng được đầy đủ bằng bàn phím Tab + Enter.',
    ],
    apiRows: [
      {
        name: 'items',
        type: 'GDockItem[]',
        default: '[]',
        description: 'Danh sách mục { icon, label, onClick? } hiển thị trên thanh dock.',
      },
      {
        name: 'position',
        type: `'bottom' | 'static'`,
        default: `'static'`,
        description:
          "'bottom' cố định giữa dưới màn hình; 'static' theo dòng chảy layout bình thường.",
      },
    ],
    demo: {
      dashboard: 'Bảng điều khiển',
      images: 'Hình ảnh',
      links: 'Liên kết',
      copy: 'Sao chép',
      notifications: 'Thông báo',
    },
  },
  pagination: {
    title: 'Pagination',
    intro:
      'Control phân trang thuần trình bày — chỉ quản lý trang đang chọn, không tự cắt dữ liệu. Consumer tự dùng page để lấy đúng phần dữ liệu cần hiển thị.',
    apiTitle: 'API — GPagination',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Toàn bộ control nằm trong <nav aria-label="Phân trang">.',
      'Nút của trang đang chọn mang aria-current="page"; mỗi nút số trang có aria-label riêng dạng "Trang N".',
      'Nút Trước/Sau tự disabled ở trang đầu/trang cuối, có aria-label tiếng Việt riêng.',
      'Dấu ba chấm đại diện cho các trang bị ẩn; không phải nút bấm và mang aria-hidden="true".',
    ],
    apiRows: [
      {
        name: 'page',
        type: 'number (model)',
        default: '1',
        description: 'Trang đang chọn, 1-based, two-way binding qua [(page)].',
      },
      { name: 'pageCount', type: 'number (required)', default: '—', description: 'Tổng số trang.' },
    ],
    demo: {
      currentPage: 'Trang hiện tại:',
    },
  },
};

const EN_NAVIGATION: NavigationCopy = {
  tabs: {
    title: 'Tabs',
    intro:
      'Pill tab switcher following the ARIA Tabs Pattern: role="tablist"/"tab"/"tabpanel", roving tabindex, and complete keyboard behavior.',
    apiTitle: 'API — GTabs, GTab',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The tab list uses role="tablist" and each tab uses role="tab". Each tab owns a stable role="tabpanel"; aria-controls and aria-labelledby connect the correct tab/panel pair. Only the selected panel initializes content.',
      'Roving tabindex: the selected tab has tabindex="0" and every other tab has tabindex="-1", so the tab list has one Tab stop.',
      'Left/right arrows move between tabs, skip disabled tabs, and wrap at both ends. Home/End moves to the first/last enabled tab.',
      'If selectedIndex points to a disabled tab or an out-of-range index, the component falls back to the first enabled tab.',
      'The tablist must have an accessible name through tablistLabel or tablistLabelledBy on <g-tabs>; aria-label on the host <g-tabs> itself is ignored.',
    ],
    testNote:
      'Each statement above is covered by projects/ngx-opendesign/src/lib/tabs/tabs.spec.ts.',
    apiRows: [
      {
        name: 'g-tabs / selectedIndex',
        type: 'number (model)',
        default: '0',
        description: 'Selected tab index, two-way bound with [(selectedIndex)].',
      },
      {
        name: 'g-tabs / tablistLabel',
        type: 'string',
        default: '—',
        description: 'Accessible name for the tablist. Use tablistLabel or tablistLabelledBy.',
      },
      {
        name: 'g-tabs / tablistLabelledBy',
        type: 'string',
        default: '—',
        description: 'Id of the element that labels the tablist, rendered as aria-labelledby.',
      },
      {
        name: 'g-tab / label',
        type: 'string (required)',
        default: '—',
        description: 'Visible tab label.',
      },
      {
        name: 'g-tab / disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the tab for pointer and keyboard selection.',
      },
    ],
    demo: {
      tablistLabel: 'Tabs example',
      overview: 'Overview',
      overviewContent: 'Overview tab content.',
      settings: 'Settings',
      settingsContent: 'Settings tab content.',
      advanced: 'Advanced',
      advancedContent: 'Advanced tab content — this tab is disabled.',
      history: 'History',
      historyContent: 'History tab content.',
    },
  },
  stepper: {
    title: 'Stepper',
    intro:
      'Multi-step wizard: the step bar shows progress and initializes only the active step content. Step headers are clickable (non-linear); consumers wire Next/Back controls with [(activeStep)].',
    verticalTitle: 'Vertical',
    verticalIntro:
      'Set orientation="vertical": steps stack vertically, the connector runs down the column, and active content appears below that step header.',
    apiTitle: 'API — GStepper, GStep',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The step bar is an <ol> because step order is meaningful. The active step has aria-current="step".',
      'Each step header is a native <button> with an aria-label including number, label, optional state, and progress state.',
      'Only the active step content is initialized, matching the GTabs mechanism.',
      'If activeStep is out of range, the component falls back to the first step.',
    ],
    testNote:
      'Each statement above is covered by projects/ngx-opendesign/src/lib/stepper/stepper.spec.ts.',
    apiRows: [
      {
        name: 'g-stepper / activeStep',
        type: 'number (model)',
        default: '0',
        description: 'Active step index (0-based), two-way bound with [(activeStep)].',
      },
      {
        name: 'g-stepper / orientation',
        type: `'horizontal' | 'vertical'`,
        default: `'horizontal'`,
        description: 'Step bar layout direction.',
      },
      {
        name: 'g-step / label',
        type: 'string (required)',
        default: '—',
        description: 'Step header label.',
      },
      {
        name: 'g-step / optional',
        type: 'boolean',
        default: 'false',
        description: 'Marks the step optional and shows an "(optional)" label.',
      },
    ],
    demo: {
      info: 'Information',
      infoContent: 'Enter basic information: full name, email, and phone number.',
      payment: 'Payment',
      paymentContent: 'Choose a payment method and enter details.',
      confirm: 'Review',
      confirmContent: 'Review the information before completing the order.',
      address: 'Address',
      addressContent: 'Enter the shipping address.',
      verticalConfirmContent: 'Review before finishing.',
      back: 'Back',
      next: 'Next',
    },
  },
  topbar: {
    title: 'Topbar',
    intro:
      'Fixed horizontal bar at the top of a surface, projecting content through three slots: [gTopbarStart], [gTopbarCenter], and [gTopbarEnd]. All slots are optional.',
    apiTitle: 'API — GTopbar, GTopbarStart, GTopbarCenter, GTopbarEnd',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'g-topbar intentionally does not set role="banner"; that role is only correct when the topbar is the page banner. Wrap it in <header> or add role="banner" only in that context.',
      'When gTopbarCenter is missing, gTopbarEnd still pushes to the right edge without extra configuration.',
    ],
    apiRows: [
      {
        name: 'g-topbar',
        type: '(component)',
        default: '—',
        description: 'Main container, no inputs.',
      },
      {
        name: '[gTopbarStart]',
        type: '(directive)',
        default: '—',
        description: 'Marks left content.',
      },
      {
        name: '[gTopbarCenter]',
        type: '(directive)',
        default: '—',
        description: 'Marks centered content and lets it consume remaining space.',
      },
      {
        name: '[gTopbarEnd]',
        type: '(directive)',
        default: '—',
        description: 'Marks right content and pushes it to the right edge.',
      },
    ],
    demo: {
      fullCaption: 'All 3 slots: start, center, end.',
      noCenterCaption: 'Variant without center slot: end stays flush right.',
      navLabel: 'Demo navigation',
      docs: 'Docs',
      blog: 'Blog',
      notifications: 'Notifications',
    },
  },
  sidebar: {
    title: 'Sidebar',
    intro:
      'Collapsible vertical navigation sidebar. It contains GSidebarItem links/buttons and optional header/footer slots through [gSidebarHeader] and [gSidebarFooter].',
    sections: [
      {
        title: 'Collapse Toggle',
        paragraphs: [
          'Place <g-sidebar-toggle /> inside <g-sidebar> to get the collapse/expand control. It injects the parent GSidebar and reads/writes collapsed directly, so it works even without [(collapsed)]. Outside <g-sidebar>, it is a dev-mode no-op warning.',
          'The toggle stays in normal flow at the top row .g-sidebar__top, before the header. It reuses g-sidebar-item styling and aligns itself based on collapsed state.',
          'The library combines [gSidebarHeader] and <g-sidebar-toggle /> into one row; no custom flex wrapper is required.',
        ],
      },
      {
        title: 'Collapsed Header',
        paragraphs: [
          'When collapsed=true, GSidebar visually hides [gSidebarHeader] with a visually-hidden technique, keeping it in the DOM and accessibility tree.',
        ],
      },
      {
        title: 'Automatic Collapsed Tooltips',
        paragraphs: [
          'When collapsed=true, GSidebarItem shows a tooltip from its own [gSidebarItemLabel] on hover/focus. Items outside <g-sidebar> or without [gSidebarItemLabel] do not show one.',
          'An explicit gTooltip on g-sidebar-item always wins in both states. Only when gTooltip is absent does GSidebarItem use the item label as the default collapsed tooltip.',
          'Tooltip text is read when the tooltip is shown, so dynamic labels such as {{ link.label }} produce the latest text.',
        ],
      },
    ],
    apiTitle: 'API — GSidebar, GSidebarItem, GSidebarToggle',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'g-sidebar intentionally does not set role="navigation"; wrap the navigation portion in <nav aria-label="…"> when you need a landmark.',
      'The active item needs aria-current="page"; class="g-active" only changes visual styling and does not expose meaning to screen readers.',
      'Item text must be wrapped in <span gSidebarItemLabel>; this is the element collapsed CSS visually hides while keeping it in the accessibility tree.',
      'When collapsed=true, library tests prove labels/headers remain in the DOM; real Chromium accessibility snapshots confirmed items keep their accessible names.',
      '<g-sidebar-toggle /> puts ARIA on the inner native <button>, changes aria-label with state, and keeps the icon aria-hidden.',
      'Automatic tooltips reuse GTooltip and inherit hoverable, Esc-dismissible, persistent, aria-describedby behavior.',
      'Other custom sidebar body content is not automatically hidden when collapsed; consumers provide CSS for that content.',
      'prefers-reduced-motion is respected by disabling the collapse/expand animation.',
    ],
    apiRows: [
      {
        name: 'g-sidebar / collapsed',
        type: 'boolean (model)',
        default: 'false',
        description: 'Collapses the sidebar.',
      },
      {
        name: '[gSidebarHeader]',
        type: '(directive)',
        default: '—',
        description: 'Marks sidebar header content, no inputs.',
      },
      {
        name: '[gSidebarFooter]',
        type: '(directive)',
        default: '—',
        description: 'Marks sidebar footer content, no inputs.',
      },
      {
        name: 'g-sidebar-item',
        type: '(component, a | button)',
        default: '—',
        description:
          'Navigation item; choose the native element that matches link/action semantics.',
      },
      {
        name: '[gSidebarItemIcon]',
        type: '(directive)',
        default: '—',
        description: 'Marks the item SVG icon.',
      },
      {
        name: '[gSidebarItemLabel]',
        type: '(directive)',
        default: '—',
        description: 'Required wrapper for the text label and collapsed visual hiding anchor.',
      },
      {
        name: 'g-sidebar-toggle',
        type: '(component)',
        default: '—',
        description: 'Top-row control that collapses/expands the parent <g-sidebar>.',
      },
    ],
    demo: {
      home: 'Home',
      settings: 'Settings',
      members: 'Members',
      footer: 'Help & feedback',
    },
  },
  link: {
    title: 'Link',
    intro:
      'Inline text link directive. gLink adds the .g-link class to a native <a>, with no inputs and no role/href/content intervention.',
    apiTitle: 'API — GLink',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Underline is always visible, including at rest, to satisfy WCAG 1.4.1 Use of Color.',
      'No role is added; native <a href> already exposes role="link". An <a> without href remains generic per the HTML spec.',
      'Library tests prove g-link is attached, role is not overridden, and href/content remain intact.',
      'There is no built-in "external link" variant; add descriptive text or an icon inside the link content when needed.',
    ],
    apiRows: [
      {
        name: 'a[gLink]',
        type: '(directive)',
        default: '—',
        description: 'Adds the .g-link class to a native <a>; no inputs and no outputs.',
      },
    ],
    demo: {
      before: 'Read more about the design philosophy in the',
      docs: 'OpenDesign docs',
      middle: ', or return to the',
      home: 'home page',
      after: '.',
    },
  },
  menu: {
    title: 'Menu',
    intro:
      'Hierarchical navigation menu. orientation="vertical" expands submenus inline; orientation="horizontal" opens floating dropdowns. Multiple nested <g-submenu> levels are supported.',
    apiTitle: 'API — GMenu, GMenuItem, GSubmenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Leaf items are native <a g-menu-item>/<button g-menu-item> elements, so keyboard support comes from the platform. Wrap <g-menu> in <nav aria-label> when you need a landmark.',
      'Submenu triggers expose aria-expanded; horizontal dropdowns close on outside click or Esc and return focus to the trigger.',
    ],
    apiRows: [
      {
        name: 'g-menu / orientation',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description: 'vertical opens submenus inline; horizontal opens dropdowns.',
      },
      {
        name: 'g-menu-item',
        type: 'selector',
        default: '—',
        description: 'Leaf item on an <a> or <button>.',
      },
      {
        name: 'g-submenu / label',
        type: 'string',
        default: '(required)',
        description: 'Parent item label; child items are projected inside.',
      },
    ],
    demo: {
      verticalTitle: 'Vertical — inline accordion',
      horizontalTitle: 'Horizontal — dropdown',
      overview: 'Overview',
      settings: 'Settings',
      profile: 'Profile',
      security: 'Security',
      advanced: 'Advanced',
      help: 'Help',
      home: 'Home',
      products: 'Products',
      phones: 'Phones',
      computers: 'Computers',
      accessories: 'Accessories',
      support: 'Support',
      contact: 'Contact',
      docs: 'Docs',
    },
  },
  actionMenu: {
    title: 'Action Menu',
    intro:
      'Navigation/action dropdown menu: click the trigger to open a list in one of four corners, with automatic viewport fallback through CDK Overlay. The trigger can be icon or label variant and emits (action) with the selected item.',
    apiTitle: 'API — GActionMenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The trigger has aria-haspopup="menu" and aria-expanded; the panel uses role="menu" and items use role="menuitem".',
      'Keyboard: opening focuses the first item; ↑/↓ navigates, Home/End jump, Esc closes and returns focus, Enter/Space selects.',
    ],
    apiRows: [
      {
        name: 'items',
        type: 'GActionMenuItem[]',
        default: '[]',
        description: 'Items { label, value, icon?, disabled? }.',
      },
      {
        name: 'variant',
        type: "'icon' | 'label'",
        default: "'icon'",
        description:
          "'icon' is an icon-only round button; 'label' shows text from label plus a chevron.",
      },
      {
        name: 'icon',
        type: 'GIconGlyph',
        default: 'gIconMoreVertical',
        description: "Trigger icon when variant='icon'.",
      },
      {
        name: 'placement',
        type: "'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'",
        default: "'auto'",
        description:
          'Preferred corner; flips vertically, horizontally, or both near viewport edges.',
      },
      {
        name: 'label',
        type: 'string',
        default: "'Menu'",
        description: "Accessible label for variant='icon'; visible text for variant='label'.",
      },
      {
        name: '(action)',
        type: 'GActionMenuItem',
        default: '—',
        description: 'Emits the selected item.',
      },
    ],
    demo: {
      defaultCaption: 'Default — icon-only round trigger (⋮)',
      labelCaption: 'variant="label" — text plus up/down chevron, useful for horizontal menus',
      placementCaption:
        'placement — 4 corners; clipped corners automatically flip to a side with space',
      actionLabel: 'Actions',
      prompt: 'Click the ⋮ icon to open the menu; it flips upward near the bottom edge.',
      selected: 'Selected:',
      home: 'Home',
      products: 'Products',
      supportLabel: 'Support',
      items: [
        { label: 'Edit', value: 'edit' },
        { label: 'Duplicate', value: 'duplicate' },
        { label: 'Delete', value: 'delete' },
      ],
      productsItems: [
        { label: 'Pricing', value: 'pricing' },
        { label: 'Features', value: 'features' },
        { label: 'Integrations', value: 'integrations' },
      ],
      supportItems: [
        { label: 'Contact', value: 'contact' },
        { label: 'Docs', value: 'docs' },
      ],
    },
  },
  breadcrumb: {
    title: 'Breadcrumb',
    intro:
      'Hierarchical path that shows the current page location. Put it on <nav> for a navigation landmark; CSS inserts separators between items. The final item uses aria-current="page".',
    apiTitle: 'API — GBreadcrumb, GBreadcrumbItem',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Place g-breadcrumb on <nav> with aria-label="Breadcrumb" to create a named navigation landmark.',
      'Current item is <span g-breadcrumb-item aria-current="page">, not a link.',
      'The › separator is inserted with CSS ::before, so it does not enter the DOM or screen reader output.',
    ],
    apiRows: [
      {
        name: 'g-breadcrumb',
        type: 'selector',
        default: '—',
        description:
          'Container for breadcrumb items; lays them out horizontally and inserts separators.',
      },
      {
        name: 'g-breadcrumb-item',
        type: 'selector',
        default: '—',
        description:
          'Place on <a> for linked items or <span aria-current="page"> for the current item.',
      },
    ],
    demo: {
      home: 'Home',
      products: 'Products',
      phones: 'Phones',
      current: 'iPhone 17',
    },
  },
  accordion: {
    title: 'Accordion',
    intro:
      'Collapsible panel list. By default opening one panel closes the others; add multiple on g-accordion to allow several panels open at once.',
    apiTitle: 'API — GAccordion, GAccordionPanel',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Each header is a <button> with aria-expanded and aria-controls pointing to the matching role="region" content.',
      'Keyboard navigation between headers uses ↑/↓/Home/End; Enter or Space toggles. Closed panel content is marked inert.',
    ],
    apiRows: [
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description: '(GAccordion) Allows multiple panels to stay open instead of only one.',
      },
      {
        name: 'open',
        type: 'boolean (model)',
        default: 'false',
        description: '(GAccordionPanel) Open/closed state, two-way bound with [(open)].',
      },
      {
        name: '[gAccordionHeader]',
        type: '(projection)',
        default: '—',
        description: '(GAccordionPanel) Projects title content into the header.',
      },
    ],
    demo: {
      whatTitle: 'What is OpenDesign?',
      whatBody:
        'An Angular component library with modern aesthetics, built with signals and ARIA patterns.',
      keyboardTitle: 'Does it support keyboard use?',
      keyboardBody: 'Yes. Headers navigate with ↑/↓/Home/End and toggle with Enter or Space.',
      multipleTitle: 'Can multiple panels stay open?',
      multipleBody: 'Yes, add the multiple attribute on g-accordion.',
    },
  },
  dockMenu: {
    title: 'Dock Menu',
    intro:
      'macOS-style dock menu: an icon row where the hovered item grows and rises above the bar. Set position="bottom" to fix it at the bottom center of the viewport.',
    apiTitle: 'API — GDockMenu',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'Each item is a <button> with aria-label from label; the label also appears as a hover tooltip.',
      'The icon magnification is visual-only CSS :hover; items remain fully usable with Tab + Enter.',
    ],
    apiRows: [
      {
        name: 'items',
        type: 'GDockItem[]',
        default: '[]',
        description: 'Items { icon, label, onClick? } shown in the dock.',
      },
      {
        name: 'position',
        type: `'bottom' | 'static'`,
        default: `'static'`,
        description: 'Fixed at the bottom center or kept in normal layout flow.',
      },
    ],
    demo: {
      dashboard: 'Dashboard',
      images: 'Images',
      links: 'Links',
      copy: 'Copy',
      notifications: 'Notifications',
    },
  },
  pagination: {
    title: 'Pagination',
    intro:
      'Presentational pagination control. It only manages the selected page and does not slice data; consumers use page to fetch or show the right data range.',
    apiTitle: 'API — GPagination',
    accessibilityTitle: 'Accessibility',
    accessibility: [
      'The whole control sits inside <nav aria-label="Pagination">.',
      'The selected page button has aria-current="page"; each page number has its own "Page N" aria-label.',
      'Previous/Next buttons disable themselves on the first/last page and expose localized aria-labels.',
      'Ellipsis represents hidden pages, is not a button, and uses aria-hidden="true".',
    ],
    apiRows: [
      {
        name: 'page',
        type: 'number (model)',
        default: '1',
        description: 'Selected page, 1-based, two-way bound with [(page)].',
      },
      {
        name: 'pageCount',
        type: 'number (required)',
        default: '—',
        description: 'Total page count.',
      },
    ],
    demo: {
      currentPage: 'Current page:',
    },
  },
};

export function navigationCopyFor(tag: string): NavigationCopy {
  return tag.startsWith('en') ? EN_NAVIGATION : VI_NAVIGATION;
}
