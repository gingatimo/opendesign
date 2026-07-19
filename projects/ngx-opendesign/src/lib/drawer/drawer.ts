import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  untracked,
} from '@angular/core';

export type GDrawerSide = 'bottom' | 'left' | 'right' | 'top';

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Drawer hợp nhất: panel position:fixed neo mép + backdrop, trượt vào/ra. side='bottom' = bottom
// sheet (bo góc trên + thanh grab), left/right = side panel full-height, top = sheet trên. Mở/đóng
// hai chiều qua [(open)]. Focus trap (CDK), Esc + click backdrop đóng (trừ disableClose), khoá scroll
// body khi mở. Đóng từ trong: consumer đặt nút (click)="open.set(false)" trong nội dung chiếu.
@Component({
  selector: 'g-drawer',
  imports: [CdkTrapFocus],
  template: `
    <!--
      Backdrop là lớp phủ trang trí (aria-hidden nên nằm ngoài a11y tree): click đóng là tiện lợi cho
      chuột, bàn phím dùng Esc (đã xử ở document — đúng WAI-ARIA dialog). aria-hidden cũng khiến các
      rule click-phải-kèm-phím bỏ qua scrim, khỏi cần thêm tab-stop vô nghĩa.
    -->
    <div class="g-drawer__backdrop" aria-hidden="true" (click)="onBackdropClick()"></div>
    <div
      class="g-drawer__panel"
      role="dialog"
      aria-modal="true"
      tabindex="-1"
      [attr.aria-label]="ariaLabel() || null"
      [attr.inert]="open() ? null : ''"
      [style]="panelStyle()"
      [cdkTrapFocus]="open()"
    >
      @if (side() === 'bottom') {
        <span class="g-drawer__handle" aria-hidden="true"></span>
      }
      <ng-content />
    </div>
  `,
  host: {
    class: 'g-drawer',
    '[class.g-drawer--open]': 'open()',
    '[class.g-drawer--bottom]': `side() === 'bottom'`,
    '[class.g-drawer--left]': `side() === 'left'`,
    '[class.g-drawer--right]': `side() === 'right'`,
    '[class.g-drawer--top]': `side() === 'top'`,
  },
  styleUrl: './drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GDrawer {
  readonly open = model(false);
  readonly side = input<GDrawerSide>('right');
  readonly size = input<string>();
  readonly disableClose = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  // size = rộng cho left/right, cao cho bottom/top. Inline style thắng width/height mặc định trong
  // scss (transform translate 100% vẫn đẩy hết panel ra ngoài dù rộng/cao tuỳ biến).
  protected readonly panelStyle = computed(() => {
    const s = this.size();
    if (!s) return null;
    const s2 = this.side();
    return s2 === 'left' || s2 === 'right' ? { width: s } : { height: s };
  });

  // Lưu overflow cũ của body để khôi phục đúng (không đè '' cứng); phần tử có focus trước khi mở để
  // trả focus về khi đóng. Cờ locked đặt ĐỒNG BỘ trong effect để chỉ ghi body khi thực sự chuyển
  // trạng thái — tránh ghi đè lúc mount (open=false) và tránh race với onDestroy.
  private savedBodyOverflow = '';
  private locked = false;
  private previouslyFocused: HTMLElement | null = null;
  private wasOpen = false;

  constructor() {
    // Khoá scroll body khi mở, khôi phục khi đóng. Chỉ hành động khi CHUYỂN trạng thái (locked) nên
    // drawer đứng yên / mới mount không đụng tới body.style.overflow của consumer. Guard document cho SSR.
    effect(() => {
      const isOpen = this.open();
      if (typeof document === 'undefined') return;
      untracked(() => {
        if (isOpen && !this.locked) {
          this.savedBodyOverflow = document.body.style.overflow;
          document.body.style.overflow = 'hidden';
          this.locked = true;
        } else if (!isOpen && this.locked) {
          document.body.style.overflow = this.savedBodyOverflow;
          this.locked = false;
        }
      });
    });

    // Nếu bị huỷ khi đang khoá, trả scroll lại cho body (tránh khoá vĩnh viễn). Dùng locked (đặt đồng
    // bộ trong effect) chứ không phải wasOpen (đặt ở afterRenderEffect, chạy sau render → có thể lệch).
    inject(DestroyRef).onDestroy(() => {
      if (this.locked && typeof document !== 'undefined') {
        document.body.style.overflow = this.savedBodyOverflow;
      }
    });

    // cdkTrapFocusAutoCapture chỉ chạy lúc init (khi đó open=false) nên không dùng được cho drawer
    // toggle. Tự bắt CHUYỂN TRẠNG THÁI qua cờ wasOpen: mở → lưu focus hiện tại + focus phần tử
    // focusable đầu trong panel (fallback panel tabindex=-1); đóng → trả focus về chỗ cũ.
    afterRenderEffect(() => {
      const isOpen = this.open();
      untracked(() => {
        if (isOpen === this.wasOpen) return;
        this.wasOpen = isOpen;
        if (typeof document === 'undefined') return;
        if (isOpen) {
          this.previouslyFocused = document.activeElement as HTMLElement | null;
          const panel = this.host.nativeElement.querySelector<HTMLElement>('.g-drawer__panel');
          const target = panel?.querySelector<HTMLElement>(FOCUSABLE) ?? panel;
          target?.focus();
        } else {
          this.previouslyFocused?.focus?.();
          this.previouslyFocused = null;
        }
      });
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.open() && !this.disableClose()) this.open.set(false);
  }

  protected onBackdropClick(): void {
    if (!this.disableClose()) this.open.set(false);
  }
}
