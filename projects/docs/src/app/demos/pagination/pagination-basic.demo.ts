import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GPagination } from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-pagination-basic-demo',
  imports: [GPagination],
  template: `
    <g-pagination [(page)]="page" [pageCount]="10" />
    <p>{{ copy().currentPage }} {{ page() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).pagination.demo);
  protected readonly page = signal(1);
}
