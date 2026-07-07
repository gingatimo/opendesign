import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GLink } from 'ngx-opendesign';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { IconButtonBasicDemo } from '../demos/icon-button/icon-button-basic.demo';

@Component({
  imports: [IconButtonBasicDemo, CodeBlock, ApiTable, DemoSection, RouterLink, GLink],
  template: `
    <h1>Icon Button</h1>
    <p>
      Nút tròn chỉ chứa icon, chiếu vào qua <code>&lt;ng-content&gt;</code> — dùng SVG tự viết (như
      demo dưới) hoặc <code>&lt;g-icon&gt;</code> từ
      <a gLink routerLink="/components/icon">icon set có sẵn</a> của OpenDesign.
    </p>

    <docs-demo-section>
      <docs-icon-button-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/icon-button/icon-button-basic.demo.ts" />

    <h2>API — GIconButton</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Bắt buộc có <code>aria-label</code> hoặc <code>aria-labelledby</code> — thiếu sẽ có cảnh báo
        console ở dev mode.
      </li>
      <li>Icon SVG bên trong nên đặt <code>aria-hidden="true"</code>.</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconButtonPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'variant',
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'",
      default: "'ghost'",
      description: 'Kiểu hiển thị của nút.',
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Cỡ nút (vuông, bo tròn 50%).',
    },
  ];
}
