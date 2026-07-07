import { DialogRef } from '@angular/cdk/dialog';
import { Observable } from 'rxjs';

/**
 * Phần tối thiểu của CDK DialogRef mà GDialogRef thực sự dùng tới (close + closed).
 * DialogRef<R, C> tham chiếu ngược tới chính nó qua config.providers, nên
 * DialogRef<R, T> (T = loại component cụ thể) không gán được cho DialogRef<R, unknown>
 * dù về mặt logic phải tương thích — dùng type hẹp này để tránh xung đột kiểu generic
 * đó thay vì ép kiểu bằng `any`.
 */
type CdkDialogRefLike<R> = Pick<DialogRef<R, unknown>, 'close' | 'closed'>;

/**
 * Tham chiếu tới một dialog đang mở. Bọc DialogRef của CDK để lộ ra API gọn hơn:
 * consumer chỉ cần close() và afterClosed(), không cần biết tới CDK.
 */
export class GDialogRef<R = unknown> {
  constructor(private readonly cdkRef: CdkDialogRefLike<R>) {}

  close(result?: R): void {
    this.cdkRef.close(result);
  }

  afterClosed(): Observable<R | undefined> {
    return this.cdkRef.closed;
  }
}
