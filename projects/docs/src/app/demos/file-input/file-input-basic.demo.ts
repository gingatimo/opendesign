import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GFileInput, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-file-input-basic-demo',
  imports: [GFileInput],
  template: `
    <g-file-input [(files)]="files" accept="image/*" [multiple]="true" />
    <p>{{ demo().selectedCount(files().length) }}</p>
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
export class FileInputBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).fileInput.demo);
  protected readonly files = signal<File[]>([]);
}
