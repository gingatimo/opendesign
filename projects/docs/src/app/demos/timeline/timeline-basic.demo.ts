import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GTimeline, GTimelineItem } from 'ngx-opendesign';

@Component({
  selector: 'docs-timeline-basic-demo',
  imports: [GTimeline, GTimelineItem],
  template: `
    <g-timeline>
      <g-timeline-item>
        <strong>Đặt hàng thành công</strong>
        <p>Đơn hàng #10234 đã được tạo lúc 08:15, 19/07/2026.</p>
      </g-timeline-item>
      <g-timeline-item>
        <strong>Đang đóng gói</strong>
        <p>Kho xác nhận đơn và bắt đầu đóng gói sản phẩm.</p>
      </g-timeline-item>
      <g-timeline-item>
        <strong>Đang vận chuyển</strong>
        <p>Đơn hàng đã được bàn giao cho đơn vị vận chuyển.</p>
      </g-timeline-item>
      <g-timeline-item>
        <strong>Đã giao hàng</strong>
        <p>Giao hàng thành công tới người nhận lúc 14:40, 20/07/2026.</p>
      </g-timeline-item>
    </g-timeline>
  `,
  styles: `
    :host {
      display: block;
      max-width: 420px;
    }
    strong {
      display: block;
      margin-bottom: var(--g-space-1);
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBasicDemo {}
