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
import { GLocaleService } from '../core/locale';

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
        [attr.aria-roledescription]="t().imageSlider.roleDescription"
        [attr.aria-label]="t().imageSlider.label"
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
                    [attr.aria-label]="t().imageSlider.zoom"
                    (click)="openAt($index)"
                  >
                    <img
                      [src]="url"
                      [attr.alt]="t().imageSlider.imageAlt($index + 1)"
                      draggable="false"
                    />
                  </button>
                } @else {
                  <img
                    class="g-image-slider__img"
                    [src]="url"
                    [attr.alt]="t().imageSlider.imageAlt($index + 1)"
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
            [attr.aria-label]="t().imageSlider.previous"
            [disabled]="!canPrev()"
            (click)="prev()"
          >
            <g-icon [icon]="iconPrev" />
          </button>
          <button
            type="button"
            class="g-image-slider__nav g-image-slider__nav--next"
            [attr.aria-label]="t().imageSlider.next"
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
                [attr.aria-label]="t().imageSlider.goTo($index + 1)"
                (click)="goTo($index)"
              ></button>
            }
          </div>
        }

        <span class="g-image-slider__status" aria-live="polite">
          {{ t().imageSlider.status(index() + 1, urls().length) }}
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
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

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
    openLightbox(this.dialog, this.urls(), i, this.t().lightbox.label);
  }
}
