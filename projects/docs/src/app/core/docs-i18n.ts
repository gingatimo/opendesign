import { computed, inject, Injectable } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';

interface DocsCopy {
  shell: {
    skipLink: string;
    navLabel: string;
    languageLabel: string;
    themeToggle: string;
  };
  home: {
    componentBadge: string;
    chartBadge: string;
    iconBadge: string;
    tagline: string;
    peerJoin: string;
    viewComponents: string;
    install: string;
    viewPlaybook: string;
    whatsInside: string;
    whatsInsideBody: string;
    why: string;
    installIntro: string;
    installPackage: string;
    installNote: string;
    importTheme: string;
    importThemeBody: string;
    importThemeNote: string;
    firstComponent: string;
    firstComponentBody: string;
    darkMode: string;
    darkModeBody: string;
    darkModeNote: string;
    nativeUi: string;
    nativeUiBody: string;
    nativeUiNote: string;
    customize: string;
    customizeBody: string;
    componentList: string;
    componentListBody: (count: number) => string;
    playbookTitle: string;
    playbookBody: (count: number) => string;
    requirements: string;
    angularRequirement: (version: number) => string;
    peerRequirement: string;
    routerRequirement: string;
  };
  i18n: {
    intro: string;
    provideTitle: string;
    provideBody: string;
    switchTitle: string;
    switchBody: string;
    priorityTitle: string;
    priorityBody: string;
    customTitle: string;
    customBody: string;
    keysTitle: string;
    keysBody: string;
    tableGroup: string;
    tableKey: string;
  };
}

