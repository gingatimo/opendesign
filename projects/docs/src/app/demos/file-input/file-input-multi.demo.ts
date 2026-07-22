import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GFileInput, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-file-input-multi-demo',
  imports: [GFileInput],
  template: `
    <g-file-input [(files)]="files" [multiple]="true" />
    <p class="hint">{{ demo().multiHint(files().length) }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .hint {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputMultiDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).fileInput.demo);
  protected readonly files = signal<File[]>([]);
}
