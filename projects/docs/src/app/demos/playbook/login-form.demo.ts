import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GButton, GCard, GCardHeader, GCheckbox, GInput } from 'ngx-opendesign';

@Component({
  selector: 'docs-login-form-demo',
  imports: [GCard, GCardHeader, GInput, GCheckbox, GButton, ReactiveFormsModule],
  template: `
    <g-card class="login-form-demo__card">
      <div gCardHeader>Đăng nhập</div>
      <form [formGroup]="form" (ngSubmit)="submit()" class="login-form-demo__form">
        <label class="login-form-demo__field">
          <span class="login-form-demo__label">Email</span>
          <input gInput type="email" formControlName="email" placeholder="ban@vidu.com" />
          @if (form.controls.email.invalid && form.controls.email.touched) {
            <span class="login-form-demo__error">
              @if (form.controls.email.hasError('required')) {
                Vui lòng nhập email.
              } @else {
                Email không đúng định dạng.
              }
            </span>
          }
        </label>

        <label class="login-form-demo__field">
          <span class="login-form-demo__label">Mật khẩu</span>
          <input gInput type="password" formControlName="password" placeholder="••••••••" />
          @if (form.controls.password.invalid && form.controls.password.touched) {
            <span class="login-form-demo__error">Vui lòng nhập mật khẩu.</span>
          }
        </label>

        <g-checkbox formControlName="remember">Ghi nhớ đăng nhập</g-checkbox>

        <button g-button type="submit" [loading]="submitting()">
          {{ submitting() ? 'Đang đăng nhập…' : 'Đăng nhập' }}
        </button>
      </form>
    </g-card>
  `,
  styles: `
    .login-form-demo__card {
      max-width: 360px;
    }
    .login-form-demo__form {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-4);
    }
    .login-form-demo__field {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-1);
    }
    .login-form-demo__label {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .login-form-demo__error {
      font-size: var(--g-font-size-xs);
      color: var(--g-danger-text);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormDemo {
  private readonly fb = inject(FormBuilder);

  protected readonly submitting = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    // Giả lập gọi API — minh họa trạng thái loading thật của GButton (chặn double-submit).
    setTimeout(() => this.submitting.set(false), 1200);
  }
}
