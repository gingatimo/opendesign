import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  signal,
  untracked,
  viewChildren,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { GLocaleService } from '../core/locale';
import { trackControlInvalid } from '../core/control-invalid';
import { GIcon } from '../icon/icon';
import { gIconCalendar, gIconChevronLeft, gIconChevronRight } from '../icon/icons';
import {
  addDays,
  addMonths,
  addMonthsClamped,
  buildMonthGrid,
  inRange,
  isSameDay,
  startOfMonth,
} from './date-utils';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

// Chọn 1 ngày: input read-only + popover lịch (CDK overlay). Điều hướng tháng, chọn ngày, bàn phím
// ←→↑↓ / Enter / Esc / PageUp-Down, min/max. value = model<Date|null>. Định dạng dd/MM/yyyy.
@Component({
  selector: 'g-datepicker',
  imports: [CdkConnectedOverlay, CdkTrapFocus, GIcon],
  template: `
    <button
      type="button"
      class="g-datepicker__trigger"
      [disabled]="isDisabled()"
      aria-haspopup="dialog"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
    >
      <span class="g-datepicker__value" [class.g-datepicker__value--placeholder]="!value()">
        {{ value() ? display() : placeholder() }}
      </span>
      <g-icon [icon]="iconCalendar" size="sm" />
    </button>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="elementRef"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayPositions]="positions"
      cdkConnectedOverlayHasBackdrop
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div
        class="g-datepicker__panel"
        role="dialog"
        [attr.aria-label]="t().datepicker.open"
        cdkTrapFocus
        (keydown)="onKeydown($event)"
      >
        <div class="g-datepicker__header">
          <button
            type="button"
            class="g-datepicker__nav"
            [attr.aria-label]="stepPrevLabel()"
            (click)="shiftHeader(-1)"
          >
            <g-icon [icon]="iconPrev" size="sm" />
          </button>
          <!-- Bấm tiêu đề để leo cấp xem: ngày → tháng → năm (chọn nhanh không cần next nhiều lần). -->
          <button
            type="button"
            class="g-datepicker__title"
            [disabled]="viewMode() === 'years'"
            [attr.aria-label]="titleLabel()"
            (click)="climbView()"
          >
            {{ headerTitle() }}
          </button>
          <button
            type="button"
            class="g-datepicker__nav"
            [attr.aria-label]="stepNextLabel()"
            (click)="shiftHeader(1)"
          >
            <g-icon [icon]="iconNext" size="sm" />
          </button>
        </div>

        @switch (viewMode()) {
          @case ('days') {
            <div class="g-datepicker__weekdays">
              @for (w of weekdays(); track w) {
                <span class="g-datepicker__weekday">{{ w }}</span>
              }
            </div>
            <div class="g-datepicker__grid">
              @for (day of grid(); track day.getTime()) {
                <button
                  #dayBtn
                  type="button"
                  class="g-datepicker__day"
                  [class.g-datepicker__day--outside]="day.getMonth() !== viewMonth().getMonth()"
                  [class.g-datepicker__day--today]="isToday(day)"
                  [class.g-datepicker__day--selected]="isSelected(day)"
                  [attr.aria-disabled]="!inRangeDay(day) ? 'true' : null"
                  [attr.tabindex]="isFocused(day) ? 0 : -1"
                  [attr.aria-current]="isToday(day) ? 'date' : null"
                  [attr.aria-pressed]="isSelected(day)"
                  [attr.aria-label]="dayLabel(day)"
                  (click)="select(day)"
                >
                  {{ day.getDate() }}
                </button>
              }
            </div>
          }
          @case ('months') {
            <div class="g-datepicker__cells">
              @for (m of months; track m) {
                <button
                  type="button"
                  class="g-datepicker__cell"
                  [class.g-datepicker__cell--selected]="isSelectedMonth(m)"
                  [attr.aria-disabled]="!monthSelectable(m) ? 'true' : null"
                  (click)="selectMonth(m)"
                >
                  Th {{ m + 1 }}
                </button>
              }
            </div>
          }
          @case ('years') {
            <div class="g-datepicker__cells">
              @for (y of years(); track y) {
                <button
                  type="button"
                  class="g-datepicker__cell"
                  [class.g-datepicker__cell--selected]="isSelectedYear(y)"
                  [attr.aria-disabled]="!yearSelectable(y) ? 'true' : null"
                  (click)="selectYear(y)"
                >
                  {{ y }}
                </button>
              }
            </div>
          }
        }
      </div>
    </ng-template>
  `,
  host: {
    '[class.g-datepicker--invalid]': 'invalid()',
  },
  styleUrl: './datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GDatepicker implements ControlValueAccessor, OnInit {
  readonly value = model<Date | null>(null);
  readonly min = input<Date>();
  readonly max = input<Date>();
  readonly placeholder = input('dd/MM/yyyy');
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly elementRef = inject(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(GLocaleService);

  // Disabled hợp nhất từ input [disabled] và setDisabledState của form (formControl.disable()).
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly invalid = signal(false);

  private onChange: (value: Date | null) => void = () => undefined;
  private onTouchedFn: () => void = () => undefined;
  protected readonly positions = POSITIONS;
  protected readonly t = this.i18n.strings;
  // Tên thứ đã xoay theo firstDayOfWeek của gói ngôn ngữ đang dùng — không còn hằng số cứng.
  protected readonly weekdays = this.i18n.weekdayNames;
  protected readonly iconCalendar = gIconCalendar;
  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;

  protected readonly open = signal(false);
  protected readonly viewMonth = signal(startOfMonth(new Date()));
  protected readonly focusedDate = signal(new Date());
  // Bật khi cần dời focus bàn phím tới ô ngày (mở panel / phím điều hướng). KHÔNG bật khi bấm chuột
  // đổi tháng — để nút chuyển tháng giữ focus, tránh giật.
  private readonly focusPending = signal(false);

  private readonly dayButtons = viewChildren<ElementRef<HTMLButtonElement>>('dayBtn');

  protected readonly display = computed(() => {
    const v = this.value();
    return v ? this.i18n.formatDate(v) : '';
  });
  protected readonly grid = computed(() =>
    buildMonthGrid(this.viewMonth(), this.i18n.firstDayOfWeek()),
  );

  // Chế độ xem của panel: ngày (mặc định) → tháng → năm. Bấm tiêu đề leo cấp; bấm ô tháng/năm hạ cấp.
  protected readonly viewMode = signal<'days' | 'months' | 'years'>('days');
  protected readonly months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // Trang năm 12 số, canh theo bội 12 để prev/next lật đúng trang.
  private readonly yearsStart = computed(
    () => Math.floor(this.viewMonth().getFullYear() / 12) * 12,
  );
  protected readonly years = computed(() => {
    const s = this.yearsStart();
    return Array.from({ length: 12 }, (_, i) => s + i);
  });

  protected readonly headerTitle = computed(() => {
    const d = this.viewMonth();
    switch (this.viewMode()) {
      case 'days':
        return `${this.i18n.monthNames()[d.getMonth()]} ${d.getFullYear()}`;
      case 'months':
        return `${d.getFullYear()}`;
      default:
        return `${this.yearsStart()}–${this.yearsStart() + 11}`;
    }
  });
  protected readonly titleLabel = computed(() =>
    this.viewMode() === 'days'
      ? this.t().datepicker.selectMonth
      : this.viewMode() === 'months'
        ? this.t().datepicker.selectYear
        : '',
  );
  protected readonly stepPrevLabel = computed(() =>
    this.viewMode() === 'days'
      ? this.t().datepicker.prevMonth
      : this.viewMode() === 'months'
        ? this.t().datepicker.prevYear
        : this.t().datepicker.prevYearPage,
  );
  protected readonly stepNextLabel = computed(() =>
    this.viewMode() === 'days'
      ? this.t().datepicker.nextMonth
      : this.viewMode() === 'months'
        ? this.t().datepicker.nextYear
        : this.t().datepicker.nextYearPage,
  );

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    // Roving focus: chỉ focus ô ngày (tabindex=0) khi focusPending — sau render để tabindex đã cập nhật.
    // Dùng aria-disabled (không phải thuộc tính disabled) nên ô ngoài min/max vẫn focus được → không rớt
    // focus về body khi mũi tên đi qua ngày bị chặn. untracked khi tắt cờ để không tự kích lại effect.
    afterRenderEffect(() => {
      if (!this.open() || !this.focusPending()) return;
      const active = this.dayButtons().find((r) => r.nativeElement.tabIndex === 0);
      active?.nativeElement.focus();
      untracked(() => this.focusPending.set(false));
    });
  }

  protected toggle(): void {
    if (this.open()) this.close();
    else this.openPanel();
  }
  protected openPanel(): void {
    this.viewMonth.set(startOfMonth(this.value() ?? new Date()));
    this.focusedDate.set(this.value() ?? new Date());
    this.viewMode.set('days');
    this.focusPending.set(true);
    this.open.set(true);
  }
  protected close(): void {
    this.open.set(false);
    // Đã tương tác rồi đóng (chọn ngày hoặc bỏ qua) → đánh dấu touched để validation hiện.
    this.onTouchedFn();
  }

  ngOnInit(): void {
    trackControlInvalid(this.ngControl, this.destroyRef, this.invalid);
  }

  writeValue(value: Date | null): void {
    this.value.set(value ?? null);
  }
  registerOnChange(fn: (value: Date | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected shiftMonth(n: number): void {
    this.viewMonth.set(addMonths(this.viewMonth(), n));
    // Dời ngày focus theo tháng (kẹp cuối tháng) để bàn phím tiếp tục đúng chỗ sau khi bấm chuột đổi
    // tháng; KHÔNG focusPending để nút chuyển tháng giữ focus.
    this.focusedDate.set(addMonthsClamped(this.focusedDate(), n));
  }

  // Nút prev/next đổi theo chế độ xem: ngày → ±1 tháng · tháng → ±1 năm · năm → ±1 trang (12 năm).
  protected shiftHeader(n: number): void {
    const d = this.viewMonth();
    switch (this.viewMode()) {
      case 'days':
        this.shiftMonth(n);
        break;
      case 'months':
        this.viewMonth.set(new Date(d.getFullYear() + n, d.getMonth(), 1));
        break;
      default:
        this.viewMonth.set(new Date(d.getFullYear() + n * 12, d.getMonth(), 1));
    }
  }

  // Bấm tiêu đề: ngày → tháng → năm (leo cấp để chọn nhanh).
  protected climbView(): void {
    this.viewMode.set(this.viewMode() === 'days' ? 'months' : 'years');
  }

  protected selectMonth(m: number): void {
    if (!this.monthSelectable(m)) return;
    this.viewMonth.set(new Date(this.viewMonth().getFullYear(), m, 1));
    this.viewMode.set('days');
  }

  protected selectYear(y: number): void {
    if (!this.yearSelectable(y)) return;
    this.viewMonth.set(new Date(y, this.viewMonth().getMonth(), 1));
    this.viewMode.set('months');
  }

  protected isSelectedMonth(m: number): boolean {
    const v = this.value();
    return !!v && v.getFullYear() === this.viewMonth().getFullYear() && v.getMonth() === m;
  }
  protected isSelectedYear(y: number): boolean {
    const v = this.value();
    return !!v && v.getFullYear() === y;
  }

  // Tháng/năm nằm ngoài [min, max] thì chặn chọn (so theo năm+tháng, khớp với inRange của ô ngày).
  protected monthSelectable(m: number): boolean {
    const y = this.viewMonth().getFullYear();
    const min = this.min();
    const max = this.max();
    if (min && (y < min.getFullYear() || (y === min.getFullYear() && m < min.getMonth()))) {
      return false;
    }
    if (max && (y > max.getFullYear() || (y === max.getFullYear() && m > max.getMonth()))) {
      return false;
    }
    return true;
  }
  protected yearSelectable(y: number): boolean {
    const min = this.min();
    const max = this.max();
    if (min && y < min.getFullYear()) return false;
    if (max && y > max.getFullYear()) return false;
    return true;
  }

  protected select(day: Date): void {
    if (!this.inRangeDay(day)) return;
    this.value.set(day);
    this.onChange(day);
    this.close();
    this.focusTrigger();
  }

  protected onKeydown(event: KeyboardEvent): void {
    // Escape đóng từ bất cứ đâu trong panel (kể cả khi focus đang ở nút chuyển tháng).
    if (event.key === 'Escape') {
      this.close();
      this.focusTrigger();
      event.preventDefault();
      return;
    }
    // Phím điều hướng lưới CHỈ xử khi focus đang ở một ô ngày — không nuốt Enter/Space/mũi tên của
    // nút chuyển tháng (chúng vẫn hoạt động native).
    if (!(event.target as HTMLElement).classList.contains('g-datepicker__day')) return;

    const move = (n: number) => {
      const next = addDays(this.focusedDate(), n);
      this.focusedDate.set(next);
      if (
        next.getMonth() !== this.viewMonth().getMonth() ||
        next.getFullYear() !== this.viewMonth().getFullYear()
      ) {
        this.viewMonth.set(startOfMonth(next));
      }
      this.focusPending.set(true);
      event.preventDefault();
    };
    const jumpMonth = (n: number) => {
      const next = addMonthsClamped(this.focusedDate(), n);
      this.focusedDate.set(next);
      this.viewMonth.set(startOfMonth(next));
      this.focusPending.set(true);
      event.preventDefault();
    };
    switch (event.key) {
      case 'ArrowLeft':
        move(-1);
        break;
      case 'ArrowRight':
        move(1);
        break;
      case 'ArrowUp':
        move(-7);
        break;
      case 'ArrowDown':
        move(7);
        break;
      case 'PageUp':
        jumpMonth(-1);
        break;
      case 'PageDown':
        jumpMonth(1);
        break;
      case 'Enter':
      case ' ':
        this.select(this.focusedDate());
        event.preventDefault();
        break;
    }
  }

  private focusTrigger(): void {
    (
      this.elementRef.nativeElement.querySelector('.g-datepicker__trigger') as HTMLElement | null
    )?.focus();
  }

  protected isToday(d: Date): boolean {
    return isSameDay(d, new Date());
  }
  protected isSelected(d: Date): boolean {
    const v = this.value();
    return !!v && isSameDay(d, v);
  }
  protected isFocused(d: Date): boolean {
    return isSameDay(d, this.focusedDate());
  }
  protected inRangeDay(d: Date): boolean {
    return inRange(d, this.min(), this.max());
  }
  protected dayLabel(d: Date): string {
    return this.i18n.formatDate(d);
  }
}
