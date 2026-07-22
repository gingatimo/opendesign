import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GDatepicker, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-datepicker-basic-demo',
  imports: [GDatepicker],
  template: `
    <g-datepicker [(value)]="date" />
    <p>{{ demo().selected(date() ? label() : null) }}</p>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).datepicker.demo);
  protected readonly date = signal<Date | null>(null);
  protected label(): string {
    const d = this.date()!;
    return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  }
}
