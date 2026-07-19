import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TimelineBasicDemo } from '../demos/timeline/timeline-basic.demo';

@Component({
  imports: [TimelineBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Timeline</h1>
    <p>
      Dòng thời gian dọc, dùng để hiển thị chuỗi sự kiện theo thứ tự. <code>g-timeline</code> là
      container xếp dọc; mỗi <code>g-timeline-item</code> tự vẽ marker (chấm tròn mặc định) + đường
      nối và tự bỏ đường nối ở item cuối.
    </p>

    <docs-demo-section>
      <docs-timeline-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/timeline/timeline-basic.demo.ts" />

    <h2>API — GTimeline, GTimelineItem</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Cấu trúc là các khối nội dung tuần tự trong DOM — thứ tự đọc của trình đọc màn hình khớp với
        thứ tự trực quan trên trục dọc.
      </li>
      <li>
        Marker mặc định chỉ mang tính trang trí; nếu thay bằng icon qua
        <code>[gTimelineMarker]</code>, hãy đảm bảo icon đó có nhãn phù hợp (hoặc
        <code>aria-hidden</code> nếu chỉ trang trí) và ý nghĩa mốc đã có trong nội dung văn bản.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TimelinePage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'g-timeline',
      type: '(component)',
      default: '—',
      description: 'Container xếp dọc các mốc thời gian, không có input.',
    },
    {
      name: 'g-timeline-item',
      type: '(component)',
      default: '—',
      description: 'Một mốc thời gian: cột marker + đường nối, cùng nội dung chiếu.',
    },
    {
      name: 'status (item)',
      type: `'default' | 'success' | 'warning' | 'danger'`,
      default: `'default'`,
      description:
        'Trạng thái mốc — tô màu marker (default = màu chính, còn lại theo màu ngữ nghĩa).',
    },
    {
      name: '[gTimelineMarker]',
      type: '(projection)',
      default: '—',
      description: 'Chiếu phần tử tuỳ chọn (vd icon) để thay marker chấm tròn mặc định.',
    },
  ];
}
