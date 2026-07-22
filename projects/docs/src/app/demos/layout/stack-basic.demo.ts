import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GBadge, GLocaleService, GStack } from 'ngx-opendesign';
import { layoutCopyFor } from '../../pages/layout-copy';

@Component({
  selector: 'docs-stack-basic-demo',
  imports: [GStack, GBadge],
  template: `
    <g-stack gap="3">
      @for (row of copy().rows; track row) {
        <g-badge>{{ row }}</g-badge>
      }
    </g-stack>
    <g-stack direction="horizontal" gap="2">
      <g-badge variant="success">{{ copy().columns[0] }}</g-badge>
      <g-badge variant="warning">{{ copy().columns[1] }}</g-badge>
      <g-badge variant="danger">{{ copy().columns[2] }}</g-badge>
    </g-stack>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-6);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => layoutCopyFor(this.i18n.tag()).stack.demo);
}
