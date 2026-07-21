import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GButton, GChartLegendPosition, GChartSeries, GLineChart } from 'ngx-opendesign';

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

    <div class="lc-demo__ctrls">
      <span class="lc-demo__lbl">Legend:</span>
      @for (p of positions; track p) {
        <button
          g-button
          size="sm"
          [variant]="legendPos() === p ? 'primary' : 'outline'"
          (click)="legendPos.set(p)"
        >
          {{ p }}
        </button>
      }
    </div>

    <g-line-chart
      title="Doanh thu & chi phí"
      [series]="series"
      [labels]="labels"
      [curve]="curve()"
      [legendPosition]="legendPos()"
      [exportable]="true"
      filename="doanh-thu-chi-phi"
      ariaLabel="Doanh thu và chi phí 6 tháng"
    />
  `,
  styles: `
    :host {
      display: block;
    }
    .lc-demo__ctrls {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--g-space-2);
      margin-bottom: var(--g-space-3);
    }
    .lc-demo__lbl {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartDemo {
  protected readonly curve = signal<'straight' | 'smooth'>('smooth');
  protected readonly positions: GChartLegendPosition[] = ['top', 'right', 'bottom', 'left'];
  protected readonly legendPos = signal<GChartLegendPosition>('bottom');
  protected readonly labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
  protected readonly series: GChartSeries[] = [
    { name: 'Doanh thu', values: [42, 55, 48, 72, 66, 88] },
    { name: 'Chi phí', values: [30, 34, 38, 40, 45, 52] },
  ];
}
