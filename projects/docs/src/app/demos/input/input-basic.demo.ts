import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GInput } from 'ngx-opendesign';

@Component({
  selector: 'docs-input-basic-demo',
  imports: [GInput, ReactiveFormsModule],
  template: `
    <input gInput placeholder="Nhập tên của bạn" />
    <input gInput [formControl]="required" placeholder="Bắt buộc nhập" />
    <input gInput placeholder="Vô hiệu hóa" disabled />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 320px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputBasicDemo {
  protected readonly required = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}
