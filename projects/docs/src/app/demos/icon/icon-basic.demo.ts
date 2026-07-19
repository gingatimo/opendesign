import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  GIcon,
  gIconAngleDown,
  gIconAngleUp,
  gIconBell,
  gIconCalendar,
  gIconCart,
  gIconCheck,
  gIconChevronDown,
  gIconChevronLeft,
  gIconChevronRight,
  gIconChevronUp,
  gIconCopy,
  gIconDownload,
  gIconEdit,
  gIconError,
  gIconEye,
  gIconEyeOff,
  gIconFile,
  gIconGrid,
  gIconHome,
  gIconImage,
  gIconInfo,
  gIconLayout,
  gIconLink,
  gIconMenu,
  gIconMinus,
  gIconMoon,
  gIconPanelLeftClose,
  gIconPanelLeftOpen,
  gIconPlus,
  gIconSearch,
  gIconSettings,
  gIconSuccess,
  gIconSun,
  gIconTable,
  gIconTrash,
  gIconUpload,
  gIconUser,
  gIconWarning,
  gIconX,
  type GIconGlyph,
} from 'ngx-opendesign';

interface IconEntry {
  name: string;
  glyph: GIconGlyph;
}

/** Toàn bộ icon set — dùng để dựng lưới tra cứu, mỗi ô kèm tên hằng để copy. */
const ICON_ENTRIES: readonly IconEntry[] = [
  { name: 'gIconMenu', glyph: gIconMenu },
  { name: 'gIconX', glyph: gIconX },
  { name: 'gIconChevronLeft', glyph: gIconChevronLeft },
  { name: 'gIconChevronRight', glyph: gIconChevronRight },
  { name: 'gIconChevronUp', glyph: gIconChevronUp },
  { name: 'gIconChevronDown', glyph: gIconChevronDown },
  { name: 'gIconAngleUp', glyph: gIconAngleUp },
  { name: 'gIconAngleDown', glyph: gIconAngleDown },
  { name: 'gIconCheck', glyph: gIconCheck },
  { name: 'gIconPlus', glyph: gIconPlus },
  { name: 'gIconMinus', glyph: gIconMinus },
  { name: 'gIconCopy', glyph: gIconCopy },
  { name: 'gIconSearch', glyph: gIconSearch },
  { name: 'gIconUser', glyph: gIconUser },
  { name: 'gIconCart', glyph: gIconCart },
  { name: 'gIconSettings', glyph: gIconSettings },
  { name: 'gIconHome', glyph: gIconHome },
  { name: 'gIconEye', glyph: gIconEye },
  { name: 'gIconEyeOff', glyph: gIconEyeOff },
  { name: 'gIconSun', glyph: gIconSun },
  { name: 'gIconMoon', glyph: gIconMoon },
  { name: 'gIconBell', glyph: gIconBell },
  { name: 'gIconInfo', glyph: gIconInfo },
  { name: 'gIconWarning', glyph: gIconWarning },
  { name: 'gIconError', glyph: gIconError },
  { name: 'gIconSuccess', glyph: gIconSuccess },
  { name: 'gIconTrash', glyph: gIconTrash },
  { name: 'gIconEdit', glyph: gIconEdit },
  { name: 'gIconLink', glyph: gIconLink },
  { name: 'gIconDownload', glyph: gIconDownload },
  { name: 'gIconUpload', glyph: gIconUpload },
  { name: 'gIconFile', glyph: gIconFile },
  { name: 'gIconImage', glyph: gIconImage },
  { name: 'gIconCalendar', glyph: gIconCalendar },
  { name: 'gIconGrid', glyph: gIconGrid },
  { name: 'gIconLayout', glyph: gIconLayout },
  { name: 'gIconTable', glyph: gIconTable },
  { name: 'gIconPanelLeftClose', glyph: gIconPanelLeftClose },
  { name: 'gIconPanelLeftOpen', glyph: gIconPanelLeftOpen },
];

@Component({
  selector: 'docs-icon-basic-demo',
  imports: [GIcon],
  template: `
    <div class="docs-icon-grid">
      @for (entry of icons; track entry.name) {
        <button
          type="button"
          class="docs-icon-grid__cell"
          [class.docs-icon-grid__cell--copied]="copied() === entry.name"
          [attr.aria-label]="'Copy ' + entry.name"
          (click)="copy(entry.name)"
        >
          <g-icon [icon]="entry.glyph" size="lg" />
          <code>{{ copied() === entry.name ? 'Đã copy' : entry.name }}</code>
        </button>
      }
    </div>
  `,
  styles: `
    .docs-icon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
      gap: var(--g-space-3);
    }
    .docs-icon-grid__cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--g-space-2);
      padding: var(--g-space-3);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
      background: transparent;
      color: var(--g-text);
      font: inherit;
      cursor: pointer;
      transition:
        border-color var(--g-duration-fast) var(--g-ease),
        background-color var(--g-duration-fast) var(--g-ease);
    }
    .docs-icon-grid__cell:hover {
      border-color: var(--g-border-strong);
      background: var(--g-surface);
    }
    .docs-icon-grid__cell:focus-visible {
      outline: none;
      box-shadow: var(--g-focus-ring);
    }
    .docs-icon-grid__cell code {
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
      text-align: center;
      word-break: break-word;
    }
    .docs-icon-grid__cell--copied {
      border-color: var(--g-primary);
    }
    .docs-icon-grid__cell--copied code {
      color: var(--g-primary);
      font-weight: 600;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBasicDemo {
  protected readonly icons: readonly IconEntry[] = ICON_ENTRIES;
  protected readonly copied = signal<string | null>(null);
  private timer?: ReturnType<typeof setTimeout>;

  protected copy(name: string): void {
    // ?.catch nuốt reject (clipboard bị chặn quyền / mất focus) để không sinh unhandled rejection.
    void navigator.clipboard?.writeText(name)?.catch(() => {});
    this.copied.set(name);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(null), 1200);
  }
}
