import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GPolarChart } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-polar-chart-demo',
  imports: [GPolarChart],
  template: `
    <g-polar-chart
      [title]="copy().title"
      titlePosition="center"
      [data]="copy().data"
      [height]="320"
      [exportable]="true"
      [zoomable]="true"
      [ariaLabel]="copy().ariaLabel"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolarChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).polar.demo);
}
