import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GActionExpand, GActionExpandItem } from '../action-expand/action-expand';
import { gIconImage } from '../icon/icons';
import { GLocaleService } from '../core/locale';
import { GChartLegendItem } from './chart-legend';
import { exportChartSvg, GChartExportFormat } from './export-chart';

// Nút EXPORT chart — dùng GActionExpand (thu gọn icon tải, hover/focus bung PNG/SVG). Nhận thẳng phần
// tử <svg> cần xuất; đặt góc trên-phải chart nên bung sang TRÁI (`align="end"`).
@Component({
  selector: 'g-chart-export',
  imports: [GActionExpand],
  template: `
    <g-action-expand
      align="end"
      [label]="t().chart.download"
      [actions]="formats"
      (action)="onExport($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GChartExport {
  readonly target = input<SVGSVGElement | undefined>();
  readonly filename = input('chart');
  // Tiêu đề và chú giải là HTML nằm ngoài <svg> nên phải truyền vào để vẽ lại trong file xuất ra.
  readonly title = input('');
  readonly legend = input<readonly GChartLegendItem[]>([]);

  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  protected readonly formats: GActionExpandItem[] = [
    { label: 'PNG', value: 'png', icon: gIconImage },
    { label: 'SVG', value: 'svg', icon: gIconImage },
  ];

  protected onExport(item: GActionExpandItem): void {
    const el = this.target();
    if (!el) return;
    void exportChartSvg(el, this.filename(), item.value as GChartExportFormat, {
      title: this.title(),
      legend: this.legend(),
    });
  }
}
