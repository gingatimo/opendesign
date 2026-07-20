import { DestroyRef, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';

/**
 * Theo dõi trạng thái invalid của form control gắn với một component CVA và cập nhật `invalid`
 * = `control.invalid && (touched || dirty)`.
 *
 * Subscribe `control.events` để phản ánh cả `markAsTouched()`/`form.markAllAsTouched()` (vd. lúc
 * submit) — những thao tác này KHÔNG phát sự kiện DOM nào nên không thể bắt qua (blur)/(input).
 *
 * Gọi trong `ngOnInit` (lúc này `ngControl.control` đã được gán). Không làm gì nếu control không
 * tồn tại (component dùng ngoài form). Tự huỷ subscription theo `destroyRef`.
 */
export function trackControlInvalid(
  ngControl: NgControl | null,
  destroyRef: DestroyRef,
  invalid: WritableSignal<boolean>,
): void {
  const control = ngControl?.control;
  if (!control) return;
  const update = () => invalid.set(control.invalid && (control.touched || control.dirty));
  update();
  control.events.pipe(takeUntilDestroyed(destroyRef)).subscribe(update);
}
