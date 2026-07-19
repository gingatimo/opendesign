import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GButton, GToastService } from 'ngx-opendesign';

@Component({
  selector: 'docs-toast-basic-demo',
  imports: [GButton],
  template: `
    <button g-button variant="outline" (click)="show('Đã lưu thay đổi')">Thông báo thường</button>
    <button g-button variant="outline" (click)="show('Tải lên thành công', 'success')">
      Thành công
    </button>
    <button g-button variant="outline" (click)="show('Lưu thất bại, thử lại sau', 'danger')">
      Lỗi
    </button>
    <button g-button variant="outline" (click)="showWithTitle()">Có tiêu đề</button>
    <button g-button variant="outline" (click)="showPersistent()">Không tự đóng</button>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastBasicDemo {
  private readonly toast = inject(GToastService);

  protected show(message: string, variant?: 'success' | 'danger'): void {
    this.toast.show({ message, variant });
  }

  protected showWithTitle(): void {
    this.toast.show({
      title: 'Đã lưu đơn hàng',
      message: 'Đơn #1234 đã được lưu và gửi email xác nhận.',
      variant: 'success',
    });
  }

  protected showPersistent(): void {
    this.toast.show({ message: 'Thông báo này ở lại tới khi bạn đóng.', duration: 0 });
  }
}
