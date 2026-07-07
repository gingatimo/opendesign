import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GButton } from 'ngx-opendesign';

@Component({
  selector: 'docs-button-basic-demo',
  imports: [GButton],
  template: `
    <button g-button>Lưu thay đổi</button>
    <button g-button variant="secondary">Nháp</button>
    <button g-button variant="outline">Hủy</button>
    <button g-button variant="ghost">Bỏ qua</button>
    <button g-button variant="danger">Xóa</button>
    <button g-button [loading]="true">Đang lưu</button>
    <button g-button size="sm">Nhỏ</button>
    <button g-button size="lg">Lớn</button>
    <button g-button disabled>Vô hiệu</button>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonBasicDemo {}
