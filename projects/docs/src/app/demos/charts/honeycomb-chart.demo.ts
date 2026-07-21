import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GButton, GChartSlice, GHoneycombChart } from 'ngx-opendesign';

@Component({
  selector: 'docs-honeycomb-chart-demo',
  imports: [GHoneycombChart, GButton],
  template: `
    <g-honeycomb-chart
      title="Số việc theo thành viên"
      [data]="data"
      [columns]="5"
      [colorMode]="mode()"
      [exportable]="true"
      [zoomable]="true"
      ariaLabel="Số việc đã xử lý theo thành viên"
    />
    <div class="hc-demo__opts">
      <span>Tô màu:</span>
      <button
        g-button
        size="sm"
        [variant]="mode() === 'heat' ? 'primary' : 'outline'"
        (click)="mode.set('heat')"
      >
        Theo độ lớn
      </button>
      <button
        g-button
        size="sm"
        [variant]="mode() === 'category' ? 'primary' : 'outline'"
        (click)="mode.set('category')"
      >
        Phân loại
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
  protected readonly mode = signal<'heat' | 'category'>('heat');
  protected readonly data: GChartSlice[] = [
    { name: 'An', value: 42 },
    { name: 'Bình', value: 28 },
    { name: 'Chi', value: 35 },
    { name: 'Dũng', value: 12 },
    { name: 'Giang', value: 47 },
    { name: 'Hà', value: 19 },
    { name: 'Khánh', value: 31 },
    { name: 'Linh', value: 8 },
    { name: 'Minh', value: 24 },
    { name: 'Nam', value: 39 },
  ];
}
