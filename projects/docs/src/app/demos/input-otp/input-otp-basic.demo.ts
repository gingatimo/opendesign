import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GInputOtp } from 'ngx-opendesign';

@Component({
  selector: 'docs-input-otp-basic-demo',
  imports: [GInputOtp, ReactiveFormsModule],
  template: `
    <g-input-otp [formControl]="code" [length]="6" integerOnly />
    <p>Mã đã nhập: {{ code.value || 'chưa nhập' }}</p>
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
export class InputOtpBasicDemo {
  protected readonly code = new FormControl('', { nonNullable: true });
}
