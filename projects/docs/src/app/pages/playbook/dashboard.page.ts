import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { DashboardLayoutDemo } from '../../demos/playbook/dashboard-layout.demo';

@Component({
  imports: [DashboardLayoutDemo, CodeBlock, DemoSection],
  template: `
    <h1>Dashboard</h1>
    <p>
      <code>GTopbar</code> + <code>GSidebar</code> + vùng nội dung ghép thành một layout dashboard
      hoàn chỉnh (thẻ số liệu, thanh tiến độ, danh sách hoạt động). Demo thu nhỏ trong khung có
      chiều cao cố định để không phá layout của chính trang docs này — vốn cũng dùng topbar/sidebar
      thật ở shell bên ngoài.
    </p>
    <docs-demo-section>
      <docs-dashboard-layout-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/dashboard-layout.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookDashboardPage {}
