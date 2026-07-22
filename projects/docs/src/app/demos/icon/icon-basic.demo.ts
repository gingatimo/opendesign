import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  GIcon,
  GLocaleService,
  gIconAlignCenter,
  gIconAlignLeft,
  gIconAlignRight,
  gIconAngleDown,
  gIconAngleUp,
  gIconAtSign,
  gIconBattery,
  gIconBell,
  gIconBookmark,
  gIconCalendar,
  gIconCamera,
  gIconCart,
  gIconCheck,
  gIconChevronDown,
  gIconChevronLeft,
  gIconChevronRight,
  gIconChevronsLeft,
  gIconChevronsRight,
  gIconChevronUp,
  gIconClipboard,
  gIconClock,
  gIconCloud,
  gIconCode,
  gIconCompass,
  gIconCopy,
  gIconCreditCard,
  gIconDownload,
  gIconEdit,
  gIconError,
  gIconExternalLink,
  gIconEye,
  gIconEyeOff,
  gIconFile,
  gIconFileText,
  gIconFilter,
  gIconFlag,
  gIconFolder,
  gIconFolderOpen,
  gIconGift,
  gIconGlobe,
  gIconGrid,
  gIconHeart,
  gIconHelpCircle,
  gIconHome,
  gIconImage,
  gIconIndent,
  gIconInfo,
  gIconLayout,
  gIconLink,
  gIconList,
  gIconListChecks,
  gIconListOrdered,
  gIconLock,
  gIconLogIn,
  gIconLogOut,
  gIconMail,
  gIconMap,
  gIconMapPin,
  gIconMaximize,
  gIconMenu,
  gIconMessageCircle,
  gIconMic,
  gIconMinimize,
  gIconMinus,
  gIconMonitor,
  gIconMoon,
  gIconMoreHorizontal,
  gIconMoreVertical,
  gIconOutdent,
  gIconPackage,
  gIconPanelLeftClose,
  gIconPanelLeftOpen,
  gIconPaperclip,
  gIconPause,
  gIconPhone,
  gIconPlay,
  gIconPlus,
  gIconPrinter,
  gIconRedo,
  gIconRefresh,
  gIconSave,
  gIconSearch,
  gIconSend,
  gIconSettings,
  gIconShare,
  gIconSliders,
  gIconSmartphone,
  gIconStar,
  gIconStrikethrough,
  gIconSubscript,
  gIconSuccess,
  gIconSun,
  gIconSuperscript,
  gIconTable,
  gIconTag,
  gIconTextColor,
  gIconThumbsDown,
  gIconThumbsUp,
  gIconTrash,
  gIconTruck,
  gIconUndo,
  gIconUnlink,
  gIconUnlock,
  gIconUpload,
  gIconUser,
  gIconUsers,
  gIconVideo,
  gIconVolume,
  gIconVolumeMute,
  gIconWallet,
  gIconWarning,
  gIconWifi,
  gIconX,
  gIconZap,
  gIconZoomIn,
  gIconZoomOut,
  type GIconGlyph,
} from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

interface IconEntry {
  name: string;
  glyph: GIconGlyph;
}

