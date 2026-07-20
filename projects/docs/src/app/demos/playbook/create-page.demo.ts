import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  GButton,
  GCard,
  GCardFooter,
  GCardHeader,
  GCheckbox,
  GChips,
  GDatepicker,
  GFileInput,
  GIcon,
  GImagePreview,
  GInput,
  GInputGroup,
  GInputPrefix,
  GOption,
  GRadio,
  GRadioGroup,
  GSelect,
  GSlider,
  GTextarea,
  GToastService,
  GToggle,
  gIconUser,
} from 'ngx-opendesign';

@Component({
  selector: 'docs-create-page-demo',
  imports: [
    GCard,
    GCardHeader,
    GCardFooter,
    GInput,
    GInputGroup,
    GInputPrefix,
    GIcon,
    GTextarea,
    GSelect,
    GOption,
    GRadioGroup,
    GRadio,
    GCheckbox,
    GToggle,
    GChips,
    GDatepicker,
    GSlider,
    GFileInput,
    GImagePreview,
    GButton,
    ReactiveFormsModule,
  ],
  template: `
    <g-card class="create-demo__card">
      <div gCardHeader>Thêm nhân viên mới</div>

      <form [formGroup]="form" class="create-demo__form">
        <div class="create-demo__field">
          <span class="create-demo__label">Ảnh đại diện</span>
          <g-file-input
            [(files)]="avatar"
            accept="image/*"
            [multiple]="false"
            [showFileList]="false"
          />
          @if (avatar().length) {
            <g-image-preview [images]="avatar()" [removable]="true" (remove)="clearAvatar()" />
          }
        </div>

        <label class="create-demo__field">
          <span class="create-demo__label">Họ tên <span class="create-demo__req">*</span></span>
          <g-input-group>
            <g-icon gInputPrefix [icon]="iconUser" size="sm" />
            <input gInput type="text" formControlName="name" placeholder="Nguyễn Văn A" />
          </g-input-group>
          @if (invalid('name')) {
            <span class="create-demo__error">Vui lòng nhập họ tên.</span>
          }
        </label>

        <label class="create-demo__field">
          <span class="create-demo__label">Email <span class="create-demo__req">*</span></span>
          <input gInput type="email" formControlName="email" placeholder="ban@vidu.com" />
          @if (invalid('email')) {
            <span class="create-demo__error">
              @if (form.controls.email.hasError('required')) {
                Vui lòng nhập email.
              } @else {
                Email không đúng định dạng.
              }
            </span>
          }
        </label>

        <div class="create-demo__field">
          <span class="create-demo__label">Phòng ban <span class="create-demo__req">*</span></span>
          <g-select
            formControlName="department"
            placeholder="Chọn phòng ban"
            aria-label="Phòng ban"
          >
            <g-option value="engineering">Kỹ thuật</g-option>
            <g-option value="design">Thiết kế</g-option>
            <g-option value="sales">Kinh doanh</g-option>
            <g-option value="ops">Vận hành</g-option>
          </g-select>
          @if (invalid('department')) {
            <span class="create-demo__error">Vui lòng chọn phòng ban.</span>
          }
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label">Loại hợp đồng</span>
          <g-radio-group formControlName="type" aria-label="Loại hợp đồng">
            <g-radio value="fulltime">Chính thức</g-radio>
            <g-radio value="probation">Thử việc</g-radio>
            <g-radio value="contractor">Cộng tác</g-radio>
          </g-radio-group>
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label"
            >Ngày vào làm <span class="create-demo__req">*</span></span
          >
          <g-datepicker [(value)]="startDate" aria-label="Ngày vào làm" />
          @if (triedSubmit() && !startDate()) {
            <span class="create-demo__error">Vui lòng chọn ngày vào làm.</span>
          }
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label">Hạn mức truy cập</span>
          <div class="create-demo__slider-row">
            <g-slider [(value)]="quota" min="0" max="100" step="5" ariaLabel="Hạn mức truy cập" />
            <span class="create-demo__slider-value">{{ quota() }}%</span>
          </div>
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label">Kỹ năng / thẻ</span>
          <g-chips formControlName="tags" placeholder="Nhập rồi Enter" />
        </div>

        <label class="create-demo__field">
          <span class="create-demo__label">Ghi chú</span>
          <textarea
            gTextarea
            formControlName="notes"
            placeholder="Thông tin thêm về nhân viên…"
          ></textarea>
        </label>

        <div class="create-demo__row">
          <span>Kích hoạt tài khoản ngay</span>
          <g-toggle formControlName="active" aria-label="Kích hoạt tài khoản ngay" />
        </div>

        <div class="create-demo__field">
          <g-checkbox formControlName="agree">Tôi xác nhận thông tin là chính xác</g-checkbox>
          @if (invalid('agree')) {
            <span class="create-demo__error">Cần xác nhận trước khi lưu.</span>
          }
        </div>
      </form>

      <div gCardFooter class="create-demo__footer">
        <button g-button variant="outline" type="button" (click)="reset()">Đặt lại</button>
        <button g-button type="button" (click)="submit()">Lưu nhân viên</button>
      </div>
    </g-card>
  `,
  styles: `
    .create-demo__card {
      max-width: 480px;
    }
    .create-demo__form {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-5);
    }
    .create-demo__field {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
    }
    .create-demo__label {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .create-demo__req {
      color: var(--g-danger-text);
    }
    .create-demo__error {
      font-size: var(--g-font-size-xs);
      color: var(--g-danger-text);
    }
    .create-demo__slider-row {
      display: flex;
      align-items: center;
      gap: var(--g-space-4);
    }
    .create-demo__slider-row g-slider {
      flex: 1;
    }
    .create-demo__slider-value {
      flex: none;
      min-width: 48px;
      font-variant-numeric: tabular-nums;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .create-demo__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--g-space-4);
    }
    .create-demo__footer {
      display: flex;
      justify-content: flex-end;
      gap: var(--g-space-2);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageDemo {
  private readonly fb = inject(FormBuilder);
  private readonly toast = inject(GToastService);

  protected readonly iconUser = gIconUser;

  // Datepicker và Slider dùng model [(value)] (không phải CVA), nên giữ ngoài form group rồi gộp
  // lúc submit — vẫn là một màn "tạo bản ghi" hoàn chỉnh.
  protected readonly startDate = signal<Date | null>(null);
  protected readonly quota = signal(50);
  protected readonly avatar = signal<File[]>([]);
  protected readonly triedSubmit = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    type: ['fulltime'],
    tags: [[] as string[]],
    notes: [''],
    active: [true],
    agree: [false, Validators.requiredTrue],
  });

  // Lỗi chỉ hiện khi control invalid VÀ (đã touched HOẶC đã bấm lưu) — tránh la mắng khi form còn trống.
  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.triedSubmit());
  }

  protected submit(): void {
    this.triedSubmit.set(true);
    const ok = this.form.valid && this.startDate() !== null;
    if (!ok) {
      this.form.markAllAsTouched();
      this.toast.show({ message: 'Vui lòng kiểm tra lại các trường bắt buộc.', variant: 'danger' });
      return;
    }
    this.toast.show({
      message: `Đã lưu nhân viên "${this.form.controls.name.value}".`,
      variant: 'success',
    });
  }

  protected reset(): void {
    this.form.reset({ type: 'fulltime', tags: [], active: true });
    this.startDate.set(null);
    this.quota.set(50);
    this.avatar.set([]);
    this.triedSubmit.set(false);
  }

  protected clearAvatar(): void {
    this.avatar.set([]);
  }
}
