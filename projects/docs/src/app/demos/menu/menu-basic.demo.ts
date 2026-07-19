import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GMenu, GMenuItem, GSubmenu } from 'ngx-opendesign';

@Component({
  selector: 'docs-menu-basic-demo',
  imports: [GMenu, GMenuItem, GSubmenu],
  template: `
    <div>
      <h4>Dọc — mở/gập (accordion)</h4>
      <g-menu class="demo-menu-vertical">
        <a g-menu-item href="#">Tổng quan</a>
        <g-submenu label="Cài đặt">
          <a g-menu-item href="#">Hồ sơ</a>
          <a g-menu-item href="#">Bảo mật</a>
          <g-submenu label="Nâng cao">
            <a g-menu-item href="#">API keys</a>
            <a g-menu-item href="#">Webhooks</a>
          </g-submenu>
        </g-submenu>
        <a g-menu-item href="#">Trợ giúp</a>
      </g-menu>
    </div>

    <div>
      <h4>Ngang — dropdown</h4>
      <g-menu orientation="horizontal">
        <a g-menu-item href="#">Trang chủ</a>
        <g-submenu label="Sản phẩm">
          <a g-menu-item href="#">Điện thoại</a>
          <a g-menu-item href="#">Máy tính</a>
          <a g-menu-item href="#">Phụ kiện</a>
        </g-submenu>
        <g-submenu label="Hỗ trợ">
          <a g-menu-item href="#">Liên hệ</a>
          <a g-menu-item href="#">Tài liệu</a>
        </g-submenu>
      </g-menu>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-5);
    }
    h4 {
      margin: 0 0 var(--g-space-2);
    }
    .demo-menu-vertical {
      max-width: 260px;
      padding: var(--g-space-2);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBasicDemo {}
