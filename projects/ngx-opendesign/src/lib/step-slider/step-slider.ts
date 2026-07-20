import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  viewChild,
} from '@angular/core';

// Thanh trượt RỜI RẠC dạng pill: một dải pill chứa N chấm đều nhau, chấm đang chọn được thay bằng
// "thumb" pill nổi lên. Kèm nhãn hai đầu (vd. "Faster" / "Smarter"). Chọn bằng bấm/kéo trên dải hoặc
// phím mũi tên (Home/End về hai đầu). Hai chiều `[(value)]` (chỉ số 0..steps-1).
@Component({
  selector: 'g-step-slider',
  template: `
    @if (startLabel() || endLabel()) {
      <div class="g-step-slider__labels">
        <span>{{ startLabel() }}</span>
        <span>{{ endLabel() }}</span>
      </div>
    }

    <div
      #track
      class="g-step-slider__track"
      role="slider"
      tabindex="0"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="steps() - 1"
      [attr.aria-valuenow]="value()"
      [attr.aria-label]="ariaLabel()"
      (pointerdown)="onPointerDown($event)"
      (keydown)="onKeydown($event)"
    >
      @for (i of stepIndexes(); track i) {
        <span class="g-step-slider__step">
          @if (i === value()) {
            <span class="g-step-slider__thumb"></span>
          } @else {
            <span
              class="g-step-slider__dot"
              [class.g-step-slider__dot--last]="i === steps() - 1"
            ></span>
          }
        </span>
      }
    </div>
  `,
  styleUrl: './step-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-step-slider',
    '[class.g-step-slider--sm]': "size() === 'sm'",
  },
})
export class GStepSlider {
  // Số bậc (số chấm). Giá trị là chỉ số 0..steps-1.
  readonly steps = input(5);
  // Chỉ số bậc đang chọn (two-way `[(value)]`).
  readonly value = model(0);
  // Cỡ dải: 'md' (40px, mặc định) hoặc 'sm' (32px) — như GInput.
  readonly size = input<'sm' | 'md'>('md');
  readonly startLabel = input('');
  readonly endLabel = input('');
  readonly ariaLabel = input('Mức');

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  protected readonly stepIndexes = computed(() =>
    Array.from({ length: this.steps() }, (_, i) => i),
  );

  protected onPointerDown(e: PointerEvent): void {
    // preventDefault chặn chọn text khi kéo; tự focus (programmatic → không hiện focus ring lúc bấm
    // chuột) để phím mũi tên dùng được ngay.
    e.preventDefault();
    this.track().nativeElement.focus();
    this.setFromPointer(e.clientX);
    const move = (ev: PointerEvent) => this.setFromPointer(ev.clientX);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  private setFromPointer(clientX: number): void {
    const rect = this.track().nativeElement.getBoundingClientRect();
    const n = this.steps();
    const i = Math.min(Math.max(Math.floor(((clientX - rect.left) / rect.width) * n), 0), n - 1);
    if (i !== this.value()) this.value.set(i);
  }

  protected onKeydown(e: KeyboardEvent): void {
    const n = this.steps();
    let next: number;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = Math.min(this.value() + 1, n - 1);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = Math.max(this.value() - 1, 0);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = n - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    this.value.set(next);
  }
}
