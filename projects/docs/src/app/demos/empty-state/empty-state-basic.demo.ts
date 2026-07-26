import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GButton,
  GEmptyState,
  GEmptyStateActions,
  GLocaleService,
  gIconSettings,
} from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-empty-state-basic-demo',
  imports: [GEmptyState, GEmptyStateActions, GButton],
  template: `
    <g-empty-state [icon]="icon" [heading]="demo().heading" [description]="demo().description">
      <button g-button gEmptyStateActions>{{ demo().action }}</button>
    </g-empty-state>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).emptyState.demo);
  protected readonly icon = gIconSettings;
}
