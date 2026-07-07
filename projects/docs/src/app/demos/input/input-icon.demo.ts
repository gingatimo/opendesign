import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
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

@Component({
  selector: 'docs-input-icon-demo',
  imports: [GInputGroup, GInputPrefix, GInputSuffix, GInput, GIcon, GIconButton],
  template: `
    <g-input-group>
      <g-icon gInputPrefix [icon]="search" />
      <input gInput placeholder="Tìm kiếm" />
    </g-input-group>

    <g-input-group>
      <input gInput [type]="anMatKhau() ? 'password' : 'text'" placeholder="Mật khẩu" />
      <button
        type="button"
        g-icon-button
        gInputSuffix
        size="sm"
        [attr.aria-label]="anMatKhau() ? 'Hiện mật khẩu' : 'Ẩn mật khẩu'"
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
  protected readonly search = gIconSearch;
  protected readonly gIconEye = gIconEye;
  protected readonly gIconEyeOff = gIconEyeOff;
  protected readonly anMatKhau = signal(true);
}
