import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GBadge, GBadgeVariant, GCheckbox, GLocaleService, GTable } from 'ngx-opendesign';
import { dataCopyFor } from '../../pages/data-copy';

interface Row {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'invited' | 'inactive';
}

const STATUS_VARIANT: Record<Row['status'], GBadgeVariant> = {
  active: 'success',
  invited: 'warning',
  inactive: 'neutral',
};

@Component({
  selector: 'docs-table-select-demo',
  imports: [GTable, GCheckbox, GBadge, FormsModule],
  template: `
    <p class="table-select-demo__summary">
      {{ copy().selectedSummary(selected().size, rows().length) }}
    </p>
    <table gTable>
      <thead>
        <tr>
          <th scope="col" class="table-select-demo__check">
            <g-checkbox
              [attr.aria-label]="copy().selectAll"
              [ngModel]="allSelected()"
              [indeterminate]="someSelected()"
              (ngModelChange)="toggleAll($event)"
            />
          </th>
          <th scope="col">{{ copy().columns.name }}</th>
          <th scope="col">{{ copy().columns.role }}</th>
          <th scope="col">{{ copy().columns.status }}</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track row.id) {
          <tr [class.table-select-demo__row--selected]="isSelected(row.id)">
            <td class="table-select-demo__check">
              <g-checkbox
                [attr.aria-label]="copy().selectRow(row.name)"
                [ngModel]="isSelected(row.id)"
                (ngModelChange)="toggle(row.id, $event)"
              />
            </td>
            <td>{{ row.name }}</td>
            <td>{{ row.role }}</td>
            <td>
              <g-badge [variant]="statusVariant(row.status)">{{ statusLabel(row.status) }}</g-badge>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    :host {
      display: block;
    }
    .table-select-demo__summary {
      margin: 0 0 var(--g-space-3);
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
    .table-select-demo__check {
      width: 1%;
      white-space: nowrap;
      text-align: center;
    }
    .table-select-demo__row--selected td {
      background: var(--g-surface);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSelectDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => dataCopyFor(this.i18n.tag()).table.demo);
  protected readonly rows = computed<Row[]>(() => this.copy().selectRows);
  protected readonly selected = signal<ReadonlySet<string>>(new Set());

  protected readonly allSelected = computed(
    () => this.rows().length > 0 && this.selected().size === this.rows().length,
  );
  protected readonly someSelected = computed(() => this.selected().size > 0 && !this.allSelected());

  protected isSelected(id: string): boolean {
    return this.selected().has(id);
  }

  protected toggle(id: string, checked: boolean): void {
    this.selected.update((cur) => {
      const next = new Set(cur);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  protected toggleAll(checked: boolean): void {
    this.selected.set(checked ? new Set(this.rows().map((r) => r.id)) : new Set());
  }

  protected statusLabel(status: Row['status']): string {
    return this.copy().statusLabels[status];
  }
  protected statusVariant(status: Row['status']): GBadgeVariant {
    return STATUS_VARIANT[status];
  }
}
