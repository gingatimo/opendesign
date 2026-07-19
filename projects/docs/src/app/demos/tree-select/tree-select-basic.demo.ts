import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GTreeNode, GTreeSelect } from 'ngx-opendesign';

@Component({
  selector: 'docs-tree-select-basic-demo',
  imports: [GTreeSelect, ReactiveFormsModule],
  template: `
    <g-tree-select [formControl]="folder" [options]="options" placeholder="Chọn mục" />
    <p>Đã chọn: {{ folder.value ?? 'chưa chọn' }}</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      max-width: 280px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeSelectBasicDemo {
  protected readonly folder = new FormControl<string | null>(null);
  protected readonly options: GTreeNode[] = [
    {
      label: 'Tài liệu',
      children: [
        { label: 'Báo cáo', value: 'reports' },
        { label: 'Hợp đồng', value: 'contracts' },
      ],
    },
    { label: 'Hình ảnh', value: 'images' },
  ];
}
