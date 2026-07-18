import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GImagePreview } from 'ngx-opendesign';

// Ảnh mẫu: SVG nhỏ nhúng data-URI (offline, không phụ thuộc mạng) — mỗi ô một màu để phân biệt khi
// xem lightbox.
const SAMPLE_IMAGES = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%234f46e5'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%2316a34a'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect width='200' height='200' fill='%23d97706'/%3E%3C/svg%3E",
];

@Component({
  selector: 'docs-image-preview-basic-demo',
  imports: [GImagePreview],
  template: `
    <g-image-preview [images]="images()" [removable]="true" (remove)="onRemove($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePreviewBasicDemo {
  protected readonly images = signal<string[]>(SAMPLE_IMAGES);

  protected onRemove(index: number): void {
    this.images.update((list) => list.filter((_, i) => i !== index));
  }
}
