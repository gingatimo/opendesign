import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocsI18nService } from '../../core/docs-i18n';
import { CodeBlock } from '../../shared/code-block';

interface LocaleStringGroup {
  group: string;
  keys: string[];
}

@Component({
  imports: [CodeBlock],
  template: `
    <h1>i18n</h1>
    <p>{{ copy().i18n.intro }}</p>

    <h2>{{ copy().i18n.provideTitle }}</h2>
    <p>{{ copy().i18n.provideBody }}</p>
    <docs-code-block [code]="provideSnippet" language="typescript" />

    <h2>{{ copy().i18n.switchTitle }}</h2>
    <p>{{ copy().i18n.switchBody }}</p>
    <docs-code-block [code]="switchSnippet" language="typescript" />

    <h2>{{ copy().i18n.priorityTitle }}</h2>
    <p>{{ copy().i18n.priorityBody }}</p>
    <docs-code-block [code]="inputPrioritySnippet" language="html" />

    <h2>{{ copy().i18n.customTitle }}</h2>
    <p>{{ copy().i18n.customBody }}</p>
    <docs-code-block [code]="customLocaleSnippet" language="typescript" />

    <h2>{{ copy().i18n.keysTitle }}</h2>
    <p>{{ copy().i18n.keysBody }}</p>
    <div class="docs-locale-table-wrap">
      <table class="docs-locale-table">
        <thead>
          <tr>
            <th>{{ copy().i18n.tableGroup }}</th>
            <th>{{ copy().i18n.tableKey }}</th>
          </tr>
        </thead>
        <tbody>
          @for (group of stringGroups; track group.group) {
            @for (key of group.keys; track key; let first = $first) {
              <tr>
                @if (first) {
                  <th [attr.rowspan]="group.keys.length" scope="rowgroup">{{ group.group }}</th>
                }
                <td>
                  <code>{{ key }}</code>
                </td>
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .docs-locale-table-wrap {
      overflow-x: auto;
    }
    .docs-locale-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--g-font-size-sm);
    }
    th,
    td {
      padding: var(--g-space-3);
      border-bottom: 1px solid var(--g-border);
      text-align: left;
      vertical-align: top;
    }
    thead th {
      color: var(--g-text-muted);
      font-weight: 500;
    }
    tbody th {
      width: 12rem;
      color: var(--g-text);
      font-weight: 500;
    }
    code {
      font-size: var(--g-font-size-xs);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class I18nPage {
  private readonly docsI18n = inject(DocsI18nService);
  protected readonly copy = this.docsI18n.copy;

  protected readonly provideSnippet = `import { ApplicationConfig } from '@angular/core';
import { gLocaleVi, provideGLocale } from 'ngx-opendesign';

export const appConfig: ApplicationConfig = {
  providers: [provideGLocale(gLocaleVi)],
};`;

  protected readonly switchSnippet = `import { Component, inject } from '@angular/core';
import { GLocaleService, gLocaleEn, gLocaleVi } from 'ngx-opendesign';

@Component({ /* metadata của component */ })
export class LanguageSwitcher {
  private readonly i18n = inject(GLocaleService);

  useVietnamese(): void {
    this.i18n.use(gLocaleVi);
  }

  useEnglish(): void {
    this.i18n.use(gLocaleEn);
  }
}`;

  protected readonly inputPrioritySnippet = `<g-line-chart ariaLabel="Doanh thu theo tháng" />`;

  protected readonly customLocaleSnippet = `import { GLocale, gLocaleEn } from 'ngx-opendesign';

export const gLocaleExample: GLocale = {
  tag: 'ja-JP',
  firstDayOfWeek: 0,
  strings: {
    ...gLocaleEn.strings,
    common: { ...gLocaleEn.strings.common, close: '閉じる' },
  },
};

// Sao chép đủ strings từ gLocaleEn trong gói thật; Intl tự tạo tên tháng và thứ từ tag.`;

  protected readonly stringGroups: LocaleStringGroup[] = [
    {
      group: 'common',
      keys: ['close', 'cancel', 'apply', 'remove', 'previous', 'next', 'search', 'loading'],
    },
    { group: 'alert', keys: ['neutral', 'success', 'warning', 'danger', 'close'] },
    { group: 'chips', keys: ['add', 'remove(label)'] },
    { group: 'progress', keys: ['label'] },
    { group: 'sidebar', keys: ['expand', 'collapse'] },
    { group: 'orgChart', keys: ['toggleBranch'] },
    { group: 'reorderList', keys: ['dragHandle'] },
    { group: 'actionExpand', keys: ['label'] },
    { group: 'fileInput', keys: ['choose', 'remove(name)', 'noFile', 'selectedCount(count)'] },
    { group: 'terminal', keys: ['commandInput'] },
    { group: 'stepSlider', keys: ['label'] },
    {
      group: 'stepper',
      keys: [
        'optional',
        'completed',
        'current',
        'upcoming',
        'header(position, label, optional, state)',
      ],
    },
    { group: 'pagination', keys: ['label', 'first', 'previous', 'next', 'last', 'page(position)'] },
    { group: 'carousel', keys: ['roleDescription', 'label', 'previous', 'next'] },
    {
      group: 'coverflow',
      keys: ['roleDescription', 'label', 'previous', 'next', 'goTo(position)'],
    },
    {
      group: 'imageSlider',
      keys: [
        'roleDescription',
        'label',
        'previous',
        'next',
        'zoom',
        'goTo(position)',
        'imageAlt(position)',
        'status(position, total)',
      ],
    },
    {
      group: 'imagePreview',
      keys: ['remove(position)', 'view(position)', 'zoom', 'imageAlt(position)'],
    },
    {
      group: 'lightbox',
      keys: ['label', 'zoomIn', 'zoomOut', 'previous', 'next', 'imageAlt(position, total)'],
    },
    { group: 'select', keys: ['searchPlaceholder', 'noResults'] },
    { group: 'searchField', keys: ['fieldLabel', 'valueLabel'] },
    { group: 'otp', keys: ['charLabel(position)'] },
    { group: 'rating', keys: ['label', 'valueText(value, max)'] },
    { group: 'colorPicker', keys: ['open', 'area', 'hue', 'hex'] },
    { group: 'timePicker', keys: ['open', 'hours', 'minutes'] },
    {
      group: 'datepicker',
      keys: [
        'open',
        'openRange',
        'selectMonth',
        'selectYear',
        'prevMonth',
        'nextMonth',
        'prevYear',
        'nextYear',
        'prevYearPage',
        'nextYearPage',
      ],
    },
    {
      group: 'mediaPlayer',
      keys: ['play', 'pause', 'seek', 'mute', 'unmute', 'volume', 'fullscreen', 'exitFullscreen'],
    },
    {
      group: 'chart',
      keys: [
        'download',
        'zoomIn',
        'zoomOut',
        'scaleLow',
        'scaleHigh',
        'contributionUnit',
        'total',
        'dayTooltip(value, unit, date)',
        'aria.line',
        'aria.bar',
        'aria.stackedBar',
        'aria.pie',
        'aria.donut',
        'aria.polar',
        'aria.radar',
        'aria.honeycomb',
        'aria.heatmap',
        'aria.calendarHeatmap',
      ],
    },
    {
      group: 'editor',
      keys: [
        'format',
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'alignLeft',
        'alignCenter',
        'alignRight',
        'outdent',
        'indent',
        'insertLink',
        'removeLink',
        'insertTable',
        'clearFormat',
        'textColor',
        'moreFormats',
        'listStyle',
        'richTextLabel',
        'placeholder',
        'codeLabel',
        'normalText',
        'heading1',
        'heading2',
        'heading3',
        'heading4',
        'heading5',
        'heading6',
        'quote',
        'codeBlock',
        'strikethrough',
        'inlineCode',
        'subscript',
        'superscript',
        'bulletedList',
        'numberedList',
        'checkboxList',
        'colors.default',
        'colors.red',
        'colors.orange',
        'colors.yellow',
        'colors.green',
        'colors.teal',
        'colors.blue',
        'colors.purple',
        'colors.gray',
        'linkPanel.text',
        'linkPanel.placeholder',
        'linkPanel.url',
        'linkPanel.invalid',
        'tablePanel.rows',
        'tablePanel.cols',
        'tablePanel.insert',
        'keyboardHint',
      ],
    },
  ];
}
