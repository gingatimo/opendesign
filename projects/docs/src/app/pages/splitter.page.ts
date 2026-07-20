import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { SplitterBasicDemo } from '../demos/splitter/splitter-basic.demo';

@Component({
  imports: [SplitterBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Splitter</h1>
    <p>
      Bố cục chia panel có <b>thanh kéo</b> (gutter) để đổi kích thước hai bên. Mỗi panel chiếu qua
      <code>&lt;ng-template gSplitterPanel&gt;</code> — Splitter tự chèn gutter giữa các panel liền
      kề (hỗ trợ <b>N panel</b>). Kéo gutter chỉ đổi cặp panel hai bên nó, tổng giữ nguyên; kéo bằng
      chuột, cảm ứng, hoặc phím ←/→ (dọc: ↑/↓).
    </p>

    <docs-demo-section>
      <docs-splitter-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/splitter/splitter-basic.demo.ts" />

    <h2>API — GSplitter</h2>
    <docs-api-table [rows]="apiRows" />

    <h2>Accessibility</h2>
    <ul>
      <li>
        Mỗi gutter là <code>role="separator"</code> có <code>tabindex</code>,
        <code>aria-orientation</code> và <code>aria-valuenow</code>; chỉnh bằng phím mũi tên.
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SplitterPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "Chiều chia: 'horizontal' cạnh nhau, 'vertical' xếp chồng.",
    },
    {
      name: 'sizes',
      type: 'number[]',
      default: 'chia đều',
      description: 'Kích thước ban đầu mỗi panel (trọng số, thường cộng = 100).',
    },
    {
      name: 'minSize',
      type: 'number',
      default: '8',
      description: 'Trọng số tối thiểu mỗi panel (chặn kéo thu về 0).',
    },
    {
      name: 'sizeChange',
      type: 'output<number[]>',
      default: '—',
      description: 'Phát mảng trọng số mới mỗi khi kéo/nhấn phím đổi kích thước.',
    },
  ];
}
