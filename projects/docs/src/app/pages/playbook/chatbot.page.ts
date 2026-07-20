import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { ChatbotDemo } from '../../demos/playbook/chatbot.demo';

@Component({
  imports: [ChatbotDemo, CodeBlock, DemoSection],
  template: `
    <h1>Chatbot</h1>
    <p>
      Khung chat tương tác thật: gõ tin (hoặc bấm chip gợi ý) → tin hiện bên phải, bot "soạn" (chấm
      nhảy) rồi trả lời mẫu theo từ khoá. Ghép <code>GCard</code> + <code>GAvatar</code> +
      <code>GBadge</code> + <code>GScrollPanel</code> (tự cuộn xuống đáy khi có tin mới bằng
      <code>afterRenderEffect</code>) + <code>GChip</code> gợi ý + <code>GInput</code> và
      <code>GIconButton</code> gửi (icon <code>gIconSend</code>).
    </p>
    <docs-demo-section>
      <docs-chatbot-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/chatbot.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookChatbotPage {}
