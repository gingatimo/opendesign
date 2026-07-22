import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GGallery, GLocaleService } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

// Ảnh mẫu: SVG data URI (không phụ thuộc CDN ngoài) — mỗi ảnh một màu + nhãn.
function img(color: string, label: string): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450'><rect width='600' height='450' fill='${color}'/><text x='300' y='245' font-size='56' fill='white' text-anchor='middle' font-family='sans-serif'>${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Nhiều ảnh để dải thumbnail TRÀN khung → khoe nút trái/phải; ít ảnh sẽ tự căn giữa.
const COLORS = [
  '#4f46e5',
  '#16a34a',
  '#d97706',
  '#dc2626',
  '#0891b2',
  '#7c3aed',
  '#0d9488',
  '#db2777',
  '#ca8a04',
];
@Component({
  selector: 'docs-gallery-basic-demo',
  imports: [GGallery],
  template: ` <g-gallery [images]="images()" /> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly images = computed(() => {
    const demo = displayCopyFor(this.i18n.tag()).gallery.demo;
    return COLORS.map((c, i) => img(c, demo.image(i + 1)));
  });
}
