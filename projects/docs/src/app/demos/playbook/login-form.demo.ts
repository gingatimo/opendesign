import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GButton, GCard, GCardHeader, GCheckbox, GInput, GLocaleService } from 'ngx-opendesign';
import { playbookCopyFor } from '../../pages/playbook/playbook-copy';

@Component({
  selector: 'docs-login-form-demo',
  imports: [GCard, GCardHeader, GInput, GCheckbox, GButton, ReactiveFormsModule],
  template: `
    <g-card class="login-form-demo__card">
      <div gCardHeader>{{ copy().cardTitle }}</div>
      <form [formGroup]="form" (ngSubmit)="submit()" class="login-form-demo__form">
        <label class="login-form-demo__field">
          <span class="login-form-demo__label">{{ copy().email }}</span>
          <input
            gInput
            type="email"
            formControlName="email"
            [placeholder]="copy().emailPlaceholder"
          />
          @if (form.controls.email.invalid && form.controls.email.touched) {
            <span class="login-form-demo__error">
              @if (form.controls.email.hasError('required')) {
                {{ copy().requiredEmail }}
              } @else {
                {{ copy().invalidEmail }}
              }
            </span>
          }
        </label>

        <label class="login-form-demo__field">
          <span class="login-form-demo__label">{{ copy().password }}</span>
          <input gInput type="password" formControlName="password" placeholder="••••••••" />
          @if (form.controls.password.invalid && form.controls.password.touched) {
            <span class="login-form-demo__error">{{ copy().requiredPassword }}</span>
          }
        </label>

        <g-checkbox formControlName="remember">{{ copy().remember }}</g-checkbox>

        <button g-button type="submit" [loading]="submitting()">
          {{ submitting() ? copy().submitting : copy().submit }}
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
  private readonly i18n = inject(GLocaleService);

  protected readonly copy = computed(() => playbookCopyFor(this.i18n.tag()).login);
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
    // Simulate an API call so the loading button state is visible and prevents double submit.
    setTimeout(() => this.submitting.set(false), 1200);
  }
}
