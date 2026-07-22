import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { G_DIALOG_DATA, GButton, GDialogRef, GDialogService, GLocaleService } from 'ngx-opendesign';
import { overlayCopyFor } from '../../pages/overlay-copy';

@Component({
  imports: [GButton],
  template: `
    <h2 id="dialog-title">{{ data.title }}</h2>
    <p>{{ data.message }}</p>
    <div class="dialog-actions">
      <button g-button variant="outline" (click)="ref.close(false)">{{ demo().cancel }}</button>
      <button g-button variant="danger" (click)="ref.close(true)">{{ demo().delete }}</button>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => overlayCopyFor(this.i18n.tag()).dialog.demo);
}

@Component({
  selector: 'docs-dialog-basic-demo',
  imports: [GButton],
  template: `
    <button g-button (click)="openConfirm()">{{ demo().trigger }}</button>
    @if (result() !== null) {
      <p class="ket-qua">{{ demo().result }} {{ result() ? demo().deleted : demo().canceled }}</p>
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
  private readonly i18n = inject(GLocaleService);
  protected readonly result = signal<boolean | null>(null);
  protected readonly demo = computed(() => overlayCopyFor(this.i18n.tag()).dialog.demo);

  protected openConfirm(): void {
    const ref = this.dialog.open<
      ConfirmDialogComponent,
      { title: string; message: string },
      boolean
    >(ConfirmDialogComponent, {
      data: { title: this.demo().title, message: this.demo().message },
      width: '400px',
      ariaLabelledBy: 'dialog-title',
    });
    ref.afterClosed().subscribe((r) => this.result.set(r ?? false));
  }
}
