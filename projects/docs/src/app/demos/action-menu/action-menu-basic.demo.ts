import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GActionMenu, GActionMenuItem, gIconCopy, gIconEdit, gIconTrash } from 'ngx-opendesign';

@Component({
  selector: 'docs-action-menu-basic-demo',
  imports: [GActionMenu],
  template: `
    <p class="am-demo__cap">Mặc định — trigger là nút tròn chỉ có icon (⋮)</p>
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

    <p class="am-demo__cap">
      <code>variant="label"</code> — chữ + mũi tên lên/xuống, dùng cho <b>menu ngang</b>
    </p>
    <nav class="am-demo__nav">
      <span class="am-demo__link">Trang chủ</span>
      <g-action-menu
        variant="label"
        label="Sản phẩm"
        [items]="products"
        (action)="onPick($event)"
      />
      <g-action-menu variant="label" label="Hỗ trợ" [items]="support" (action)="onPick($event)" />
    </nav>
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
    .am-demo__cap {
      margin: var(--g-space-4) 0 var(--g-space-2);
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .am-demo__cap:first-child {
      margin-top: 0;
    }
    .am-demo__msg {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .am-demo__nav {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
    }
    .am-demo__link {
      display: inline-flex;
      align-items: center;
      height: var(--g-control-md);
      padding: 0 var(--g-space-3);
      border-radius: var(--g-radius-pill);
      font-size: var(--g-font-size-md);
      color: var(--g-text);
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
  protected readonly products: GActionMenuItem[] = [
    { label: 'Bảng giá', value: 'pricing' },
    { label: 'Tính năng', value: 'features' },
    { label: 'Tích hợp', value: 'integrations' },
  ];
  protected readonly support: GActionMenuItem[] = [
    { label: 'Liên hệ', value: 'contact' },
    { label: 'Tài liệu', value: 'docs' },
  ];
  protected readonly picked = signal('');

  protected onPick(item: GActionMenuItem): void {
    this.picked.set(item.label);
  }
}
