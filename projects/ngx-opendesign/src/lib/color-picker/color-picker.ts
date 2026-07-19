import { CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { GSlider } from '../slider/slider';
import { hexToRgb, hsvToRgb, rgbToHex, rgbToHsv } from './color-utils';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];
// Dải cầu vồng cho track thanh Hue (đặt qua --g-slider-track của GSlider).
const HUE_TRACK =
  'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)';
const SWATCHES = [
  '#000000',
  '#ffffff',
  '#ef4444',
  '#f59e0b',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Chọn màu: trigger (ô màu + hex) + popover gồm vùng Saturation/Value 2D (kéo pointer), thanh Hue
// (GSlider), ô nhập hex và hàng swatch. Nguồn sự thật nội bộ là HSV; value (hex #rrggbb) suy ra và
// đồng bộ hai chiều. value = model<string>.
@Component({
  selector: 'g-color-picker',
  imports: [CdkConnectedOverlay, CdkTrapFocus, GSlider],
  template: `
    <button
      type="button"
      class="g-color-picker__trigger"
      [disabled]="disabled()"
      aria-haspopup="dialog"
      [attr.aria-expanded]="open()"
      (click)="toggle()"
    >
      <span class="g-color-picker__swatch" [style.background]="value()"></span>
      <span class="g-color-picker__hex-text">{{ value() }}</span>
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
      <div class="g-color-picker__panel" role="dialog" aria-label="Chọn màu" cdkTrapFocus>
        <div
          class="g-color-picker__sv"
          role="slider"
          tabindex="0"
          aria-label="Độ bão hoà và độ sáng"
          aria-valuemin="0"
          aria-valuemax="100"
          [attr.aria-valuenow]="svValueNow()"
          [attr.aria-valuetext]="value()"
          [style.--g-cp-hue]="hue()"
          (pointerdown)="onSvDown($event)"
          (pointermove)="onSvMove($event)"
          (pointerup)="onSvUp()"
          (keydown)="onSvKey($event)"
        >
          <span
            class="g-color-picker__sv-thumb"
            [style.left.%]="sat() * 100"
            [style.top.%]="(1 - val()) * 100"
          ></span>
        </div>

        <g-slider
          class="g-color-picker__hue"
          min="0"
          max="360"
          [value]="hue()"
          ariaLabel="Màu sắc (hue)"
          [style.--g-slider-track]="hueTrack"
          (valueChange)="onHue($event)"
        />

        <div class="g-color-picker__row">
          <span class="g-color-picker__preview" [style.background]="value()"></span>
          <input
            class="g-color-picker__hex"
            type="text"
            spellcheck="false"
            aria-label="Mã màu hex"
            [value]="value()"
            (change)="onHexInput($event)"
          />
        </div>

        <div class="g-color-picker__swatches">
          @for (c of swatches; track c) {
            <button
              type="button"
              class="g-color-picker__swatch-btn"
              [style.background]="c"
              [attr.aria-label]="c"
              (click)="pick(c)"
            ></button>
          }
        </div>
      </div>
    </ng-template>
  `,
  host: { class: 'g-color-picker' },
  styleUrl: './color-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GColorPicker {
  readonly value = model('#000000');
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly elementRef = inject(ElementRef);
  protected readonly positions = POSITIONS;
  protected readonly hueTrack = HUE_TRACK;
  protected readonly swatches = SWATCHES;

  protected readonly open = signal(false);
  protected readonly hue = signal(0);
  protected readonly sat = signal(0);
  protected readonly val = signal(0);
  private dragging = false;

  // aria-valuenow cho vùng SV (role=slider): lấy độ bão hoà làm trục số chính (0–100); màu đầy đủ đọc
  // qua aria-valuetext = hex.
  protected readonly svValueNow = computed(() => Math.round(this.sat() * 100));

  // Hex suy từ HSV nội bộ.
  private readonly hex = computed(() => {
    const { r, g, b } = hsvToRgb(this.hue(), this.sat(), this.val());
    return rgbToHex(r, g, b);
  });

  constructor() {
    // Đồng bộ NGOÀI → TRONG: khi value (consumer đặt / ô hex / swatch) khác hex nội bộ thì cập nhật
    // HSV. So sánh với hex hiện tại để KHÔNG lặp (commit nội bộ đặt value = hex → không kích lại).
    // Giữ hue cũ khi màu xám (s=0) để thanh Hue không nhảy về 0.
    effect(() => {
      const v = this.value();
      const rgb = hexToRgb(v);
      if (!rgb) return;
      untracked(() => {
        if (v.toLowerCase() === this.hex().toLowerCase()) return;
        const { h, s, v: vv } = rgbToHsv(rgb.r, rgb.g, rgb.b);
        this.hue.set(s === 0 ? this.hue() : h);
        this.sat.set(s);
        this.val.set(vv);
      });
    });
  }

  // Ghi HSV nội bộ ra value (chuẩn hoá #rrggbb).
  private commit(): void {
    this.value.set(this.hex());
  }

  protected toggle(): void {
    this.open.update((o) => !o);
  }
  protected close(): void {
    this.open.set(false);
  }

  protected onHue(h: number): void {
    this.hue.set(h);
    this.commit();
  }

  protected pick(color: string): void {
    this.value.set(color);
  }

  protected onHexInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const rgb = hexToRgb(input.value);
    if (rgb) this.value.set(rgbToHex(rgb.r, rgb.g, rgb.b));
    else input.value = this.value(); // hoàn nguyên khi nhập sai
  }

  // ----- vùng SV: pointer -----
  protected onSvDown(event: PointerEvent): void {
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.dragging = true;
    this.applySv(event);
  }
  protected onSvMove(event: PointerEvent): void {
    if (this.dragging) this.applySv(event);
  }
  protected onSvUp(): void {
    this.dragging = false;
  }
  private applySv(event: PointerEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.sat.set(clamp01((event.clientX - rect.left) / rect.width));
    this.val.set(1 - clamp01((event.clientY - rect.top) / rect.height));
    this.commit();
  }

  // ----- vùng SV: bàn phím (mũi tên đổi sat/val) -----
  protected onSvKey(event: KeyboardEvent): void {
    const step = 0.02;
    let handled = true;
    switch (event.key) {
      case 'ArrowLeft':
        this.sat.set(clamp01(this.sat() - step));
        break;
      case 'ArrowRight':
        this.sat.set(clamp01(this.sat() + step));
        break;
      case 'ArrowUp':
        this.val.set(clamp01(this.val() + step));
        break;
      case 'ArrowDown':
        this.val.set(clamp01(this.val() - step));
        break;
      default:
        handled = false;
    }
    if (handled) {
      this.commit();
      event.preventDefault();
    }
  }
}
