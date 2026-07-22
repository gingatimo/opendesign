import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GLocaleService, GOption, GSelect } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-select-multiple-demo',
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select
      [formControl]="frameworks"
      multiple
      searchable
      [placeholder]="demo().frameworkPlaceholder"
    >
      @for (f of options; track f) {
        <g-option [value]="f">{{ f }}</g-option>
      }
    </g-select>
    <p>{{ demo().selected(frameworks.value ?? []) }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 320px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectMultipleDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).select.demo);
  protected readonly frameworks = new FormControl<string[]>([]);
  protected readonly options = ['Angular', 'React', 'Vue', 'Svelte', 'Solid', 'Qwik', 'Preact'];
}
