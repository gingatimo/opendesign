import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GChips, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-chips-basic-demo',
  imports: [GChips, ReactiveFormsModule],
  template: `
    <g-chips
      [formControl]="tags"
      [placeholder]="demo().placeholder"
      [attr.placeholder]="demo().placeholder"
    />
    <p>{{ demo().added(tags.value ?? []) }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 420px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).chips.demo);
  protected readonly tags = new FormControl<string[]>([], { nonNullable: true });
}
