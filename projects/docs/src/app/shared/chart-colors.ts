import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { chartsCopyFor } from '../pages/charts-copy';

// Shared color guidance for chart pages; the palette rules are identical across chart types.
@Component({
  selector: 'docs-chart-colors',
  template: `
    <h2>{{ copy().title }}</h2>
    <p>{{ copy().intro }}</p>
    <div class="chart-colors__grid">
      @for (i of indexes; track i) {
        <span class="chart-colors__swatch" [style.background]="'var(--g-chart-' + i + ')'">
          <span class="chart-colors__num">{{ i }}</span>
        </span>
      }
    </div>

    <p>{{ copy().customColorIntro }}</p>
    <ul>
      @for (item of copy().customColorItems; track item) {
        <li>{{ item }}</li>
      }
    </ul>
    <p>{{ copy().duplicateNote }}</p>

    <p>
      <b>{{ copy().unsupportedTitle }}</b>
    </p>
    <ul>
      @for (item of copy().unsupported; track item) {
        <li>{{ item }}</li>
      }
    </ul>
    <p>{{ copy().exportNote }}</p>
  `,
  styles: `
    .chart-colors__grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
      margin: var(--g-space-4) 0;
    }
    .chart-colors__swatch {
      display: inline-flex;
      align-items: flex-end;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--g-radius-sm);
    }
    /* The translucent badge keeps swatch numbers readable on every chart color. */
    .chart-colors__num {
      margin-bottom: 3px;
      padding: 1px 5px;
      border-radius: var(--g-radius-pill);
      background: rgb(0 0 0 / 45%);
      color: #fff;
      font-size: var(--g-font-size-xs);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartColors {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).colors);
  protected readonly indexes = Array.from({ length: 18 }, (_, i) => i + 1);
}
