import { Dialog, DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconChevronLeft, gIconChevronRight, gIconMinus, gIconPlus, gIconX } from '../icon/icons';
import { GLocaleService } from '../core/locale';

export interface GLightboxData {
  urls: string[];
  startIndex: number;
  labelId: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
let lightboxCount = 0;

// Xem ảnh toàn màn hình (mở qua CDK Dialog — focus trap/Esc/restore focus do CDK lo). Zoom cuộn/nút/
// double-click, pan kéo khi zoom, prev/next nếu nhiều ảnh. Nội bộ: GImagePreview mở, KHÔNG export.
@Component({
  selector: 'g-lightbox',
  imports: [GIcon],
  template: `
    <div class="g-lightbox">
      <span class="cdk-visually-hidden g-lightbox__label" [id]="labelId">{{
        t().lightbox.label
      }}</span>
      <div class="g-lightbox__toolbar">
        <button
          type="button"
          class="g-lightbox__btn"
          [attr.aria-label]="t().lightbox.zoomOut"
          (click)="zoomBy(-0.5)"
        >
          <g-icon [icon]="iconMinus" size="sm" />
        </button>
        <button
          type="button"
          class="g-lightbox__btn"
          [attr.aria-label]="t().lightbox.zoomIn"
          (click)="zoomBy(0.5)"
        >
          <g-icon [icon]="iconPlus" size="sm" />
        </button>
        <button
          type="button"
          class="g-lightbox__btn"
          [attr.aria-label]="t().common.close"
          (click)="close()"
        >
          <g-icon [icon]="iconX" size="sm" />
        </button>
      </div>

      @if (urls.length > 1) {
        <button
          type="button"
          class="g-lightbox__btn g-lightbox__nav g-lightbox__nav--prev"
          [attr.aria-label]="t().lightbox.previous"
          (click)="prev()"
        >
          <g-icon [icon]="iconPrev" />
        </button>
        <button
          type="button"
          class="g-lightbox__btn g-lightbox__nav g-lightbox__nav--next"
          [attr.aria-label]="t().lightbox.next"
          (click)="next()"
        >
          <g-icon [icon]="iconNext" />
        </button>
      }

      <img
        class="g-lightbox__img"
        [class.g-lightbox__img--zoomed]="scale() > 1"
        [src]="current()"
        [attr.alt]="t().lightbox.imageAlt(index() + 1, urls.length)"
        [style.transform]="transform()"
        draggable="false"
        (wheel)="onWheel($event)"
        (dblclick)="toggleZoom()"
        (pointerdown)="onPointerDown($event)"
        (pointermove)="onPointerMove($event)"
        (pointerup)="onPointerUp()"
        (pointercancel)="onPointerUp()"
      />
    </div>
  `,
  styleUrl: './lightbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GLightbox {
  private readonly data = inject<GLightboxData>(DIALOG_DATA);
  private readonly dialogRef = inject<DialogRef>(DialogRef);
  // inject() ở đây chạy đúng dù GLightbox được tạo động qua CDK Dialog: ComponentPortal thừa kế
  // injector gốc (không phải injector cô lập), nên không cần truyền chuỗi qua DIALOG_DATA.
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  protected readonly urls = this.data.urls;
  protected readonly labelId = this.data.labelId;
  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;
  protected readonly iconPlus = gIconPlus;
  protected readonly iconMinus = gIconMinus;
  protected readonly iconX = gIconX;

  protected readonly index = signal(this.data.startIndex);
  protected readonly scale = signal(1);
  private readonly pan = signal({ x: 0, y: 0 });

  protected readonly current = computed(() => this.urls[this.index()]);
  protected readonly transform = computed(() => {
    const p = this.pan();
    return `translate(${p.x}px, ${p.y}px) scale(${this.scale()})`;
  });

  private panStart: { x: number; y: number; panX: number; panY: number } | null = null;

  protected close(): void {
    this.dialogRef.close();
  }

  protected prev(): void {
    this.go(-1);
  }
  protected next(): void {
    this.go(1);
  }
  private go(dir: number): void {
    const n = this.urls.length;
    this.index.set((this.index() + dir + n) % n);
    this.resetTransform();
  }

  protected zoomBy(delta: number): void {
    this.setScale(this.scale() + delta);
  }
  protected toggleZoom(): void {
    this.setScale(this.scale() > 1 ? 1 : 2);
  }
  private setScale(v: number): void {
    const clamped = Math.min(Math.max(v, MIN_SCALE), MAX_SCALE);
    this.scale.set(clamped);
    if (clamped === 1) this.pan.set({ x: 0, y: 0 });
  }
  private resetTransform(): void {
    this.scale.set(1);
    this.pan.set({ x: 0, y: 0 });
  }

  protected onWheel(event: WheelEvent): void {
    event.preventDefault();
    this.setScale(this.scale() * (event.deltaY < 0 ? 1.1 : 0.9));
  }

  protected onPointerDown(event: PointerEvent): void {
    if (this.scale() <= 1) return;
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    const p = this.pan();
    this.panStart = { x: event.clientX, y: event.clientY, panX: p.x, panY: p.y };
  }
  protected onPointerMove(event: PointerEvent): void {
    if (!this.panStart) return;
    this.pan.set({
      x: this.panStart.panX + (event.clientX - this.panStart.x),
      y: this.panStart.panY + (event.clientY - this.panStart.y),
    });
  }
  protected onPointerUp(): void {
    this.panStart = null;
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        if (this.urls.length > 1) {
          this.prev();
          event.preventDefault();
        }
        break;
      case 'ArrowRight':
        if (this.urls.length > 1) {
          this.next();
          event.preventDefault();
        }
        break;
      case '+':
      case '=':
        this.zoomBy(0.5);
        event.preventDefault();
        break;
      case '-':
        this.zoomBy(-0.5);
        event.preventDefault();
        break;
      case '0':
        this.resetTransform();
        event.preventDefault();
        break;
      // Esc: CDK Dialog tự đóng.
    }
  }
}

// Mở GLightbox với cấu hình chuẩn — GImagePreview, GImageSlider, GGallery dùng chung (DRY).
// aria-labelledby trỏ vào chính component để tên dialog đọc signal locale trực tiếp, không bị chụp
// thành chuỗi tại thời điểm mở dialog.
export function openLightbox(dialog: Dialog, urls: string[], startIndex: number): void {
  const labelId = `g-lightbox-label-${++lightboxCount}`;
  dialog.open<unknown, GLightboxData>(GLightbox, {
    data: { urls, startIndex, labelId },
    panelClass: 'g-lightbox-panel',
    backdropClass: 'g-lightbox-backdrop',
    hasBackdrop: true,
    ariaLabelledBy: labelId,
    autoFocus: 'dialog',
    restoreFocus: true,
  });
}
