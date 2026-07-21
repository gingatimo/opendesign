import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GActionMenu, GActionMenuItem, gIconCopy, gIconEdit, gIconTrash } from 'ngx-opendesign';

@Component({
  selector: 'docs-action-menu-basic-demo',
  imports: [GActionMenu],
  template: `
    <div class="am-demo">
      <g-action-menu label="Tác vụ" [items]="items" (action)="onPick($event)" />
      <span class="am-demo__msg">
        @if (picked()) {
          Đã chọn: <b>{{ picked() }}</b>
        } @else {
          Bấm icon ⋮ để mở menu (tự lật lên nếu sát mép dưới).
        }
      </span>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .am-demo {
      display: flex;
      align-items: center;
      gap: var(--g-space-4);
    }
    .am-demo__msg {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuBasicDemo {
  protected readonly items: GActionMenuItem[] = [
    { label: 'Sửa', value: 'edit', icon: gIconEdit },
    { label: 'Nhân bản', value: 'duplicate', icon: gIconCopy },
    { label: 'Xoá', value: 'delete', icon: gIconTrash },
  ];
  protected readonly picked = signal('');

  protected onPick(item: GActionMenuItem): void {
    this.picked.set(item.label);
  }
}
