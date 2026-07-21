import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { GIcon } from '../icon/icon';
import { gIconDownload, GIconGlyph } from '../icon/icons';

export interface GActionExpandItem {
  /** Nhãn hiện trên nút (vd. "PDF", "SVG"). */
  label: string;
  /** Giá trị phát ra khi chọn (vd. loại file). */
  value: string;
  /** Icon tuỳ chọn kèm trước nhãn. */
  icon?: GIconGlyph;
}

// Nút HÀNH ĐỘNG BUNG: cùng một hành động (vd. Tải xuống) nhưng nhiều "type" (PDF/SVG/PNG). Lúc đầu THU
// GỌN thành icon tròn; khi hover / focus (bàn phím) / chạm → BUNG sang phải, lộ các nút lựa chọn kiểu
// tab. Trigger là điểm vào bàn phím; các nút chỉ vào tab order khi đã bung.
@Component({
  selector: 'g-action-expand',
  imports: [GIcon],
  template: `
    <div
      class="g-action-expand"
      [class.g-action-expand--open]="expanded()"
      [class.g-action-expand--end]="align() === 'end'"
      role="group"
      [attr.aria-label]="label()"
      (mouseenter)="hovering.set(true)"
      (mouseleave)="hovering.set(false)"
      (focusin)="focused.set(true)"
      (focusout)="onFocusOut($event)"
    >
      <button
        type="button"
        class="g-action-expand__trigger"
        [attr.aria-label]="label()"
        [attr.aria-expanded]="expanded()"
        (click)="pinned.set(!pinned())"
      >
        <g-icon [icon]="icon()" />
      </button>

      <div class="g-action-expand__actions">
        <div class="g-action-expand__inner">
          @for (a of actions(); track a.value) {
            <button
              type="button"
              class="g-action-expand__btn"
              [attr.tabindex]="expanded() ? 0 : -1"
              (click)="select(a)"
            >
              @if (a.icon) {
                <g-icon [icon]="a.icon" size="sm" />
              }
              <span>{{ a.label }}</span>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './action-expand.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-action-expand-host' },
})
export class GActionExpand {
  // Icon lúc thu gọn (mặc định tải xuống).
  readonly icon = input<GIconGlyph>(gIconDownload);
  readonly actions = input<readonly GActionExpandItem[]>([]);
  readonly label = input('Hành động');
  // Hướng bung: 'start' (trigger trái, bung phải — mặc định) hoặc 'end' (trigger phải, bung sang
  // TRÁI — hợp khi đặt sát mép phải như góc trên chart).
  readonly align = input<'start' | 'end'>('start');
  // Phát khi chọn một type (không phải sự kiện DOM native → tên hợp lệ).
  readonly action = output<GActionExpandItem>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  // Bung khi ĐANG rê chuột HOẶC có focus bên trong HOẶC đã ghim (tap trên cảm ứng).
  protected readonly hovering = signal(false);
  protected readonly focused = signal(false);
  protected readonly pinned = signal(false);
  protected readonly expanded = computed(() => this.hovering() || this.focused() || this.pinned());

  protected onFocusOut(e: FocusEvent): void {
    const next = e.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) this.focused.set(false);
  }

  protected select(item: GActionExpandItem): void {
    this.action.emit(item);
    // Bỏ ghim để thu lại sau khi chọn (rê chuột/focus vẫn giữ mở nếu còn ở trên).
    this.pinned.set(false);
  }
}
