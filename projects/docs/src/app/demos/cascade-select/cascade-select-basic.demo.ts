import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GCascadeOption, GCascadeSelect } from 'ngx-opendesign';

@Component({
  selector: 'docs-cascade-select-basic-demo',
  imports: [GCascadeSelect, ReactiveFormsModule],
  template: `
    <g-cascade-select [formControl]="city" [options]="options" placeholder="Chọn khu vực" />
    <p>Đã chọn: {{ city.value ?? 'chưa chọn' }}</p>
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
export class CascadeSelectBasicDemo {
  protected readonly city = new FormControl<string | null>(null);
  protected readonly options: GCascadeOption[] = [
    {
      label: 'Châu Á',
      children: [
        {
          label: 'Việt Nam',
          children: [
            { label: 'Hà Nội', value: 'hanoi' },
            { label: 'TP. Hồ Chí Minh', value: 'hcmc' },
          ],
        },
        { label: 'Nhật Bản', value: 'japan' },
      ],
    },
    {
      label: 'Châu Âu',
      children: [{ label: 'Pháp', value: 'france' }],
    },
  ];
}
