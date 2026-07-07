import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoSection } from '../../shared/demo-section';
import { TokenRow, TokenTable } from '../../shared/token-table';

@Component({
  imports: [TokenTable, DemoSection],
  template: `
    <h1>Radius &amp; Spacing</h1>
    <p>
      Bo góc lớn là linh hồn thẩm mỹ của OpenDesign; spacing theo thang bậc 4px giữ nhịp đều trên
      toàn bộ giao diện.
    </p>

    <h2>Radius</h2>
    <docs-demo-section>
      <div class="radius-demo">
        <div class="radius-demo__box" style="border-radius: var(--g-radius-pill)">pill</div>
        <div class="radius-demo__box" style="border-radius: var(--g-radius-sm)">sm</div>
        <div class="radius-demo__box" style="border-radius: var(--g-radius-md)">md</div>
      </div>
    </docs-demo-section>
    <docs-token-table [rows]="radiusRows" />
    <p class="note">
      Nguyên tắc: <code>--g-radius-pill</code> cho control tương tác (button, input, chip, tab),
      <code>--g-radius-sm</code> cho bề mặt chứa nội dung (textarea, tooltip, card),
      <code>--g-radius-md</code>
      cho panel nổi (dialog, toast).
    </p>

    <h2>Control height</h2>
    <docs-token-table [rows]="controlRows" />

    <h2>Spacing</h2>
    <docs-demo-section>
      <div class="spacing-demo">
        @for (space of spacingRows; track space.name) {
          <div class="spacing-demo__row">
            <code class="spacing-demo__label">{{ space.name }}</code>
            <span class="spacing-demo__bar" [style.width]="space.value"></span>
            <span class="spacing-demo__value">{{ space.value }}</span>
          </div>
        }
      </div>
    </docs-demo-section>
    <docs-token-table [rows]="spacingRows" />

    <h2>Elevation &amp; Motion</h2>
    <docs-token-table [rows]="elevationMotionRows" />
  `,
  styles: `
    .radius-demo {
      display: flex;
      gap: var(--g-space-4);
    }
    .radius-demo__box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 96px;
      height: 64px;
      background: var(--g-secondary-bg);
      color: var(--g-text);
      font-size: var(--g-font-size-xs);
    }
    .spacing-demo {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
    .spacing-demo__row {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
    }
    .spacing-demo__label {
      width: 96px;
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
    }
    .spacing-demo__bar {
      display: block;
      height: var(--g-space-3);
      background: var(--g-primary);
      border-radius: var(--g-radius-sm);
    }
    .spacing-demo__value {
      font-size: var(--g-font-size-xs);
      color: var(--g-text-muted);
    }
    .note {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RadiusSpacingPage {
  protected readonly radiusRows: TokenRow[] = [
    {
      name: '--g-radius-pill',
      value: '9999px',
      description: 'Bo tròn hoàn toàn — control tương tác.',
    },
    { name: '--g-radius-sm', value: '8px', description: 'Bo góc nhỏ — bề mặt chứa nội dung.' },
    { name: '--g-radius-md', value: '12px', description: 'Bo góc vừa — panel nổi.' },
  ];

  protected readonly controlRows: TokenRow[] = [
    { name: '--g-control-sm', value: '32px', description: 'Chiều cao control nhỏ.' },
    { name: '--g-control-md', value: '40px', description: 'Chiều cao control mặc định.' },
    { name: '--g-control-lg', value: '48px', description: 'Chiều cao control lớn.' },
  ];

  protected readonly spacingRows: TokenRow[] = [
    { name: '--g-space-1', value: '4px', description: 'Bậc 1.' },
    { name: '--g-space-2', value: '8px', description: 'Bậc 2.' },
    { name: '--g-space-3', value: '12px', description: 'Bậc 3.' },
    { name: '--g-space-4', value: '16px', description: 'Bậc 4.' },
    { name: '--g-space-5', value: '20px', description: 'Bậc 5.' },
    { name: '--g-space-6', value: '24px', description: 'Bậc 6.' },
    { name: '--g-space-7', value: '32px', description: 'Bậc 7.' },
    { name: '--g-space-8', value: '40px', description: 'Bậc 8.' },
  ];

  protected readonly elevationMotionRows: TokenRow[] = [
    { name: '--g-shadow-sm', value: '0 1px 2px rgb(0 0 0 / 0.06)', description: 'Bóng đổ nhẹ.' },
    { name: '--g-shadow-md', value: '0 4px 12px rgb(0 0 0 / 0.1)', description: 'Bóng đổ vừa.' },
    {
      name: '--g-shadow-lg',
      value: '0 12px 32px rgb(0 0 0 / 0.16)',
      description: 'Bóng đổ mạnh — dialog.',
    },
    { name: '--g-duration-fast', value: '120ms', description: 'Thời lượng transition nhanh.' },
    { name: '--g-duration-base', value: '200ms', description: 'Thời lượng transition mặc định.' },
    { name: '--g-ease', value: 'cubic-bezier(0.2, 0, 0, 1)', description: 'Easing dùng chung.' },
    {
      name: '--g-focus-ring',
      value: '0 0 0 2px var(--g-bg), 0 0 0 4px var(--g-primary)',
      description:
        'box-shadow cho trạng thái :focus-visible. Mọi component đều dùng token này; gán trực tiếp nếu bạn tự làm control cần khớp theme.',
    },
  ];
}
