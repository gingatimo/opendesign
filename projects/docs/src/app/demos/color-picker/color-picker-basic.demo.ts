import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GColorPicker } from 'ngx-opendesign';

@Component({
  selector: 'docs-color-picker-basic-demo',
  imports: [GColorPicker],
  template: `
    <g-color-picker [(value)]="color" />
    <p>
      Đã chọn: <code>{{ color() }}</code>
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
  protected readonly color = signal('#3b82f6');
}