const VI: DocsCopy = {
  shell: {
    skipLink: 'Bỏ qua tới nội dung chính',
    navLabel: 'Điều hướng chính',
    languageLabel: 'Ngôn ngữ',
    themeToggle: 'Đổi giao diện sáng/tối',
  },
  home: {
    componentBadge: 'component',
    chartBadge: 'loại chart',
    iconBadge: 'icon',
    tagline:
      'Design system cho Angular với thẩm mỹ hiện đại: control dạng pill, bề mặt bo góc nhỏ, sáng/tối sẵn có. Viết bằng signals, standalone và OnPush — không có dependency bên thứ ba nào, chỉ hai peer dependency trong chính hệ Angular:',
    peerJoin: 'và',
    viewComponents: 'Xem component',
    install: 'Cài đặt',
    viewPlaybook: 'Xem màn hình mẫu',
    whatsInside: 'Trong hộp có gì',
    whatsInsideBody:
      'Không chỉ là bộ control cơ bản: biểu đồ, trình soạn thảo, icon set và cả những màn hình mẫu ráp sẵn đều nằm trong cùng một package.',
    why: 'Vì sao dùng OpenDesign',
    installIntro: 'Đúng hai bước. Không cần cấu hình build, không cần cài thêm tooling nào.',
    installPackage: '1. Cài package',
    installNote:
      'Hai peer dependency ngoài @angular/core/@angular/common: @angular/cdk (overlay của Dialog, Tooltip, Toast, Select) và @angular/forms (các control tương thích ControlValueAccessor: Input, Textarea, Checkbox, Toggle, Radio, Select) — cài kèm như trên nếu dự án chưa có.',
    importTheme: '2. Import file theme',
    importThemeBody:
      'Thêm CSS của OpenDesign vào angular.json — đây là nơi định nghĩa toàn bộ design token (--g-*) và bảng màu sáng/tối:',
    importThemeNote:
      "Hoặc @import 'ngx-opendesign/styles/opendesign.css'; trong styles.scss nếu bạn thích cách đó.",
    firstComponent: 'Dùng component đầu tiên',
    firstComponentBody:
      'Mọi component đều standalone — import thẳng vào imports của component bạn, không cần NgModule:',
    darkMode: 'Bật chế độ tối',
    darkModeBody:
      'Đặt thuộc tính data-g-theme="dark" lên thẻ <html>. Không có thuộc tính này thì mặc định là giao diện sáng — mọi component đều đọc token nên đổi màu đồng loạt, bạn không phải sửa gì thêm:',
    darkModeNote:
      'Nút sáng/tối ở góc trên bên phải trang này chạy đúng bằng cơ chế đó — bấm thử để xem cả trang đổi theme.',
    nativeUi: 'UI gốc của trình duyệt cũng đổi theo',
    nativeUiBody:
      "File theme khai báo sẵn color-scheme: light ở :root và color-scheme: dark trong khối [data-g-theme='dark']. Đây là thứ CSS variable không làm được: nó báo cho trình duyệt biết bề mặt đang sáng hay tối, để những phần giao diện do trình duyệt tự vẽ cũng đi theo — rõ nhất là thanh cuộn, ngoài ra còn ô chọn ngày/giờ, nền autofill và gạch chân spellcheck.",
    nativeUiNote:
      'Nghĩa là bạn không cần tự tô màu thanh cuộn: bật chế độ tối là thanh cuộn tối theo, và vẫn giữ đúng kiểu thanh cuộn quen thuộc của từng hệ điều hành (macOS vẫn là overlay tự ẩn). Nếu muốn thanh cuộn mảnh hơn hoặc đổi màu riêng, dùng scrollbar-width và scrollbar-color ở phía ứng dụng — lưu ý trên macOS phải đặt scrollbar-width thì màu tùy chỉnh mới hiện, và điều đó sẽ ép thanh cuộn luôn hiện thay vì tự ẩn.',
    customize: 'Tùy biến',
    customizeBody:
      'Token là CSS custom property nên ghi đè bằng CSS thuần, không cần SCSS hay build tool. Ví dụ đổi màu chủ đạo và bán kính bo góc:',
    componentList: 'Danh sách component',
    componentListBody: (count: number) =>
      `Tất cả ${count} component, mỗi trang có demo sống, code mẫu và bảng API.`,
    playbookTitle: 'Playbook — ráp lại thành màn hình thật',
    playbookBody: (count: number) =>
      `Biết từng component rồi thì phần khó còn lại là ghép chúng cho ra một màn hình dùng được. Playbook là ${count} màn hình hoàn chỉnh, code đọc thẳng từ file nguồn:`,
    requirements: 'Yêu cầu',
    angularRequirement: (version: number) =>
      `Angular ${version} trở lên (standalone components, signals).`,
    peerRequirement:
      'Peer dependencies: @angular/core, @angular/common, @angular/cdk (overlay của Dialog, Tooltip, Toast, Select), @angular/forms (các control CVA: Input, Textarea, Checkbox, Toggle, Radio, Select).',
    routerRequirement:
      'Không phụ thuộc @angular/router — component điều hướng như Sidebar dùng attribute selector để bạn tự gắn routerLink.',
  },
  i18n: {
    intro:
      'OpenDesign dùng gói locale để dịch nhãn có sẵn, định dạng số/ngày và xác định ngày đầu tuần. Mặc định là tiếng Anh; docs này đăng ký tiếng Việt để tất cả demo hiển thị đúng ngôn ngữ.',
    provideTitle: 'Khai báo gói lúc khởi tạo',
    provideBody:
      'Thêm provideGLocale() vào providers của cấu hình ứng dụng. Hai gói có sẵn là gLocaleVi và gLocaleEn.',
    switchTitle: 'Đổi ngôn ngữ lúc chạy',
    switchBody:
      'Inject GLocaleService rồi gọi use(). Service dùng signal nên các component OpenDesign đang hiển thị tự cập nhật, không cần tải lại trang. Nút VI/EN ở góc phải của docs đang dùng đúng cơ chế này.',
    priorityTitle: 'Ưu tiên input hơn locale',
    priorityBody:
      'Locale chỉ cấp nhãn mặc định. Khi component có input nhãn, giá trị input luôn thắng để ứng dụng có thể đặt câu chữ theo ngữ cảnh riêng. Ví dụ ariaLabel truyền vào chart không bị thay bởi nhãn mặc định của locale.',
    customTitle: 'Tự viết gói ngôn ngữ khác',
    customBody:
      'Một gói chỉ cần tag, firstDayOfWeek và strings. Sao chép gLocaleEn, dịch toàn bộ strings; TypeScript sẽ báo thiếu khoá. Không thêm tên tháng hay thứ vào gói: Intl của trình duyệt lo phần đó từ tag.',
    keysTitle: 'Toàn bộ khoá strings',
    keysBody:
      'Các khoá dưới đây là hợp đồng đầy đủ của GLocaleStrings. Khoá có tham số được ghi cùng tên tham số để gói tự viết giữ được nội dung động.',
    tableGroup: 'Nhóm',
    tableKey: 'Khoá',
  },
};

