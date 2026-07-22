import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GDivider, GLocaleService } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-divider-basic-demo',
  imports: [GDivider],
  template: `
    <p>{{ demo().above }}</p>
    <g-divider />
    <p>{{ demo().below }}</p>

    <g-divider>{{ demo().or }}</g-divider>

    <div class="row">
      <span>{{ demo().itemA }}</span>
      <g-divider orientation="vertical" />
      <span>{{ demo().itemB }}</span>
      <g-divider orientation="vertical" />
      <span>{{ demo().itemC }}</span>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
    }
    p {
      margin: 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
      height: 24px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).divider.demo);
}
