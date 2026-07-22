import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GProgress } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-progress-basic-demo',
  imports: [GProgress],
  template: `
    <g-progress [value]="30" [attr.aria-label]="demo().upload" />
    <g-progress [value]="70" [attr.aria-label]="demo().profile" />
    <g-progress [indeterminate]="true" [attr.aria-label]="demo().processing" />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
      max-width: 320px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).progress.demo);
}
