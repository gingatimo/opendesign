import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GToggle } from 'ngx-opendesign';

@Component({
  selector: 'docs-toggle-basic-demo',
  imports: [GToggle, ReactiveFormsModule],
  template: `<g-toggle [formControl]="enabled" aria-label="Bật thông báo"></g-toggle>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleBasicDemo {
  protected readonly enabled = new FormControl(false, { nonNullable: true });
}
