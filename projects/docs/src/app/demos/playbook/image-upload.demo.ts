import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GFileInput, GImagePreview } from 'ngx-opendesign';

@Component({
  selector: 'docs-image-upload-demo',
  imports: [GFileInput, GImagePreview],
  template: `
    <g-file-input [(files)]="files" accept="image/*" [multiple]="true" [showFileList]="false" />
    @if (files().length) {
      <g-image-preview [images]="files()" [removable]="true" (remove)="removeAt($event)" />
    }
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
export class ImageUploadDemo {
  protected readonly files = signal<File[]>([]);

  protected removeAt(index: number): void {
    this.files.update((list) => list.filter((_, i) => i !== index));
  }
}
