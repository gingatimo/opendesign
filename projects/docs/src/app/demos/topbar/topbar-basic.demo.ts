import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  GIcon,
  GIconButton,
  GTopbar,
  GTopbarCenter,
  GTopbarEnd,
  GTopbarStart,
} from 'ngx-opendesign';
import { iconBell } from '../../core/demo-icons';

@Component({
  selector: 'docs-topbar-basic-demo',
  imports: [GTopbar, GTopbarStart, GTopbarCenter, GTopbarEnd, GIconButton, GIcon],
  template: `
    <p class="demo-caption">Đủ 3 slot: start, center, end.</p>
    <g-topbar>
      <div gTopbarStart class="brand">OpenDesign</div>
      <nav gTopbarCenter aria-label="Điều hướng demo" class="links">
        <a href="#">Tài liệu</a>
        <a href="#">Blog</a>
      </nav>
      <div gTopbarEnd>
        <button g-icon-button aria-label="Thông báo">
          <g-icon [icon]="iconBell" />
        </button>
      </div>
    </g-topbar>

    <p class="demo-caption">Biến thể thiếu slot center: end vẫn nằm sát phải.</p>
    <g-topbar>
      <div gTopbarStart class="brand">OpenDesign</div>
      <div gTopbarEnd>
        <button g-icon-button aria-label="Thông báo">
          <g-icon [icon]="iconBell" />
        </button>
      </div>
    </g-topbar>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .demo-caption {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
    .brand {
      font-weight: 500;
    }
    .links {
      display: flex;
      gap: var(--g-space-4);
    }
    .links a {
      color: var(--g-text-muted);
      text-decoration: none;
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarBasicDemo {
  protected readonly iconBell = iconBell;
}
