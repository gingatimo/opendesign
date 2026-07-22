import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GLocaleService, GTreeSelect } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-tree-select-basic-demo',
  imports: [GTreeSelect, ReactiveFormsModule],
  template: `
    <g-tree-select
      [formControl]="folder"
      [options]="demo().options"
      [placeholder]="demo().placeholder"
      [attr.placeholder]="demo().placeholder"
    />
    <p>{{ demo().selected(folder.value) }}</p>
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
export class TreeSelectBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).treeSelect.demo);
  protected readonly folder = new FormControl<string | null>(null);
}
