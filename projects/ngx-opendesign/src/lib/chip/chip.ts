import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'g-chip',
  template: `
    <ng-content />
    @if (removable()) {
      <button
        type="button"
        class="g-chip__remove"
        [attr.aria-label]="removeLabel()"
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
  readonly removeLabel = input('Xóa');

  readonly removed = output<void>();
}
