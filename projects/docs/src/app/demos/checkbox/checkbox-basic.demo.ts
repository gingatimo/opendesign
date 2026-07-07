import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GCheckbox } from 'ngx-opendesign';

@Component({
  selector: 'docs-checkbox-basic-demo',
  imports: [GCheckbox, ReactiveFormsModule],
  template: `
    <g-checkbox [formControl]="agree">Tôi đồng ý với điều khoản</g-checkbox>
    <g-checkbox [indeterminate]="true">Chọn một phần</g-checkbox>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxBasicDemo {
  protected readonly agree = new FormControl(false, { nonNullable: true });
}
