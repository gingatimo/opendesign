import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GSkeleton } from 'ngx-opendesign';

@Component({
  selector: 'docs-skeleton-basic-demo',
  imports: [GSkeleton],
  template: `
    <div class="card">
      <g-skeleton variant="rectangular" height="120px" />
      <div class="row">
        <g-skeleton variant="circular" width="40px" height="40px" />
        <div class="grow">
          <g-skeleton variant="text" width="60%" />
          <g-skeleton variant="text" [lines]="2" />
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 320px;
    }
    .card {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      padding: var(--g-space-3);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
    }
    .row {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
    }
    .grow {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonBasicDemo {}
