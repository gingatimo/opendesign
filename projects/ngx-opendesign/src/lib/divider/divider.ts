import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Vạch phân cách. Ngang (mặc định) hoặc dọc; nhãn giữa tuỳ chọn qua nội dung chiếu. role="separator" +
// aria-orientation. Khi không có nhãn, span nhãn rỗng bị ẩn (:empty) nên hai đoạn line ghép thành một đường liền.
@Component({
  selector: 'g-divider',
  template: `
    <span class="g-divider__line"></span>
    <span class="g-divider__label"><ng-content /></span>
    <span class="g-divider__line"></span>
  `,
  host: {
    class: 'g-divider',
    role: 'separator',
    '[class.g-divider--vertical]': `orientation() === 'vertical'`,
    '[attr.aria-orientation]': 'orientation()',
  },
  styleUrl: './divider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GDivider {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
}
