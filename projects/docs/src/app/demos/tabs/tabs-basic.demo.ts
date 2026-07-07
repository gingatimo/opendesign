import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GTab, GTabs } from 'ngx-opendesign';

@Component({
  selector: 'docs-tabs-basic-demo',
  imports: [GTabs, GTab],
  template: `
    <g-tabs tablistLabel="Ví dụ tabs">
      <g-tab label="Tổng quan">
        <p>Nội dung tổng quan của tab.</p>
      </g-tab>
      <g-tab label="Cài đặt">
        <p>Nội dung cài đặt của tab.</p>
      </g-tab>
      <g-tab label="Nâng cao" [disabled]="true">
        <p>Nội dung nâng cao — tab này đang bị vô hiệu hoá.</p>
      </g-tab>
      <g-tab label="Lịch sử">
        <p>Nội dung lịch sử của tab.</p>
      </g-tab>
    </g-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBasicDemo {}
