import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GPagination } from 'ngx-opendesign';

@Component({
  selector: 'docs-pagination-basic-demo',
  imports: [GPagination],
  template: `
    <g-pagination [(page)]="page" [pageCount]="10" />
    <p>Trang hiện tại: {{ page() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationBasicDemo {
  protected readonly page = signal(1);
}
