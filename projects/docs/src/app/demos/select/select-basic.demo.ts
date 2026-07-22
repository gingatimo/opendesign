import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GLocaleService, GOption, GSelect } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-select-basic-demo',
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select
      [formControl]="country"
      [placeholder]="demo().countryPlaceholder"
      [attr.placeholder]="demo().countryPlaceholder"
    >
      @for (countryOption of demo().countries; track countryOption.value) {
        <g-option [value]="countryOption.value">{{ countryOption.label }}</g-option>
      }
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).select.demo);
  protected readonly country = new FormControl<string | null>(null);
}
