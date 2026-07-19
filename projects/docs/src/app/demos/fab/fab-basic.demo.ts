import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GFab, GIcon, gIconPlus } from 'ngx-opendesign';

@Component({
  selector: 'docs-fab-basic-demo',
  imports: [GFab, GIcon],
  template: `
    <p>Nút hành động nổi cố định ở góc phải-dưới màn hình (cuộn trang vẫn giữ nguyên vị trí).</p>
    <button g-fab aria-label="Thêm mới" (click)="count.set(count() + 1)">
      <g-icon [icon]="iconPlus" />
    </button>
    <p>Đã bấm: {{ count() }} lần.</p>
  `,
  styles: `
    p {
      margin: 0 0 var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabBasicDemo {
  protected readonly iconPlus = gIconPlus;
  protected readonly count = signal(0);
}
