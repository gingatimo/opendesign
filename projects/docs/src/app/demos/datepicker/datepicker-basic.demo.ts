import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GDatepicker } from 'ngx-opendesign';

@Component({
  selector: 'docs-datepicker-basic-demo',
  imports: [GDatepicker],
  template: `
    <g-datepicker [(value)]="date" />
    <p>Đã chọn: {{ date() ? label() : 'chưa chọn' }}</p>
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
export class DatepickerBasicDemo {
  protected readonly date = signal<Date | null>(null);
  protected label(): string {
    const d = this.date()!;
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }
}
