import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GTimeline, GTimelineItem } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

@Component({
  selector: 'docs-timeline-basic-demo',
  imports: [GTimeline, GTimelineItem],
  template: `
    <g-timeline>
      <g-timeline-item status="success">
        <strong>{{ demo().placedTitle }}</strong>
        <p>{{ demo().placedBody }}</p>
      </g-timeline-item>
      <g-timeline-item status="success">
        <strong>{{ demo().packedTitle }}</strong>
        <p>{{ demo().packedBody }}</p>
      </g-timeline-item>
      <g-timeline-item status="warning">
        <strong>{{ demo().delayedTitle }}</strong>
        <p>{{ demo().delayedBody }}</p>
      </g-timeline-item>
      <g-timeline-item>
        <strong>{{ demo().waitingTitle }}</strong>
        <p>{{ demo().waitingBody }}</p>
      </g-timeline-item>
    </g-timeline>
  `,
  styles: `
    :host {
      display: block;
      max-width: 420px;
    }
    strong {
      display: block;
      margin-bottom: var(--g-space-1);
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => displayCopyFor(this.i18n.tag()).timeline.demo);
}
