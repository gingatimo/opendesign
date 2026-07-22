import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GLocaleService, GTimePicker } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-time-picker-basic-demo',
  imports: [GTimePicker],
  template: `
    <g-timepicker [(value)]="time" [minuteStep]="5" />
    <p>{{ demo().selected(time()) }}</p>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).timePicker.demo);
  protected readonly time = signal<string | null>(null);
}
