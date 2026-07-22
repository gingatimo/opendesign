import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { DetailPageDemo } from '../../demos/playbook/detail-page.demo';
import { playbookCopyFor } from './playbook-copy';

@Component({
  imports: [DetailPageDemo, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>
    <docs-demo-section>
      <docs-detail-page-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/detail-page.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookDetailPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => playbookCopyFor(this.i18n.tag()).detail);
}
