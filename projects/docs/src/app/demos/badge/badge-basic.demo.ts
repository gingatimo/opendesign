import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GBadge } from 'ngx-opendesign';

@Component({
  selector: 'docs-badge-basic-demo',
  imports: [GBadge],
  template: `
    <g-badge>Mặc định</g-badge>
    <g-badge variant="success">Thành công</g-badge>
    <g-badge variant="warning">Cảnh báo</g-badge>
    <g-badge variant="danger">Lỗi</g-badge>
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
export class BadgeBasicDemo {}
