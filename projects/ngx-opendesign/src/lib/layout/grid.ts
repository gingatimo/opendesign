import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

// Primitive CSS grid. cols cột đều (repeat(cols,1fr)); nếu đặt minColWidth (vd '200px') → responsive
// repeat(auto-fill, minmax(minColWidth, 1fr)) (bỏ qua cols). gap theo thang token --g-space-N (như GStack).
@Component({
  selector: 'g-grid',
  template: `<ng-content />`,
  host: {
    class: 'g-grid',
    '[style.display]': '"grid"',
    '[style.gridTemplateColumns]': 'templateColumns()',
    '[style.gap]': 'gapStyle()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GGrid {
  readonly cols = input(2, { transform: numberAttribute });
  readonly gap = input(4, { transform: numberAttribute });
  readonly minColWidth = input<string>();

  protected readonly templateColumns = computed(() => {
    const min = this.minColWidth();
    if (min) return `repeat(auto-fill, minmax(${min}, 1fr))`;
    return `repeat(${Math.max(1, this.cols())}, 1fr)`;
  });

  protected readonly gapStyle = computed(() => {
    const g = this.gap();
    if (g <= 0) return '0';
    return `var(--g-space-${Math.min(g, 8)})`;
  });
}
