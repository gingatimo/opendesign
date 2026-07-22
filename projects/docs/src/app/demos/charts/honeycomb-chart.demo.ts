import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GButton, GHoneycombChart, GLocaleService } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-honeycomb-chart-demo',
  imports: [GHoneycombChart, GButton],
  template: `
    <g-honeycomb-chart
      [title]="copy().title"
      [data]="copy().data"
      [columns]="5"
      [colorMode]="mode()"
      [exportable]="true"
      [zoomable]="true"
      [ariaLabel]="copy().ariaLabel"
    />
    <div class="hc-demo__opts">
      <span>{{ copy().colorMode }}</span>
      <button
        g-button
        size="sm"
        [variant]="mode() === 'heat' ? 'primary' : 'outline'"
        (click)="mode.set('heat')"
      >
        {{ copy().heat }}
      </button>
      <button
        g-button
        size="sm"
        [variant]="mode() === 'category' ? 'primary' : 'outline'"
        (click)="mode.set('category')"
      >
        {{ copy().category }}
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .hc-demo__opts {
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
export class HoneycombChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).honeycomb.demo);
  protected readonly mode = signal<'heat' | 'category'>('heat');
}
