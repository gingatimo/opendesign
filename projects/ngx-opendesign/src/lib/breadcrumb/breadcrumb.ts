import { ChangeDetectionStrategy, Component } from '@angular/core';

// Đường dẫn phân cấp. Đặt trên <nav> để có landmark điều hướng — consumer thêm aria-label="Breadcrumb".
// Style (kể cả dấu phân cách › giữa các mục) ở opendesign.scss GLOBAL vì dấu phân cách cần quan hệ
// anh-em (:not(:first-child)) của các mục CHIẾU VÀO, không style được từ scss scoped của component này.
@Component({
  selector: 'nav[g-breadcrumb]',
  template: `<ng-content />`,
  host: { class: 'g-breadcrumb' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GBreadcrumb {}

// Một mắt xích: <a g-breadcrumb-item routerLink> cho mục có link, <span g-breadcrumb-item
// aria-current="page"> cho mục hiện tại (không link).
@Component({
  selector: 'a[g-breadcrumb-item], span[g-breadcrumb-item]',
  template: `<ng-content />`,
  host: { class: 'g-breadcrumb-item' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GBreadcrumbItem {}
