import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GCascadeSelect, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-cascade-select-basic-demo',
  imports: [GCascadeSelect, ReactiveFormsModule],
  template: `
    <g-cascade-select
      [formControl]="city"
      [options]="demo().options"
      [placeholder]="demo().placeholder"
      [attr.placeholder]="demo().placeholder"
    />
    <p>{{ demo().selected(city.value) }}</p>
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
export class CascadeSelectBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).cascadeSelect.demo);
  protected readonly city = new FormControl<string | null>(null);
}
