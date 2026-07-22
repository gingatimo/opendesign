import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GBreadcrumb, GBreadcrumbItem, GLocaleService } from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-breadcrumb-basic-demo',
  imports: [GBreadcrumb, GBreadcrumbItem],
  template: `
    <nav g-breadcrumb aria-label="Breadcrumb">
      <a g-breadcrumb-item href="#">{{ copy().home }}</a>
      <a g-breadcrumb-item href="#">{{ copy().products }}</a>
      <a g-breadcrumb-item href="#">{{ copy().phones }}</a>
      <span g-breadcrumb-item aria-current="page">{{ copy().current }}</span>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).breadcrumb.demo);
}
