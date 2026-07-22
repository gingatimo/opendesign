import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GButton, GLocaleService, GRadarChart } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-radar-chart-demo',
  imports: [GRadarChart, GButton],
  template: `
    <g-radar-chart
      [title]="copy().title"
      [labels]="copy().labels"
      [series]="copy().series"
      [shape]="shape()"
      [height]="360"
      [exportable]="true"
      [zoomable]="true"
      [ariaLabel]="copy().ariaLabel"
    />
    <div class="rd-demo__opts">
      <span>{{ copy().grid }}</span>
      <button
        g-button
        size="sm"
        [variant]="shape() === 'circle' ? 'primary' : 'outline'"
        (click)="shape.set('circle')"
      >
        {{ copy().circle }}
      </button>
      <button
        g-button
        size="sm"
        [variant]="shape() === 'polygon' ? 'primary' : 'outline'"
        (click)="shape.set('polygon')"
      >
        {{ copy().polygon }}
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .rd-demo__opts {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
      margin-top: var(--g-space-4);
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadarChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).radar.demo);
  protected readonly shape = signal<'circle' | 'polygon'>('circle');
}
