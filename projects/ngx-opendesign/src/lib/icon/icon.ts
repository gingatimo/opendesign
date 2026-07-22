import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { gDevWarning } from '../core/dev-warning';
import type { GIconGlyph } from './icons';

export type GIconSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'g-icon',
  template: `
    <svg [attr.viewBox]="icon().viewBox" aria-hidden="true" focusable="false">
      @for (d of icon().paths ?? []; track d) {
        <path [attr.d]="d" />
      }
      @for (c of icon().circles ?? []; track $index) {
        <circle [attr.cx]="c.cx" [attr.cy]="c.cy" [attr.r]="c.r" />
      }
      @for (r of icon().rects ?? []; track $index) {
        <rect
          [attr.x]="r.x"
          [attr.y]="r.y"
          [attr.width]="r.width"
          [attr.height]="r.height"
          [attr.rx]="r.rx ?? null"
        />
      }
    </svg>
  `,
  styleUrl: './icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-icon',
    '[class.g-icon--sm]': 'size() === "sm"',
    '[class.g-icon--md]': 'size() === "md"',
    '[class.g-icon--lg]': 'size() === "lg"',
    '[class.g-icon--filled]': 'icon().filled',
  },
})
export class GIcon {
  /** Dữ liệu hình học của icon — lấy từ một trong các hằng gIcon* ở icons.ts. */
  readonly icon = input.required<GIconGlyph>();
  readonly size = input<GIconSize>('md');

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Cùng kỹ thuật đọc thuộc tính consumer đặt trên host mà GSpinner/GIconButton dùng
    // (afterNextRender + hasAttribute), nhưng ở đây có 2 nhánh loại trừ nhau:
    // - Không có aria-label/aria-labelledby → icon là trang trí → aria-hidden.
    // - Có → icon mang nghĩa độc lập → role="img", KHÔNG được aria-hidden (mâu thuẫn nhau vì
    //   aria-hidden xoá phần tử khỏi accessibility tree, làm aria-label vô nghĩa). Nếu consumer
    //   lỡ tự đặt aria-hidden="true" tĩnh trên template (vd. copy từ icon trang trí rồi thêm
    //   aria-label), gỡ aria-hidden — ưu tiên aria-label vì đó là ý định rõ ràng hơn — và cảnh báo
    //   dev để họ biết mà sửa template thay vì im lặng để lại misuse.
    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      const coNhan = el.hasAttribute('aria-label') || el.hasAttribute('aria-labelledby');
      if (coNhan) {
        el.setAttribute('role', 'img');
        if (el.hasAttribute('aria-hidden')) {
          gDevWarning(
            'GIcon',
            'icon has aria-label/aria-labelledby but its host also has aria-hidden="true"; removed aria-hidden because the two conflict (aria-hidden removes the element from the accessibility tree, making aria-label meaningless)',
          );
          el.removeAttribute('aria-hidden');
        }
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
    });
  }
}
