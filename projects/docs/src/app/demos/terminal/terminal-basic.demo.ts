import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GTerminal, GTerminalLine } from 'ngx-opendesign';

@Component({
  selector: 'docs-terminal-basic-demo',
  imports: [GTerminal],
  template: `
    <g-terminal
      class="term-demo"
      title="zsh — opendesign"
      [lines]="lines()"
      (run)="onRun($event)"
    />
  `,
  styles: `
    .term-demo {
      height: 340px;
      max-width: 560px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalBasicDemo {
  protected readonly lines = signal<GTerminalLine[]>([
    { text: 'opendesign@dev ~ %', kind: 'output' },
    { text: 'ng build ngx-opendesign', kind: 'command' },
    { text: '✔ Building Angular Package', kind: 'success' },
    { text: 'Build at: 2026-07-20 — Time: 1245ms', kind: 'output' },
    { text: 'npm test', kind: 'command' },
    { text: '✖ 1 test failed', kind: 'error' },
    { text: 'Thử gõ một lệnh rồi Enter…', kind: 'output' },
  ]);

  protected onRun(cmd: string): void {
    this.lines.update((l) => [
      ...l,
      { text: '$ ' + cmd, kind: 'command' },
      { text: 'Đã chạy: ' + cmd + ' (kết quả mẫu)', kind: 'output' },
    ]);
  }
}
