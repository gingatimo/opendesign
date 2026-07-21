import {
  afterNextRender,
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

// Vòng tròn tiến độ (determinate): value 0..100 vẽ cung tròn, phần còn lại là track mờ. Nhãn ở GIỮA
// qua <ng-content /> (vd. số đếm ngược, phần trăm). Cần indeterminate quay tròn thì dùng GSpinner.
//
// Cung dùng pathLength="100" nên stroke-dasharray/offset tính theo % thẳng, không phụ thuộc bán kính
// thực — đổi size/stroke tuỳ ý mà không phải tính lại chu vi.
@Component({
  selector: 'g-progress-circle',
  template: `
    <svg class="g-progress-circle__svg" [attr.viewBox]="viewBox()" aria-hidden="true">
      <circle
        class="g-progress-circle__track"
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        [attr.stroke-width]="stroke()"
        fill="none"
      />
      <circle
        class="g-progress-circle__arc"
        [attr.cx]="center()"
        [attr.cy]="center()"
        [attr.r]="radius()"
        [attr.stroke-width]="stroke()"
        fill="none"
        pathLength="100"
        stroke-dasharray="100"
        [attr.stroke-dashoffset]="100 - clampedValue()"
        [attr.transform]="'rotate(-90 ' + center() + ' ' + center() + ')'"
        stroke-linecap="round"
      />
    </svg>
    <span class="g-progress-circle__label"><ng-content /></span>
  `,
  styleUrl: './progress-circle.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-progress-circle',
    role: 'progressbar',
    'aria-valuemin': '0',
    'aria-valuemax': '100',
    '[attr.aria-valuenow]': 'clampedValue()',
    '[style.width.px]': 'size()',
    '[style.height.px]': 'size()',
  },
})
export class GProgressCircle {
  readonly value = input(0, { transform: numberAttribute });
  readonly size = input(96, { transform: numberAttribute });
  readonly stroke = input(6, { transform: numberAttribute });

  protected readonly clampedValue = computed(() => {
    const v = this.value();
    return Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 0;
  });
  protected readonly center = computed(() => this.size() / 2);
  // Trừ stroke để nét không bị cắt ở mép viewBox.
  protected readonly radius = computed(() => (this.size() - this.stroke()) / 2);
  protected readonly viewBox = computed(() => `0 0 ${this.size()} ${this.size()}`);

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
