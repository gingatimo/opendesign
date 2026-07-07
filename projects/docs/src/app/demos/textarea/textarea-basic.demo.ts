import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GTextarea } from 'ngx-opendesign';

@Component({
  selector: 'docs-textarea-basic-demo',
  imports: [GTextarea, ReactiveFormsModule],
  template: `
    <textarea gTextarea placeholder="Nhập ghi chú..."></textarea>
    <textarea gTextarea [formControl]="required" placeholder="Bắt buộc nhập"></textarea>
    <textarea gTextarea placeholder="Vô hiệu hóa" disabled></textarea>
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
export class TextareaBasicDemo {
  protected readonly required = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}
