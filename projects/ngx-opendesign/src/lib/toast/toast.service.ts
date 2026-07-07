import { AriaLivePoliteness, LiveAnnouncer } from '@angular/cdk/a11y';
import { GlobalPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { gNextId } from '../core/id-generator';

export type GToastVariant = 'neutral' | 'success' | 'warning' | 'danger';

/** Góc màn hình hiện toast. Mặc định 'top-right' — xem GToastService.position. */
export type GToastPosition =
  'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface GToastConfig {
  /** Nội dung thông báo. */
  message: string;
  /** Mặc định 'neutral'. */
  variant?: GToastVariant;
  /** Thời gian (ms) trước khi tự đóng. Mặc định 4000. 0 = không tự đóng. */
  duration?: number;
}

interface GToastEntry {
  id: string;
  message: string;
  variant: GToastVariant;
}

const DEFAULT_DURATION = 4000;

/**
 * Panel chứa toàn bộ toast đang mở, xếp chồng dọc — component nội bộ, không export ra public API.
 * Đọc trực tiếp state từ GToastService (cùng file) thay vì nhận qua @Input, vì component này được
 * tạo bằng ComponentPortal (không có view cha truyền input) và GToastService là providedIn: 'root'
 * nên inject() ở đây luôn ra cùng một instance singleton.
 */
