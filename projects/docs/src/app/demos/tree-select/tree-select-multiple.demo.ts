import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GLocaleService, GTreeSelect } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-tree-select-multiple-demo',
  imports: [GTreeSelect, ReactiveFormsModule],
  template: `
    <g-tree-select
      multiple
      [formControl]="perms"
      [options]="demo().multipleOptions"
      [placeholder]="demo().multiplePlaceholder"
      [attr.placeholder]="demo().multiplePlaceholder"
    />
    <p>{{ demo().selected(perms.value ?? []) }}</p>
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
export class TreeSelectMultipleDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).treeSelect.demo);
  protected readonly perms = new FormControl<string[]>([]);
}
