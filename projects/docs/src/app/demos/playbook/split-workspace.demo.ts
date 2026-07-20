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
  GTerminal,
  GTerminalLine,
  gIconSend,
} from 'ngx-opendesign';

interface ChatMsg {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

// Playbook: GSplitter chia đôi — trái là khung CHAT, phải là GTerminal. Kéo thanh giữa để đổi tỉ lệ.
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
            <g-avatar name="Trợ lý" size="sm" />
            <b>Trợ lý OpenDesign</b>
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
                placeholder="Hỏi gì đó…"
                [value]="draft()"
                (input)="draft.set($any($event.target).value)"
                (keydown.enter)="sendChat($event)"
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
    /* Padding ở FOOT (không margin trên input-group vốn width:100% → tràn panel, bị cắt). */
    .sw-chat__foot {
      padding: var(--g-space-3);
    }

    /* GTerminal tự lấp đầy panel phải. */
    .sw-term {
      height: 100%;
      border-radius: 0;
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

  protected readonly terminal = signal<GTerminalLine[]>([
    { text: 'opendesign@dev ~ %', kind: 'output' },
    { text: 'npm run build:lib', kind: 'command' },
    { text: 'Build complete. [1245ms]', kind: 'success' },
  ]);

  private readonly chatScroll = viewChild<ElementRef<HTMLElement>>('chatScroll');

  constructor() {
    afterRenderEffect(() => {
      this.messages();
      const el = this.chatScroll()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected sendChat(e?: Event): void {
    // Bỏ qua Enter khi bộ gõ (IME) đang ghép ký tự — tránh gửi 2 lần khi gõ tiếng Việt.
    if ((e as KeyboardEvent | undefined)?.isComposing) return;
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

  protected runCmd(cmd: string): void {
    this.terminal.update((l) => [
      ...l,
      { text: '$ ' + cmd, kind: 'command' },
      { text: 'Đã chạy: ' + cmd + ' (kết quả mẫu)', kind: 'output' },
    ]);
  }
}
