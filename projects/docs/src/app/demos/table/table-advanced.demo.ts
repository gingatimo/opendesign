import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GFreezeColumn, GFreezeRow, GLocaleService, GSortHeader, GTable } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

@Component({
  selector: 'docs-table-advanced-demo',
  imports: [GTable, GSortHeader, GFreezeColumn, GFreezeRow],
  template: `
    <div
      style="max-width: 520px; max-height: 220px; overflow: auto; border: 1px solid var(--g-border); border-radius: var(--g-radius-md)"
    >
      <table gTable [striped]="true">
        <thead>
          <tr gFreezeRow>
            <th scope="col" gFreezeColumn [gSortHeader]="sortDir()">
              <button type="button" class="table-advanced-demo__sort-btn" (click)="toggleSort()">
                {{ copy().columns.name }}
              </button>
            </th>
            <th scope="col">{{ copy().columns.department }}</th>
            <th scope="col">{{ copy().columns.email }}</th>
            <th scope="col">{{ copy().columns.phone }}</th>
            <th scope="col">{{ copy().columns.position }}</th>
            <th scope="col">{{ copy().columns.note }}</th>
          </tr>
        </thead>
        <tbody>
          @for (row of rows(); track row.name) {
            <tr>
              <td>{{ row.name }}</td>
              <td>{{ row.department }}</td>
              <td>{{ row.email }}</td>
              <td>{{ row.phone }}</td>
              <td>{{ row.position }}</td>
              <td>{{ row.note }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    .table-advanced-demo__sort-btn {
      background: none;
      border: none;
      font: inherit;
      color: inherit;
      cursor: pointer;
      padding: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableAdvancedDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).table.demo);
  protected readonly sortDir = signal<'asc' | 'desc' | null>('asc');

  protected readonly rows = computed(() => {
    const dir = this.sortDir();
    const employees = this.copy().employees;
    if (dir === null) return employees;
    const sorted = [...employees].sort((a, b) => a.name.localeCompare(b.name, this.i18n.tag()));
    return dir === 'asc' ? sorted : sorted.reverse();
  });

  protected toggleSort(): void {
    this.sortDir.update((dir) => (dir === 'asc' ? 'desc' : dir === 'desc' ? null : 'asc'));
  }
}
