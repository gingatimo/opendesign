import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { GLocaleService } from '../core/locale';

export type GSpinnerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'g-spinner',
  template: `
    <svg class="g-spinner__circle" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" />
    </svg>
  `,
  styleUrl: './spinner.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-spinner',
    role: 'status',
    '[class.g-spinner--sm]': 'size() === "sm"',
    '[class.g-spinner--md]': 'size() === "md"',
    '[class.g-spinner--lg]': 'size() === "lg"',
    '[class.g-spinner--xl]': 'size() === "xl"',
    '[class.g-spinner--2xl]': 'size() === "2xl"',
  },
})
export class GSpinner {
  readonly size = input<GSpinnerSize>('md');

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  // Ghi nhớ CHÍNH TA đặt nhãn này. Sau lần đặt đầu, hasAttribute() luôn true nên không dùng nó để
  // phân biệt được nữa — mất cờ là ghi đè luôn cả nhãn của consumer.
  private ownsAriaLabel = false;

  constructor() {
    // afterNextRender vì phải đợi DOM đã dựng xong mới biết consumer có tự đặt aria-label tĩnh trên
    // thẻ host hay không. Set nhãn lần đầu luôn tại đây (không nhờ effect bên dưới) vì effect() chạy
    // lần đầu TRƯỚC afterNextRender (đã kiểm chứng bằng test) — lúc đó ownsAriaLabel vẫn còn false
    // nên effect bỏ qua, chỉ đăng ký theo dõi t().
    afterNextRender(() => {
      const el = this.elementRef.nativeElement;
      this.ownsAriaLabel = !el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby');
      if (this.ownsAriaLabel) el.setAttribute('aria-label', this.t().common.loading);
    });
    // Đổi ngôn ngữ lúc chạy phải kéo theo nhãn này, nếu không nó kẹt ở ngôn ngữ lúc mount.
    effect(() => {
      const label = this.t().common.loading;
      if (this.ownsAriaLabel) this.elementRef.nativeElement.setAttribute('aria-label', label);
    });
  }
}
