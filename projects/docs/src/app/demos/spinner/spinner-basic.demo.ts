import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GSpinner } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-spinner-basic-demo',
  imports: [GSpinner],
  template: `
    <g-spinner size="sm" />
    <g-spinner />
    <g-spinner size="lg" />
    <g-spinner size="xl" />
    <g-spinner size="2xl" [attr.aria-label]="demo().productList" />
  `,
  styles: `
    :host {
      display: flex;
      gap: var(--g-space-4);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).spinner.demo);
}
