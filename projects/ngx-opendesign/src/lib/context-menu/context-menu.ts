import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DestroyRef, Directive, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

// Menu NGỮ CẢNH: gắn [gContextMenu]="tpl" lên phần tử — chuột phải mở menu (overlay CDK) ngay tại vị trí
// con trỏ. Nội dung menu là một <ng-template> (thường gồm các <button g-menu-item>). Tự đóng khi bấm ra
// ngoài, nhấn Escape, hoặc chọn một mục. Menu lật hướng nếu thiếu chỗ (flexibleConnectedTo theo điểm).
@Directive({
  selector: '[gContextMenu]',
  host: { '(contextmenu)': 'onContextMenu($event)' },
})
export class GContextMenu {
  // Template nội dung menu (bắt buộc).
  readonly gContextMenu = input.required<TemplateRef<unknown>>();

  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private overlayRef?: OverlayRef;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.close());
  }

  protected onContextMenu(e: MouseEvent): void {
    e.preventDefault();
    this.close();

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo({ x: e.clientX, y: e.clientY })
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
      ]);

    const overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass: 'g-context-menu',
    });
    this.overlayRef = overlayRef;
    overlayRef.attach(new TemplatePortal(this.gContextMenu(), this.viewContainerRef));

    overlayRef.outsidePointerEvents().subscribe(() => this.close());
    overlayRef.keydownEvents().subscribe((ev) => {
      if (ev.key === 'Escape') this.close();
    });
    // Chọn một mục (click trong panel) → đóng.
    overlayRef.overlayElement.addEventListener('click', () => this.close());
  }

  private close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
  }
}
