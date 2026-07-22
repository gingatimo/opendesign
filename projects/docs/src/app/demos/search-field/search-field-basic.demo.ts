import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GSearchField } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-search-field-basic-demo',
  imports: [GSearchField],
  template: `
    <g-search-field
      [fields]="demo().fields"
      [placeholder]="demo().placeholder"
      [attr.placeholder]="demo().placeholder"
      (search)="onSearch($event)"
    />
    <p>{{ result() }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 480px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).searchField.demo);
  protected readonly result = computed(() => this.submitted() ?? this.demo().initial);
  private readonly submitted = signal<string | null>(null);

  protected onSearch(e: { field: unknown; value: string }): void {
    this.submitted.set(this.demo().searched(e.field, e.value));
  }
}
