import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GDivider } from 'ngx-opendesign';

@Component({
  selector: 'docs-divider-basic-demo',
  imports: [GDivider],
  template: `
    <p>Đoạn nội dung phía trên.</p>
    <g-divider />
    <p>Đoạn nội dung phía dưới.</p>

    <g-divider>HOẶC</g-divider>

    <div class="row">
      <span>Mục A</span>
      <g-divider orientation="vertical" />
      <span>Mục B</span>
      <g-divider orientation="vertical" />
      <span>Mục C</span>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
    }
    p {
      margin: 0;
    }
    .row {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
      height: 24px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerBasicDemo {}
