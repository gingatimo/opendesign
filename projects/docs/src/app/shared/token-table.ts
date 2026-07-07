import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface TokenRow {
  name: string;
  value: string;
  description: string;
}

@Component({
  selector: 'docs-token-table',
  template: `
    <table class="docs-token-table">
      <thead>
        <tr>
          @if (preview()) {
            <th></th>
          }
          <th>Token</th>
          <th>Giá trị</th>
          <th>Mô tả</th>
        </tr>
      </thead>
      <tbody>
        @for (row of rows(); track row.name) {
          <tr>
            @if (preview() === 'color') {
              <td>
                <span
                  class="docs-token-table__swatch"
                  aria-hidden="true"
                  [style.background]="'var(' + row.name + ')'"
                ></span>
              </td>
            }
            <td>
              <code>{{ row.name }}</code>
            </td>
            <td>
              <code>{{ row.value }}</code>
            </td>
            <td>{{ row.description }}</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: `
    .docs-token-table {
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
    .docs-token-table__swatch {
      display: block;
      width: var(--g-space-5);
      height: var(--g-space-5);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenTable {
  readonly rows = input.required<TokenRow[]>();
  readonly preview = input<'color'>();
}
