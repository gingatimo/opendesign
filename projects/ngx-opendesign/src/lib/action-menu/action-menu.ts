import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconChevronDown, gIconChevronUp, GIconGlyph, gIconMoreVertical } from '../icon/icons';

export interface GActionMenuItem {
  label: string;
  value: string;
  icon?: GIconGlyph;
  disabled?: boolean;
}

// Vị trí panel: dưới (ưu tiên) và trên (dự phòng). CDK FlexibleConnectedPositionStrategy tự chọn cái
// đầu tiên VỪA viewport → panel tự lật lên trên nếu dưới bị cắt (và ngược lại).
const BELOW: ConnectedPosition = {
  originX: 'start',
  originY: 'bottom',
  overlayX: 'start',
  overlayY: 'top',
  offsetY: 6,
};
const ABOVE: ConnectedPosition = {
  originX: 'start',
  originY: 'top',
  overlayX: 'start',
  overlayY: 'bottom',
  offsetY: -6,
};

// Dropdown menu ĐIỀU HƯỚNG / HÀNH ĐỘNG — bấm trigger để xổ danh sách xuống DƯỚI, TỰ LẬT LÊN TRÊN khi
// sát mép dưới viewport (CDK overlay). Trigger 2 kiểu (`variant`): 'icon' (nút tròn, mặc định kebab ⋮)
// hoặc 'label' (chữ + mũi tên lên/xuống) — kiểu label dùng lại được cho MENU NGANG. Bàn phím: ↑/↓
// điều hướng, Home/End, Esc đóng, Enter chọn. Phát `(action)` với item được chọn.
@Component({
  selector: 'g-action-menu',
  imports: [GIcon, CdkConnectedOverlay, CdkTrapFocus],
  template: `
    <button
      #trigger
      type="button"
      class="g-action-menu__trigger"
      [class.g-action-menu__trigger--label]="variant() === 'label'"
      [attr.aria-label]="variant() === 'icon' ? label() : null"
      aria-haspopup="menu"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
    >
      @if (variant() === 'label') {
        <span>{{ label() }}</span>
        <!-- Mũi tên lật theo trạng thái: xuống khi đóng, lên khi mở (như menu ngang quen thuộc). -->
        <g-icon [icon]="open() ? iconUp : iconDown" size="sm" />
      } @else {
        <g-icon [icon]="icon()" />
      }
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="elementRef"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions()"
      cdkConnectedOverlayHasBackdrop
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div
        class="g-action-menu__panel"
        role="menu"
        tabindex="-1"
        [attr.aria-label]="label()"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
        (keydown)="onKeydown($event)"
      >
        @for (item of items(); track item.value) {
          <button
            #item
            type="button"
            role="menuitem"
            class="g-action-menu__item"
            [disabled]="item.disabled"
            (click)="select(item)"
          >
            @if (item.icon) {
              <g-icon [icon]="item.icon" size="sm" />
            }
            <span>{{ item.label }}</span>
          </button>
        }
      </div>
    </ng-template>
  `,
  styleUrl: './action-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-action-menu' },
})
export class GActionMenu {
  // Kiểu trigger: 'icon' (nút tròn chỉ icon) hoặc 'label' (chữ + mũi tên lên/xuống — hợp menu ngang).
  readonly variant = input<'icon' | 'label'>('icon');
  // Icon trigger khi variant='icon' (mặc định ⋮ kebab).
  readonly icon = input<GIconGlyph>(gIconMoreVertical);
  readonly items = input<readonly GActionMenuItem[]>([]);
  // Nhãn: a11y khi variant='icon'; là CHỮ HIỂN THỊ khi variant='label'.
  readonly label = input('Menu');
  // Hướng ưu tiên: 'auto'/'bottom' (dưới, lật lên nếu bị cắt) hoặc 'top' (trên, lật xuống nếu bị cắt).
  readonly placement = input<'auto' | 'bottom' | 'top'>('auto');
  readonly action = output<GActionMenuItem>();

  protected readonly iconDown = gIconChevronDown;
  protected readonly iconUp = gIconChevronUp;
  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly open = signal(false);
  private readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly itemRefs = viewChildren<ElementRef<HTMLButtonElement>>('item');

  protected readonly positions = computed<ConnectedPosition[]>(() =>
    this.placement() === 'top' ? [ABOVE, BELOW] : [BELOW, ABOVE],
  );

  protected toggle(): void {
    this.open.set(!this.open());
  }
  protected close(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.triggerRef().nativeElement.focus();
  }

  protected select(item: GActionMenuItem): void {
    if (item.disabled) return;
    this.action.emit(item);
    this.close();
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault();
      this.close();
      return;
    }
    const items = this.itemRefs();
    if (!items.length) return;
    const enabled = items
      .map((r, i) => (r.nativeElement.disabled ? -1 : i))
      .filter((i) => i !== -1);
    if (!enabled.length) return;

    const active = document.activeElement;
    const cur = items.findIndex((r) => r.nativeElement === active);
    let target: number;
    switch (e.key) {
      case 'ArrowDown':
        target = this.step(enabled, cur, 1);
        break;
      case 'ArrowUp':
        target = this.step(enabled, cur, -1);
        break;
      case 'Home':
        target = enabled[0];
        break;
      case 'End':
        target = enabled[enabled.length - 1];
        break;
      default:
        return;
    }
    e.preventDefault();
    items[target]?.nativeElement.focus();
  }

  private step(enabled: number[], current: number, dir: 1 | -1): number {
    const pos = enabled.indexOf(current);
    const base = pos === -1 ? (dir === 1 ? -1 : 0) : pos;
    return enabled[(base + dir + enabled.length) % enabled.length];
  }
}
