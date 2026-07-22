import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GLocaleService, GRadio, GRadioGroup } from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-radio-basic-demo',
  imports: [GRadioGroup, GRadio, ReactiveFormsModule],
  template: `
    <g-radio-group [formControl]="plan">
      <g-radio value="free">{{ demo().free }}</g-radio>
      <g-radio value="pro">{{ demo().pro }}</g-radio>
      <g-radio value="team">{{ demo().team }}</g-radio>
    </g-radio-group>
  `,
  styles: `
    :host {
      display: block;
    }
    g-radio-group {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).radio.demo);
  protected readonly plan = new FormControl<string | null>('free');
}
