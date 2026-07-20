import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { SplitWorkspaceDemo } from '../../demos/playbook/split-workspace.demo';

@Component({
  imports: [SplitWorkspaceDemo, CodeBlock, DemoSection],
  template: `
    <h1>Chat + Terminal</h1>
    <p>
      Bố cục kiểu IDE: <code>GSplitter</code> chia đôi — bên trái là khung <b>chat</b> (tin nhắn
      cuộn + ô nhập <code>GInputGroup</code> có nút gửi), bên phải là <b>terminal</b> (log mono, nền
      tối cố định, dòng lệnh <code>$</code>). <b>Kéo thanh giữa</b> để đổi tỉ lệ hai bên; cả hai
      panel tương tác thật (gõ chat → bot trả lời mẫu; gõ lệnh → terminal in kết quả mẫu, tự cuộn
      xuống đáy).
    </p>
    <docs-demo-section>
      <docs-split-workspace-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/split-workspace.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookSplitWorkspacePage {}
