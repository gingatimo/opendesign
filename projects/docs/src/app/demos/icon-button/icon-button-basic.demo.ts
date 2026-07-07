import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GIconButton } from 'ngx-opendesign';

@Component({
  selector: 'docs-icon-button-basic-demo',
  imports: [GIconButton],
  template: `
    <button g-icon-button aria-label="Thêm mới">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </button>
    <button g-icon-button variant="primary" aria-label="Tìm kiếm">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </button>
    <button g-icon-button variant="outline" size="lg" aria-label="Đóng">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M18 6 6 18M6 6l12 12" />
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
export class IconButtonBasicDemo {}
