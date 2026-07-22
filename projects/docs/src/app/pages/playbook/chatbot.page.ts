import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { ChatbotDemo } from '../../demos/playbook/chatbot.demo';
import { playbookCopyFor } from './playbook-copy';

@Component({
  imports: [ChatbotDemo, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>
    <docs-demo-section>
      <docs-chatbot-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/chatbot.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookChatbotPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => playbookCopyFor(this.i18n.tag()).chatbot);
}
