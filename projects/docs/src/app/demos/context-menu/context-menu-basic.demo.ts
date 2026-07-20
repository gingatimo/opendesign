import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GContextMenu, GMenuItem } from 'ngx-opendesign';

@Component({
  selector: 'docs-context-menu-basic-demo',
  imports: [GContextMenu, GMenuItem],
  template: `
    <div class="cm-demo__target" [gContextMenu]="menu">Chuột phải vào vùng này</div>
    <p class="cm-demo__hint">
      Hành động gần nhất: <b>{{ last() ?? '(chưa có)' }}</b>
    </p>

    <ng-template #menu>
      <button g-menu-item type="button" (click)="run('Sửa')">Sửa</button>
      <button g-menu-item type="button" (click)="run('Sao chép')">Sao chép</button>
      <button g-menu-item type="button" (click)="run('Đổi tên')">Đổi tên</button>
      <button g-menu-item type="button" (click)="run('Xoá')">Xoá</button>
    </ng-template>
  `,
  styles: `
    .cm-demo__target {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
      border: 1px dashed var(--g-border-strong);
      border-radius: var(--g-radius-md);
      background: var(--g-surface);
      color: var(--g-text-muted);
      cursor: context-menu;
      user-select: none;
    }
    .cm-demo__hint {
      margin: var(--g-space-3) 0 0;
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuBasicDemo {
  protected readonly last = signal<string | null>(null);
  protected run(action: string): void {
    this.last.set(action);
  }
}
