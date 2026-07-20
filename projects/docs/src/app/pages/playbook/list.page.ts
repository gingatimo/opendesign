import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { ListPageDemo } from '../../demos/playbook/list-page.demo';

@Component({
  imports: [ListPageDemo, CodeBlock, DemoSection],
  template: `
    <h1>Danh sách</h1>
    <p>
      Màn danh sách đầy đủ ba khối: <b>tìm kiếm</b> theo tên, <b>lọc</b> theo trạng thái (nút) và
      vai trò (chip bật/tắt — bộ lọc đang áp hiện thành chip <code>removable</code> để gỡ nhanh), và
      <b>bảng kết quả</b>. Bảng đóng băng cột <b>Tên</b> + hàng tiêu đề để cuộn ngang/dọc không mất
      mốc, cột trạng thái dùng <code>GBadge</code>, thời gian format qua <code>DatePipe</code>, hành
      động là hai <code>GIconButton</code>. Phân trang thật ở dưới — đổi bộ lọc/tìm kiếm thì tự quay
      về trang 1.
    </p>
    <docs-demo-section>
      <docs-list-page-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/list-page.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookListPage {}