const EN: DocsCopy = {
  shell: {
    skipLink: 'Skip to main content',
    navLabel: 'Primary navigation',
    languageLabel: 'Language',
    themeToggle: 'Toggle light/dark theme',
  },
  home: {
    componentBadge: 'components',
    chartBadge: 'chart types',
    iconBadge: 'icons',
    tagline:
      'A design system for Angular with a modern UI language: pill controls, compact rounded surfaces, and built-in light/dark themes. Built with signals, standalone components, and OnPush — no third-party runtime dependencies, only two Angular peer dependencies:',
    peerJoin: 'and',
    viewComponents: 'View components',
    install: 'Install',
    viewPlaybook: 'View sample screens',
    whatsInside: 'What is included',
    whatsInsideBody:
      'Beyond basic controls: charts, editors, an icon set, and full sample screens are shipped in the same package.',
    why: 'Why OpenDesign',
    installIntro: 'Two steps. No build config workarounds and no extra tooling required.',
    installPackage: '1. Install the package',
    installNote:
      'The peer dependencies besides @angular/core/@angular/common are @angular/cdk (overlays for Dialog, Tooltip, Toast, Select) and @angular/forms (ControlValueAccessor-compatible controls: Input, Textarea, Checkbox, Toggle, Radio, Select). Install them with the command above if your app does not have them yet.',
    importTheme: '2. Import the theme file',
    importThemeBody:
      'Add OpenDesign CSS to angular.json. This file defines every design token (--g-*) and the light/dark color palettes:',
    importThemeNote:
      "Or use @import 'ngx-opendesign/styles/opendesign.css'; in styles.scss if you prefer.",
    firstComponent: 'Use your first component',
    firstComponentBody:
      'Every component is standalone. Import it directly in your component imports, no NgModule required:',
    darkMode: 'Enable dark mode',
    darkModeBody:
      'Set data-g-theme="dark" on the <html> element. Without this attribute the light theme is used by default. Every component reads tokens, so colors update together without extra component work:',
    darkModeNote:
      'The theme button in the top-right corner of this docs site uses that exact mechanism. Click it to see the whole page switch theme.',
    nativeUi: 'Native browser UI follows',
    nativeUiBody:
      "The theme file declares color-scheme: light on :root and color-scheme: dark under [data-g-theme='dark']. CSS variables cannot do this part: it tells the browser whether the surface is light or dark, so browser-drawn UI follows too — most visibly scrollbars, and also date/time pickers, autofill backgrounds, and spellcheck underlines.",
    nativeUiNote:
      'You do not need to paint scrollbars yourself: enabling dark mode makes them dark while preserving the native behavior of each OS. For thinner or custom-colored scrollbars, use scrollbar-width and scrollbar-color in the app. On macOS, setting scrollbar-width is also what makes custom colors visible, and it forces scrollbars to remain visible instead of overlaying and auto-hiding.',
    customize: 'Customize',
    customizeBody:
      'Tokens are CSS custom properties, so override them with plain CSS. No SCSS or build tool is required. For example, change the primary color and corner radius:',
    componentList: 'Component list',
    componentListBody: (count: number) =>
      `All ${count} components, each with a live demo, sample code, and API table.`,
    playbookTitle: 'Playbook — compose real screens',
    playbookBody: (count: number) =>
      `Once you know the components, the hard part is composing usable screens. The playbook contains ${count} complete screens, with source code loaded directly from the files:`,
    requirements: 'Requirements',
    angularRequirement: (version: number) =>
      `Angular ${version}+ (standalone components and signals).`,
    peerRequirement:
      'Peer dependencies: @angular/core, @angular/common, @angular/cdk (overlays for Dialog, Tooltip, Toast, Select), @angular/forms (CVA controls: Input, Textarea, Checkbox, Toggle, Radio, Select).',
    routerRequirement:
      'No dependency on @angular/router. Navigation components such as Sidebar use attribute selectors so you can attach routerLink yourself.',
  },
  i18n: {
    intro:
      'OpenDesign uses locale packages for built-in labels, number/date formatting, and first-day-of-week rules. English is the default; this docs app registers Vietnamese so demos render in the selected language.',
    provideTitle: 'Provide a locale at startup',
    provideBody:
      'Add provideGLocale() to your application providers. The built-in packages are gLocaleVi and gLocaleEn.',
    switchTitle: 'Switch language at runtime',
    switchBody:
      'Inject GLocaleService and call use(). The service is signal-based, so visible OpenDesign components update without a page reload. The VI/EN control in the top-right corner of these docs uses this exact mechanism.',
    priorityTitle: 'Inputs override locale',
    priorityBody:
      'Locale provides defaults only. When a component exposes a label input, the input value wins so apps can write context-specific copy. For example, a chart ariaLabel input is not replaced by the locale default.',
    customTitle: 'Write another locale package',
    customBody:
      'A package only needs tag, firstDayOfWeek, and strings. Copy gLocaleEn and translate every string; TypeScript will report any missing keys. Do not add month or weekday names to the package: browser Intl derives those from tag.',
    keysTitle: 'All string keys',
    keysBody:
      'The keys below are the full GLocaleStrings contract. Parameterized keys include parameter names so custom packages keep dynamic content intact.',
    tableGroup: 'Group',
    tableKey: 'Key',
  },
};

@Injectable({ providedIn: 'root' })
export class DocsI18nService {
  private readonly i18n = inject(GLocaleService);

  readonly copy = computed(() => (this.i18n.tag() === 'vi-VN' ? VI : EN));
}