/** Toàn bộ icon set — dùng để dựng lưới tra cứu, mỗi ô kèm tên hằng để copy. Gom theo nhóm. */
const ICON_ENTRIES: readonly IconEntry[] = [
  // Điều hướng & mũi tên
  { name: 'gIconMenu', glyph: gIconMenu },
  { name: 'gIconX', glyph: gIconX },
  { name: 'gIconChevronLeft', glyph: gIconChevronLeft },
  { name: 'gIconChevronRight', glyph: gIconChevronRight },
  { name: 'gIconChevronUp', glyph: gIconChevronUp },
  { name: 'gIconChevronDown', glyph: gIconChevronDown },
  { name: 'gIconChevronsLeft', glyph: gIconChevronsLeft },
  { name: 'gIconChevronsRight', glyph: gIconChevronsRight },
  { name: 'gIconAngleUp', glyph: gIconAngleUp },
  { name: 'gIconAngleDown', glyph: gIconAngleDown },
  { name: 'gIconMoreHorizontal', glyph: gIconMoreHorizontal },
  { name: 'gIconMoreVertical', glyph: gIconMoreVertical },
  // Hành động
  { name: 'gIconCheck', glyph: gIconCheck },
  { name: 'gIconPlus', glyph: gIconPlus },
  { name: 'gIconMinus', glyph: gIconMinus },
  { name: 'gIconSearch', glyph: gIconSearch },
  { name: 'gIconFilter', glyph: gIconFilter },
  { name: 'gIconSliders', glyph: gIconSliders },
  { name: 'gIconRefresh', glyph: gIconRefresh },
  { name: 'gIconCopy', glyph: gIconCopy },
  { name: 'gIconEdit', glyph: gIconEdit },
  { name: 'gIconTrash', glyph: gIconTrash },
  { name: 'gIconDownload', glyph: gIconDownload },
  { name: 'gIconUpload', glyph: gIconUpload },
  { name: 'gIconSend', glyph: gIconSend },
  { name: 'gIconExternalLink', glyph: gIconExternalLink },
  { name: 'gIconZoomIn', glyph: gIconZoomIn },
  { name: 'gIconZoomOut', glyph: gIconZoomOut },
  { name: 'gIconMaximize', glyph: gIconMaximize },
  { name: 'gIconMinimize', glyph: gIconMinimize },
  // Liên lạc & xã hội
  { name: 'gIconMail', glyph: gIconMail },
  { name: 'gIconPhone', glyph: gIconPhone },
  { name: 'gIconMessageCircle', glyph: gIconMessageCircle },
  { name: 'gIconBell', glyph: gIconBell },
  { name: 'gIconShare', glyph: gIconShare },
  { name: 'gIconLink', glyph: gIconLink },
  { name: 'gIconBookmark', glyph: gIconBookmark },
  { name: 'gIconStar', glyph: gIconStar },
  { name: 'gIconHeart', glyph: gIconHeart },
  { name: 'gIconThumbsUp', glyph: gIconThumbsUp },
  { name: 'gIconThumbsDown', glyph: gIconThumbsDown },
  { name: 'gIconAtSign', glyph: gIconAtSign },
  { name: 'gIconGlobe', glyph: gIconGlobe },
  // Tài khoản & bảo mật
  { name: 'gIconUser', glyph: gIconUser },
  { name: 'gIconUsers', glyph: gIconUsers },
  { name: 'gIconLogIn', glyph: gIconLogIn },
  { name: 'gIconLogOut', glyph: gIconLogOut },
  { name: 'gIconLock', glyph: gIconLock },
  { name: 'gIconUnlock', glyph: gIconUnlock },
  { name: 'gIconSettings', glyph: gIconSettings },
  // File & dữ liệu
  { name: 'gIconFile', glyph: gIconFile },
  { name: 'gIconFileText', glyph: gIconFileText },
  { name: 'gIconFolder', glyph: gIconFolder },
  { name: 'gIconFolderOpen', glyph: gIconFolderOpen },
  { name: 'gIconSave', glyph: gIconSave },
  { name: 'gIconClipboard', glyph: gIconClipboard },
  { name: 'gIconPaperclip', glyph: gIconPaperclip },
  { name: 'gIconPrinter', glyph: gIconPrinter },
  { name: 'gIconImage', glyph: gIconImage },
  { name: 'gIconCalendar', glyph: gIconCalendar },
  { name: 'gIconClock', glyph: gIconClock },
  { name: 'gIconGrid', glyph: gIconGrid },
  { name: 'gIconLayout', glyph: gIconLayout },
  { name: 'gIconTable', glyph: gIconTable },
  { name: 'gIconPanelLeftClose', glyph: gIconPanelLeftClose },
  { name: 'gIconPanelLeftOpen', glyph: gIconPanelLeftOpen },
  // Thương mại
  { name: 'gIconCart', glyph: gIconCart },
  { name: 'gIconCreditCard', glyph: gIconCreditCard },
  { name: 'gIconWallet', glyph: gIconWallet },
  { name: 'gIconTag', glyph: gIconTag },
  { name: 'gIconGift', glyph: gIconGift },
  { name: 'gIconPackage', glyph: gIconPackage },
  { name: 'gIconTruck', glyph: gIconTruck },
  // Media & thiết bị
  { name: 'gIconPlay', glyph: gIconPlay },
  { name: 'gIconPause', glyph: gIconPause },
  { name: 'gIconVolume', glyph: gIconVolume },
  { name: 'gIconVolumeMute', glyph: gIconVolumeMute },
  { name: 'gIconMic', glyph: gIconMic },
  { name: 'gIconCamera', glyph: gIconCamera },
  { name: 'gIconVideo', glyph: gIconVideo },
  { name: 'gIconMonitor', glyph: gIconMonitor },
  { name: 'gIconSmartphone', glyph: gIconSmartphone },
  { name: 'gIconWifi', glyph: gIconWifi },
  { name: 'gIconCloud', glyph: gIconCloud },
  { name: 'gIconBattery', glyph: gIconBattery },
  { name: 'gIconCode', glyph: gIconCode },
  // Bản đồ & vị trí
  { name: 'gIconMapPin', glyph: gIconMapPin },
  { name: 'gIconMap', glyph: gIconMap },
  { name: 'gIconCompass', glyph: gIconCompass },
  // Giao diện & trạng thái
  { name: 'gIconEye', glyph: gIconEye },
  { name: 'gIconEyeOff', glyph: gIconEyeOff },
  { name: 'gIconSun', glyph: gIconSun },
  { name: 'gIconMoon', glyph: gIconMoon },
  { name: 'gIconHome', glyph: gIconHome },
  { name: 'gIconInfo', glyph: gIconInfo },
  { name: 'gIconHelpCircle', glyph: gIconHelpCircle },
  { name: 'gIconWarning', glyph: gIconWarning },
  { name: 'gIconError', glyph: gIconError },
  { name: 'gIconSuccess', glyph: gIconSuccess },
  { name: 'gIconFlag', glyph: gIconFlag },
  { name: 'gIconZap', glyph: gIconZap },
  // Soạn thảo
  { name: 'gIconUndo', glyph: gIconUndo },
  { name: 'gIconRedo', glyph: gIconRedo },
  { name: 'gIconAlignLeft', glyph: gIconAlignLeft },
  { name: 'gIconAlignCenter', glyph: gIconAlignCenter },
  { name: 'gIconAlignRight', glyph: gIconAlignRight },
  { name: 'gIconUnlink', glyph: gIconUnlink },
  { name: 'gIconTextColor', glyph: gIconTextColor },
  { name: 'gIconStrikethrough', glyph: gIconStrikethrough },
  { name: 'gIconSubscript', glyph: gIconSubscript },
  { name: 'gIconSuperscript', glyph: gIconSuperscript },
  { name: 'gIconList', glyph: gIconList },
  { name: 'gIconListOrdered', glyph: gIconListOrdered },
  { name: 'gIconListChecks', glyph: gIconListChecks },
  { name: 'gIconIndent', glyph: gIconIndent },
  { name: 'gIconOutdent', glyph: gIconOutdent },
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
          [attr.aria-label]="demo().copyLabel(entry.name)"
          (click)="copy(entry.name)"
        >
          <g-icon [icon]="entry.glyph" size="lg" />
          <code>{{ copied() === entry.name ? demo().copied : entry.name }}</code>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).icon.demo);
  private timer?: ReturnType<typeof setTimeout>;

  protected copy(name: string): void {
    // ?.catch nuốt reject (clipboard bị chặn quyền / mất focus) để không sinh unhandled rejection.
    void navigator.clipboard?.writeText(name)?.catch(() => undefined);
    this.copied.set(name);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(null), 1200);
  }
}
