import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GAlert, GButton } from 'ngx-opendesign';

@Component({
  selector: 'docs-alert-basic-demo',
  imports: [GAlert, GButton],
  template: `
    <g-alert>Ghi chú trung lập — thông tin bổ sung cho người dùng.</g-alert>

    <g-alert variant="success" heading="Đã lưu"> Thay đổi của bạn đã được lưu thành công. </g-alert>

    <g-alert variant="warning" heading="Sắp hết hạn">
      Phiên đăng nhập sẽ hết hạn trong 5 phút. Hãy lưu công việc để tránh mất dữ liệu.
    </g-alert>

    <g-alert variant="danger" heading="Không thể xử lý" [dismissible]="true" [(open)]="showError">
      Máy chủ trả về lỗi 500. Vui lòng thử lại sau ít phút.
    </g-alert>

    @if (!showError()) {
      <button g-button variant="outline" (click)="showError.set(true)">
        Hiện lại thông báo lỗi
      </button>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--g-space-3);
    }
    :host g-alert {
      align-self: stretch;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertBasicDemo {
  protected readonly showError = signal(true);
}
