import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GCard, GCardFooter, GCardHeader } from 'ngx-opendesign';

@Component({
  selector: 'docs-card-basic-demo',
  imports: [GCard, GCardHeader, GCardFooter],
  template: `
    <g-card>
      <p>Thẻ đơn giản chỉ có nội dung.</p>
    </g-card>

    <g-card>
      <div gCardHeader>Thông tin tài khoản</div>
      <p>Thẻ đầy đủ với phần đầu và phần chân.</p>
      <div gCardFooter>Cập nhật 2 giờ trước</div>
    </g-card>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
      max-width: 360px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardBasicDemo {}
