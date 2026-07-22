import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GBarChart, GButton, GLocaleService } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-bar-chart-demo',
  imports: [GBarChart, GButton],
  template: `
    <div class="bc-demo__ctrls">
      <button
        g-button
        size="sm"
        [variant]="dir() === 'vertical' ? 'primary' : 'outline'"
        (click)="dir.set('vertical')"
      >
        {{ copy().vertical }}
      </button>
      <button
        g-button
        size="sm"
        [variant]="dir() === 'horizontal' ? 'primary' : 'outline'"
        (click)="dir.set('horizontal')"
      >
        {{ copy().horizontal }}
      </button>
    </div>

    <g-bar-chart
      [title]="copy().title"
      [series]="copy().series"
      [labels]="copy().labels"
      [orientation]="dir()"
      [height]="dir() === 'horizontal' ? 320 : 280"
      [exportable]="true"
      [zoomable]="true"
      [filename]="copy().filename"
      [ariaLabel]="copy().ariaLabel"
    />
  `,
  styles: `
    :host {
      display: block;
    }
    .bc-demo__ctrls {
      display: flex;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).bar.demo);
  protected readonly dir = signal<'vertical' | 'horizontal'>('vertical');
}
