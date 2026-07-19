import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type GTimelineStatus = 'default' | 'success' | 'warning' | 'danger';

// Một mốc thời gian: cột rail (marker + đường nối dọc) + nội dung chiếu. Marker mặc định là chấm tròn
// tô theo `status` (default = màu chính, success/warning/danger = màu ngữ nghĩa); chiếu phần tử có
// [gTimelineMarker] để thay hẳn (vd. icon). Item cuối tự bỏ đường nối xuống.
@Component({
  selector: 'g-timeline-item',
  template: `
    <div class="g-timeline-item__rail">
      <span class="g-timeline-item__marker"><ng-content select="[gTimelineMarker]" /></span>
    </div>
    <div class="g-timeline-item__content"><ng-content /></div>
  `,
  host: {
    class: 'g-timeline-item',
    '[class.g-timeline-item--success]': `status() === 'success'`,
    '[class.g-timeline-item--warning]': `status() === 'warning'`,
    '[class.g-timeline-item--danger]': `status() === 'danger'`,
  },
  styleUrl: './timeline-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTimelineItem {
  readonly status = input<GTimelineStatus>('default');
}
