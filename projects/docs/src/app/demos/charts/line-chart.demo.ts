import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GButton, GChartSeries, GLineChart } from 'ngx-opendesign';

@Component({
  selector: 'docs-line-chart-demo',
  imports: [GLineChart, GButton],
  template: `
    <div class="lc-demo__ctrls">
      <button
        g-button
        size="sm"
        [variant]="curve() === 'straight' ? 'primary' : 'outline'"
        (click)="curve.set('straight')"
      >
        Nối thẳng
      </button>
      <button
        g-button
        size="sm"
        [variant]="curve() === 'smooth' ? 'primary' : 'outline'"
        (click)="curve.set('smooth')"
      >
        Nối cong
      </button>
    </div>

    <g-line-chart
      [series]="series"
      [labels]="labels"
      [curve]="curve()"
      ariaLabel="Doanh thu và chi phí 6 tháng"
    />
  `,
  styles: `
    :host {
      display: block;
    }
    .lc-demo__ctrls {
      display: flex;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartDemo {
  protected readonly curve = signal<'straight' | 'smooth'>('smooth');
  protected readonly labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
  protected readonly series: GChartSeries[] = [
    { name: 'Doanh thu', values: [42, 55, 48, 72, 66, 88] },
    { name: 'Chi phí', values: [30, 34, 38, 40, 45, 52] },
  ];
}
