import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GButton, GStep, GStepper } from 'ngx-opendesign';

@Component({
  selector: 'docs-stepper-basic-demo',
  imports: [GStepper, GStep, GButton],
  template: `
    <g-stepper [(activeStep)]="step">
      <g-step label="Thông tin">
        <p>Nhập thông tin cơ bản: họ tên, email, số điện thoại.</p>
      </g-step>
      <g-step label="Thanh toán">
        <p>Chọn phương thức thanh toán và nhập chi tiết.</p>
      </g-step>
      <g-step label="Xác nhận" [optional]="true">
        <p>Xem lại thông tin trước khi hoàn tất đơn hàng.</p>
      </g-step>
    </g-stepper>

    <div class="actions">
      <button g-button variant="outline" (click)="step.set(step() - 1)" [disabled]="step() === 0">
        Quay lại
      </button>
      <button g-button (click)="step.set(step() + 1)" [disabled]="step() === 2">Tiếp</button>
    </div>
  `,
  styles: `
    .actions {
      display: flex;
      gap: var(--g-space-2);
      margin-top: var(--g-space-4);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperBasicDemo {
  protected readonly step = signal(0);
}
