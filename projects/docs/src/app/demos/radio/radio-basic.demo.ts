import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GRadio, GRadioGroup } from 'ngx-opendesign';

@Component({
  selector: 'docs-radio-basic-demo',
  imports: [GRadioGroup, GRadio, ReactiveFormsModule],
  template: `
    <g-radio-group [formControl]="plan">
      <g-radio value="free">Miễn phí</g-radio>
      <g-radio value="pro">Pro</g-radio>
      <g-radio value="team">Team</g-radio>
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
  protected readonly plan = new FormControl<string | null>('free');
}
