import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GBarChart, GButton, GChartSeries } from 'ngx-opendesign';

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
        Cột đứng
      </button>
      <button
        g-button
        size="sm"
        [variant]="dir() === 'horizontal' ? 'primary' : 'outline'"
        (click)="dir.set('horizontal')"
      >
        Cột nằm
      </button>
    </div>

    <g-bar-chart
      title="Số đơn theo quý"
      [series]="series"
      [labels]="labels"
      [orientation]="dir()"
      [height]="dir() === 'horizontal' ? 320 : 280"
      [exportable]="true"
      [zoomable]="true"
      filename="don-theo-quy"
      ariaLabel="Số đơn theo quý, hai khu vực"
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
  protected readonly dir = signal<'vertical' | 'horizontal'>('vertical');
  protected readonly labels = ['Q1', 'Q2', 'Q3', 'Q4'];
  protected readonly series: GChartSeries[] = [
    { name: 'Miền Bắc', values: [120, 145, 132, 168] },
    { name: 'Miền Nam', values: [98, 110, 125, 140] },
  ];
}
