import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GSearchField, GSearchFieldOption } from 'ngx-opendesign';

@Component({
  selector: 'docs-search-field-basic-demo',
  imports: [GSearchField],
  template: `
    <g-search-field
      [fields]="fields"
      placeholder="Nhập giá trị rồi Enter"
      (search)="onSearch($event)"
    />
    <p>{{ result() }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 480px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldBasicDemo {
  protected readonly fields: GSearchFieldOption[] = [
    { value: 'cusId', label: 'Mã khách hàng' },
    { value: 'citizenId', label: 'CCCD' },
    { value: 'username', label: 'Tên đăng nhập' },
  ];
  protected readonly result = signal('Chọn trường, nhập giá trị rồi nhấn Enter.');

  protected onSearch(e: { field: unknown; value: string }): void {
    this.result.set(`Tìm theo trường "${e.field}" = "${e.value || '(rỗng)'}"`);
  }
}
