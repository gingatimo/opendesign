import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GOption, GSelect } from 'ngx-opendesign';

@Component({
  selector: 'docs-select-basic-demo',
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select [formControl]="country" placeholder="Chọn quốc gia">
      <g-option value="vn">Việt Nam</g-option>
      <g-option value="us">Hoa Kỳ</g-option>
      <g-option value="jp">Nhật Bản</g-option>
      <g-option value="kr">Hàn Quốc</g-option>
    </g-select>
  `,
  styles: `
    :host {
      display: block;
      max-width: 280px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBasicDemo {
  protected readonly country = new FormControl<string | null>(null);
}
