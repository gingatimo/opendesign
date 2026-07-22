import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GTab, GTabs } from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-tabs-basic-demo',
  imports: [GTabs, GTab],
  template: `
    <g-tabs [tablistLabel]="copy().tablistLabel">
      <g-tab [label]="copy().overview">
        <p>{{ copy().overviewContent }}</p>
      </g-tab>
      <g-tab [label]="copy().settings">
        <p>{{ copy().settingsContent }}</p>
      </g-tab>
      <g-tab [label]="copy().advanced" [disabled]="true">
        <p>{{ copy().advancedContent }}</p>
      </g-tab>
      <g-tab [label]="copy().history">
        <p>{{ copy().historyContent }}</p>
      </g-tab>
    </g-tabs>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).tabs.demo);
}
