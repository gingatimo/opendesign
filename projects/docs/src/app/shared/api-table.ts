import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface ApiRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'docs-api-table',
  template: `
    <table class="docs-api-table">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Kiểu</th>
          <th>Mặc định</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track row.name) {
          <tr>
            <td>
              <code>{{ row.name }}</code>
            </td>
            <td>
              <code>{{ row.type }}</code>
            </td>
            <td>
              <code>{{ row.default }}</code>
            </td>
            <td>{{ row.description }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    .docs-api-table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--g-font-size-sm);
    }
    th,
    td {
      text-align: left;
      padding: var(--g-space-3);
      border-bottom: 1px solid var(--g-border);
    }
    th {
      color: var(--g-text-muted);
      font-weight: 500;
    }
    code {
      font-size: var(--g-font-size-xs);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiTable {
  readonly rows = input.required<ApiRow[]>();
}
