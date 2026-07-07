import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoSection } from '../../shared/demo-section';
import { TokenRow, TokenTable } from '../../shared/token-table';

@Component({
  imports: [TokenTable, DemoSection],
  template: `
    <h1>Typography</h1>
    <p>
      OpenDesign dùng <b>system font stack</b> — không tải font ngoài, không có
      flash-of-unstyled-text, và render tiếng Việt (dấu, thanh điệu) tốt trên mọi hệ điều hành bằng
      đúng font mặc định của máy người dùng.
    </p>

    <docs-demo-section>
      <div class="type-scale">
        <p style="font-size: var(--g-font-size-xs)">
          Cỡ xs (12px) — Sương mù trên đỉnh núi tan dần lúc bình minh.
        </p>
        <p style="font-size: var(--g-font-size-sm)">
          Cỡ sm (13px) — Sương mù trên đỉnh núi tan dần lúc bình minh.
        </p>
        <p style="font-size: var(--g-font-size-md)">
          Cỡ md (14px) — Sương mù trên đỉnh núi tan dần lúc bình minh.
        </p>
        <p style="font-size: var(--g-font-size-lg)">
          Cỡ lg (16px) — Sương mù trên đỉnh núi tan dần lúc bình minh.
        </p>
      </div>
    </docs-demo-section>

    <h2>Token</h2>
    <docs-token-table [rows]="rows" />

    <h2>Dùng ở đâu</h2>
    <ul>
      <li><code>--g-font-size-xs</code>/<code>sm</code>: chữ phụ, nhãn, timestamp.</li>
      <li><code>--g-font-size-md</code>: cỡ mặc định cho control (input, button) và nội dung.</li>
      <li><code>--g-font-size-lg</code>: tiêu đề nhỏ, tagline.</li>
    </ul>
  `,
  styles: `
    .type-scale {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .type-scale p {
      margin: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TypographyPage {
  protected readonly rows: TokenRow[] = [
    {
      name: '--g-font-family',
      value: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
      description: 'System font stack — không tải font ngoài.',
    },
    { name: '--g-font-size-xs', value: '12px', description: 'Cỡ chữ nhỏ nhất.' },
    { name: '--g-font-size-sm', value: '13px', description: 'Cỡ chữ phụ.' },
    { name: '--g-font-size-md', value: '14px', description: 'Cỡ chữ mặc định.' },
    { name: '--g-font-size-lg', value: '16px', description: 'Cỡ chữ lớn nhất.' },
  ];
}
