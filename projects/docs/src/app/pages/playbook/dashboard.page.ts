import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { CodeBlock } from '../../shared/code-block';
import { DemoSection } from '../../shared/demo-section';
import { DashboardLayoutDemo } from '../../demos/playbook/dashboard-layout.demo';
import { playbookCopyFor } from './playbook-copy';

@Component({
  imports: [DashboardLayoutDemo, CodeBlock, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>
    <docs-demo-section>
      <docs-dashboard-layout-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/playbook/dashboard-layout.demo.ts" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PlaybookDashboardPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => playbookCopyFor(this.i18n.tag()).dashboard);
}
