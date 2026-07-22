import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GCheckbox, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-checkbox-basic-demo',
  imports: [GCheckbox, ReactiveFormsModule],
  template: `
    <g-checkbox [formControl]="agree">{{ demo().agree }}</g-checkbox>
    <g-checkbox [indeterminate]="true">{{ demo().partial }}</g-checkbox>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).checkbox.demo);
  protected readonly agree = new FormControl(false, { nonNullable: true });
}
