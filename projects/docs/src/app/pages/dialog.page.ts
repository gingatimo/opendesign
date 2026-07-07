import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { DialogBasicDemo } from '../demos/dialog/dialog-basic.demo';

@Component({
  imports: [DialogBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>Dialog</h1>
    <p>
      Hộp thoại modal, dựng trên <code>@angular/cdk/dialog</code>. Mở bằng
      <code>GDialogService.open()</code>, nhận kết quả khi đóng qua <code>GDialogRef</code>.
    </p>

    <docs-demo-section>
      <docs-dialog-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/dialog/dialog-basic.demo.ts" />

    <h2>API — GDialogService</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>Panel có <code>role="dialog"</code> và <code>aria-modal="true"</code>.</li>
      <li>Focus chuyển vào trong dialog khi mở, và trở lại phần tử trigger khi đóng.</li>
      <li>Phím Esc đóng dialog, trừ khi <code>disableClose: true</code>.</li>
      <li>
        Bắt buộc truyền <code>ariaLabel</code> hoặc <code>ariaLabelledBy</code> để dialog có tên cho
        screen reader — thiếu sẽ có cảnh báo console ở dev mode.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'GDialogService.open(component, config)',
      type: '(component: ComponentType<T>, config?: GDialogConfig<D>) => GDialogRef<R>',
      default: '—',
      description: 'Mở dialog với component đã cho, trả về GDialogRef để theo dõi kết quả.',
    },
    {
      name: 'GDialogService.closeAll()',
      type: '() => void',
      default: '—',
      description: 'Đóng toàn bộ dialog đang mở.',
    },
    {
      name: 'GDialogConfig.data',
      type: 'D',
      default: '—',
      description: 'Data truyền vào component bên trong dialog, inject bằng G_DIALOG_DATA.',
    },
    {
      name: 'GDialogConfig.width',
      type: 'string',
      default: '—',
      description: "Chiều rộng panel, vd. '480px'.",
    },
    {
      name: 'GDialogConfig.disableClose',
      type: 'boolean',
      default: 'false',
      description: 'true = Esc và click backdrop không đóng dialog.',
    },
    {
      name: 'GDialogConfig.ariaLabel',
      type: 'string',
      default: '—',
      description: 'Tên dialog cho screen reader. Bắt buộc có ariaLabel hoặc ariaLabelledBy.',
    },
    {
      name: 'GDialogConfig.ariaLabelledBy',
      type: 'string',
      default: '—',
      description: 'id của phần tử làm tiêu đề dialog. Bắt buộc có ariaLabel hoặc ariaLabelledBy.',
    },
    {
      name: 'GDialogRef.close(result?)',
      type: '(result?: R) => void',
      default: '—',
      description: 'Đóng dialog, phát result qua afterClosed().',
    },
    {
      name: 'GDialogRef.afterClosed()',
      type: '() => Observable<R | undefined>',
      default: '—',
      description: 'Observable phát giá trị khi dialog đóng.',
    },
    {
      name: 'G_DIALOG_DATA',
      type: 'InjectionToken<unknown>',
      default: '—',
      description: 'Token để component bên trong dialog inject data (inject<T>(G_DIALOG_DATA)).',
    },
  ];
}
