import { Dialog } from '@angular/cdk/dialog';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconChevronLeft, gIconChevronRight } from '../icon/icons';
import { openLightbox } from '../image-preview/lightbox';

// Băng chuyền ảnh: 1 ảnh/khung trên track trượt, arrows + dots + phím ←/→. Nhận string URL hoặc File
// (File → objectURL, revoke khi đổi/huỷ). loop: cuộn vòng (tắt thì arrows disabled ở biên). lightbox:
// click ảnh mở GLightbox (zoom/pan). Thuần TRÌNH BÀY — consumer tự quản danh sách ảnh.
@Component({
  selector: 'g-image-slider',
  imports: [GIcon],
  template: `
    @if (urls().length) {
      <div
        class="g-image-slider"
        role="region"
        aria-roledescription="băng chuyền ảnh"
        aria-label="Băng chuyền ảnh"
        tabindex="0"
        (keydown)="onKeydown($event)"
      >
        <div class="g-image-slider__viewport">
          <div class="g-image-slider__track" [style.transform]="trackTransform()">
            @for (url of urls(); track $index) {
              <div class="g-image-slider__slide">
                @if (lightbox()) {
                  <button
                    type="button"
                    class="g-image-slider__zoom"
                    aria-label="Phóng to ảnh"
                    (click)="openAt($index)"
                  >
                    <img [src]="url" [attr.alt]="'Ảnh ' + ($index + 1)" draggable="false" />
                  </button>
                } @else {
                  <img
                    class="g-image-slider__img"
                    [src]="url"
                    [attr.alt]="'Ảnh ' + ($index + 1)"
                    draggable="false"
                  />
                }
              </div>
            }
          </div>
        </div>

        @if (urls().length > 1) {
          <button
            type="button"
            class="g-image-slider__nav g-image-slider__nav--prev"
            aria-label="Ảnh trước"
            [disabled]="!canPrev()"
            (click)="prev()"
          >
            <g-icon [icon]="iconPrev" />
          </button>
          <button
            type="button"
            class="g-image-slider__nav g-image-slider__nav--next"
            aria-label="Ảnh sau"
            [disabled]="!canNext()"
            (click)="next()"
          >
            <g-icon [icon]="iconNext" />
          </button>

          <div class="g-image-slider__dots">
            @for (url of urls(); track $index) {
              <button
                type="button"
                class="g-image-slider__dot"
                [class.g-image-slider__dot--active]="$index === index()"
                [attr.aria-current]="$index === index() ? 'true' : null"
                [attr.aria-label]="'Tới ảnh ' + ($index + 1)"
                (click)="goTo($index)"
              ></button>
            }
          </div>
        }

        <span class="g-image-slider__status" aria-live="polite">
          Ảnh {{ index() + 1 }}/{{ urls().length }}
        </span>
      </div>
    }
  `,
  styleUrl: './image-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GImageSlider {
  readonly images = input<readonly (string | File)[]>([]);
  readonly loop = input(false, { transform: booleanAttribute });
  readonly lightbox = input(false, { transform: booleanAttribute });

  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;
  private readonly dialog = inject(Dialog);

  protected readonly urls = signal<string[]>([]);
  private created: string[] = [];
  protected readonly index = signal(0);

  protected readonly trackTransform = computed(() => `translateX(${-this.index() * 100}%)`);
  protected readonly canPrev = computed(() => this.loop() || this.index() > 0);
  protected readonly canNext = computed(() => this.loop() || this.index() < this.urls().length - 1);

  constructor() {
    // objectURL cho File; revoke lần trước + khi huỷ (như GImagePreview). Dùng effect vì
    // createObjectURL/revoke là SIDE EFFECT. untracked cho index để việc clamp không tự kích lại effect.
    effect(() => {
      const imgs = this.images();
      this.created.forEach((u) => URL.revokeObjectURL(u));
      this.created = [];
      const next = imgs.map((img) => {
        if (typeof img === 'string') return img;
        const u = URL.createObjectURL(img);
        this.created.push(u);
        return u;
      });
      this.urls.set(next);
      const max = Math.max(0, next.length - 1);
      if (untracked(this.index) > max) this.index.set(max);
    });
    inject(DestroyRef).onDestroy(() => this.created.forEach((u) => URL.revokeObjectURL(u)));
  }

  protected prev(): void {
    this.go(-1);
  }
  protected next(): void {
    this.go(1);
  }
  private go(dir: number): void {
    const n = this.urls().length;
    if (n === 0) return;
    if (this.loop()) {
      this.index.set((this.index() + dir + n) % n);
    } else {
      this.index.set(Math.min(Math.max(this.index() + dir, 0), n - 1));
    }
  }
  protected goTo(i: number): void {
    this.index.set(i);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prev();
      event.preventDefault();
    } else if (event.key === 'ArrowRight') {
      this.next();
      event.preventDefault();
    }
  }

  protected openAt(i: number): void {
    openLightbox(this.dialog, this.urls(), i);
  }
}
