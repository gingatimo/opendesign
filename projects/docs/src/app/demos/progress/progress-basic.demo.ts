import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GProgress } from 'ngx-opendesign';

@Component({
  selector: 'docs-progress-basic-demo',
  imports: [GProgress],
  template: `
    <g-progress [value]="30" aria-label="Tiến độ tải lên" />
    <g-progress [value]="70" aria-label="Tiến độ hoàn thành hồ sơ" />
    <g-progress [indeterminate]="true" aria-label="Đang xử lý" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
      max-width: 320px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBasicDemo {}
