import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconChevronLeft, gIconChevronRight } from '../icon/icons';

// Băng chuyền NỘI DUNG BẤT KỲ (project card qua <ng-content>). Track cuộn ngang + scroll-snap: mỗi item
// giữ bề rộng TỰ NHIÊN nên xử lý được cả item bằng nhau lẫn khác nhau (vd. thẻ ngang + thẻ dọc). Nút
// prev/next cuộn ĐÚNG một item mỗi lần (dò offsetLeft, không phụ thuộc bề rộng cố định) và tự ẩn ở
// biên. Thuần TRÌNH BÀY — consumer tự dựng các item con và đặt bề rộng.
@Component({
  selector: 'g-carousel',
  imports: [GIcon],
  template: `
    <button
      type="button"
      class="g-carousel__nav g-carousel__nav--prev"
      aria-label="Item trước"
      [class.g-carousel__nav--hidden]="!canPrev()"
      [disabled]="!canPrev()"
      (click)="step(-1)"
    >
      <g-icon [icon]="iconPrev" size="sm" />
    </button>

    <div
      #track
      class="g-carousel__track"
      [class.g-carousel__track--center]="center()"
      tabindex="0"
      role="group"
      aria-roledescription="băng chuyền"
      aria-label="Băng chuyền"
      (scroll)="onScroll()"
    >
      <ng-content />
    </div>

    <button
      type="button"
      class="g-carousel__nav g-carousel__nav--next"
      aria-label="Item sau"
      [class.g-carousel__nav--hidden]="!canNext()"
      [disabled]="!canNext()"
      (click)="step(1)"
    >
      <g-icon [icon]="iconNext" size="sm" />
    </button>
  `,
  styleUrl: './carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-carousel' },
})
export class GCarousel {
  // Căn GIỮA các item khi chúng vừa khung (safe center → tự lùi về mép trái khi tràn để vẫn cuộn/hiện
  // nút được). Mặc định căn trái (item kế peek ở mép phải như băng chuyền thường).
  readonly center = input(false, { transform: booleanAttribute });

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly destroyRef = inject(DestroyRef);

  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;
  protected readonly canPrev = signal(false);
  protected readonly canNext = signal(false);

  constructor() {
    afterNextRender(() => {
      this.updateEdges();
      // Nội dung/khung đổi bề rộng → cập nhật lại trạng thái biên (ẩn/hiện nút).
      const ro = new ResizeObserver(() => this.updateEdges());
      ro.observe(this.track().nativeElement);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  protected onScroll(): void {
    this.updateEdges();
  }

  // Cuộn tới đúng một item theo hướng: tìm item đầu tiên bên phải mép trái hiện tại (next) hoặc item
  // cuối cùng bên trái (prev) rồi cuộn tới offsetLeft của nó — đúng với item mọi kích thước.
  protected step(dir: 1 | -1): void {
    const el = this.track().nativeElement;
    const items = Array.from(el.children) as HTMLElement[];
    const cur = el.scrollLeft;
    if (dir === 1) {
      const next = items.find((it) => it.offsetLeft > cur + 1);
      el.scrollTo({ left: next ? next.offsetLeft : el.scrollWidth, behavior: 'smooth' });
    } else {
      const prev = [...items].reverse().find((it) => it.offsetLeft < cur - 1);
      el.scrollTo({ left: prev ? prev.offsetLeft : 0, behavior: 'smooth' });
    }
  }

  private updateEdges(): void {
    const el = this.track().nativeElement;
    this.canPrev.set(el.scrollLeft > 1);
    this.canNext.set(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }
}
