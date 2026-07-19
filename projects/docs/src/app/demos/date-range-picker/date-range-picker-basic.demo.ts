import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GDateRange, GDateRangePicker } from 'ngx-opendesign';

function fmt(d: Date | null): string {
  if (!d) return '…';
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

@Component({
  selector: 'docs-date-range-picker-basic-demo',
  imports: [GDateRangePicker],
  template: `
    <g-date-range-picker [(value)]="range" />
    <p>{{ label() }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangePickerBasicDemo {
  protected readonly range = signal<GDateRange>({ start: null, end: null });
  protected readonly label = computed(() => {
    const { start, end } = this.range();
    if (!start && !end) return 'Chưa chọn khoảng';
    return `Từ ${fmt(start)} đến ${fmt(end)}`;
  });
}
