import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { GIcon } from '../icon/icon';
import {
  gIconChevronLeft,
  gIconChevronRight,
  gIconChevronsLeft,
  gIconChevronsRight,
} from '../icon/icons';

// Control phân trang TRÌNH BÀY: phát sự kiện đổi trang; consumer tự cắt dữ liệu. 1-based.
@Component({
  selector: 'g-pagination',
  imports: [GIcon],
  template: `
    <nav class="g-pagination" aria-label="Phân trang">
      <button
        type="button"
        class="g-pagination__first"
        aria-label="Trang đầu"
        [disabled]="page() <= 1"
        (click)="go(1)"
      >
        <g-icon [icon]="iconFirst" size="sm" />
      </button>
      <button
        type="button"
        class="g-pagination__prev"
        aria-label="Trang trước"
        [disabled]="page() <= 1"
        (click)="go(page() - 1)"
      >
        <g-icon [icon]="iconPrev" size="sm" />
      </button>
      @for (item of items(); track $index) {
        @if (item === '…') {
          <span class="g-pagination__ellipsis" aria-hidden="true">…</span>
        } @else {
          <button
            type="button"
            class="g-pagination__page"
            [class.g-pagination__page--active]="item === page()"
            [attr.aria-current]="item === page() ? 'page' : null"
            [attr.aria-label]="'Trang ' + item"
            (click)="go(item)"
          >
            {{ item }}
          </button>
        }
      }
      <button
        type="button"
        class="g-pagination__next"
        aria-label="Trang sau"
        [disabled]="page() >= pageCount()"
        (click)="go(page() + 1)"
      >
        <g-icon [icon]="iconNext" size="sm" />
      </button>
      <button
        type="button"
        class="g-pagination__last"
        aria-label="Trang cuối"
        [disabled]="page() >= pageCount()"
        (click)="go(pageCount())"
      >
        <g-icon [icon]="iconLast" size="sm" />
      </button>
    </nav>
  `,
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GPagination {
  readonly page = model(1);
  readonly pageCount = input.required<number>();

  protected readonly iconFirst = gIconChevronsLeft;
  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;
  protected readonly iconLast = gIconChevronsRight;

  protected readonly items = computed<(number | '…')[]>(() => {
    const total = this.pageCount();
    const cur = this.page();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const out: (number | '…')[] = [1];
    const start = Math.max(2, cur - 1);
    const end = Math.min(total - 1, cur + 1);
    if (start > 2) out.push('…');
    for (let p = start; p <= end; p++) out.push(p);
    if (end < total - 1) out.push('…');
    out.push(total);
    return out;
  });

  protected go(p: number): void {
    const clamped = Math.min(Math.max(p, 1), this.pageCount());
    if (clamped !== this.page()) this.page.set(clamped);
  }
}
