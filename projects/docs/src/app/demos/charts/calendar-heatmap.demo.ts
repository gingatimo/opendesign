import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GButton, GCalendarHeatmap, GLocaleService, GWeekStart } from 'ngx-opendesign';
import { chartsCopyFor } from '../../pages/charts-copy';

@Component({
  selector: 'docs-calendar-heatmap-demo',
  imports: [GCalendarHeatmap, GButton],
  template: `
    <g-calendar-heatmap
      [exportable]="true"
      [zoomable]="true"
      [title]="copy().title"
      [data]="copy().data"
      [from]="from"
      [to]="to"
      [unit]="copy().unit"
      [weekStart]="weekStart()"
    />
    <div class="ch-demo__opts">
      <span>{{ copy().weekStartsOn }}</span>
      <button
        g-button
        size="sm"
        [variant]="weekStart() === 'sunday' ? 'primary' : 'outline'"
        (click)="weekStart.set('sunday')"
      >
        {{ copy().sunday }}
      </button>
      <button
        g-button
        size="sm"
        [variant]="weekStart() === 'monday' ? 'primary' : 'outline'"
        (click)="weekStart.set('monday')"
      >
        {{ copy().monday }}
      </button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .ch-demo__opts {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
      margin-top: var(--g-space-4);
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeatmapDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => chartsCopyFor(this.i18n.tag()).calendarHeatmap.demo);
  protected readonly weekStart = signal<GWeekStart>('sunday');
  protected readonly to = new Date(2026, 6, 21);
  protected readonly from = new Date(2025, 6, 22);
}
