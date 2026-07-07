import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  GIcon,
  gIconCart,
  gIconCheck,
  gIconChevronDown,
  gIconChevronLeft,
  gIconChevronRight,
  gIconChevronUp,
  gIconDownload,
  gIconEdit,
  gIconError,
  gIconEye,
  gIconEyeOff,
  gIconHome,
  gIconInfo,
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
  { name: 'gIconCheck', glyph: gIconCheck },
  { name: 'gIconPlus', glyph: gIconPlus },
  { name: 'gIconMinus', glyph: gIconMinus },
  { name: 'gIconSearch', glyph: gIconSearch },
  { name: 'gIconUser', glyph: gIconUser },
  { name: 'gIconCart', glyph: gIconCart },
  { name: 'gIconSettings', glyph: gIconSettings },
  { name: 'gIconHome', glyph: gIconHome },
  { name: 'gIconEye', glyph: gIconEye },
  { name: 'gIconEyeOff', glyph: gIconEyeOff },
  { name: 'gIconSun', glyph: gIconSun },
  { name: 'gIconMoon', glyph: gIconMoon },
  { name: 'gIconInfo', glyph: gIconInfo },
  { name: 'gIconWarning', glyph: gIconWarning },
  { name: 'gIconError', glyph: gIconError },
  { name: 'gIconSuccess', glyph: gIconSuccess },
  { name: 'gIconTrash', glyph: gIconTrash },
  { name: 'gIconEdit', glyph: gIconEdit },
  { name: 'gIconDownload', glyph: gIconDownload },
  { name: 'gIconUpload', glyph: gIconUpload },
  { name: 'gIconPanelLeftClose', glyph: gIconPanelLeftClose },
  { name: 'gIconPanelLeftOpen', glyph: gIconPanelLeftOpen },
];

@Component({
  selector: 'docs-icon-basic-demo',
  imports: [GIcon],
  template: `
    <div class="docs-icon-grid">
      @for (entry of icons; track entry.name) {
        <div class="docs-icon-grid__cell">
          <g-icon [icon]="entry.glyph" size="lg" />
          <code>{{ entry.name }}</code>
        </div>
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
    }
    .docs-icon-grid__cell code {
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
      text-align: center;
      word-break: break-word;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBasicDemo {
  protected readonly icons: readonly IconEntry[] = ICON_ENTRIES;
}
