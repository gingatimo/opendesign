import { ChangeDetectionStrategy, Component } from '@angular/core';

// Một mốc thời gian: cột rail (marker + đường nối dọc) + nội dung chiếu. Marker mặc định là chấm tròn;
// chiếu phần tử có [gTimelineMarker] để thay (vd. icon). Item cuối tự bỏ đường nối xuống.
@Component({
  selector: 'g-timeline-item',
  template: `
    <div class="g-timeline-item__rail">
      <span class="g-timeline-item__marker"><ng-content select="[gTimelineMarker]" /></span>
    </div>
    <div class="g-timeline-item__content"><ng-content /></div>
  `,
  host: { class: 'g-timeline-item' },
  styleUrl: './timeline-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTimelineItem {}
