import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GTreeNode, GTreeSelect } from 'ngx-opendesign';

@Component({
  selector: 'docs-tree-select-multiple-demo',
  imports: [GTreeSelect, ReactiveFormsModule],
  template: `
    <g-tree-select multiple [formControl]="perms" [options]="options" placeholder="Chọn quyền" />
    <p>Đã chọn: {{ (perms.value ?? []).join(', ') || 'chưa chọn' }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 320px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectMultipleDemo {
  protected readonly perms = new FormControl<string[]>([]);
  protected readonly options: GTreeNode[] = [
    {
      label: 'Nội dung',
      children: [
        { label: 'Xem bài viết', value: 'post:read' },
        { label: 'Sửa bài viết', value: 'post:write' },
        { label: 'Xoá bài viết', value: 'post:delete' },
      ],
    },
    {
      label: 'Người dùng',
      children: [
        { label: 'Xem người dùng', value: 'user:read' },
        { label: 'Mời người dùng', value: 'user:invite' },
      ],
    },
    { label: 'Cài đặt hệ thống', value: 'settings' },
  ];
}
