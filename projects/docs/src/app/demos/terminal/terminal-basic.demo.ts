import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { GLocaleService, GTerminal, GTerminalLine } from 'ngx-opendesign';
import { displayCopyFor } from '../../pages/display-copy';

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
  private readonly i18n = inject(GLocaleService);
  private readonly demo = computed(() => displayCopyFor(this.i18n.tag()).terminal.demo);
  protected readonly lines = signal<GTerminalLine[]>(this.demo().lines);

  constructor() {
    effect(() => this.lines.set(this.demo().lines));
  }

  protected onRun(cmd: string): void {
    this.lines.update((l) => [
      ...l,
      { text: '$ ' + cmd, kind: 'command' },
      { text: this.demo().ran(cmd), kind: 'output' },
    ]);
  }
}
