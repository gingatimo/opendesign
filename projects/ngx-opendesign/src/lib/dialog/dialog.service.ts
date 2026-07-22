import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { gDevWarning } from '../core/dev-warning';
import { GDialogRef } from './dialog-ref';

/** Token để component bên trong dialog inject data được truyền qua GDialogConfig.data. */
export const G_DIALOG_DATA = new InjectionToken<unknown>('G_DIALOG_DATA');

export interface GDialogConfig<D = unknown> {
  /** Data truyền vào component, inject bằng G_DIALOG_DATA. */
  data?: D;
  /** Chiều rộng panel, vd. '480px'. */
  width?: string;
  /** true = Esc và click backdrop không đóng dialog. */
  disableClose?: boolean;
  /** Tên của dialog cho screen reader. Bắt buộc có ariaLabel hoặc ariaLabelledBy. */
  ariaLabel?: string;
  /** id của phần tử làm tiêu đề dialog. Bắt buộc có ariaLabel hoặc ariaLabelledBy. */
  ariaLabelledBy?: string;
}

@Injectable({ providedIn: 'root' })
export class GDialogService {
  private readonly cdkDialog = inject(Dialog);

  open<T, D = unknown, R = unknown>(
    component: ComponentType<T>,
    config: GDialogConfig<D> = {},
  ): GDialogRef<R> {
    if (!config.ariaLabel && !config.ariaLabelledBy) {
      gDevWarning(
        'GDialogService',
        'dialog needs ariaLabel or ariaLabelledBy to have an accessible name',
      );
    }

    let ref: GDialogRef<R> | undefined;

    const cdkRef = this.cdkDialog.open<R, D, T>(component, {
      data: config.data,
      width: config.width,
      disableClose: config.disableClose,
      ariaLabel: config.ariaLabel,
      ariaLabelledBy: config.ariaLabelledBy,
      role: 'dialog',
      ariaModal: true,
      hasBackdrop: true,
      backdropClass: 'g-dialog-backdrop',
      panelClass: 'g-dialog-panel',
      // CDK tự lo: focus trap, restore focus về phần tử trigger, đóng bằng Esc.
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      // Factory nhận thẳng CDK DialogRef đã được tạo xong (không phải closure tới biến
      // `ref` khai báo sau — tránh temporal dead zone của bản phác thảo ban đầu), nên
      // dùng nó để bọc GDialogRef và cấp cho component bên trong dialog qua inject().
      // Đồng thời map DIALOG_DATA (CDK) sang G_DIALOG_DATA (của thư viện) tại đây.
      //
      // Chỉ tạo ĐÚNG MỘT GDialogRef rồi dùng chung cho cả component bên trong lẫn giá
      // trị trả về: hai instance riêng vẫn chạy đúng hôm nay (cùng bọc một CDK ref) nhưng
      // sẽ âm thầm phân kỳ nếu sau này GDialogRef có state riêng. Giống MatDialogRef.
      providers: (dialogRef) => {
        ref = new GDialogRef<R>(dialogRef);
        return [
          { provide: GDialogRef, useValue: ref },
          { provide: G_DIALOG_DATA, useExisting: DIALOG_DATA },
        ];
      },
    });

    // providers factory luôn chạy đồng bộ bên trong cdkDialog.open() nên `ref` đã được gán
    // xong ở đây; `?? new GDialogRef(cdkRef)` chỉ là lưới an toàn cho kiểu, không phải
    // đường chạy thực tế (cdkRef và dialogRef của factory là cùng một object).
    return ref ?? new GDialogRef<R>(cdkRef);
  }

  closeAll(): void {
    this.cdkDialog.closeAll();
  }
}
