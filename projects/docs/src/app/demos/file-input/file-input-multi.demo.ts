import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GFileInput } from 'ngx-opendesign';

@Component({
  selector: 'docs-file-input-multi-demo',
  imports: [GFileInput],
  template: `
    <g-file-input [(files)]="files" [multiple]="true" />
    <p class="hint">
      {{ files().length }} tệp — chọn thêm để nối vào danh sách, bấm × để xoá từng tệp.
    </p>
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
  protected readonly files = signal<File[]>([]);
}
