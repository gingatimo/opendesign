import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GTimePicker } from 'ngx-opendesign';

@Component({
  selector: 'docs-time-picker-basic-demo',
  imports: [GTimePicker],
  template: `
    <g-timepicker [(value)]="time" [minuteStep]="5" />
    <p>Đã chọn: {{ time() ?? 'chưa chọn' }}</p>
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
export class TimePickerBasicDemo {
  protected readonly time = signal<string | null>(null);
}
