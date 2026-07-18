import { ChangeDetectionStrategy, Component } from '@angular/core';

// App-shell: topbar (đỉnh) + sidebar (trái) + nội dung (vùng cuộn). CSS grid + :has() chọn bố cục theo
// region có mặt. Style GLOBAL trong opendesign.scss vì phải nhắm content projected (g-topbar/g-sidebar
// là light-DOM con của g-layout — encapsulation Emulated không style xuyên được).
@Component({
  selector: 'g-layout',
  template: `
    <ng-content select="g-topbar" />
    <ng-content select="g-sidebar" />
    <div class="g-layout__main"><ng-content /></div>
  `,
  host: { class: 'g-layout' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GLayout {}