@Component({
  selector: 'g-toast-container',
  template: `
    @for (toast of toastService.toasts(); track toast.id) {
      <div class="g-toast" [class]="'g-toast--' + toast.variant">
        <span class="g-toast__message">{{ toast.message }}</span>
        <button
          type="button"
          class="g-toast__close"
          aria-label="Đóng"
          (click)="toastService.dismiss(toast.id)"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M4 4l8 8M12 4l-8 8" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-toast-container',
    // Căn lề container theo vị trí hiện tại: trái → flex-start, phải → flex-end (mặc định của
    // .g-toast-container trong opendesign.scss, không cần class riêng), giữa → center. Đọc trực
    // tiếp toastService.position() (signal) nên tự cập nhật khi setPosition() đổi vị trí lúc
    // container đang mở, không cần logic đồng bộ thủ công nào thêm.
    '[class.g-toast-container--start]': 'alignStart()',
    '[class.g-toast-container--center]': 'alignCenter()',
  },
})
class GToastContainer {
  protected readonly toastService = inject(GToastService);

  protected readonly alignStart = computed(() => this.toastService.position().endsWith('left'));
  protected readonly alignCenter = computed(() => this.toastService.position().endsWith('center'));
}

@Injectable({ providedIn: 'root' })
export class GToastService {
  private readonly overlay = inject(Overlay);
  private readonly liveAnnouncer = inject(LiveAnnouncer);

  private overlayRef?: OverlayRef;
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  /**
   * State của mọi toast đang mở. Public vì GToastContainer (cùng file) đọc trực tiếp qua
   * inject() — TypeScript không cho `protected`/`private` xuyên lớp dù cùng module.
   * Không phải một phần API công khai của thư viện (GToastContainer không được export).
   */
  readonly toasts = signal<GToastEntry[]>([]);

  /**
   * Góc màn hình hiện toast — mặc định 'top-right'. Public readonly cùng lý do như `toasts` ở
   * trên (GToastContainer đọc trực tiếp để áp class căn lề). Chỉ `.asReadonly()` (không phải
   * WritableSignal đầy đủ) vì đổi vị trí PHẢI đi qua setPosition() — set thẳng vào signal sẽ bỏ
   * qua updatePositionStrategy() bên dưới, làm overlay thực tế lệch khỏi state hiển thị.
   */
  private readonly _position = signal<GToastPosition>('top-right');
  readonly position = this._position.asReadonly();

  /**
   * Đổi vị trí hiện toast cho những lần show() tiếp theo. Chọn method thay vì injection token:
   * app cần đổi vị trí động (vd. theo cài đặt người dùng) chứ không chỉ cấu hình một lần lúc
   * bootstrap — method cho phép gọi lại bất kỳ lúc nào, kể cả khi container đang mở.
   *
   * Nếu container đang mở (còn toast hiển thị), cập nhật lại position strategy của overlay ngay
   * — không đợi tới lần show() kế tiếp mới áp dụng vị trí mới. Căn lề container (flex-start/
   * flex-end/center) tự cập nhật theo vì GToastContainer đọc trực tiếp signal `position` này.
   */
  setPosition(position: GToastPosition): void {
    this._position.set(position);
    if (this.overlayRef) {
      this.overlayRef.updatePositionStrategy(this.buildPositionStrategy());
    }
  }

  show(config: GToastConfig): string {
    const id = gNextId('g-toast');
    const variant = config.variant ?? 'neutral';
    const duration = config.duration ?? DEFAULT_DURATION;

    this.ensureContainer();
    this.toasts.update((list) => [...list, { id, message: config.message, variant }]);

    const politeness: AriaLivePoliteness = variant === 'danger' ? 'assertive' : 'polite';
    void this.liveAnnouncer.announce(config.message, politeness);

    if (duration > 0) {
      this.timers.set(
        id,
        setTimeout(() => this.dismiss(id), duration),
      );
    }

    return id;
  }

  dismiss(id: string): void {
    const timer = this.timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts.update((list) => list.filter((t) => t.id !== id));
    if (this.toasts().length === 0) {
      this.disposeContainer();
    }
  }

  dismissAll(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.toasts.set([]);
    this.disposeContainer();
  }

  private ensureContainer(): void {
    if (this.overlayRef) {
      // Overlay của toast được tạo một lần rồi dùng lại suốt vòng đời — nếu một overlay khác
      // (vd. dialog) mở SAU đó thì có thể che mất toast, tùy nhánh stacking mà CDK dùng:
      const host = this.overlayRef.hostElement;
      if ('showPopover' in host && host.matches(':popover-open')) {
        // CDK 22 bật usePopover: true theo mặc định ở mọi trình duyệt có 'showPopover' trên
        // document.body (mọi trình duyệt evergreen từ ~2023 trở lên — đây là nhánh CHÍNH, không
        // phải trường hợp hiếm). Trên nhánh này, host overlay nằm trong TOP LAYER của trình
        // duyệt: thứ tự xếp chồng là thứ tự GỌI showPopover(), không phải DOM order — nên
        // appendChild() ở nhánh dưới hoàn toàn vô tác dụng, một dialog mở sau toast vẫn đè lên
        // toast dù pane của toast đã bị đưa xuống cuối DOM. Ẩn rồi hiện lại popover để nó trở
        // thành overlay "vừa mở" gần nhất trong top layer — cách chuẩn để bring-to-front một
        // popover. Host có popover="manual" (CDK tự set khi usePopover) nên không có light-dismiss
        // nào can thiệp vào lúc ẩn/hiện lại này.
        host.hidePopover();
        host.showPopover();
        return;
      }
      // Nhánh fallback khi trình duyệt không hỗ trợ Popover API: CDK xếp chồng theo DOM order
      // (mọi pane dùng chung z-index), mirror OverlayRef._updateStackingOrder() (private, không
      // gọi được từ ngoài) — kèm đúng guard nextSibling mà CDK dùng: appendChild() trên một host
      // đã ở cuối vẫn tách/gắn lại phần tử, làm mất focus nếu người dùng bàn phím đang focus nút
      // đóng của một toast khi có toast khác xuất hiện.
      if (host.nextSibling) {
        host.parentElement?.appendChild(host);
      }
      return;
    }
    this.overlayRef = this.overlay.create({
      positionStrategy: this.buildPositionStrategy(),
    });
    this.overlayRef.attach(new ComponentPortal(GToastContainer));
  }

  /** Dựng position strategy theo góc màn hình hiện tại (signal `position`). 16px mọi phía —
   * cùng khoảng cách với bản gốc chỉ có bottom-right, giữ nguyên cảm giác quen thuộc. */
  private buildPositionStrategy(): GlobalPositionStrategy {
    const strategy = this.overlay.position().global();
    switch (this.position()) {
      case 'top-left':
        return strategy.top('16px').left('16px');
      case 'top-right':
        return strategy.top('16px').right('16px');
      case 'top-center':
        return strategy.top('16px').centerHorizontally();
      case 'bottom-left':
        return strategy.bottom('16px').left('16px');
      case 'bottom-right':
        return strategy.bottom('16px').right('16px');
      case 'bottom-center':
        return strategy.bottom('16px').centerHorizontally();
    }
  }

  private disposeContainer(): void {
    if (!this.overlayRef) return;
    this.overlayRef.dispose();
    this.overlayRef = undefined;
  }
}
