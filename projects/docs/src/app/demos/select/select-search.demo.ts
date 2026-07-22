import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GLocaleService, GOption, GSelect } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-select-search-demo',
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select [formControl]="fruit" searchable [placeholder]="demo().fruitPlaceholder">
      @for (f of demo().fruits; track $index) {
        <g-option [value]="f">{{ f }}</g-option>
      }
    </g-select>
    <p>{{ demo().selected(fruit.value) }}</p>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).select.demo);
  protected readonly fruit = new FormControl<string | null>(null);
}
