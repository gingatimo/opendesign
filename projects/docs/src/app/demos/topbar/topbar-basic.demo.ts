import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GIconButton, GTopbar, GTopbarCenter, GTopbarEnd, GTopbarStart } from 'ngx-opendesign';

@Component({
  selector: 'docs-topbar-basic-demo',
  imports: [GTopbar, GTopbarStart, GTopbarCenter, GTopbarEnd, GIconButton],
  template: `
    <p class="demo-caption">Đủ 3 slot: start, center, end.</p>
    <g-topbar>
      <div gTopbarStart class="brand">OpenDesign</div>
      <nav gTopbarCenter aria-label="Điều hướng demo" class="links">
        <a href="#">Tài liệu</a>
        <a href="#">Blog</a>
      </nav>
      <div gTopbarEnd>
        <button g-icon-button aria-label="Thông báo">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </button>
      </div>
    </g-topbar>

    <p class="demo-caption">Biến thể thiếu slot center: end vẫn nằm sát phải.</p>
    <g-topbar>
      <div gTopbarStart class="brand">OpenDesign</div>
      <div gTopbarEnd>
        <button g-icon-button aria-label="Thông báo">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        </button>
      </div>
    </g-topbar>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .demo-caption {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
    .brand {
      font-weight: 500;
    }
    .links {
      display: flex;
      gap: var(--g-space-4);
    }
    .links a {
      color: var(--g-text-muted);
      text-decoration: none;
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopbarBasicDemo {}
