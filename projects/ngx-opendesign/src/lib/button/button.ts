import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';

export type GButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type GButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'button[g-button], a[g-button]',
  template: `
    @if (loading()) {
      <span class="g-button__spinner" aria-hidden="true"></span>
    }
    <ng-content />
  `,
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-button',
    '[class.g-button--primary]': 'variant() === "primary"',
    '[class.g-button--secondary]': 'variant() === "secondary"',
    '[class.g-button--outline]': 'variant() === "outline"',
    '[class.g-button--ghost]': 'variant() === "ghost"',
    '[class.g-button--danger]': 'variant() === "danger"',
    '[class.g-button--sm]': 'size() === "sm"',
    '[class.g-button--md]': 'size() === "md"',
    '[class.g-button--lg]': 'size() === "lg"',
    '[class.g-button--loading]': 'loading()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
  },
})
export class GButton {
  readonly variant = input<GButtonVariant>('primary');
  readonly size = input<GButtonSize>('md');
  readonly loading = input(false, { transform: booleanAttribute });

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    // Angular host bindings (host: { '(click)': ... }) đăng ký listener ở target
    // phase, cùng thứ tự (và có thể sau) listener (click) của consumer trên cùng
    // element — nên stopPropagation()/stopImmediatePropagation() từ đó không đảm
    // bảo chặn được listener của consumer. Đăng ký trực tiếp bằng addEventListener
    // với { capture: true } để listener này luôn chạy trước bất kỳ listener kiểu
    // bubble nào (capture: false — mặc định, kể cả (click) của consumer trên
    // template) trên cùng element, bất kể ai đăng ký trước hay sau: tại target,
    // trình duyệt luôn ưu tiên chạy các listener capture trước các listener
    // bubble (đã kiểm chứng thực tế trên jsdom lẫn Chrome — không đúng theo cách
    // đọc câu chữ của thuật toán trong spec, nhưng là hành vi thực tế của các
    // engine). Cùng cơ chế đó cũng chặn được click bắt nguồn từ phần tử con
    // (<ng-content />, span .g-button__spinner) vì capture chạy ở capturing
    // phase, trước khi sự kiện đến target con đó. afterNextRender để
    // addEventListener (DOM API) không chạy khi SSR; hoãn thời điểm đăng ký
    // không ảnh hưởng thứ tự chạy vì capture luôn thắng bubble trên cùng
    // element, không phụ thuộc ai đăng ký trước.
    afterNextRender(() => {
      this.elementRef.nativeElement.addEventListener(
        'click',
        (event: Event) => {
          if (this.loading()) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        },
        { capture: true },
      );
    });
  }
}
