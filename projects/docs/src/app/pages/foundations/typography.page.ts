import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { DemoSection } from '../../shared/demo-section';
import { TokenTable } from '../../shared/token-table';
import { foundationCopyFor } from './foundation-copy';

@Component({
  imports: [TokenTable, DemoSection],
  template: `
    <h1>{{ typography().title }}</h1>
    <p>{{ typography().intro }}</p>

    <docs-demo-section>
      <div class="type-scale">
        @for (sample of typography().samples; track sample; let i = $index) {
          <p [style.font-size]="'var(--g-font-size-' + sampleSizes[i] + ')'">
            {{ sample }}
          </p>
        }
      </div>
    </docs-demo-section>

    <h2>{{ typography().tokenTitle }}</h2>
    <docs-token-table [rows]="typography().rows" />

    <h2>{{ typography().whereTitle }}</h2>
    <ul>
      @for (item of typography().whereItems; track item) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  styles: `
    .type-scale {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .type-scale p {
      margin: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypographyPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly typography = computed(() => foundationCopyFor(this.i18n.tag()).typography);
  protected readonly sampleSizes = ['xs', 'sm', 'md', 'lg'];
}
