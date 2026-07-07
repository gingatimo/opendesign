import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-demo-section',
  template: `
    <section class="docs-demo">
      <ng-content />
    </section>
  `,
  styles: `
    .docs-demo {
      padding: var(--g-space-6);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
      margin-bottom: var(--g-space-4);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoSection {}
