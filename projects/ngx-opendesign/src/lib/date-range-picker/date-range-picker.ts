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
import { trackControlInvalid } from '../core/control-invalid';
import { GIcon } from '../icon/icon';
import { gIconCalendar, gIconChevronLeft, gIconChevronRight } from '../icon/icons';
import {
  addDays,
  addMonths,
  addMonthsClamped,
  buildMonthGrid,
  formatDate,
  inRange,
  isBeforeDay,
  isBetween,
  isSameDay,
  startOfMonth,
} from '../datepicker/date-utils';

export interface GDateRange {
  start: Date | null;
  end: Date | null;
}

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];
const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

// Chọn khoảng ngày: input read-only + popover 1 lịch (CDK overlay). Click 1 = start (xoá end), click
// 2 = end (nếu sau start; ngược lại dời start). Tô dải ngày ở giữa + xem trước khi hover. value =
// model<GDateRange>. Bàn phím như GDatepicker.
@Component({
  selector: 'g-date-range-picker',
  imports: [CdkConnectedOverlay, CdkTrapFocus, GIcon],
  template: `
    <button
      type="button"
      class="g-date-range-picker__trigger"
      [disabled]="isDisabled()"
      aria-haspopup="dialog"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
    >
      <span
        class="g-date-range-picker__value"
        [class.g-date-range-picker__value--placeholder]="!value().start && !value().end"
      >
        {{ value().start || value().end ? display() : placeholder() }}
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
        class="g-date-range-picker__panel"
        role="dialog"
        aria-label="Chọn khoảng ngày"
        cdkTrapFocus
        (keydown)="onKeydown($event)"
        (mouseleave)="hovered.set(null)"
      >
        <div class="g-date-range-picker__header">
          <button
            type="button"
            class="g-date-range-picker__nav"
            aria-label="Tháng trước"
            (click)="shiftMonth(-1)"
          >
            <g-icon [icon]="iconPrev" size="sm" />
          </button>
          <span class="g-date-range-picker__title">
            Tháng {{ viewMonth().getMonth() + 1 }} {{ viewMonth().getFullYear() }}
          </span>
          <button
            type="button"
            class="g-date-range-picker__nav"
            aria-label="Tháng sau"
            (click)="shiftMonth(1)"
          >
            <g-icon [icon]="iconNext" size="sm" />
          </button>
        </div>
        <div class="g-date-range-picker__weekdays">
          @for (w of weekdays; track w) {
            <span class="g-date-range-picker__weekday">{{ w }}</span>
          }
        </div>
        <div class="g-date-range-picker__grid">
          @for (day of grid(); track day.getTime()) {
            <div
              class="g-date-range-picker__cell"
              [class.g-date-range-picker__cell--start]="isStart(day)"
              [class.g-date-range-picker__cell--end]="isEnd(day)"
              [class.g-date-range-picker__cell--in-range]="inRangeMid(day)"
            >
              <button
                #dayBtn
                type="button"
                class="g-date-range-picker__day"
                [class.g-date-range-picker__day--outside]="
                  day.getMonth() !== viewMonth().getMonth()
                "
                [class.g-date-range-picker__day--today]="isToday(day)"
                [class.g-date-range-picker__day--endpoint]="isStart(day) || isEnd(day)"
                [attr.aria-disabled]="!inRangeDay(day) ? 'true' : null"
                [attr.tabindex]="isFocused(day) ? 0 : -1"
                [attr.aria-current]="isToday(day) ? 'date' : null"
                [attr.aria-label]="dayLabel(day)"
                (click)="select(day)"
                (mouseenter)="hovered.set(day)"
              >
                {{ day.getDate() }}
              </button>
            </div>
          }
        </div>
      </div>
    </ng-template>
  `,
  host: {
    class: 'g-date-range-picker',
    '[class.g-date-range-picker--invalid]': 'invalid()',
  },
  styleUrl: './date-range-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GDateRangePicker implements ControlValueAccessor, OnInit {
  readonly value = model<GDateRange>({ start: null, end: null });
  readonly min = input<Date>();
  readonly max = input<Date>();
  readonly placeholder = input('dd/MM/yyyy – dd/MM/yyyy');
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly elementRef = inject(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly invalid = signal(false);

  private onChange: (value: GDateRange) => void = () => undefined;
  private onTouchedFn: () => void = () => undefined;

  protected readonly positions = POSITIONS;
  protected readonly weekdays = WEEKDAYS;
  protected readonly iconCalendar = gIconCalendar;
  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;

  protected readonly open = signal(false);
  protected readonly viewMonth = signal(startOfMonth(new Date()));
  protected readonly focusedDate = signal(new Date());
  protected readonly hovered = signal<Date | null>(null);
  private readonly focusPending = signal(false);

  private readonly dayButtons = viewChildren<ElementRef<HTMLButtonElement>>('dayBtn');

  protected readonly grid = computed(() => buildMonthGrid(this.viewMonth()));
  protected readonly display = computed(() => {
    const { start, end } = this.value();
    return `${start ? formatDate(start) : '…'} – ${end ? formatDate(end) : '…'}`;
  });

  // Khi có start chưa có end và đang hover một ngày sau start: dùng ngày hover làm "end tạm" để xem
  // trước dải.
  private readonly previewEnd = computed(() => {
    const { start, end } = this.value();
    const hv = this.hovered();
    return start && !end && hv && !isBeforeDay(hv, start) ? hv : null;
  });

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    afterRenderEffect(() => {
      if (!this.open() || !this.focusPending()) return;
      const active = this.dayButtons().find((r) => r.nativeElement.tabIndex === 0);
      active?.nativeElement.focus();
      untracked(() => this.focusPending.set(false));
    });
  }

  ngOnInit(): void {
    trackControlInvalid(this.ngControl, this.destroyRef, this.invalid);
  }

  // Đặt value đồng thời báo cho form (onChange). writeValue KHÔNG dùng hàm này (không được phát onChange).
  private setRange(range: GDateRange): void {
    this.value.set(range);
    this.onChange(range);
  }

  writeValue(value: GDateRange | null): void {
    this.value.set(value ?? { start: null, end: null });
  }
  registerOnChange(fn: (value: GDateRange) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }

  protected toggle(): void {
    if (this.open()) this.close();
    else this.openPanel();
  }
  protected openPanel(): void {
    const anchor = this.value().start ?? new Date();
    this.viewMonth.set(startOfMonth(anchor));
    this.focusedDate.set(anchor);
    this.focusPending.set(true);
    this.open.set(true);
  }
  protected close(): void {
    this.open.set(false);
    this.hovered.set(null);
    // Đã tương tác rồi đóng → đánh dấu touched để validation hiện.
    this.onTouchedFn();
  }

  protected shiftMonth(n: number): void {
    this.viewMonth.set(addMonths(this.viewMonth(), n));
    this.focusedDate.set(addMonthsClamped(this.focusedDate(), n));
  }

  protected select(day: Date): void {
    if (!this.inRangeDay(day)) return;
    const { start, end } = this.value();
    if (!start || end) {
      // chưa có start, hoặc dải đã đủ → bắt đầu dải mới
      this.setRange({ start: day, end: null });
    } else if (isBeforeDay(day, start)) {
      // click trước start → dời điểm đầu
      this.setRange({ start: day, end: null });
    } else {
      // chốt end
      this.setRange({ start, end: day });
      this.close();
      this.focusTrigger();
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
      this.focusTrigger();
      event.preventDefault();
      return;
    }
    if (!(event.target as HTMLElement).classList.contains('g-date-range-picker__day')) return;

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
      this.elementRef.nativeElement.querySelector(
        '.g-date-range-picker__trigger',
      ) as HTMLElement | null
    )?.focus();
  }

  protected isToday(d: Date): boolean {
    return isSameDay(d, new Date());
  }
  protected isStart(d: Date): boolean {
    const s = this.value().start;
    return !!s && isSameDay(d, s);
  }
  protected isEnd(d: Date): boolean {
    const e = this.value().end ?? this.previewEnd();
    return !!e && isSameDay(d, e);
  }
  protected inRangeMid(d: Date): boolean {
    return isBetween(d, this.value().start, this.value().end ?? this.previewEnd());
  }
  protected isFocused(d: Date): boolean {
    return isSameDay(d, this.focusedDate());
  }
  protected inRangeDay(d: Date): boolean {
    return inRange(d, this.min(), this.max());
  }
  protected dayLabel(d: Date): string {
    return `${d.getDate()} tháng ${d.getMonth() + 1} ${d.getFullYear()}`;
  }
}
