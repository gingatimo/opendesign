import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  model,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconMaximize, gIconMinimize } from '../icon/icons';

// Nút PHÓNG TO chart — bật/tắt trạng thái `zoomed` của khung chart (khung sẽ phủ gần kín màn hình,
// SVG tự giãn theo vì đã responsive). Đặt cạnh nút tải xuống ở góc trên-phải.
//
// Không dùng Fullscreen API: nó đưa phần tử ra ngoài ngữ cảnh trang, kéo theo mất token theme và
// overlay của CDK, đổi lấy một hành vi mà người dùng vốn đã quen tắt bằng Esc — thứ ta làm được ở
// đây với ít rủi ro hơn nhiều.
@Component({
  selector: 'g-chart-zoom',
  imports: [GIcon],
  template: `
    <button
      type="button"
      class="g-chart-zoom__btn"
      [attr.aria-label]="zoomed() ? 'Thu nhỏ biểu đồ' : 'Phóng to biểu đồ'"
      [attr.aria-pressed]="zoomed()"
      (click)="toggle()"
    >
      <g-icon [icon]="zoomed() ? iconOut : iconIn" size="sm" />
    </button>
  `,
  styleUrl: './chart-zoom.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GChartZoom {
  readonly zoomed = model(false);

  protected readonly iconIn = gIconMaximize;
  protected readonly iconOut = gIconMinimize;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Esc để thoát: phóng to che gần hết màn hình nên phải có lối ra quen thuộc, không bắt người
    // dùng đi tìm lại đúng cái nút.
    afterNextRender(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.zoomed()) this.zoomed.set(false);
      };
      document.addEventListener('keydown', onKey);
      this.destroyRef.onDestroy(() => document.removeEventListener('keydown', onKey));
    });
  }

  protected toggle(): void {
    this.zoomed.set(!this.zoomed());
  }
}
