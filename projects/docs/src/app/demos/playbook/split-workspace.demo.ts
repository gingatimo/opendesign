import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  GSplitter,
  GSplitterPanel,
  gIconSend,
} from 'ngx-opendesign';

interface ChatMsg {
  id: number;
  role: 'bot' | 'user';
  text: string;
}
interface TermLine {
  text: string;
  kind: 'cmd' | 'out' | 'ok';
}

// Playbook: GSplitter chia đôi — trái là khung CHAT, phải là TERMINAL. Kéo thanh giữa để đổi tỉ lệ.
// Cả hai panel tương tác thật (gõ chat → bot trả lời mẫu; gõ lệnh → terminal in kết quả mẫu).
@Component({
  selector: 'docs-split-workspace-demo',
  imports: [
    GSplitter,
    GSplitterPanel,
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
            <g-avatar name="Trợ lý" size="sm" />
            <b>Trợ lý OpenDesign</b>
          </div>
          <div #chatScroll class="sw-chat__msgs">
            @for (m of messages(); track m.id) {
              <div class="sw-msg" [class.sw-msg--user]="m.role === 'user'">{{ m.text }}</div>
            }
          </div>
          <g-input-group class="sw-chat__input">
            <input
              gInput
              type="text"
              placeholder="Hỏi gì đó…"
              [value]="draft()"
              (input)="draft.set($any($event.target).value)"
              (keydown.enter)="sendChat()"
              aria-label="Tin nhắn"
            />
            <button
              type="button"
              g-icon-button
              gInputSuffix
              size="sm"
              aria-label="Gửi"
              (click)="sendChat()"
            >
              <g-icon [icon]="iconSend" size="sm" />
            </button>
          </g-input-group>
        </div>
      </ng-template>

      <ng-template gSplitterPanel>
        <div class="sw-term">
          <div class="sw-term__head">Terminal</div>
          <div #termScroll class="sw-term__body">
            @for (l of terminal(); track $index) {
              <div class="sw-term__line" [attr.data-kind]="l.kind">{{ l.text }}</div>
            }
          </div>
          <div class="sw-term__prompt">
            <span class="sw-term__caret">$</span>
            <input
              class="sw-term__cmd"
              type="text"
              placeholder="type a command"
              [value]="cmd()"
              (input)="cmd.set($any($event.target).value)"
              (keydown.enter)="runCmd()"
              aria-label="Lệnh terminal"
            />
          </div>
        </div>
      </ng-template>
    </g-splitter>
  `,
  styles: `
    .sw {
      height: 420px;
    }

    /* --- Chat (trái) --- */
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
    .sw-chat__input {
      margin: var(--g-space-3);
    }

    /* --- Terminal (phải) — luôn tối như terminal thật, không đổi theo theme --- */
    .sw-term {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #0d0d0f;
      color: #d4d4d8;
      font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
      font-size: var(--g-font-size-sm);
    }
    .sw-term__head {
      padding: var(--g-space-2) var(--g-space-3);
      border-bottom: 1px solid #26262b;
      color: #8f8f96;
    }
    .sw-term__body {
      flex: 1 1 0;
      min-height: 0;
      overflow-y: auto;
      padding: var(--g-space-2) var(--g-space-3);
    }
    .sw-term__line {
      line-height: 1.6;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .sw-term__line[data-kind='cmd'] {
      color: #ededef;
    }
    .sw-term__line[data-kind='out'] {
      color: #8f8f96;
    }
    .sw-term__line[data-kind='ok'] {
      color: #4ade80;
    }
    .sw-term__prompt {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
      padding: var(--g-space-2) var(--g-space-3);
      border-top: 1px solid #26262b;
    }
    .sw-term__caret {
      color: #4ade80;
    }
    .sw-term__cmd {
      flex: 1 1 auto;
      min-width: 0;
      background: transparent;
      border: none;
      color: #ededef;
      font: inherit;
      outline: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitWorkspaceDemo {
  protected readonly iconSend = gIconSend;

  protected readonly messages = signal<ChatMsg[]>([
    { id: 1, role: 'bot', text: 'Chào bạn 👋 Bên phải là terminal — thử gõ một lệnh xem.' },
  ]);
  protected readonly draft = signal('');
  private chatId = 2;

  protected readonly terminal = signal<TermLine[]>([
    { text: 'opendesign@dev ~ %', kind: 'out' },
    { text: 'npm run build:lib', kind: 'cmd' },
    { text: 'Build complete. [1245ms]', kind: 'ok' },
  ]);
  protected readonly cmd = signal('');

  private readonly chatScroll = viewChild<ElementRef<HTMLElement>>('chatScroll');
  private readonly termScroll = viewChild<ElementRef<HTMLElement>>('termScroll');

  constructor() {
    afterRenderEffect(() => {
      this.messages();
      const el = this.chatScroll()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
    afterRenderEffect(() => {
      this.terminal();
      const el = this.termScroll()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected sendChat(): void {
    const t = this.draft().trim();
    if (!t) return;
    this.messages.update((l) => [...l, { id: this.chatId++, role: 'user', text: t }]);
    this.draft.set('');
    setTimeout(() => {
      this.messages.update((l) => [
        ...l,
        { id: this.chatId++, role: 'bot', text: 'Đã nhận: "' + t + '". (phản hồi mẫu)' },
      ]);
    }, 500);
  }

  protected runCmd(): void {
    const c = this.cmd().trim();
    if (!c) return;
    this.terminal.update((l) => [
      ...l,
      { text: '$ ' + c, kind: 'cmd' },
      { text: 'Đã chạy: ' + c + ' (kết quả mẫu)', kind: 'out' },
    ]);
    this.cmd.set('');
  }
}
