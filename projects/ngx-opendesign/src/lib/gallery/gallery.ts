import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { GCarousel } from '../carousel/carousel';
import { openLightbox } from '../image-preview/lightbox';
import { GLocaleService } from '../core/locale';

// Gallery ảnh kiểu trang bán hàng: một ảnh CHÍNH lớn + dải THUMBNAIL bên dưới; bấm thumbnail đổi ảnh
// chính, bấm ảnh chính mở GLightbox (zoom/pan). Nhận string URL hoặc File (File → objectURL, revoke
// khi đổi/huỷ để không rò). Dải thumbnail dùng GCarousel (center) — căn giữa khi ít ảnh, tự có nút
// trái/phải khi danh sách dài. Thuần TRÌNH BÀY — consumer tự quản danh sách ảnh.
@Component({
  selector: 'g-gallery',
  imports: [GCarousel],
  template: `
    @if (urls().length) {
      <button
        type="button"
        class="g-gallery__main"
        [attr.aria-label]="t().imagePreview.zoom"
        (click)="openLightbox()"
      >
        <img
          [src]="urls()[active()]"
          [attr.alt]="t().imagePreview.imageAlt(active() + 1)"
          draggable="false"
        />
      </button>

      @if (urls().length > 1) {
        <g-carousel center class="g-gallery__thumbs">
          @for (url of urls(); track $index) {
            <button
              type="button"
              class="g-gallery__thumb"
              [class.g-gallery__thumb--active]="$index === active()"
              [attr.aria-current]="$index === active() ? 'true' : null"
              [attr.aria-label]="t().imagePreview.view($index + 1)"
              (click)="active.set($index)"
            >
              <img
                [src]="url"
                [attr.alt]="t().imagePreview.imageAlt($index + 1)"
                loading="lazy"
                draggable="false"
              />
            </button>
          }
        </g-carousel>
      }
    }
  `,
  styleUrl: './gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-gallery' },
})
export class GGallery {
  readonly images = input<readonly (string | File)[]>([]);

  protected readonly active = signal(0);

  // objectURL cho File — xem GImagePreview: revoke lần trước, map File→createObjectURL (string dùng
  // thẳng), revoke khi huỷ. Dùng effect vì createObjectURL là SIDE EFFECT (không đặt trong computed).
  protected readonly urls = signal<string[]>([]);
  private created: string[] = [];
  private readonly dialog = inject(Dialog);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  constructor() {
    effect(() => {
      const imgs = this.images();
      this.created.forEach((u) => URL.revokeObjectURL(u));
      this.created = [];
      this.urls.set(
        imgs.map((img) => {
          if (typeof img === 'string') return img;
          const u = URL.createObjectURL(img);
          this.created.push(u);
          return u;
        }),
      );
      // Danh sách ngắn lại khiến active vượt quá → về ảnh đầu.
      if (this.active() >= imgs.length) this.active.set(0);
    });
    inject(DestroyRef).onDestroy(() => this.created.forEach((u) => URL.revokeObjectURL(u)));
  }

  protected openLightbox(): void {
    openLightbox(this.dialog, this.urls(), this.active());
  }
}
