import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { G_DIALOG_DATA, GButton, GDialogRef, GDialogService } from 'ngx-opendesign';

@Component({
  imports: [GButton],
  template: `
    <h2 id="dialog-tieu-de">{{ data.title }}</h2>
    <p>{{ data.message }}</p>
    <div class="dialog-actions">
      <button g-button variant="outline" (click)="ref.close(false)">Hủy</button>
      <button g-button variant="danger" (click)="ref.close(true)">Xóa</button>
    </div>
  `,
  styles: `
    h2 {
      margin: 0 0 var(--g-space-3);
      font-size: var(--g-font-size-lg);
    }
    p {
      margin: 0 0 var(--g-space-5);
      color: var(--g-text-muted);
    }
    .dialog-actions {
      display: flex;
      gap: var(--g-space-3);
      justify-content: flex-end;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  protected readonly data = inject<{ title: string; message: string }>(G_DIALOG_DATA);
  protected readonly ref = inject<GDialogRef<boolean>>(GDialogRef);
}

@Component({
  selector: 'docs-dialog-basic-demo',
  imports: [GButton],
  template: `
    <button g-button (click)="openConfirm()">Xóa tài liệu</button>
    @if (result() !== null) {
      <p class="ket-qua">Kết quả: {{ result() ? 'đã xóa' : 'đã hủy' }}</p>
    }
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      align-items: flex-start;
    }
    .ket-qua {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogBasicDemo {
  private readonly dialog = inject(GDialogService);
  protected readonly result = signal<boolean | null>(null);

  protected openConfirm(): void {
    const ref = this.dialog.open<
      ConfirmDialogComponent,
      { title: string; message: string },
      boolean
    >(ConfirmDialogComponent, {
      data: { title: 'Xóa tài liệu?', message: 'Hành động này không thể hoàn tác.' },
      width: '400px',
      ariaLabelledBy: 'dialog-tieu-de',
    });
    ref.afterClosed().subscribe((r) => this.result.set(r ?? false));
  }
}
