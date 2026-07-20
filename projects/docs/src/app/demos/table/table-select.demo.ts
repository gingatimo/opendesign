import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GBadge, GBadgeVariant, GCheckbox, GTable } from 'ngx-opendesign';

interface Row {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'invited' | 'inactive';
}

const STATUS_LABEL: Record<Row['status'], string> = {
  active: 'Đang hoạt động',
  invited: 'Đã mời',
  inactive: 'Ngừng hoạt động',
};
const STATUS_VARIANT: Record<Row['status'], GBadgeVariant> = {
  active: 'success',
  invited: 'warning',
  inactive: 'neutral',
};

const ROWS: Row[] = [
  { id: 'u1', name: 'Nguyễn Văn An', role: 'Kỹ thuật', status: 'active' },
  { id: 'u2', name: 'Trần Thị Bình', role: 'Thiết kế', status: 'invited' },
  { id: 'u3', name: 'Lê Hoàng Cường', role: 'Kinh doanh', status: 'active' },
  { id: 'u4', name: 'Phạm Thu Hà', role: 'Vận hành', status: 'inactive' },
  { id: 'u5', name: 'Đỗ Minh Khang', role: 'Kỹ thuật', status: 'active' },
];

@Component({
  selector: 'docs-table-select-demo',
  imports: [GTable, GCheckbox, GBadge, FormsModule],
  template: `
    <p class="table-select-demo__summary">
      Đã chọn <b>{{ selected().size }}</b> / {{ rows.length }} hàng.
    </p>
    <table gTable>
      <thead>
        <tr>
          <th scope="col" class="table-select-demo__check">
            <!-- Header: tri-state — tích khi chọn hết, indeterminate khi chọn một phần. -->
            <g-checkbox
              aria-label="Chọn tất cả"
              [ngModel]="allSelected()"
              [indeterminate]="someSelected()"
              (ngModelChange)="toggleAll($event)"
            />
          </th>
          <th scope="col">Tên</th>
          <th scope="col">Vai trò</th>
          <th scope="col">Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows; track row.id) {
          <tr [class.table-select-demo__row--selected]="isSelected(row.id)">
            <td class="table-select-demo__check">
              <g-checkbox
                [attr.aria-label]="'Chọn ' + row.name"
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
    /* Cột checkbox: co hẹp, căn giữa checkbox. */
    .table-select-demo__check {
      width: 1%;
      white-space: nowrap;
      text-align: center;
    }
    /* Hàng đã chọn tô nền nhẹ để tách khỏi hàng thường (demo không dùng striped để nền chọn nổi rõ). */
    .table-select-demo__row--selected td {
      background: var(--g-surface);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSelectDemo {
  protected readonly rows = ROWS;
  protected readonly selected = signal<ReadonlySet<string>>(new Set());

  protected readonly allSelected = computed(
    () => this.rows.length > 0 && this.selected().size === this.rows.length,
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
    this.selected.set(checked ? new Set(this.rows.map((r) => r.id)) : new Set());
  }

  protected statusLabel(status: Row['status']): string {
    return STATUS_LABEL[status];
  }
  protected statusVariant(status: Row['status']): GBadgeVariant {
    return STATUS_VARIANT[status];
  }
}
