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
