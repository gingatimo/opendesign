import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

type FabPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

// Nút hành động nổi (FAB): position:fixed ở góc viewport. Tròn (icon) hoặc extended (viên: icon + nhãn).
// Là <button> thật — consumer tự cấp aria-label (khi tròn) + (click). Nội dung = <g-icon> (+ text nếu extended).
@Component({
  selector: 'button[g-fab]',
  template: `<ng-content />`,
  host: {
    class: 'g-fab',
    '[class.g-fab--extended]': 'extended()',
    '[class.g-fab--bottom-right]': `position() === 'bottom-right'`,
    '[class.g-fab--bottom-left]': `position() === 'bottom-left'`,
    '[class.g-fab--top-right]': `position() === 'top-right'`,
    '[class.g-fab--top-left]': `position() === 'top-left'`,
  },
  styleUrl: './fab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GFab {
  readonly position = input<FabPosition>('bottom-right');
  readonly extended = input(false, { transform: booleanAttribute });
}
