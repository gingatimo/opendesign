import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GActionExpand, GActionExpandItem } from '../action-expand/action-expand';
import { gIconImage } from '../icon/icons';
import { exportChartSvg, GChartExportFormat } from './export-chart';

// Nút EXPORT chart — dùng GActionExpand (thu gọn icon tải, hover/focus bung PNG/SVG). Nhận thẳng phần
// tử <svg> cần xuất; đặt góc trên-phải chart nên bung sang TRÁI (`align="end"`).
@Component({
  selector: 'g-chart-export',
  imports: [GActionExpand],
  template: `
    <g-action-expand
      align="end"
      label="Tải xuống"
      [actions]="formats"
      (action)="onExport($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GChartExport {
  readonly target = input<SVGSVGElement | undefined>();
  readonly filename = input('chart');

  protected readonly formats: GActionExpandItem[] = [
    { label: 'PNG', value: 'png', icon: gIconImage },
    { label: 'SVG', value: 'svg', icon: gIconImage },
  ];

  protected onExport(item: GActionExpandItem): void {
    const el = this.target();
    if (el) void exportChartSvg(el, this.filename(), item.value as GChartExportFormat);
  }
}
