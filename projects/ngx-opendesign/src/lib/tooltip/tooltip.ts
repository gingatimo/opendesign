import { addAriaReferencedId, removeAriaReferencedId } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { gNextId } from '../core/id-generator';

export type GTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/** Khoảng cách (px) giữa tooltip và trigger. */
const TOOLTIP_OFFSET = 8;

/** Vị trí gắn kết cho từng hướng, ưu tiên hướng được yêu cầu rồi mới tới các hướng còn lại. */
const POSITIONS_BY_DIRECTION: Record<GTooltipPosition, ConnectedPosition> = {
  top: {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -TOOLTIP_OFFSET,
  },
  bottom: {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: TOOLTIP_OFFSET,
  },
  left: {
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -TOOLTIP_OFFSET,
  },
  right: {
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: TOOLTIP_OFFSET,
  },
};

/** Panel nội dung tooltip — component nội bộ, không export ra public API. */
@Component({
  selector: 'g-tooltip-panel',
  template: `{{ text() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-tooltip',
    role: 'tooltip',
    '[attr.id]': 'id()',
  },
})
class GTooltipPanel {
  readonly text = signal('');
  readonly id = signal('');
}

@Directive({
  selector: '[gTooltip]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave($event)',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
  },
})
export class GTooltip implements OnDestroy {
  // Nới từ input.required<string>() thành input<string>(''): một component mang GTooltip qua
  // hostDirectives KHÔNG có cách nào tự set input này. Angular chặn ở mức BIÊN DỊCH — không
  // expose thì NG2019 ("Required input 'gTooltip' from host directive GTooltip must be
  // exposed"), mà expose thì yêu cầu bắt buộc lan ra template người dùng (NG8008), tức là mọi
  // <a g-sidebar-item> đều phải truyền text — breaking API v1. Nới ra là lối duy nhất còn lại.
  // Không breaking: mọi consumer v1 đều đang truyền text thật.
  readonly gTooltip = input<string>('');
  readonly gTooltipPosition = input<GTooltipPosition>('top');

  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private overlayRef?: OverlayRef;
  private readonly tooltipId = gNextId('g-tooltip');

  /** Nguồn text theo lập trình — xem gTooltipSetTextSource(). */
  private textSource?: () => string | null;

  /** Nguồn vị trí theo lập trình — xem gTooltipSetPosition(). */
  private positionSource?: GTooltipPosition;

  /**
   * Đăng ký nguồn text theo lập trình, thay cho input gTooltip. Dành cho component mang GTooltip
   * qua hostDirectives và muốn TỰ cấp text (vd. GSidebarItem lấy text từ nhãn của chính nó) —
   * thứ mà cơ chế hostDirectives của Angular không cho làm qua input.
   *
   * Trả `null` = không hiện tooltip. Gộp cả "text" lẫn "bật/tắt" vào một đường duy nhất, nên
   * KHÔNG cần thêm input gTooltipDisabled công khai.
   *
   * Hàm được gọi tại thời điểm hiện tooltip, không phải lúc đăng ký — nguồn text động (vd. text
   * node của interpolation) vì thế luôn được đọc mới.
   *
   * @internal — không thuộc API công khai, có thể đổi bất cứ lúc nào.
   */
  gTooltipSetTextSource(source: () => string | null): void {
    this.textSource = source;
  }

  /**
   * Đăng ký vị trí ưu tiên theo lập trình, thay cho input gTooltipPosition — cùng lý do với
   * gTooltipSetTextSource() ở trên: component mang GTooltip qua hostDirectives (vd.
   * GSidebarItem) không có cách nào set input này qua template, hostDirectives của Angular
   * không cho làm vậy. Không gọi thì show() vẫn đọc gTooltipPosition() như cũ (mặc định 'top')
   * — additive, không đổi hành vi GTooltip dùng trực tiếp qua [gTooltip] + gTooltipPosition.
   *
   * @internal — không thuộc API công khai, có thể đổi bất cứ lúc nào.
   */
  gTooltipSetPosition(pos: GTooltipPosition): void {
    this.positionSource = pos;
  }

  /** Text sẽ hiện, hoặc null nếu không nên hiện gì. Đọc lười — gọi tại lúc show(). */
  private resolveText(): string | null {
    // gTooltip() đọc trước, ưu tiên tuyệt đối: đây là giá trị consumer TỰ TAY gắn (vd.
    // <a g-sidebar-item gTooltip="Xem báo cáo Q4">), đúng hành vi v1 — v1 đọc gTooltip() vô
    // điều kiện, không biết gì tới textSource. GSidebarItem chỉ đăng ký textSource làm NGUỒN
    // MẶC ĐỊNH khi consumer không tự gắn gì; nó không được phép ghi đè giá trị consumer đã chủ
    // động truyền vào, kể cả khi thu gọn (lúc đó tooltip là thứ duy nhất còn nói được item là
    // gì). gTooltip() rỗng ('') là falsy nên rơi xuống textSource?.() — nguồn lập trình có thể
    // trả null nghĩa là "không có gì để nói lúc này" (vd. GSidebarItem khi sidebar đang mở
    // rộng).
    const text = this.gTooltip() || this.textSource?.() || null;
    return text ? text : null;
  }

  // Hover và focus được theo dõi riêng (WCAG 1.4.13 Persistent): tooltip chỉ thực sự ẩn khi
  // CẢ HAI đều false — nếu không, một trigger đang giữ focus sẽ mất tooltip chỉ vì con trỏ
  // tình cờ lướt ngang qua rồi rời đi.
  private hoverOpen = false;
  private focusOpen = false;

  protected onMouseEnter(): void {
    this.hoverOpen = true;
    this.show();
  }

  protected onMouseLeave(event: MouseEvent): void {
    const related = event.relatedTarget as Node | null;
    // Con trỏ rời trigger nhưng đang di chuyển VÀO tooltip — WCAG 1.4.13 Hoverable: phải giữ
    // tooltip mở để con trỏ rê tới được nội dung (bắt buộc với người dùng screen-magnifier).
    if (related && this.overlayRef?.overlayElement.contains(related)) return;
    this.hoverOpen = false;
    this.maybeHide();
  }

  protected onFocus(): void {
    this.focusOpen = true;
    this.show();
  }

  protected onBlur(): void {
    this.focusOpen = false;
    this.maybeHide();
  }

  /** Con trỏ rời khỏi chính panel tooltip — đăng ký trực tiếp lên overlayElement lúc show(). */
  private readonly handlePanelMouseLeave = (event: MouseEvent): void => {
    const related = event.relatedTarget as Node | null;
    // Quay lại trigger thì thôi, (mouseenter) trên trigger sẽ tự set lại hoverOpen = true. Dùng
    // contains() thay vì so sánh identity với nativeElement: trigger tổng hợp (vd. button bọc
    // icon con) có relatedTarget là phần tử con của trigger chứ không phải chính nativeElement —
    // so sánh identity sẽ ẩn rồi hiện lại tooltip (nhấp nháy dispose/recreate) mỗi khi con trỏ đi
    // qua ranh giới giữa icon con và trigger cha.
    if (related && this.elementRef.nativeElement.contains(related)) return;
    this.hoverOpen = false;
    this.maybeHide();
  };

  private maybeHide(): void {
    if (!this.hoverOpen && !this.focusOpen) this.hide();
  }

  protected show(): void {
    if (this.overlayRef?.hasAttached()) return;

    // Không có text thì không dựng gì cả: tooltip rỗng là một hộp trống vô nghĩa, và nó còn kéo
    // theo aria-describedby trỏ vào phần tử không nội dung.
    const text = this.resolveText();
    if (text === null) return;

    const preferred = POSITIONS_BY_DIRECTION[this.positionSource ?? this.gTooltipPosition()];
    const fallbacks = Object.values(POSITIONS_BY_DIRECTION).filter((p) => p !== preferred);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([preferred, ...fallbacks]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const panelRef = this.overlayRef.attach(new ComponentPortal(GTooltipPanel));
    panelRef.instance.text.set(text);
    panelRef.instance.id.set(this.tooltipId);

    // Gộp id của tooltip vào danh sách aria-describedby thay vì ghi đè: trigger có thể đã có
    // sẵn id khác trong đó (vd. hint, thông báo lỗi) — không được làm mất mối liên kết đó.
    addAriaReferencedId(this.elementRef.nativeElement, 'aria-describedby', this.tooltipId);

    // WCAG 1.4.13 Hoverable: panel không có pointer-events: none, nên con trỏ rê được vào
    // trong; lắng nghe mouseleave ngay trên overlayElement để biết khi nào con trỏ thực sự
    // rời khỏi tooltip (khác với rời trigger — đã xử lý ở onMouseLeave).
    this.overlayRef.overlayElement.addEventListener('mouseleave', this.handlePanelMouseLeave);

    // Đóng bằng Esc bất kể focus đang ở đâu (WCAG 1.4.13): OverlayKeyboardDispatcher
    // của CDK lắng nghe keydown ở body và định tuyến tới overlay trên cùng, không phụ
    // thuộc focus — khác với việc chỉ bind (keydown.escape) trên chính trigger, thứ chỉ
    // nhận được sự kiện khi trigger đang giữ focus. Subscription này tự dọn khi
    // overlayRef.dispose() được gọi (dispose() complete() luôn keydownEvents()).
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape' && !hasModifierKey(event)) {
        event.preventDefault();
        this.hide();
      }
    });
  }

  protected hide(): void {
    if (!this.overlayRef) return;
    this.overlayRef.dispose();
    this.overlayRef = undefined;
    this.hoverOpen = false;
    this.focusOpen = false;
    // Chỉ gỡ đúng id của tooltip, giữ nguyên các id khác đã có sẵn trong aria-describedby.
    removeAriaReferencedId(this.elementRef.nativeElement, 'aria-describedby', this.tooltipId);
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }
}
