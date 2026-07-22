import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GChip, GLocaleService, GStack } from 'ngx-opendesign';
import { layoutCopyFor } from '../../pages/layout-copy';

@Component({
  selector: 'docs-stack-wrap-demo',
  imports: [GStack, GChip],
  template: `
    <g-stack direction="horizontal" [gap]="2" [wrap]="true" align="center">
      @for (tag of copy().tags; track tag) {
        <g-chip>{{ tag }}</g-chip>
      }
    </g-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackWrapDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => layoutCopyFor(this.i18n.tag()).stack.demo);
}
