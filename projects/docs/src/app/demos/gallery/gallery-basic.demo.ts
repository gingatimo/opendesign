import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GGallery } from 'ngx-opendesign';

// Ảnh mẫu: SVG data URI (không phụ thuộc CDN ngoài) — mỗi ảnh một màu + nhãn.
function img(color: string, label: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='600' height='450' fill='${color}'/><text x='300' y='245' font-size='56' fill='white' text-anchor='middle' font-family='sans-serif'>${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const SAMPLE = [
  img('#4f46e5', 'Ảnh 1'),
  img('#16a34a', 'Ảnh 2'),
  img('#d97706', 'Ảnh 3'),
  img('#dc2626', 'Ảnh 4'),
  img('#0891b2', 'Ảnh 5'),
];

@Component({
  selector: 'docs-gallery-basic-demo',
  imports: [GGallery],
  template: ` <g-gallery [images]="images" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryBasicDemo {
  protected readonly images = SAMPLE;
}
