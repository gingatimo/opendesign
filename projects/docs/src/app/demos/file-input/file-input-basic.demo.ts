import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GFileInput } from 'ngx-opendesign';

@Component({
  selector: 'docs-file-input-basic-demo',
  imports: [GFileInput],
  template: `
    <g-file-input [(files)]="files" accept="image/*" [multiple]="true" />
    <p>Đã chọn: {{ files().length }} tệp</p>
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
  protected readonly files = signal<File[]>([]);
}
