import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { GIconButton } from '../icon-button/icon-button';
import {
  gIconError,
  gIconInfo,
  gIconSuccess,
  gIconWarning,
  gIconX,
  type GIconGlyph,
} from '../icon/icons';

export type GAlertVariant = 'neutral' | 'success' | 'warning' | 'danger';

// Icon + tiền tố cho screen reader theo mức độ (neutral = ghi chú, danger = lỗi).
const ICON: Record<GAlertVariant, GIconGlyph> = {
  neutral: gIconInfo,
  success: gIconSuccess,
  warning: gIconWarning,
  danger: gIconError,
};
const SR_LABEL: Record<GAlertVariant, string> = {
  neutral: 'Lưu ý',
  success: 'Thành công',
  warning: 'Cảnh báo',
  danger: 'Lỗi',
};

// Thông báo dạng khối INLINE (callout) trong nội dung: icon + nhãn tuỳ chọn + nội dung, tô màu theo
// mức độ. Khác GToast (nổi tạm thời qua overlay) và GBadge (nhãn nhỏ). `dismissible` thêm nút đóng —
// bấm đặt `open=false` (hai chiều `[(open)]`), host tự ẩn.
@Component({
  selector: 'g-alert',
  imports: [GIcon, GIconButton],
  template: `
    <g-icon class="g-alert__icon" [icon]="icon()" size="sm" aria-hidden="true" />
    <div class="g-alert__body">
      <span class="g-alert__sr">{{ srLabel() }}: </span>
      @if (heading()) {
        <div class="g-alert__title">{{ heading() }}</div>
      }
      <div class="g-alert__message"><ng-content /></div>
    </div>
    @if (dismissible()) {
      <button
        type="button"
        g-icon-button
        size="sm"
        class="g-alert__close"
        aria-label="Đóng thông báo"
        (click)="open.set(false)"
      >
        <g-icon [icon]="iconClose" size="sm" />
      </button>
    }
  `,
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-alert',
    '[class.g-alert--neutral]': "variant() === 'neutral'",
    '[class.g-alert--success]': "variant() === 'success'",
    '[class.g-alert--warning]': "variant() === 'warning'",
    '[class.g-alert--danger]': "variant() === 'danger'",
    '[style.display]': "open() ? null : 'none'",
  },
})
export class GAlert {
  readonly variant = input<GAlertVariant>('neutral');
  /** Dòng tiêu đề đậm phía trên nội dung (tuỳ chọn). */
  readonly heading = input<string>();
  readonly dismissible = input(false, { transform: booleanAttribute });
  /** Hiển thị hay không — nút đóng đặt về false; hai chiều để consumer điều khiển. */
  readonly open = model(true);

  protected readonly iconClose = gIconX;
  protected readonly icon = computed(() => ICON[this.variant()]);
  protected readonly srLabel = computed(() => SR_LABEL[this.variant()]);
}
