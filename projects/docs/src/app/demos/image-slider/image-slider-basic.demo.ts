import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GImageSlider } from 'ngx-opendesign';

// Ảnh mẫu SVG data-URI (offline) — mỗi ảnh một màu để thấy rõ khi chuyển slide.
const SAMPLE_IMAGES = [
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%234f46e5'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23059669'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23d97706'/%3E%3C/svg%3E",
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='800' height='450' fill='%23dc2626'/%3E%3C/svg%3E",
];

@Component({
  selector: 'docs-image-slider-basic-demo',
  imports: [GImageSlider],
  template: `<g-image-slider [images]="images()" [loop]="true" [lightbox]="true" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSliderBasicDemo {
  protected readonly images = signal<string[]>(SAMPLE_IMAGES);
}
