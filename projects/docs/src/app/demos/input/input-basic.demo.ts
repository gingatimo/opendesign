import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { GInput, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-input-basic-demo',
  imports: [GInput, ReactiveFormsModule],
  template: `
    <input gInput [placeholder]="demo().name" />
    <input gInput [formControl]="required" [placeholder]="demo().required" />
    <input gInput [placeholder]="demo().disabled" disabled />
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).input.demo);
  protected readonly required = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
}
