import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GContainer, GLocaleService } from 'ngx-opendesign';
import { layoutCopyFor } from '../../pages/layout-copy';

@Component({
  selector: 'docs-container-basic-demo',
  imports: [GContainer],
  template: `
    <div gContainer class="demo-container">
      <p>{{ copy().body }}</p>
      <p>{{ copy().note }}</p>
    </div>
  `,
  styles: `
    .demo-container {
      --g-container-max-width: 480px;
      background: var(--g-surface);
      border-radius: var(--g-radius-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => layoutCopyFor(this.i18n.tag()).container.demo);
}
