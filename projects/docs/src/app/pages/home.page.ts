import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GBadge, GButton, GCard, GCardHeader, GLink } from 'ngx-opendesign';
import { CodeBlock } from '../shared/code-block';

interface FeatureCard {
  title: string;
  body: string;
}

interface ComponentGroup {
  title: string;
  links: { path: string; label: string }[];
}

@Component({
  imports: [RouterLink, GButton, GBadge, GCard, GCardHeader, GLink, CodeBlock],
  template: `
    <section class="hero">
      <div class="hero__badges">
        <g-badge>v{{ version }}</g-badge>
        <g-badge variant="success">{{ componentCount }} component</g-badge>
        <g-badge>Angular {{ angularVersion }}</g-badge>
      </div>
      <h1>OpenDesign</h1>
      <p class="hero__tagline">
        Design system cho Angular với thẩm mỹ hiện đại: control dạng pill, bề mặt bo góc nhỏ,
        sáng/tối sẵn có. Viết bằng signals, standalone và OnPush — không có dependency bên thứ ba
        nào, chỉ hai peer dependency trong chính hệ Angular:
        <code>&#64;angular/cdk</code> và <code>&#64;angular/forms</code>.
      </p>
      <div class="hero__actions">
        <a g-button routerLink="/components/button">Xem component</a>
        <a g-button variant="outline" href="#cai-dat">Cài đặt</a>
      </div>
    </section>

    <h2>Vì sao dùng OpenDesign</h2>
    <div class="features">
      @for (feature of features; track feature.title) {
        <g-card>
          <div gCardHeader>{{ feature.title }}</div>
          <p class="features__body">{{ feature.body }}</p>
        </g-card>
      }
    </div>

    <h2 id="cai-dat">Cài đặt</h2>
    <p>Đúng hai bước. Không cần cấu hình build, không cần cài thêm tooling nào.</p>

    <h3>1. Cài package</h3>
    <docs-code-block [code]="installSnippet" language="bash" />
    <p class="note">
      Hai peer dependency ngoài <code>&#64;angular/core</code>/<code>&#64;angular/common</code>:
      <code>&#64;angular/cdk</code> (overlay của Dialog, Tooltip, Toast, Select) và
      <code>&#64;angular/forms</code> (các control tương thích <code>ControlValueAccessor</code>:
      Input, Textarea, Checkbox, Toggle, Radio, Select) — cài kèm như trên nếu dự án chưa có.
    </p>

    <h3>2. Import file theme</h3>
    <p>
      Thêm CSS của OpenDesign vào <code>angular.json</code> — đây là nơi định nghĩa toàn bộ design
      token (<code>--g-*</code>) và bảng màu sáng/tối:
    </p>
    <docs-code-block [code]="stylesSnippet" language="json" />
    <p class="note">
      Hoặc <code>&#64;import 'ngx-opendesign/styles/opendesign.css';</code> trong
      <code>styles.scss</code> nếu bạn thích cách đó.
    </p>

    <h2>Dùng component đầu tiên</h2>
    <p>
      Mọi component đều standalone — import thẳng vào <code>imports</code> của component bạn, không
      cần NgModule:
    </p>
    <docs-code-block [code]="usageSnippet" language="typescript" />

    <h2>Bật chế độ tối</h2>
    <p>
      Đặt thuộc tính <code>data-g-theme="dark"</code> lên thẻ <code>&lt;html&gt;</code>. Không có
      thuộc tính này thì mặc định là giao diện sáng — mọi component đều đọc token nên đổi màu đồng
      loạt, bạn không phải sửa gì thêm:
    </p>
    <docs-code-block [code]="themeSnippet" language="typescript" />
    <p class="note">
      Nút sáng/tối ở góc trên bên phải trang này chạy đúng bằng cơ chế đó — bấm thử để xem cả trang
      đổi theme.
    </p>

    <h3>UI gốc của trình duyệt cũng đổi theo</h3>
    <p>
      File theme khai báo sẵn <code>color-scheme: light</code> ở <code>:root</code> và
      <code>color-scheme: dark</code> trong khối <code>[data-g-theme='dark']</code>. Đây là thứ CSS
      variable không làm được: nó báo cho trình duyệt biết bề mặt đang sáng hay tối, để những phần
      giao diện do <em>trình duyệt</em> tự vẽ cũng đi theo — rõ nhất là <strong>thanh cuộn</strong>,
      ngoài ra còn ô chọn ngày/giờ, nền autofill và gạch chân spellcheck.
    </p>
    <p class="note">
      Nghĩa là bạn không cần tự tô màu thanh cuộn: bật chế độ tối là thanh cuộn tối theo, và vẫn giữ
      đúng kiểu thanh cuộn quen thuộc của từng hệ điều hành (macOS vẫn là overlay tự ẩn). Nếu muốn
      thanh cuộn mảnh hơn hoặc đổi màu riêng, dùng <code>scrollbar-width</code> và
      <code>scrollbar-color</code> ở phía ứng dụng — lưu ý trên macOS phải đặt
      <code>scrollbar-width</code> thì màu tùy chỉnh mới hiện, và điều đó sẽ ép thanh cuộn luôn hiện
      thay vì tự ẩn.
    </p>

    <h2>Tùy biến</h2>
    <p>
      Token là CSS custom property nên ghi đè bằng CSS thuần, không cần SCSS hay build tool. Ví dụ
      đổi màu chủ đạo và bán kính bo góc:
    </p>
    <docs-code-block [code]="customizeSnippet" language="scss" />

    <h2>Danh sách component</h2>
    <p>Tất cả {{ componentCount }} component, mỗi trang có demo sống, code mẫu và bảng API.</p>
    <div class="catalog">
      @for (group of componentGroups; track group.title) {
        <div class="catalog__group">
          <h3 class="catalog__title">{{ group.title }}</h3>
          <ul class="catalog__list">
            @for (link of group.links; track link.path) {
              <li>
                <a gLink [routerLink]="link.path">{{ link.label }}</a>
              </li>
            }
          </ul>
        </div>
      }
    </div>

    <h2>Yêu cầu</h2>
    <ul>
      <li>Angular {{ angularVersion }} trở lên (standalone components, signals).</li>
      <li>
        Peer dependencies: <code>&#64;angular/core</code>, <code>&#64;angular/common</code>,
        <code>&#64;angular/cdk</code> (overlay của Dialog, Tooltip, Toast, Select),
        <code>&#64;angular/forms</code> (các control CVA: Input, Textarea, Checkbox, Toggle, Radio,
        Select).
      </li>
      <li>
        Không phụ thuộc <code>&#64;angular/router</code> — component điều hướng như Sidebar dùng
        attribute selector để bạn tự gắn <code>routerLink</code>.
      </li>
    </ul>
  `,
  styles: `
    .hero {
      padding: var(--g-space-7) 0 var(--g-space-6);
      border-bottom: 1px solid var(--g-border);
      margin-bottom: var(--g-space-6);
    }

    .hero__badges {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-4);
    }

    .hero h1 {
      margin: 0 0 var(--g-space-3);
    }

    .hero__tagline {
      max-width: 60ch;
      margin: 0 0 var(--g-space-5);
      color: var(--g-text-muted);
      font-size: var(--g-font-size-lg);
      line-height: 1.6;
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: var(--g-space-4);
      margin-bottom: var(--g-space-6);
    }

    .features__body {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
      line-height: 1.6;
    }

    .note {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }

    .catalog {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: var(--g-space-5);
      margin-bottom: var(--g-space-6);
    }

    .catalog__title {
      margin: 0 0 var(--g-space-2);
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }

    .catalog__list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--g-space-1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  protected readonly version = '1.0.0';
  protected readonly angularVersion = 22;
  protected readonly componentCount = 64;

  protected readonly features: FeatureCard[] = [
    {
      title: 'Thẩm mỹ pill nhất quán',
      body: 'Button, input, chip, select bo tròn hoàn toàn; card và textarea bo góc nhỏ; icon button tròn tuyệt đối. Một ngôn ngữ hình khối áp dụng xuyên suốt.',
    },
    {
      title: 'Sáng/tối có sẵn',
      body: 'Hai bảng màu định nghĩa bằng CSS variable. Đổi theme bằng một thuộc tính trên thẻ html — không cần build lại, không cần sửa component.',
    },
    {
      title: 'Accessibility nghiêm túc',
      body: 'ARIA đúng pattern, điều hướng bàn phím đầy đủ, focus trap cho dialog, live region cho toast. Component thiếu tên cho screen reader sẽ cảnh báo ngay ở dev mode.',
    },
    {
      title: 'Angular hiện đại',
      body: 'Standalone, signal inputs, OnPush, sẵn sàng cho zoneless. Không NgModule, không decorator cũ.',
    },
    {
      title: 'Nhẹ về dependency',
      body: 'Không có dependency bên thứ ba nào — chỉ hai peer dependency trong chính hệ Angular: @angular/cdk cho overlay và focus management, @angular/forms cho các control tương thích ReactiveForms/NgModel.',
    },
    {
      title: 'Tài liệu tiếng Việt',
      body: 'Mọi trang đều có demo sống, code mẫu đọc thẳng từ file nguồn (không bao giờ lệch với thực tế) và ghi chú accessibility.',
    },
  ];

  protected readonly componentGroups: ComponentGroup[] = [
    {
      title: 'Nút',
      links: [
        { path: '/components/button', label: 'Button' },
        { path: '/components/fab', label: 'Fab' },
        { path: '/components/icon-button', label: 'Icon Button' },
      ],
    },
    {
      title: 'Form',
      links: [
        { path: '/components/checkbox', label: 'Checkbox' },
        { path: '/components/datepicker', label: 'Datepicker' },
        { path: '/components/file-input', label: 'File Input' },
        { path: '/components/input', label: 'Input' },
        { path: '/components/radio', label: 'Radio' },
        { path: '/components/search-field', label: 'Search Field' },
        { path: '/components/cascade-select', label: 'Cascade Select' },
        { path: '/components/chips', label: 'Chips' },
        { path: '/components/color-picker', label: 'Color Picker' },
        { path: '/components/input-otp', label: 'Input OTP' },
        { path: '/components/tree-select', label: 'Tree Select' },
        { path: '/components/date-range-picker', label: 'Date Range Picker' },
        { path: '/components/select', label: 'Select' },
        { path: '/components/slider', label: 'Slider' },
        { path: '/components/textarea', label: 'Textarea' },
        { path: '/components/time-picker', label: 'Time Picker' },
        { path: '/components/toggle', label: 'Toggle' },
      ],
    },
    {
      title: 'Hiển thị',
      links: [
        { path: '/components/avatar', label: 'Avatar' },
        { path: '/components/badge', label: 'Badge' },
        { path: '/components/card', label: 'Card' },
        { path: '/components/chip', label: 'Chip' },
        { path: '/components/divider', label: 'Divider' },
        { path: '/components/icon', label: 'Icon' },
        { path: '/components/image-preview', label: 'Image Preview' },
        { path: '/components/image-slider', label: 'Image Slider' },
        { path: '/components/media-player', label: 'Media Player' },
        { path: '/components/progress', label: 'Progress' },
        { path: '/components/skeleton', label: 'Skeleton' },
        { path: '/components/timeline', label: 'Timeline' },
        { path: '/components/spinner', label: 'Spinner' },
      ],
    },
    {
      title: 'Overlay',
      links: [
        { path: '/components/dialog', label: 'Dialog' },
        { path: '/components/drawer', label: 'Drawer' },
        { path: '/components/toast', label: 'Toast' },
        { path: '/components/tooltip', label: 'Tooltip' },
      ],
    },
    {
      title: 'Điều hướng',
      links: [
        { path: '/components/accordion', label: 'Accordion' },
        { path: '/components/breadcrumb', label: 'Breadcrumb' },
        { path: '/components/dock-menu', label: 'Dock Menu' },
        { path: '/components/link', label: 'Link' },
        { path: '/components/menu', label: 'Menu' },
        { path: '/components/pagination', label: 'Pagination' },
        { path: '/components/sidebar', label: 'Sidebar' },
        { path: '/components/stepper', label: 'Stepper' },
        { path: '/components/tabs', label: 'Tabs' },
        { path: '/components/topbar', label: 'Topbar' },
      ],
    },
    {
      title: 'Cấu trúc',
      links: [
        { path: '/components/container', label: 'Container' },
        { path: '/components/grid', label: 'Grid' },
        { path: '/components/stack', label: 'Stack' },
        { path: '/components/layout', label: 'Layout' },
        { path: '/components/scroll-panel', label: 'Scroll Panel' },
      ],
    },
    {
      title: 'Dữ liệu',
      links: [{ path: '/components/table', label: 'Table' }],
    },
  ];

  protected readonly installSnippet = `npm install ngx-opendesign @angular/cdk @angular/forms`;

  protected readonly stylesSnippet = `{
  "projects": {
    "ten-app-cua-ban": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              "node_modules/ngx-opendesign/styles/opendesign.css",
              "src/styles.scss"
            ]
          }
        }
      }
    }
  }
}`;

  protected readonly usageSnippet = `import { Component } from '@angular/core';
import { GButton, GCard, GCardHeader } from 'ngx-opendesign';

@Component({
  selector: 'app-vi-du',
  imports: [GButton, GCard, GCardHeader],
  template: \`
    <g-card>
      <div gCardHeader>Xin chào</div>
      <p>Thẻ này dùng token của OpenDesign nên tự đổi màu theo theme.</p>
      <button g-button (click)="luu()">Lưu thay đổi</button>
      <button g-button variant="outline">Hủy</button>
    </g-card>
  \`,
})
export class ViDuComponent {
  luu(): void {
    console.log('đã lưu');
  }
}`;

  protected readonly themeSnippet = `import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<'light' | 'dark'>('light');

  toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    const root = this.document.documentElement;
    if (this.theme() === 'dark') {
      root.setAttribute('data-g-theme', 'dark');
    } else {
      root.removeAttribute('data-g-theme');
    }
  }
}`;

  protected readonly customizeSnippet = `/* Ghi đè sau khi import opendesign.css */
:root {
  --g-primary: #4f46e5;
  --g-primary-hover: #4338ca;
  --g-radius-sm: 12px;
}

[data-g-theme='dark'] {
  --g-primary: #818cf8;
  --g-primary-hover: #a5b4fc;
}`;
}
