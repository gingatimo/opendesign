import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

export type GSkeletonVariant = 'text' | 'circular' | 'rectangular';

// Khối placeholder loading với hiệu ứng shimmer (vệt sáng quét ngang). variant text/circular/
// rectangular; width/height tuỳ chỉnh; lines > 1 (text) render nhiều dòng, dòng cuối ngắn. aria-hidden
// vì thuần trang trí — consumer báo trạng thái tải qua aria-busy/live region ở vùng bao.
@Component({
  selector: 'g-skeleton',
  template: `
    @if (isMultiline()) {
      @for (i of lineIndexes(); track i) {
        <span class="g-skeleton__line" [class.g-skeleton__line--last]="i === lines() - 1"></span>
      }
    }
  `,
  host: {
    class: 'g-skeleton',
    'aria-hidden': 'true',
    '[class.g-skeleton--text]': `variant() === 'text'`,
    '[class.g-skeleton--circular]': `variant() === 'circular'`,
    '[class.g-skeleton--rectangular]': `variant() === 'rectangular'`,
    '[class.g-skeleton--multiline]': 'isMultiline()',
    '[style.width]': 'width()',
    '[style.height]': 'height()',
  },
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GSkeleton {
  readonly variant = input<GSkeletonVariant>('text');
  readonly width = input<string>();
  readonly height = input<string>();
  readonly lines = input(1, { transform: numberAttribute });

  protected readonly isMultiline = computed(() => this.variant() === 'text' && this.lines() > 1);
  protected readonly lineIndexes = computed(() =>
    Array.from({ length: this.lines() }, (_, i) => i),
  );
}
