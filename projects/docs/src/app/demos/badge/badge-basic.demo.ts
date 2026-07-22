import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GBadge, GLocaleService } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-badge-basic-demo',
  imports: [GBadge],
  template: `
    <g-badge>{{ demo().neutral }}</g-badge>
    <g-badge variant="success">{{ demo().success }}</g-badge>
    <g-badge variant="warning">{{ demo().warning }}</g-badge>
    <g-badge variant="danger">{{ demo().danger }}</g-badge>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).badge.demo);
}
