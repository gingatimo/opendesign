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
  isSameDay,
  startOfMonth,
} from './date-utils';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];
const WEEKDAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

// Chọn 1 ngày: input read-only + popover lịch (CDK overlay). Điều hướng tháng, chọn ngày, bàn phím
// ←→↑↓ / Enter / Esc / PageUp-Down, min/max. value = model<Date|null>. Định dạng dd/MM/yyyy.
@Component({
  selector: 'g-datepicker',
  imports: [CdkConnectedOverlay, CdkTrapFocus, GIcon],
  template: `
    <button
      type="button"
      class="g-datepicker__trigger"
      [disabled]="disabled()"
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
        aria-label="Chọn ngày"
        cdkTrapFocus
        (keydown)="onKeydown($event)"
      >
        <div class="g-datepicker__header">
          <button
            type="button"
            class="g-datepicker__nav"
            aria-label="Tháng trước"
            (click)="shiftMonth(-1)"
          >
            <g-icon [icon]="iconPrev" size="sm" />
          </button>
          <span class="g-datepicker__title">
            Tháng {{ viewMonth().getMonth() + 1 }} {{ viewMonth().getFullYear() }}
          </span>
          <button
            type="button"
            class="g-datepicker__nav"
            aria-label="Tháng sau"
            (click)="shiftMonth(1)"
          >
            <g-icon [icon]="iconNext" size="sm" />
          </button>
        </div>
        <div class="g-datepicker__weekdays">
          @for (w of weekdays; track w) {
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
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });

  protected readonly elementRef = inject(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });
  private readonly destroyRef = inject(DestroyRef);

  // Disabled hợp nhất từ input [disabled] và setDisabledState của form (formControl.disable()).
  private readonly formDisabled = signal(false);
  protected readonly disabled = computed(() => this.disabledInput() || this.formDisabled());
  protected readonly invalid = signal(false);

  private onChange: (value: Date | null) => void = () => undefined;
  private onTouchedFn: () => void = () => undefined;
  protected readonly positions = POSITIONS;
  protected readonly weekdays = WEEKDAYS;
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
    return v ? formatDate(v) : '';
  });
  protected readonly grid = computed(() => buildMonthGrid(this.viewMonth()));

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
    return `${d.getDate()} tháng ${d.getMonth() + 1} ${d.getFullYear()}`;
  }
}
