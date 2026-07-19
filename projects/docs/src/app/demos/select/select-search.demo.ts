import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GOption, GSelect } from 'ngx-opendesign';

@Component({
  selector: 'docs-select-search-demo',
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select [formControl]="fruit" searchable placeholder="Chọn quả">
      @for (f of fruits; track f) {
        <g-option [value]="f">{{ f }}</g-option>
      }
    </g-select>
    <p>Đã chọn: {{ fruit.value ?? 'chưa chọn' }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 280px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchDemo {
  protected readonly fruit = new FormControl<string | null>(null);
  protected readonly fruits = [
    'Táo',
    'Cam',
    'Chuối',
    'Xoài',
    'Dâu tây',
    'Nho',
    'Ổi',
    'Đào',
    'Mít',
    'Sầu riêng',
  ];
}
