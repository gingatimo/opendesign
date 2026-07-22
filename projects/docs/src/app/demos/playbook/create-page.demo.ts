import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
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
  GLocaleService,
  gIconUser,
} from 'ngx-opendesign';
import { playbookCopyFor } from '../../pages/playbook/playbook-copy';

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
      <div gCardHeader>{{ copy().cardTitle }}</div>

      <form [formGroup]="form" class="create-demo__form">
        <div class="create-demo__field">
          <span class="create-demo__label">{{ copy().avatar }}</span>
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
          <span class="create-demo__label"
            >{{ copy().fullName }} <span class="create-demo__req">*</span></span
          >
          <g-input-group>
            <g-icon gInputPrefix [icon]="iconUser" size="sm" />
            <input
              gInput
              type="text"
              formControlName="name"
              [placeholder]="copy().namePlaceholder"
            />
          </g-input-group>
          @if (invalid('name')) {
            <span class="create-demo__error">{{ copy().requiredName }}</span>
          }
        </label>

        <label class="create-demo__field">
          <span class="create-demo__label"
            >{{ copy().email }} <span class="create-demo__req">*</span></span
          >
          <input
            gInput
            type="email"
            formControlName="email"
            [placeholder]="copy().emailPlaceholder"
          />
          @if (invalid('email')) {
            <span class="create-demo__error">
              @if (form.controls.email.hasError('required')) {
                {{ copy().requiredEmail }}
              } @else {
                {{ copy().invalidEmail }}
              }
            </span>
          }
        </label>

        <div class="create-demo__field">
          <span class="create-demo__label"
            >{{ copy().department }} <span class="create-demo__req">*</span></span
          >
          <g-select
            formControlName="department"
            [placeholder]="copy().departmentPlaceholder"
            [attr.aria-label]="copy().department"
          >
            @for (department of copy().departments; track department.value) {
              <g-option [value]="department.value">{{ department.label }}</g-option>
            }
          </g-select>
          @if (invalid('department')) {
            <span class="create-demo__error">{{ copy().requiredDepartment }}</span>
          }
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label">{{ copy().contractType }}</span>
          <g-radio-group formControlName="type" [attr.aria-label]="copy().contractType">
            @for (type of copy().contractTypes; track type.value) {
              <g-radio [value]="type.value">{{ type.label }}</g-radio>
            }
          </g-radio-group>
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label"
            >{{ copy().startDate }} <span class="create-demo__req">*</span></span
          >
          <g-datepicker formControlName="startDate" [attr.aria-label]="copy().startDate" />
          @if (invalid('startDate')) {
            <span class="create-demo__error">{{ copy().requiredStartDate }}</span>
          }
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label">{{ copy().accessQuota }}</span>
          <div class="create-demo__slider-row">
            <g-slider
              [(value)]="quota"
              min="0"
              max="100"
              step="5"
              [ariaLabel]="copy().accessQuota"
            />
            <span class="create-demo__slider-value">{{ quota() }}%</span>
          </div>
        </div>

        <div class="create-demo__field">
          <span class="create-demo__label">{{ copy().tags }}</span>
          <g-chips formControlName="tags" [placeholder]="copy().tagsPlaceholder" />
        </div>

        <label class="create-demo__field">
          <span class="create-demo__label">{{ copy().notes }}</span>
          <textarea
            gTextarea
            formControlName="notes"
            [placeholder]="copy().notesPlaceholder"
          ></textarea>
        </label>

        <div class="create-demo__row">
          <span>{{ copy().activateNow }}</span>
          <g-toggle formControlName="active" [attr.aria-label]="copy().activateNow" />
        </div>

        <div class="create-demo__field">
          <g-checkbox formControlName="agree">{{ copy().agree }}</g-checkbox>
          @if (invalid('agree')) {
            <span class="create-demo__error">{{ copy().requiredAgree }}</span>
          }
        </div>
      </form>

      <div gCardFooter class="create-demo__footer">
        <button g-button variant="outline" type="button" (click)="reset()">
          {{ copy().reset }}
        </button>
        <button g-button type="button" (click)="submit()">{{ copy().save }}</button>
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
  private readonly i18n = inject(GLocaleService);

  protected readonly copy = computed(() => playbookCopyFor(this.i18n.tag()).create);
  protected readonly iconUser = gIconUser;

  protected readonly quota = signal(50);
  protected readonly avatar = signal<File[]>([]);
  protected readonly triedSubmit = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    type: ['fulltime'],
    startDate: [null as Date | null, Validators.required],
    tags: [[] as string[]],
    notes: [''],
    active: [true],
    agree: [false, Validators.requiredTrue],
  });

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || this.triedSubmit());
  }

  protected submit(): void {
    this.triedSubmit.set(true);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show({ message: this.copy().invalidToast, variant: 'danger' });
      return;
    }
    this.toast.show({
      message: this.copy().savedToast(this.form.controls.name.value),
      variant: 'success',
    });
  }

  protected reset(): void {
    this.form.reset();
    this.quota.set(50);
    this.avatar.set([]);
    this.triedSubmit.set(false);
  }

  protected clearAvatar(): void {
    this.avatar.set([]);
  }
}
