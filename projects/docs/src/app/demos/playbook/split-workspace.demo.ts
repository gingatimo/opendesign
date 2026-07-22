import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import {
  GAvatar,
  GIcon,
  GIconButton,
  GInput,
  GInputGroup,
  GInputSuffix,
  GLocaleService,
  GSplitter,
  GSplitterPanel,
  GTerminal,
  GTerminalLine,
  gIconSend,
} from 'ngx-opendesign';
import { PlaybookMessage, playbookCopyFor } from '../../pages/playbook/playbook-copy';

@Component({
  selector: 'docs-split-workspace-demo',
  imports: [
    GSplitter,
    GSplitterPanel,
    GTerminal,
    GAvatar,
    GIcon,
    GIconButton,
    GInput,
    GInputGroup,
    GInputSuffix,
  ],
  template: `
    <g-splitter class="sw" [sizes]="[45, 55]">
      <ng-template gSplitterPanel>
        <div class="sw-chat">
          <div class="sw-chat__head">
            <g-avatar [name]="copy().assistantShortName" size="sm" />
            <b>{{ copy().assistantName }}</b>
          </div>
          <div #chatScroll class="sw-chat__msgs">
            @for (m of messages(); track m.id) {
              <div class="sw-msg" [class.sw-msg--user]="m.role === 'user'">{{ m.text }}</div>
            }
          </div>
          <div class="sw-chat__foot">
            <g-input-group>
              <input
                gInput
                type="text"
                [placeholder]="copy().placeholder"
                [value]="draft()"
                (input)="draft.set($any($event.target).value)"
                (keydown.enter)="sendChat($event)"
                [attr.aria-label]="copy().inputLabel"
              />
              <button
                type="button"
                g-icon-button
                gInputSuffix
                size="sm"
                [attr.aria-label]="copy().send"
                (click)="sendChat()"
              >
                <g-icon [icon]="iconSend" size="sm" />
              </button>
            </g-input-group>
          </div>
        </div>
      </ng-template>

      <ng-template gSplitterPanel>
        <g-terminal class="sw-term" [lines]="terminal()" (run)="runCmd($event)" />
      </ng-template>
    </g-splitter>
  `,
  styles: `
    .sw {
      height: 420px;
    }

    .sw-chat {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
    .sw-chat__head {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
      padding: var(--g-space-3);
      border-bottom: 1px solid var(--g-border);
    }
    .sw-chat__msgs {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: var(--g-space-2);
      padding: var(--g-space-3);
    }
    .sw-msg {
      max-width: 82%;
      padding: var(--g-space-2) var(--g-space-3);
      border-radius: var(--g-radius-md);
      background: var(--g-surface);
      font-size: var(--g-font-size-sm);
      line-height: 1.45;
    }
    .sw-msg--user {
      align-self: flex-end;
      background: var(--g-primary);
      color: var(--g-on-primary);
    }
    .sw-chat__foot {
      padding: var(--g-space-3);
    }

    .sw-term {
      height: 100%;
      border-radius: 0;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitWorkspaceDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => playbookCopyFor(this.i18n.tag()).workspace);
  protected readonly iconSend = gIconSend;

  protected readonly messages = signal<PlaybookMessage[]>([
    { id: 1, role: 'bot', text: this.copy().initialMessage },
  ]);
  protected readonly draft = signal('');
  private chatId = 2;

  protected readonly terminal = signal<GTerminalLine[]>(this.copy().terminal);

  private readonly chatScroll = viewChild<ElementRef<HTMLElement>>('chatScroll');

  constructor() {
    effect(() => {
      this.messages.set([{ id: 1, role: 'bot', text: this.copy().initialMessage }]);
      this.terminal.set(this.copy().terminal);
      this.draft.set('');
      this.chatId = 2;
    });

    afterRenderEffect(() => {
      this.messages();
      const el = this.chatScroll()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected sendChat(e?: Event): void {
    if ((e as KeyboardEvent | undefined)?.isComposing) return;
    const t = this.draft().trim();
    if (!t) return;
    this.messages.update((l) => [...l, { id: this.chatId++, role: 'user', text: t }]);
    this.draft.set('');
    setTimeout(() => {
      this.messages.update((l) => [
        ...l,
        { id: this.chatId++, role: 'bot', text: this.copy().receivedReply(t) },
      ]);
    }, 500);
  }

  protected runCmd(cmd: string): void {
    this.terminal.update((l) => [
      ...l,
      { text: '$ ' + cmd, kind: 'command' },
      { text: this.copy().commandOutput(cmd), kind: 'output' },
    ]);
  }
}
