import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GTable } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

@Component({
  selector: 'docs-table-basic-demo',
  imports: [GTable],
  template: `
    <div style="overflow-x: auto">
      <table gTable [striped]="true">
        <thead>
          <tr>
            <th scope="col">{{ copy().columns.name }}</th>
            <th scope="col">{{ copy().columns.email }}</th>
            <th scope="col">{{ copy().columns.role }}</th>
          </tr>
        </thead>
        <tbody>
          @for (row of copy().basicRows; track row.email) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.email }}</td>
              <td>{{ row.role }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).table.demo);
}
