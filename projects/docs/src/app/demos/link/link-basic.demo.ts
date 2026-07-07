import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GLink } from 'ngx-opendesign';

@Component({
  selector: 'docs-link-basic-demo',
  imports: [GLink],
  template: `
    <p>
      Đọc thêm về triết lý thiết kế tại
      <a gLink href="https://example.com">tài liệu OpenDesign</a>, hoặc quay lại
      <a gLink href="/">trang chủ</a>.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBasicDemo {}
