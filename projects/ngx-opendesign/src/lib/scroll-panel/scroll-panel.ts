import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Vùng cuộn với thanh cuộn mảnh theo theme. Thuần CSS (scrollbar-width/color chuẩn) — không JS
// scrollbar. Đặt maxHeight/height để giới hạn rồi cuộn nội dung bên trong.
@Component({
  selector: 'g-scroll-panel',
  template: `<ng-content />`,
  host: {
    class: 'g-scroll-panel',
    '[style.max-height]': 'maxHeight()',
    '[style.height]': 'height()',
  },
  styleUrl: './scroll-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GScrollPanel {
  readonly maxHeight = input<string>();
  readonly height = input<string>();
}
