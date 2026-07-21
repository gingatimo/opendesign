import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { GLocaleService } from '../core/locale';

@Component({
  selector: 'g-chip',
  template: `
    <ng-content />
    @if (removable()) {
      <button
        type="button"
        class="g-chip__remove"
        [attr.aria-label]="resolvedRemoveLabel()"
        [disabled]="disabled()"
        (click)="removed.emit()"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M4 4l8 8M12 4l-8 8" stroke-linecap="round" />
        </svg>
      </button>
    }
  `,
  styleUrl: './chip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-chip',
    '[class.g-chip--disabled]': 'disabled()',
  },
})
export class GChip {
  readonly removable = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly removeLabel = input('');

  readonly removed = output<void>();

  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  // Input thắng nếu consumer truyền tay; rỗng thì lấy theo gói ngôn ngữ hiện tại — giữ nguyên API
  // cũ (input `removeLabel`) mà không có hai nguồn sự thật.
  protected readonly resolvedRemoveLabel = computed(
    () => this.removeLabel() || this.t().common.remove,
  );
}
