import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GLocaleService, GToggle } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-toggle-basic-demo',
  imports: [GToggle, ReactiveFormsModule],
  template: `<g-toggle [formControl]="enabled" [attr.aria-label]="demo().label"></g-toggle>`,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).toggle.demo);
  protected readonly enabled = new FormControl(false, { nonNullable: true });
}
