import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { GLocaleService } from '../core/locale';

@Component({
  selector: 'g-progress',
  template: `
    <span class="g-progress__bar" [style.width.%]="indeterminate() ? null : clampedValue()"></span>
  `,
  styleUrl: './progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-progress',
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'indeterminate() ? null : clampedValue()',
    '[class.g-progress--indeterminate]': 'indeterminate()',
  },
})
export class GProgress {
  readonly value = input(0, { transform: numberAttribute });
  readonly indeterminate = input(false, { transform: booleanAttribute });

  protected readonly clampedValue = computed(() => {
    const value = this.value();
    return Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
  });

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
      if (this.ownsAriaLabel) el.setAttribute('aria-label', this.t().progress.label);
    });
    // Đổi ngôn ngữ lúc chạy phải kéo theo nhãn này, nếu không nó kẹt ở ngôn ngữ lúc mount.
    effect(() => {
      const label = this.t().progress.label;
      if (this.ownsAriaLabel) this.elementRef.nativeElement.setAttribute('aria-label', label);
    });
  }
}
