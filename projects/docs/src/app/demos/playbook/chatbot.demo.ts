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
  GBadge,
  GCard,
  GChip,
  GIcon,
  GIconButton,
  GInput,
  GInputGroup,
  GInputSuffix,
  GLocaleService,
  GScrollPanel,
  gIconMic,
  gIconSend,
} from 'ngx-opendesign';
import { playbookCopyFor } from '../../pages/playbook/playbook-copy';

interface Msg {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

@Component({
  selector: 'docs-chatbot-demo',
  imports: [
    GAvatar,
    GBadge,
    GCard,
    GChip,
    GIcon,
    GIconButton,
    GInput,
    GInputGroup,
    GInputSuffix,
    GScrollPanel,
  ],
  template: `
    <g-card class="chatbot">
      <div class="chatbot__header">
        <g-avatar [name]="copy().assistantName" size="sm" />
        <div class="chatbot__ident">
          <span class="chatbot__name">{{ copy().assistantName }}</span>
          <g-badge variant="success">{{ copy().online }}</g-badge>
        </div>
      </div>

      <g-scroll-panel #scroller class="chatbot__messages" height="320px">
        @for (m of messages(); track m.id) {
          <div class="chatbot__row" [class.chatbot__row--user]="m.role === 'user'">
            @if (m.role === 'bot') {
              <g-avatar [name]="copy().assistantName" size="sm" />
            }
            <div class="chatbot__bubble" [class.chatbot__bubble--user]="m.role === 'user'">
              {{ m.text }}
            </div>
          </div>
        }
        @if (typing()) {
          <div class="chatbot__row">
            <g-avatar [name]="copy().assistantName" size="sm" />
            <div
              class="chatbot__bubble chatbot__typing"
              role="status"
              [attr.aria-label]="copy().typing"
            >
              <span></span><span></span><span></span>
            </div>
          </div>
        }
      </g-scroll-panel>

      <div class="chatbot__quick">
        @for (q of copy().quickReplies; track q) {
          <g-chip
            class="chatbot__chip"
            role="button"
            tabindex="0"
            (click)="sendText(q)"
            (keydown.enter)="sendText(q)"
            (keydown.space)="onChipSpace($event, q)"
            >{{ q }}</g-chip
          >
        }
      </div>

      <g-input-group class="chatbot__input">
        <input
          gInput
          type="text"
          [placeholder]="copy().placeholder"
          [value]="draft()"
          (input)="draft.set($any($event.target).value)"
          (keydown.enter)="send($event)"
          [attr.aria-label]="copy().inputLabel"
        />
        <button
          type="button"
          g-icon-button
          gInputSuffix
          size="sm"
          [class.chatbot__send--active]="hasText()"
          [attr.aria-label]="hasText() ? copy().send : copy().record"
          [disabled]="typing()"
          (click)="onSuffix()"
        >
          <g-icon [icon]="hasText() ? iconSend : iconMic" size="sm" />
        </button>
      </g-input-group>
    </g-card>
  `,
  styles: `
    .chatbot {
      max-width: 440px;
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
    }
    .chatbot__header {
      display: flex;
      align-items: center;
      gap: var(--g-space-3);
    }
    .chatbot__ident {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
    }
    .chatbot__name {
      font-weight: 600;
    }
    .chatbot__messages {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-3);
      padding: var(--g-space-2);
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
      background: var(--g-bg);
    }
    .chatbot__row {
      display: flex;
      align-items: flex-end;
      gap: var(--g-space-2);
    }
    .chatbot__row--user {
      flex-direction: row-reverse;
    }
    .chatbot__bubble {
      max-width: 75%;
      padding: var(--g-space-2) var(--g-space-3);
      border-radius: var(--g-radius-md);
      background: var(--g-surface);
      color: var(--g-text);
      font-size: var(--g-font-size-sm);
      line-height: 1.45;
    }
    .chatbot__bubble--user {
      background: var(--g-primary);
      color: var(--g-on-primary);
    }
    .chatbot__typing {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .chatbot__typing span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--g-text-muted);
      animation: chatbot-dot 1s infinite ease-in-out;
    }
    .chatbot__typing span:nth-child(2) {
      animation-delay: 0.15s;
    }
    .chatbot__typing span:nth-child(3) {
      animation-delay: 0.3s;
    }
    @keyframes chatbot-dot {
      0%,
      80%,
      100% {
        opacity: 0.3;
      }
      40% {
        opacity: 1;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .chatbot__typing span {
        animation: none;
      }
    }
    .chatbot__quick {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
    }
    .chatbot__chip {
      cursor: pointer;
    }
    .chatbot__chip:focus-visible {
      outline: none;
      box-shadow: var(--g-focus-ring);
    }
    /* Highlight the send icon once text is available; GInputGroup handles suffix positioning. */
    .chatbot__send--active {
      color: var(--g-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => playbookCopyFor(this.i18n.tag()).chatbot);
  protected readonly iconSend = gIconSend;
  protected readonly iconMic = gIconMic;

  protected readonly messages = signal<Msg[]>([
    { id: 1, role: 'bot', text: this.copy().initialMessage },
  ]);
  protected readonly draft = signal('');
  protected readonly typing = signal(false);
  protected readonly hasText = computed(() => this.draft().trim().length > 0);

  private nextId = 2;
  private readonly scroller = viewChild('scroller', { read: ElementRef });

  constructor() {
    effect(() => {
      this.messages.set([{ id: 1, role: 'bot', text: this.copy().initialMessage }]);
      this.draft.set('');
      this.typing.set(false);
      this.nextId = 2;
    });

    afterRenderEffect(() => {
      this.messages();
      this.typing();
      const el = this.scroller()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected send(e?: Event): void {
    if ((e as KeyboardEvent | undefined)?.isComposing) return;
    this.sendText(this.draft());
  }

  protected onSuffix(): void {
    if (this.hasText()) this.send();
  }

  protected sendText(text: string): void {
    const t = text.trim();
    if (!t || this.typing()) return;
    this.messages.update((list) => [...list, { id: this.nextId++, role: 'user', text: t }]);
    this.draft.set('');
    this.typing.set(true);
    setTimeout(() => {
      this.messages.update((list) => [
        ...list,
        { id: this.nextId++, role: 'bot', text: this.copy().reply(t) },
      ]);
      this.typing.set(false);
    }, 700);
  }

  protected onChipSpace(event: Event, text: string): void {
    event.preventDefault();
    this.sendText(text);
  }
}
