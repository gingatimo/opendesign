import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GBadge, GButton, GCard, GCardHeader, GLink, GLocaleService } from 'ngx-opendesign';
import { navGroupsFor } from '../core/nav';
import { DocsI18nService } from '../core/docs-i18n';
import { CodeBlock } from '../shared/code-block';

interface FeatureCard {
  title: string;
  body: string;
}

/** Một mảng nội dung lớn của thư viện, kèm đường dẫn để bấm thẳng vào xem. */
interface HighlightCard {
  title: string;
  body: string;
  path: string;
  cta: string;
}

@Component({
  imports: [RouterLink, GButton, GBadge, GCard, GCardHeader, GLink, CodeBlock],
  template: `
    <section class="hero">
      <div class="hero__badges">
        <g-badge>v{{ version }}</g-badge>
        <g-badge variant="success">{{ componentCount }} {{ copy().home.componentBadge }}</g-badge>
        <g-badge>{{ chartCount() }} {{ copy().home.chartBadge }}</g-badge>
        <g-badge>{{ iconCount }} {{ copy().home.iconBadge }}</g-badge>
        <g-badge>Angular {{ angularVersion }}</g-badge>
      </div>
      <h1>OpenDesign</h1>
      <p class="hero__tagline">
        {{ copy().home.tagline }}
        <code>&#64;angular/cdk</code> {{ copy().home.peerJoin }} <code>&#64;angular/forms</code>.
      </p>
      <div class="hero__actions">
        <a g-button routerLink="/components/button">{{ copy().home.viewComponents }}</a>
        <a g-button variant="outline" href="#cai-dat">{{ copy().home.install }}</a>
        <a g-button variant="ghost" routerLink="/playbook/dashboard">{{
          copy().home.viewPlaybook
        }}</a>
      </div>
    </section>

    <h2>{{ copy().home.whatsInside }}</h2>
    <p>{{ copy().home.whatsInsideBody }}</p>
    <div class="features">
      @for (item of highlights(); track item.title) {
        <g-card>
          <div gCardHeader>{{ item.title }}</div>
          <p class="features__body">{{ item.body }}</p>
          <p class="features__cta">
            <a gLink [routerLink]="item.path">{{ item.cta }} →</a>
          </p>
        </g-card>
      }
    </div>

    <h2>{{ copy().home.why }}</h2>
    <div class="features">
      @for (feature of features(); track feature.title) {
        <g-card>
          <div gCardHeader>{{ feature.title }}</div>
          <p class="features__body">{{ feature.body }}</p>
        </g-card>
      }
    </div>

    <h2 id="cai-dat">{{ copy().home.install }}</h2>
    <p>{{ copy().home.installIntro }}</p>

    <h3>{{ copy().home.installPackage }}</h3>
    <docs-code-block [code]="installSnippet" language="bash" />
    <p class="note">{{ copy().home.installNote }}</p>

    <h3>{{ copy().home.importTheme }}</h3>
    <p>{{ copy().home.importThemeBody }}</p>
    <docs-code-block [code]="stylesSnippet" language="json" />
    <p class="note">{{ copy().home.importThemeNote }}</p>

    <h2>{{ copy().home.firstComponent }}</h2>
    <p>{{ copy().home.firstComponentBody }}</p>
    <docs-code-block [code]="usageSnippet" language="typescript" />

    <h2>{{ copy().home.darkMode }}</h2>
    <p>{{ copy().home.darkModeBody }}</p>
    <docs-code-block [code]="themeSnippet" language="typescript" />
    <p class="note">{{ copy().home.darkModeNote }}</p>

    <h3>{{ copy().home.nativeUi }}</h3>
    <p>{{ copy().home.nativeUiBody }}</p>
    <p class="note">{{ copy().home.nativeUiNote }}</p>

    <h2>{{ copy().home.customize }}</h2>
    <p>{{ copy().home.customizeBody }}</p>
    <docs-code-block [code]="customizeSnippet" language="scss" />

    <h2>{{ copy().home.componentList }}</h2>
    <p>{{ copy().home.componentListBody(componentCount) }}</p>
    <div class="catalog">
      @for (group of componentGroups(); track group.title) {
        <div class="catalog__group">
          <h3 class="catalog__title">{{ group.title }} ({{ group.links.length }})</h3>
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

    <h2>{{ copy().home.playbookTitle }}</h2>
    <p>{{ copy().home.playbookBody(playbook().links.length) }}</p>
    <ul class="catalog__list catalog__list--inline">
      @for (link of playbook().links; track link.path) {
        <li>
          <a gLink [routerLink]="link.path">{{ link.label }}</a>
        </li>
      }
    </ul>

    <h2>{{ copy().home.requirements }}</h2>
    <ul>
      <li>{{ copy().home.angularRequirement(angularVersion) }}</li>
      <li>{{ copy().home.peerRequirement }}</li>
      <li>{{ copy().home.routerRequirement }}</li>
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

    /* Card cao bằng nhau (ô lưới kéo giãn), nên xếp dọc để đẩy được link xuống đáy. */
    .features g-card {
      display: flex;
      flex-direction: column;
    }

    .features__body {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
      line-height: 1.6;
    }

    /* margin-top: auto — link nằm sát đáy card, các thẻ trên cùng hàng thẳng nhau dù mô tả dài ngắn khác nhau. */
    .features__cta {
      margin: auto 0 0;
      padding-top: var(--g-space-3);
      font-size: var(--g-font-size-sm);
    }

    .note {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }

    /* Chia cột kiểu báo (không phải grid): các nhóm dài ngắn rất khác nhau — Form 19 mục còn Nút 4 —
       nên lưới sẽ để lại mảng trống lớn, còn cột báo thì tự rót tiếp nhóm sau vào chỗ trống. */
    .catalog {
      columns: 180px 4;
      column-gap: var(--g-space-5);
      margin-bottom: var(--g-space-6);
    }

    .catalog__group {
      break-inside: avoid;
      margin-bottom: var(--g-space-5);
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

    .catalog__list--inline {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--g-space-2) var(--g-space-4);
      margin-bottom: var(--g-space-6);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  private readonly i18n = inject(GLocaleService);
  private readonly docsI18n = inject(DocsI18nService);

  protected readonly copy = this.docsI18n.copy;
  protected readonly version = '2.0.0';
  protected readonly angularVersion = 22;

  // Danh mục lấy thẳng từ mục lục của sidebar: bỏ nhóm "Bắt đầu" (chỉ có link về đây) và tách
  // "Playbook" ra mục riêng vì đó là màn hình ráp sẵn, không phải component.
  private readonly navGroups = computed(() => navGroupsFor(this.i18n.tag()));
  private readonly startGroupTitle = computed(() =>
    this.i18n.tag() === 'vi-VN' ? 'Bắt đầu' : 'Start',
  );
  protected readonly componentGroups = computed(() =>
    this.navGroups().filter((g) => g.title !== this.startGroupTitle() && g.title !== 'Playbook'),
  );
  protected readonly playbook = computed(() =>
    this.navGroups().find((g) => g.title === 'Playbook')!,
  );

  // Đếm từ mục lục thay vì gõ tay — thêm component mới là con số tự đúng.
  protected readonly componentCount = navGroupsFor('vi-VN')
    .flatMap((g) => g.links)
    .filter((l) => l.path.startsWith('/components/')).length;
  protected readonly chartCount = computed(
    () => this.navGroups().find((g) => g.title === 'Charts')?.links.length ?? 0,
  );
  /** Số icon trong `ngx-opendesign` — xem trang Icon. Không import cả bộ vào đây cho nhẹ bundle. */
  protected readonly iconCount = 116;

  protected readonly highlights = computed<HighlightCard[]>(() =>
    this.i18n.tag() === 'vi-VN'
      ? [
          {
            title: `${this.chartCount()} loại chart, SVG thuần`,
            body: 'Line, bar, stacked bar, pie, donut, polar, radar, honeycomb, heatmap và calendar heatmap. Chung một khung: tiêu đề, chú giải bốn phía, phóng to gần kín màn hình và xuất ra PNG hoặc SVG — màu, tiêu đề, chú giải đều được in vào file.',
            path: '/components/line-chart',
            cta: 'Xem chart',
          },
          {
            title: 'Hai trình soạn thảo',
            body: 'Rich Text Editor với thanh công cụ đầy đủ: heading, khối code, danh sách checkbox, bảng, link, màu chữ, thụt lề bằng Tab. Code Editor tô sáng cú pháp kèm số dòng, gõ tiếng Việt (IME) không mất chữ.',
            path: '/components/rich-text-editor',
            cta: 'Xem editor',
          },
          {
            title: `${this.iconCount} icon tree-shakable`,
            body: 'Mỗi icon là một hằng số rời, chỉ icon nào bạn import mới nằm trong bundle. Vẽ theo lưới 24px, dùng currentColor nên tự đổi màu theo ngữ cảnh.',
            path: '/components/icon',
            cta: 'Xem icon set',
          },
          {
            title: 'Dữ liệu dạng bảng và sơ đồ',
            body: 'Table sắp xếp/chọn dòng, Organization Chart cho sơ đồ tổ chức, Reorder List kéo thả đổi thứ tự — kèm Splitter và Scroll Panel để dựng khung làm việc nhiều vùng.',
            path: '/components/table',
            cta: 'Xem Table',
          },
          {
            title: 'Nền tảng token',
            body: 'Bốn trang giải thích bảng màu, typography, radius và spacing, cùng cách hoạt động của chế độ tối. Mọi token đều là CSS variable nên ghi đè được bằng CSS thuần.',
            path: '/nen-tang/mau-sac',
            cta: 'Xem nền tảng',
          },
          {
            title: 'Playbook màn hình mẫu',
            body: 'Đăng nhập, dashboard, danh sách, chi tiết, thêm mới, chatbot và workspace chat + terminal — mỗi màn ghép từ chính các component ở trên, xem được cả code.',
            path: '/playbook/dashboard',
            cta: 'Xem playbook',
          },
        ]
      : [
          {
            title: `${this.chartCount()} chart types, pure SVG`,
            body: 'Line, bar, stacked bar, pie, donut, polar, radar, honeycomb, heatmap, and calendar heatmap. One shared frame covers titles, four-side legends, near-fullscreen zoom, and PNG/SVG export with colors, titles, and legends included in the file.',
            path: '/components/line-chart',
            cta: 'View charts',
          },
          {
            title: 'Two editors',
            body: 'Rich Text Editor includes heading, code block, checkbox lists, tables, links, text color, and Tab indentation. Code Editor adds syntax highlighting, line numbers, and Vietnamese IME-safe typing.',
            path: '/components/rich-text-editor',
            cta: 'View editors',
          },
          {
            title: `${this.iconCount} tree-shakable icons`,
            body: 'Each icon is a standalone constant, so only imported icons enter the bundle. They are drawn on a 24px grid and use currentColor to follow their context.',
            path: '/components/icon',
            cta: 'View icon set',
          },
          {
            title: 'Tables and diagrams',
            body: 'Table supports sorting and row selection, Organization Chart covers org diagrams, and Reorder List handles drag sorting, with Splitter and Scroll Panel for multi-pane workspaces.',
            path: '/components/table',
            cta: 'View Table',
          },
          {
            title: 'Token foundations',
            body: 'Four pages explain color, typography, radius, spacing, and dark mode. Every token is a CSS variable, so plain CSS overrides are enough.',
            path: '/nen-tang/mau-sac',
            cta: 'View foundations',
          },
          {
            title: 'Sample-screen playbook',
            body: 'Login, dashboard, list, detail, create, chatbot, and chat + terminal workspace screens are composed from the same components, with source code available.',
            path: '/playbook/dashboard',
            cta: 'View playbook',
          },
        ],
  );

  protected readonly features = computed<FeatureCard[]>(() =>
    this.i18n.tag() === 'vi-VN'
      ? [
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
        ]
      : [
          {
            title: 'Consistent pill aesthetic',
            body: 'Buttons, inputs, chips, and selects are fully rounded; cards and textareas use smaller radii; icon buttons are circular. The shape language is consistent throughout.',
          },
          {
            title: 'Light and dark included',
            body: 'Two color palettes are defined as CSS variables. Switch theme with one attribute on html, with no rebuild and no component edits.',
          },
          {
            title: 'Serious accessibility',
            body: 'ARIA follows the right patterns, keyboard navigation is complete, dialogs use focus trap, and toast uses live regions. Components that need screen-reader names warn in dev mode.',
          },
          {
            title: 'Modern Angular',
            body: 'Standalone components, signal inputs, OnPush, and zoneless-ready APIs. No NgModule and no old decorator patterns.',
          },
          {
            title: 'Dependency-light',
            body: 'No third-party runtime dependencies. The only Angular peers are @angular/cdk for overlays/focus management and @angular/forms for ReactiveForms/NgModel-compatible controls.',
          },
          {
            title: 'Bilingual docs',
            body: 'Pages include live demos, source-backed code samples, and accessibility notes, with docs copy switching between Vietnamese and English.',
          },
        ],
  );

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
