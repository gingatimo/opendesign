import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GBreadcrumb, GBreadcrumbItem } from 'ngx-opendesign';

@Component({
  selector: 'docs-breadcrumb-basic-demo',
  imports: [GBreadcrumb, GBreadcrumbItem],
  template: `
    <nav g-breadcrumb aria-label="Breadcrumb">
      <a g-breadcrumb-item href="#">Trang chủ</a>
      <a g-breadcrumb-item href="#">Sản phẩm</a>
      <a g-breadcrumb-item href="#">Điện thoại</a>
      <span g-breadcrumb-item aria-current="page">iPhone 17</span>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbBasicDemo {}
