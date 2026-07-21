import { Dialog } from '@angular/cdk/dialog';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconX } from '../icon/icons';
import { openLightbox } from './lightbox';
import { GLocaleService } from '../core/locale';

// Lưới thumbnail ảnh. Nhận string URL hoặc File (File → objectURL, revoke khi đổi/huỷ để không rò).
// Click thumbnail → mở GLightbox (zoom/pan). removable → nút × phát (remove) index.
@Component({
  selector: 'g-image-preview',
  imports: [GIcon],
  template: `
    <div class="g-image-preview">
      @for (url of urls(); track $index) {
        <div class="g-image-preview__item">
          <button type="button" class="g-image-preview__thumb" (click)="openLightbox($index)">
            <img [src]="url" [attr.alt]="'Ảnh ' + ($index + 1)" loading="lazy" />
          </button>
          @if (removable()) {
            <button
              type="button"
              class="g-image-preview__remove"
              [attr.aria-label]="t().imagePreview.remove($index + 1)"
              (click)="remove.emit($index)"
            >
              <g-icon [icon]="iconX" size="sm" />
            </button>
          }
        </div>
      }
    </div>
  `,
  styleUrl: './image-preview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GImagePreview {
  readonly images = input<readonly (string | File)[]>([]);
  readonly removable = input(false, { transform: booleanAttribute });
  readonly remove = output<number>();

  protected readonly iconX = gIconX;
  private readonly dialog = inject(Dialog);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  // objectURL cho File. effect đồng bộ theo images(): revoke URL của lần trước rồi dựng mảng mới (map
  // File→createObjectURL, string→dùng thẳng) + revoke khi huỷ — tránh rò bộ nhớ. Dùng effect (KHÔNG
  // computed) vì createObjectURL/revoke là SIDE EFFECT, không được đặt trong computed (phải thuần).
  protected readonly urls = signal<string[]>([]);
  private created: string[] = [];

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
    });
    inject(DestroyRef).onDestroy(() => this.created.forEach((u) => URL.revokeObjectURL(u)));
  }

  protected openLightbox(startIndex: number): void {
    openLightbox(this.dialog, this.urls(), startIndex, this.t().lightbox.label);
  }
}
