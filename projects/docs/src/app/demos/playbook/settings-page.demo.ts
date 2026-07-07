import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  GButton,
  GCard,
  GCardFooter,
  GCardHeader,
  GOption,
  GRadio,
  GRadioGroup,
  GSelect,
  GToastService,
  GToggle,
} from 'ngx-opendesign';

@Component({
  selector: 'docs-settings-page-demo',
  imports: [
    GCard,
    GCardHeader,
    GCardFooter,
    GToggle,
    GRadioGroup,
    GRadio,
    GSelect,
    GOption,
    GButton,
    ReactiveFormsModule,
  ],
  template: `
    <g-card class="settings-page-demo__card">
      <div gCardHeader>Cài đặt tài khoản</div>

      <form [formGroup]="form" class="settings-page-demo__form">
        <div class="settings-page-demo__row">
          <span>Thông báo qua email</span>
          <g-toggle formControlName="emailNotifications" aria-label="Thông báo qua email" />
        </div>
        <div class="settings-page-demo__row">
          <span>Hồ sơ riêng tư</span>
          <g-toggle formControlName="privateProfile" aria-label="Hồ sơ riêng tư" />
        </div>

        <div class="settings-page-demo__field">
          <span class="settings-page-demo__label">Gói sử dụng</span>
          <g-radio-group formControlName="plan">
            <g-radio value="free">Miễn phí</g-radio>
            <g-radio value="pro">Pro</g-radio>
            <g-radio value="team">Team</g-radio>
          </g-radio-group>
        </div>

        <div class="settings-page-demo__field">
          <span class="settings-page-demo__label">Ngôn ngữ</span>
          <g-select formControlName="language" placeholder="Chọn ngôn ngữ">
            <g-option value="vi">Tiếng Việt</g-option>
            <g-option value="en">English</g-option>
            <g-option value="ja">日本語</g-option>
          </g-select>
        </div>
      </form>

      <div gCardFooter class="settings-page-demo__footer">
        <button g-button (click)="save()">Lưu thay đổi</button>
      </div>
    </g-card>
  `,
  styles: `
    .settings-page-demo__card {
      max-width: 380px;
    }
    .settings-page-demo__form {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-5);
    }
    .settings-page-demo__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--g-space-4);
    }
    .settings-page-demo__field {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
    .settings-page-demo__label {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .settings-page-demo__footer {
      display: flex;
      justify-content: flex-end;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageDemo {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(GToastService);

  protected readonly form = this.fb.nonNullable.group({
    emailNotifications: [true],
    privateProfile: [false],
    plan: ['pro'],
    language: ['vi'],
  });

  protected save(): void {
    this.toast.show({ message: 'Đã lưu cài đặt.', variant: 'success' });
  }
}
