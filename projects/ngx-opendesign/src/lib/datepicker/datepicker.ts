import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  signal,
  viewChildren,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconCalendar, gIconChevronLeft, gIconChevronRight } from '../icon/icons';
import {
  addDays,
  addMonths,
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
  imports: [CdkConnectedOverlay, GIcon],
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
              [disabled]="!inRangeDay(day)"
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
  styleUrl: './datepicker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GDatepicker {
  readonly value = model<Date | null>(null);
  readonly min = input<Date>();
  readonly max = input<Date>();
  readonly placeholder = input('dd/MM/yyyy');
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly elementRef = inject(ElementRef);
  protected readonly positions = POSITIONS;
  protected readonly weekdays = WEEKDAYS;
  protected readonly iconCalendar = gIconCalendar;
  protected readonly iconPrev = gIconChevronLeft;
  protected readonly iconNext = gIconChevronRight;

  protected readonly open = signal(false);
  protected readonly viewMonth = signal(startOfMonth(new Date()));
  protected readonly focusedDate = signal(new Date());

  private readonly dayButtons = viewChildren<ElementRef<HTMLButtonElement>>('dayBtn');

  protected readonly display = computed(() => {
    const v = this.value();
    return v ? formatDate(v) : '';
  });
  protected readonly grid = computed(() => buildMonthGrid(this.viewMonth()));

  constructor() {
    // Roving focus: khi mở hoặc focusedDate đổi, focus nút ngày có tabindex=0. afterRenderEffect để DOM
    // (tabindex) đã cập nhật; đọc open()/focusedDate() để effect chạy lại đúng lúc.
    afterRenderEffect(() => {
      if (!this.open()) return;
      this.focusedDate();
      const active = this.dayButtons().find(
        (r) => r.nativeElement.tabIndex === 0 && !r.nativeElement.disabled,
      );
      active?.nativeElement.focus();
    });
  }

  protected toggle(): void {
    if (this.open()) this.close();
    else this.openPanel();
  }
  protected openPanel(): void {
    this.viewMonth.set(startOfMonth(this.value() ?? new Date()));
    this.focusedDate.set(this.value() ?? new Date());
    this.open.set(true);
  }
  protected close(): void {
    this.open.set(false);
  }

  protected shiftMonth(n: number): void {
    this.viewMonth.set(addMonths(this.viewMonth(), n));
  }

  protected select(day: Date): void {
    if (!this.inRangeDay(day)) return;
    this.value.set(day);
    this.close();
    this.focusTrigger();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const move = (n: number) => {
      const next = addDays(this.focusedDate(), n);
      this.focusedDate.set(next);
      if (
        next.getMonth() !== this.viewMonth().getMonth() ||
        next.getFullYear() !== this.viewMonth().getFullYear()
      ) {
        this.viewMonth.set(startOfMonth(next));
      }
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
        this.focusedDate.set(addMonths(this.focusedDate(), -1));
        this.shiftMonth(-1);
        event.preventDefault();
        break;
      case 'PageDown':
        this.focusedDate.set(addMonths(this.focusedDate(), 1));
        this.shiftMonth(1);
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        this.select(this.focusedDate());
        event.preventDefault();
        break;
      case 'Escape':
        this.close();
        this.focusTrigger();
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
