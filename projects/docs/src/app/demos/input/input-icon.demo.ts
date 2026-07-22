import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  GLocaleService,
  GIcon,
  GIconButton,
  GInput,
  GInputGroup,
  GInputPrefix,
  GInputSuffix,
  gIconEye,
  gIconEyeOff,
  gIconSearch,
} from 'ngx-opendesign';
import { formCopyFor } from '../../pages/form-copy';

@Component({
  selector: 'docs-input-icon-demo',
  imports: [GInputGroup, GInputPrefix, GInputSuffix, GInput, GIcon, GIconButton],
  template: `
    <g-input-group>
      <g-icon gInputPrefix [icon]="search" />
      <input gInput [placeholder]="demo().search" />
    </g-input-group>

    <g-input-group>
      <input gInput [type]="anMatKhau() ? 'password' : 'text'" [placeholder]="demo().password" />
      <button
        type="button"
        g-icon-button
        gInputSuffix
        size="sm"
        [attr.aria-label]="anMatKhau() ? demo().showPassword : demo().hidePassword"
        (click)="anMatKhau.set(!anMatKhau())"
      >
        <g-icon [icon]="anMatKhau() ? gIconEye : gIconEyeOff" />
      </button>
    </g-input-group>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 320px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputIconDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => formCopyFor(this.i18n.tag()).input.demo);
  protected readonly search = gIconSearch;
  protected readonly gIconEye = gIconEye;
  protected readonly gIconEyeOff = gIconEyeOff;
  protected readonly anMatKhau = signal(true);
}
