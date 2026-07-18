import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DashboardLayoutDemo } from '../demos/playbook/dashboard-layout.demo';
import { FilterableListDemo } from '../demos/playbook/filterable-list.demo';
import { ListPageDemo } from '../demos/playbook/list-page.demo';
import { LoginFormDemo } from '../demos/playbook/login-form.demo';
import { SettingsPageDemo } from '../demos/playbook/settings-page.demo';

@Component({
  imports: [
    LoginFormDemo,
    SettingsPageDemo,
    DashboardLayoutDemo,
    FilterableListDemo,
    ListPageDemo,
    CodeBlock,
    DemoSection,
  ],
  template: `
    <h1>Playbook</h1>
    <p>
      5 recipe ghép nhiều component OpenDesign thành màn hình thực chiến — xem sống, tương tác thật,
      copy nguyên khối về dự án của bạn. Đây không phải ảnh chụp: form có validation thật, nút lưu
      bắn toast thật, danh sách lọc thật khi bấm chip.
    </p>

    <h2>Form đăng nhập</h2>
    <p>
      Reactive forms với <code>Validators.required</code> và <code>Validators.email</code>, lỗi hiện
      khi trường đã touched và invalid. Nút submit chuyển sang trạng thái <code>loading</code> thật
      trong lúc "gọi API".
    </p>
    <docs-demo-section>
      <docs-login-form-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/login-form.demo.ts" />

    <h2>Dashboard layout</h2>
    <p>
      <code>GTopbar</code> + <code>GSidebar</code> + vùng nội dung ghép thành một layout dashboard
      hoàn chỉnh, thu nhỏ trong khung có chiều cao cố định để không phá layout của chính trang docs
      này (vốn cũng dùng topbar/sidebar thật ở shell bên ngoài).
    </p>
    <docs-demo-section>
      <docs-dashboard-layout-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/dashboard-layout.demo.ts" />

    <h2>Trang cài đặt</h2>
    <p>
      Toggle, radio group và select đều giữ state thật qua reactive forms. Bấm
      <b>Lưu thay đổi</b> gọi <code>GToastService.show()</code> để báo thành công.
    </p>
    <docs-demo-section>
      <docs-settings-page-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/settings-page.demo.ts" />

    <h2>Danh sách có filter</h2>
    <p>
      Chip vai trò dùng làm bộ lọc — bấm để bật/tắt, danh sách bên dưới lọc lại thật sự theo signal.
      Bộ lọc đang áp dụng hiện thành chip <code>removable</code> riêng để gỡ nhanh.
    </p>
    <docs-demo-section>
      <docs-filterable-list-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/filterable-list.demo.ts" />

    <h2>Trang danh sách</h2>
    <p>
      Khối search/filter phía trên, bảng đóng băng cột <b>Tên</b> và hàng tiêu đề để cuộn ngang/dọc
      không mất mốc, cột trạng thái dùng <code>GBadge</code>, cột thời gian format qua
      <code>DatePipe</code>, cột hành động là hai <code>GIconButton</code>. Phân trang thật ở dưới —
      lọc/tìm kiếm đổi thì tự quay về trang 1.
    </p>
    <docs-demo-section>
      <docs-list-page-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/list-page.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookPage {}
