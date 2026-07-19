import { CdkTrapFocus } from '@angular/cdk/a11y';
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
  numberAttribute,
  signal,
  untracked,
  viewChildren,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconClock } from '../icon/icons';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

// Chọn giờ:phút 24h. Trigger read-only + popover (CDK overlay) 2 cột danh sách Giờ/Phút. value =
// model<string|null> dạng "HH:mm". minuteStep quyết định bước cột phút. Bàn phím ↑↓ trong cột, Enter
// chọn, Esc đóng; mở popover cuộn mục đang chọn vào giữa.
@Component({
  selector: 'g-timepicker',
  imports: [CdkConnectedOverlay, CdkTrapFocus, GIcon],
  template: `
    <button
      type="button"
      class="g-timepicker__trigger"
      [disabled]="disabled()"
      aria-haspopup="dialog"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
    >
      <span class="g-timepicker__value" [class.g-timepicker__value--placeholder]="!value()">
        {{ value() || placeholder() }}
      </span>
      <g-icon [icon]="iconClock" size="sm" />
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
        class="g-timepicker__panel"
        role="dialog"
        aria-label="Chọn giờ"
        cdkTrapFocus
        (keydown)="onKeydown($event)"
      >
        <div class="g-timepicker__col" role="listbox" aria-label="Giờ">
          @for (h of hours; track h) {
            <button
              #hourBtn
              type="button"
              class="g-timepicker__opt"
              role="option"
              data-col="hour"
              [attr.aria-selected]="h === hour()"
              [class.g-timepicker__opt--selected]="h === hour()"
              [attr.tabindex]="h === focusedHour() ? 0 : -1"
              (click)="selectHour(h)"
            >
              {{ pad(h) }}
            </button>
          }
        </div>
        <div class="g-timepicker__col" role="listbox" aria-label="Phút">
          @for (m of minutes(); track m) {
            <button
              #minuteBtn
              type="button"
              class="g-timepicker__opt"
              role="option"
              data-col="minute"
              [attr.aria-selected]="m === minute()"
              [class.g-timepicker__opt--selected]="m === minute()"
              [attr.tabindex]="m === focusedMinute() ? 0 : -1"
              (click)="selectMinute(m)"
            >
              {{ pad(m) }}
            </button>
          }
        </div>
      </div>
    </ng-template>
  `,
  host: { class: 'g-timepicker' },
  styleUrl: './time-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTimePicker {
  readonly value = model<string | null>(null);
  readonly minuteStep = input(1, { transform: numberAttribute });
  readonly placeholder = input('HH:mm');
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly elementRef = inject(ElementRef);
  protected readonly positions = POSITIONS;
  protected readonly iconClock = gIconClock;
  protected readonly pad = pad;

  protected readonly open = signal(false);
  protected readonly hours = Array.from({ length: 24 }, (_, i) => i);
  protected readonly minutes = computed(() => {
    const step = Math.max(1, Math.floor(this.minuteStep()));
    return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  });

  // value là nguồn sự thật; hour/minute parse ra. value không hợp lệ → null.
  private readonly parsed = computed(() => {
    const v = this.value();
    const m = v && /^\d{1,2}:\d{1,2}$/.test(v) ? v.split(':').map(Number) : null;
    if (!m || m[0] > 23 || m[1] > 59) return null;
    return { h: m[0], m: m[1] };
  });
  protected readonly hour = computed(() => this.parsed()?.h ?? null);
  protected readonly minute = computed(() => this.parsed()?.m ?? null);

  // Ô đang giữ focus bàn phím trong mỗi cột (roving tabindex). Mặc định theo giá trị đang chọn.
  protected readonly focusedHour = signal(0);
  protected readonly focusedMinute = signal(0);
  private readonly focusPending = signal(false);

  private readonly hourButtons = viewChildren<ElementRef<HTMLButtonElement>>('hourBtn');
  private readonly minuteButtons = viewChildren<ElementRef<HTMLButtonElement>>('minuteBtn');

  constructor() {
    // Khi mở / điều hướng bàn phím: cuộn + focus ô đang focus của cột tương ứng. Sau render để
    // tabindex đã cập nhật. untracked khi tắt cờ để không tự kích lại.
    afterRenderEffect(() => {
      if (!this.open() || !this.focusPending()) return;
      const hb = this.hourButtons().find((r) => r.nativeElement.tabIndex === 0)?.nativeElement;
      const mb = this.minuteButtons().find((r) => r.nativeElement.tabIndex === 0)?.nativeElement;
      hb?.scrollIntoView({ block: 'center' });
      mb?.scrollIntoView({ block: 'center' });
      untracked(() => {
        (this.pendingFocusCol === 'minute' ? mb : hb)?.focus();
        this.focusPending.set(false);
      });
    });
  }

  // Cột sẽ nhận focus ở lần afterRenderEffect tới ('hour' khi mở, hoặc cột đang điều hướng).
  private pendingFocusCol: 'hour' | 'minute' = 'hour';

  protected toggle(): void {
    if (this.open()) this.close();
    else this.openPanel();
  }
  protected openPanel(): void {
    this.focusedHour.set(this.hour() ?? 0);
    // Snap về option phút gần nhất trong danh sách: nếu value có phút lệch minuteStep (vd 05 với
    // step 15) thì vẫn có đúng một ô phút mang tabindex=0 để bàn phím tới được cột phút.
    const m = this.minute() ?? 0;
    const opts = this.minutes();
    this.focusedMinute.set(
      opts.reduce((best, o) => (Math.abs(o - m) < Math.abs(best - m) ? o : best), opts[0]),
    );
    this.pendingFocusCol = 'hour';
    this.focusPending.set(true);
    this.open.set(true);
  }
  protected close(): void {
    this.open.set(false);
  }

  protected selectHour(h: number): void {
    this.value.set(`${pad(h)}:${pad(this.minute() ?? 0)}`);
    this.focusedHour.set(h);
  }
  protected selectMinute(m: number): void {
    this.value.set(`${pad(this.hour() ?? 0)}:${pad(m)}`);
    this.focusedMinute.set(m);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.close();
      this.focusTrigger();
      event.preventDefault();
      return;
    }
    const target = event.target as HTMLElement;
    const col = target.getAttribute('data-col');
    if (col !== 'hour' && col !== 'minute') return;

    if (event.key === 'Enter' || event.key === ' ') {
      // để click native xử lý Enter/Space trên button — không nuốt
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;

    const delta = event.key === 'ArrowDown' ? 1 : -1;
    this.pendingFocusCol = col;
    if (col === 'hour') {
      this.focusedHour.set((this.focusedHour() + delta + 24) % 24);
    } else {
      const opts = this.minutes();
      const i = Math.max(0, opts.indexOf(this.focusedMinute()));
      this.focusedMinute.set(opts[(i + delta + opts.length) % opts.length]);
    }
    this.focusPending.set(true);
    event.preventDefault();
  }

  private focusTrigger(): void {
    (
      this.elementRef.nativeElement.querySelector('.g-timepicker__trigger') as HTMLElement | null
    )?.focus();
  }
}
