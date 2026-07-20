import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { DetailPageDemo } from '../../demos/playbook/detail-page.demo';

@Component({
  imports: [DetailPageDemo, CodeBlock, DemoSection],
  template: `
    <h1>Chi tiết</h1>
    <p>
      Màn xem hồ sơ một bản ghi: header có <code>GAvatar</code>, tên, <code>GBadge</code> trạng thái
      và nút <b>Sửa</b>/<b>Xoá</b> (<code>GButton</code> kèm icon). <code>GTabs</code> tách
      <b>Thông tin</b> (lưới label/value cho các thuộc tính) và <b>Hoạt động</b> — dựng bằng
      <code>GTimeline</code> với marker màu theo trạng thái từng mốc.
    </p>
    <docs-demo-section>
      <docs-detail-page-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/detail-page.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookDetailPage {}
