import {
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconChevronLeft, gIconChevronRight } from '../icon/icons';
import { GLocaleService } from '../core/locale';

// Băng chuyền "tâm điểm": khung hiện 3 card — card GIỮA phóng to (active), hai bên PEEK một phần card
// trước/sau. Chạy theo active INDEX (không free-scroll): bấm nút prev/next hoặc bấm thẳng vào card bên
// cạnh để đưa nó vào giữa; phím ←/→ khi focus track. Track được dịch (translateX) để card active nằm
// chính giữa viewport. `loop` cho quay vòng (next ở cuối về card đầu, prev ở đầu tới card cuối) và hiện
// dải dot điều hướng bên dưới. Thuần TRÌNH BÀY — consumer tự dựng card & đặt bề rộng (nên < viewport để
// lộ phần peek hai bên). Khác GCarousel (free-scroll, mọi item ngang hàng).
@Component({
  selector: 'g-coverflow',
  imports: [GIcon],
  template: `
    <div class="g-coverflow__stage">
      <button
        type="button"
        class="g-coverflow__nav g-coverflow__nav--prev"
        [attr.aria-label]="t().coverflow.previous"
        [class.g-coverflow__nav--hidden]="!canPrev()"
        [disabled]="!canPrev()"
        (click)="move(-1)"
      >
        <g-icon [icon]="iconPrev" size="sm" />
      </button>

      <div class="g-coverflow__viewport">
        <div
          #track
          class="g-coverflow__track"
          role="group"
          [attr.aria-roledescription]="t().coverflow.roleDescription"
          [attr.aria-label]="t().coverflow.label"
          tabindex="0"
          (click)="onTrackClick($event)"
          (keydown)="onKeydown($event)"
        >
          <ng-content />
        </div>
      </div>

      <button
        type="button"
        class="g-coverflow__nav g-coverflow__nav--next"
        [attr.aria-label]="t().coverflow.next"
        [class.g-coverflow__nav--hidden]="!canNext()"
        [disabled]="!canNext()"
        (click)="move(1)"
      >
        <g-icon [icon]="iconNext" size="sm" />
      </button>
    </div>

    @if (loop()) {
      <div class="g-coverflow__dots">
        @for (i of dotIndexes(); track i) {
          <button
            type="button"
            class="g-coverflow__dot"
            [class.g-coverflow__dot--active]="i === active()"
            [attr.aria-current]="i === active() ? 'true' : null"
            [attr.aria-label]="'Tới card ' + (i + 1)"
            (click)="active.set(i)"
          ></button>
        }
      </div>
    }
  `,
  styleUrl: './coverflow.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-coverflow' },
})
export class GCoverflow {
  // Chỉ số card đang ở giữa (two-way — consumer có thể đặt card khởi đầu / theo dõi).
  readonly active = model(0);
  // Quay vòng: next ở cuối → về card đầu, prev ở đầu → tới card cuối; hiện dải dot điều hướng bên dưới.
  readonly loop = input(false, { transform: booleanAttribute });

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;
  protected readonly count = signal(0);
  // Khi loop, prev/next không bao giờ tắt (đã quay vòng); ngược lại tắt ở biên.
  protected readonly canPrev = computed(() => this.loop() || this.active() > 0);
  protected readonly canNext = computed(() => this.loop() || this.active() < this.count() - 1);
  protected readonly dotIndexes = computed(() => Array.from({ length: this.count() }, (_, i) => i));

  constructor() {
    // active đổi → sau render dịch lại track cho card active vào giữa + đánh dấu card active.
    afterRenderEffect(() => {
      this.active();
      this.refresh();
    });
    afterNextRender(() => {
      const el = this.track().nativeElement;
      // Đổi kích thước khung → dịch lại cho card active vẫn ở giữa.
      const ro = new ResizeObserver(() => this.refresh());
      ro.observe(el);
      // Danh sách card đổi (thêm/bớt) → cập nhật số lượng & dịch lại.
      const mo = new MutationObserver(() => this.refresh());
      mo.observe(el, { childList: true });
      this.destroyRef.onDestroy(() => {
        ro.disconnect();
        mo.disconnect();
      });
    });
  }

  protected move(dir: 1 | -1): void {
    const n = this.track().nativeElement.children.length;
    if (n === 0) return;
    const next = this.active() + dir;
    // loop → quay vòng bằng modulo; ngược lại → kẹp trong [0, n-1].
    this.active.set(this.loop() ? (next + n) % n : Math.min(Math.max(next, 0), n - 1));
  }

  // Bấm thẳng vào card bên cạnh → đưa nó vào giữa.
  protected onTrackClick(e: MouseEvent): void {
    const items = Array.from(this.track().nativeElement.children) as HTMLElement[];
    const idx = items.findIndex((it) => it.contains(e.target as Node));
    if (idx >= 0) this.active.set(idx);
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.move(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.move(-1);
    }
  }

  // Dịch track để card active nằm CHÍNH GIỮA viewport + đánh dấu card active (global CSS phóng to nó).
  private refresh(): void {
    const el = this.track().nativeElement;
    const items = Array.from(el.children) as HTMLElement[];
    this.count.set(items.length);
    if (!items.length) return;
    const a = Math.min(Math.max(this.active(), 0), items.length - 1);
    const viewport = el.parentElement as HTMLElement;
    const activeEl = items[a];
    const shift = viewport.clientWidth / 2 - (activeEl.offsetLeft + activeEl.offsetWidth / 2);
    el.style.transform = `translateX(${shift}px)`;
    items.forEach((it, i) => it.classList.toggle('g-coverflow__item--active', i === a));
  }
}
