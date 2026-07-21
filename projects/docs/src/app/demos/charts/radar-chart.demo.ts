import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GButton, GChartSeries, GRadarChart } from 'ngx-opendesign';

@Component({
  selector: 'docs-radar-chart-demo',
  imports: [GRadarChart, GButton],
  template: `
    <g-radar-chart
      title="Đánh giá ứng viên"
      [labels]="labels"
      [series]="series"
      [shape]="shape()"
      [height]="360"
      [exportable]="true"
      [zoomable]="true"
      ariaLabel="So sánh kỹ năng hai ứng viên"
    />
    <div class="rd-demo__opts">
      <span>Lưới:</span>
      <button
        g-button
        size="sm"
        [variant]="shape() === 'circle' ? 'primary' : 'outline'"
        (click)="shape.set('circle')"
      >
        Vòng tròn
      </button>
      <button
        g-button
        size="sm"
        [variant]="shape() === 'polygon' ? 'primary' : 'outline'"
        (click)="shape.set('polygon')"
      >
        Đa giác
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
  protected readonly shape = signal<'circle' | 'polygon'>('circle');
  protected readonly labels = [
    'Kỹ thuật',
    'Giao tiếp',
    'Thiết kế',
    'Chủ động',
    'Cộng tác',
    'Tốc độ',
  ];
  protected readonly series: GChartSeries[] = [
    { name: 'Ứng viên A', values: [9, 6, 7, 8, 5, 7] },
    { name: 'Ứng viên B', values: [6, 9, 5, 6, 9, 8] },
  ];
}
