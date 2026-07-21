import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GButton } from '../button/button';
import { GIcon } from '../icon/icon';
import { gIconDownload } from '../icon/icons';
import { exportChartSvg, GChartExportFormat } from './export-chart';

// Thanh nút EXPORT dùng chung cho mọi chart — nhận thẳng phần tử <svg> cần xuất, tải PNG/SVG khi bấm.
@Component({
  selector: 'g-chart-export',
  imports: [GButton, GIcon],
  template: `
    <div class="g-chart-export">
      <button g-button variant="outline" size="sm" (click)="download('png')">
        <g-icon [icon]="iconDownload" size="sm" /> PNG
      </button>
      <button g-button variant="outline" size="sm" (click)="download('svg')">
        <g-icon [icon]="iconDownload" size="sm" /> SVG
      </button>
    </div>
  `,
  styleUrl: './chart-export.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GChartExport {
  readonly target = input<SVGSVGElement | undefined>();
  readonly filename = input('chart');
  protected readonly iconDownload = gIconDownload;

  protected download(format: GChartExportFormat): void {
    const el = this.target();
    if (el) void exportChartSvg(el, this.filename(), format);
  }
}
