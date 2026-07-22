import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GLocaleService, GTextarea } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-textarea-basic-demo',
  imports: [GTextarea, ReactiveFormsModule],
  template: `
    <textarea gTextarea [placeholder]="demo().note"></textarea>
    <textarea gTextarea [formControl]="required" [placeholder]="demo().required"></textarea>
    <textarea gTextarea [placeholder]="demo().disabled" disabled></textarea>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).textarea.demo);
  protected readonly required = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}
