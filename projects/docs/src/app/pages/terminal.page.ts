import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApiRow, ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { TerminalBasicDemo } from '../demos/terminal/terminal-basic.demo';

@Component({
  imports: [TerminalBasicDemo, ApiTable, CodeBlock, DemoSection],
  template: `
    <h1>Terminal</h1>
    <p>
      Khung <b>terminal</b> giả lập cửa sổ dòng lệnh: thanh tiêu đề (3 chấm đèn giao thông + tên),
      vùng log mono cuộn được (tô màu theo <code>kind</code>: command / output / success / error),
      và dòng nhập lệnh có ký hiệu prompt. Nền tối <b>cố định</b> (không đổi theo theme).
      Data-driven qua <code>[lines]</code>; gõ lệnh + Enter phát <code>(run)</code> — bạn tự nối kết
      quả vào <code>lines</code>. Tự cuộn xuống đáy khi có dòng mới.
    </p>

    <docs-demo-section>
      <docs-terminal-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/terminal/terminal-basic.demo.ts" />

    <h2>API — GTerminal</h2>
    <docs-api-table [rows]="apiRows" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TerminalPage {
  protected readonly apiRows: ApiRow[] = [
    {
      name: 'lines',
      type: 'GTerminalLine[]',
      default: '[]',
      description:
        'Các dòng log. Mỗi dòng `{ text, kind? }`, kind: command | output | success | error.',
    },
    {
      name: 'run',
      type: 'output<string>',
      default: '—',
      description:
        'Phát chuỗi lệnh khi gõ + Enter (ô nhập tự xoá); consumer nối kết quả vào `lines`.',
    },
    {
      name: 'title',
      type: 'string',
      default: "'Terminal'",
      description: 'Tên hiển thị ở thanh tiêu đề.',
    },
    {
      name: 'prompt',
      type: 'string',
      default: "'$'",
      description: 'Ký hiệu prompt trước ô nhập.',
    },
    {
      name: 'interactive',
      type: 'boolean',
      default: 'true',
      description: 'Có ô nhập lệnh hay không (false = chỉ hiển thị log).',
    },
  ];
}
