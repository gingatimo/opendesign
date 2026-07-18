import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

// Flex xếp dọc/ngang, gap theo thang token --g-space-N (N=1..8). Host style bindings (inline) để gap
// động map thẳng token. gap<=0 → không giãn.
@Component({
  selector: 'g-stack',
  template: `<ng-content />`,
  host: {
    class: 'g-stack',
    '[style.display]': '"flex"',
    '[style.flexDirection]': `direction() === 'horizontal' ? 'row' : 'column'`,
    '[style.gap]': 'gapStyle()',
    '[style.alignItems]': 'align() || null',
    '[style.justifyContent]': 'justify() || null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GStack {
  readonly direction = input<'vertical' | 'horizontal'>('vertical');
  readonly gap = input(4, { transform: numberAttribute });
  readonly align = input<string>();
  readonly justify = input<string>();

  protected readonly gapStyle = computed(() => {
    const g = this.gap();
    if (g <= 0) return '0';
    const clamped = Math.min(g, 8); // thang token --g-space-1..8
    return `var(--g-space-${clamped})`;
  });
}
