import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GOption, GSelect } from 'ngx-opendesign';

@Component({
  selector: 'docs-select-multiple-demo',
  imports: [GSelect, GOption, ReactiveFormsModule],
  template: `
    <g-select [formControl]="frameworks" multiple searchable placeholder="Chọn framework">
      @for (f of options; track f) {
        <g-option [value]="f">{{ f }}</g-option>
      }
    </g-select>
    <p>Đã chọn: {{ (frameworks.value ?? []).join(', ') || 'chưa chọn' }}</p>
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
  protected readonly frameworks = new FormControl<string[]>([]);
  protected readonly options = ['Angular', 'React', 'Vue', 'Svelte', 'Solid', 'Qwik', 'Preact'];
}
