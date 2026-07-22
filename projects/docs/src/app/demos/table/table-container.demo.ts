import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GTable, GTableContainer } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

@Component({
  selector: 'docs-table-container-demo',
  imports: [GTable, GTableContainer],
  template: `
    <g-table-container [maxRows]="5" style="max-width: 480px">
      <table gTable [striped]="true" [stickyHeader]="true">
        <thead>
          <tr>
            <th scope="col">{{ copy().columns.city }}</th>
            <th scope="col">{{ copy().columns.region }}</th>
            <th scope="col">{{ copy().columns.population }}</th>
          </tr>
        </thead>
        <tbody>
          @for (row of copy().cities; track row.name) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.region }}</td>
              <td>{{ row.population }}</td>
            </tr>
          }
        </tbody>
      </table>
    </g-table-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableContainerDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).table.demo);
}
