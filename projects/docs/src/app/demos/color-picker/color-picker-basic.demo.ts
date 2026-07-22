import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GColorPicker, GLocaleService } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-color-picker-basic-demo',
  imports: [GColorPicker],
  template: `
    <g-color-picker [(value)]="color" />
    <p>
      {{ demo().selected(color()) }}
    </p>
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
export class ColorPickerBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).colorPicker.demo);
  protected readonly color = signal('#3b82f6');
}
