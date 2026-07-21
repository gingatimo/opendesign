import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  CdkConnectedOverlay,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
} from '@angular/cdk/overlay';
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

// 4 góc: dọc (dưới/trên trigger) × ngang (mép trái/phải panel căn với mép trái/phải trigger).
export type GActionMenuPlacement =
  'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

// Dựng ConnectedPosition cho một góc. 'left' = panel căn mép TRÁI trigger (xổ sang phải), 'right' =
// căn mép PHẢI (xổ sang trái). offsetY đẩy panel ra khỏi trigger 6px ở cả hai hướng dọc.
function cornerPosition(
  vertical: 'bottom' | 'top',
  horizontal: 'left' | 'right',
): ConnectedPosition {
  const x = horizontal === 'left' ? 'start' : 'end';
  return {
    originX: x,
    overlayX: x,
    originY: vertical,
    overlayY: vertical === 'bottom' ? 'top' : 'bottom',
    offsetY: vertical === 'bottom' ? 6 : -6,
  };
}

// Danh sách vị trí theo thứ tự ƯU TIÊN cho một placement: góc được chọn trước, rồi lần lượt lật DỌC
// (hay bị cắt nhất), lật NGANG, và lật cả hai. CDK FlexibleConnectedPositionStrategy lấy cái ĐẦU TIÊN
// vừa viewport → tự ra "combo" đúng theo chỗ trống, không cần người dùng tính tay.
export function actionMenuPositions(placement: GActionMenuPlacement): ConnectedPosition[] {
  const [vertical, horizontal] =
    placement === 'auto'
      ? (['bottom', 'left'] as const)
      : (placement.split('-') as ['bottom' | 'top', 'left' | 'right']);
  const flipV = vertical === 'bottom' ? 'top' : 'bottom';
  const flipH = horizontal === 'left' ? 'right' : 'left';
  return [
    cornerPosition(vertical, horizontal),
    cornerPosition(flipV, horizontal),
    cornerPosition(vertical, flipH),
    cornerPosition(flipV, flipH),
  ];
}

// Dropdown menu ĐIỀU HƯỚNG / HÀNH ĐỘNG — bấm trigger để xổ danh sách ra góc chọn qua `placement`
// (4 góc: dưới-trái/dưới-phải/trên-trái/trên-phải), TỰ LẬT sang góc còn chỗ khi sát mép viewport
// (CDK overlay). Trigger 2 kiểu (`variant`): 'icon' (nút tròn, mặc định kebab ⋮)
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
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="g-action-menu__panel"
        [class.g-action-menu__panel--above]="above()"
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
  // Góc ưu tiên: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' ('auto' = bottom-left).
  // Dù chọn góc nào, panel vẫn TỰ LẬT sang góc còn vừa viewport nếu góc đó bị cắt.
  readonly placement = input<GActionMenuPlacement>('auto');
  readonly action = output<GActionMenuItem>();

  protected readonly iconDown = gIconChevronDown;
  protected readonly iconUp = gIconChevronUp;
  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly open = signal(false);
  // Panel đang nằm TRÊN trigger? (do placement chọn hoặc do CDK tự lật vì hết chỗ bên dưới)
  protected readonly above = signal(false);
  private readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly itemRefs = viewChildren<ElementRef<HTMLButtonElement>>('item');

  protected readonly positions = computed<ConnectedPosition[]>(() =>
    actionMenuPositions(this.placement()),
  );

  // CDK báo góc thực sự dùng (có thể đã lật) → đổi hướng animation để panel luôn "mọc ra" từ trigger.
  protected onPositionChange(e: ConnectedOverlayPositionChange): void {
    this.above.set(e.connectionPair.overlayY === 'bottom');
  }

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
