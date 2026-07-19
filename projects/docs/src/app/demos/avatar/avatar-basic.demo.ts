import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GAvatar } from 'ngx-opendesign';

@Component({
  selector: 'docs-avatar-basic-demo',
  imports: [GAvatar],
  template: `
    <g-avatar name="Nguyễn Văn An" size="sm" />
    <g-avatar name="Trần Thị Bình" />
    <g-avatar name="Lê Hoàng Cường" size="lg" />
    <g-avatar name="Ảnh lỗi" src="/khong-ton-tai.jpg" />
    <g-avatar name="Phạm Vuông" shape="square" />
    <g-avatar name="Đỗ Vuông Lớn" shape="square" size="lg" />
  `,
  styles: `
    :host {
      display: flex;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarBasicDemo {}
