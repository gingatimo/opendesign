import { ChangeDetectionStrategy, Component } from '@angular/core';

// Dòng thời gian dọc. Chỉ là vùng chứa xếp dọc; mỗi GTimelineItem tự vẽ marker + đường nối và tự bỏ
// đường nối ở item cuối (qua :host(:last-child)).
@Component({
  selector: 'g-timeline',
  template: `<ng-content />`,
  host: { class: 'g-timeline' },
  styles: `
    :host {
      display: flex;
      flex-direction: column;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GTimeline {}
