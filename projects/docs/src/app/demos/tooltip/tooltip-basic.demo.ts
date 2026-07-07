import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GButton, GIconButton, GTooltip } from 'ngx-opendesign';

@Component({
  selector: 'docs-tooltip-basic-demo',
  imports: [GTooltip, GButton, GIconButton],
  template: `
    <button g-button variant="outline" gTooltip="Lưu tài liệu hiện tại">Lưu</button>
    <button g-button variant="outline" gTooltip="Ở phía dưới" gTooltipPosition="bottom">
      Dưới
    </button>
    <button g-icon-button aria-label="Cài đặt" gTooltip="Mở cài đặt">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path
          d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"
        />
      </svg>
    </button>
  `,
  styles: `
    :host {
      display: flex;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipBasicDemo {}
