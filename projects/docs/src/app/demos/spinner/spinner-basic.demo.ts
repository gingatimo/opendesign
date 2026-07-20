import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GSpinner } from 'ngx-opendesign';

@Component({
  selector: 'docs-spinner-basic-demo',
  imports: [GSpinner],
  template: `
    <g-spinner size="sm" />
    <g-spinner />
    <g-spinner size="lg" />
    <g-spinner size="xl" />
    <g-spinner size="2xl" aria-label="Đang tải danh sách sản phẩm" />
  `,
  styles: `
    :host {
      display: flex;
      gap: var(--g-space-4);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerBasicDemo {}
