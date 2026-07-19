import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GTimeline, GTimelineItem } from 'ngx-opendesign';

@Component({
  selector: 'docs-timeline-basic-demo',
  imports: [GTimeline, GTimelineItem],
  template: `
    <g-timeline>
      <g-timeline-item status="success">
        <strong>Đặt hàng thành công</strong>
        <p>Đơn hàng #10234 đã được tạo lúc 08:15, 19/07/2026.</p>
      </g-timeline-item>
      <g-timeline-item status="success">
        <strong>Đã đóng gói</strong>
        <p>Kho xác nhận đơn và hoàn tất đóng gói sản phẩm.</p>
      </g-timeline-item>
      <g-timeline-item status="warning">
        <strong>Vận chuyển bị chậm</strong>
        <p>Đơn hàng gặp sự cố thời tiết, dự kiến trễ 1 ngày.</p>
      </g-timeline-item>
      <g-timeline-item>
        <strong>Chờ giao hàng</strong>
        <p>Đơn sẽ được giao trong hôm nay hoặc ngày mai.</p>
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
