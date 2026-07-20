import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
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
  GScrollPanel,
  gIconMic,
  gIconSend,
} from 'ngx-opendesign';

interface Msg {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

// Bot trả lời mẫu theo từ khoá — demo, không gọi API thật.
function botReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('dark') || t.includes('tối')) {
    return 'OpenDesign có sẵn sáng/tối: đặt data-g-theme="dark" lên <html> là mọi component đổi màu ngay, không cần build lại.';
  }
  if (t.includes('component') || t.includes('bao nhiêu')) {
    return 'Thư viện hiện có hơn 50 component (Button, Input, Select, Table, Dialog…), tất cả standalone + OnPush + signals.';
  }
  if (t.includes('giới thiệu') || t.includes('opendesign') || t.includes('là gì')) {
    return 'OpenDesign là design system cho Angular 22: thẩm mỹ pill, token --g-*, 0 dependency ngoài @angular/cdk và @angular/forms.';
  }
  if (t.includes('chào') || t.includes('hello')) {
    return 'Chào bạn 👋 Mình có thể giúp gì về OpenDesign?';
  }
  return `Mình đã ghi nhận: "${text}". Đây là demo nên phản hồi là câu mẫu — ghép GScrollPanel + GAvatar + GInput + GIconButton.`;
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
        <g-avatar name="Trợ lý OpenDesign" size="sm" />
        <div class="chatbot__ident">
          <span class="chatbot__name">Trợ lý OpenDesign</span>
          <g-badge variant="success">Đang hoạt động</g-badge>
        </div>
      </div>

      <g-scroll-panel #scroller class="chatbot__messages" height="320px">
        @for (m of messages(); track m.id) {
          <div class="chatbot__row" [class.chatbot__row--user]="m.role === 'user'">
            @if (m.role === 'bot') {
              <g-avatar name="Trợ lý OpenDesign" size="sm" />
            }
            <div class="chatbot__bubble" [class.chatbot__bubble--user]="m.role === 'user'">
              {{ m.text }}
            </div>
          </div>
        }
        @if (typing()) {
          <div class="chatbot__row">
            <g-avatar name="Trợ lý OpenDesign" size="sm" />
            <div class="chatbot__bubble chatbot__typing" role="status" aria-label="Đang soạn tin">
              <span></span><span></span><span></span>
            </div>
          </div>
        }
      </g-scroll-panel>

      <div class="chatbot__quick">
        @for (q of quickReplies; track q) {
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
          placeholder="Nhập tin nhắn…"
          [value]="draft()"
          (input)="draft.set($any($event.target).value)"
          (keydown.enter)="send()"
          aria-label="Nội dung tin nhắn"
        />
        <!-- Suffix: mặc định icon micro (ghi âm), có chữ thì đổi sang icon gửi. -->
        <button
          type="button"
          g-icon-button
          gInputSuffix
          size="sm"
          [class.chatbot__send--active]="hasText()"
          [attr.aria-label]="hasText() ? 'Gửi' : 'Ghi âm'"
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
    /* .chatbot__input LÀ g-input-group — nó tự lo viền pill + bố cục input/suffix. Chỉ tô màu chính
       cho icon gửi khi đã có chữ để nút nổi lên như hành động chính. */
    .chatbot__send--active {
      color: var(--g-primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatbotDemo {
  protected readonly iconSend = gIconSend;
  protected readonly iconMic = gIconMic;
  protected readonly quickReplies = [
    'Giới thiệu OpenDesign',
    'Hỗ trợ dark mode?',
    'Có bao nhiêu component?',
  ];

  protected readonly messages = signal<Msg[]>([
    { id: 1, role: 'bot', text: 'Chào bạn 👋 Mình là trợ lý OpenDesign. Bạn cần hỗ trợ gì?' },
  ]);
  protected readonly draft = signal('');
  protected readonly typing = signal(false);
  // Có chữ chưa → quyết định icon suffix (send) vs mặc định (mic).
  protected readonly hasText = computed(() => this.draft().trim().length > 0);

  private nextId = 2;
  // read: ElementRef — không có nó, #scroller trên <g-scroll-panel> trả về INSTANCE component
  // (GScrollPanel), không phải ElementRef của host → .nativeElement undefined, cuộn hụt.
  private readonly scroller = viewChild('scroller', { read: ElementRef });

  constructor() {
    // Zoneless: cuộn xuống đáy SAU khi render (tin mới / typing đổi). afterRenderEffect, KHÔNG
    // setTimeout(0)/queueMicrotask (chạy TRƯỚC render → chiều cao chưa cập nhật). Đọc messages()+
    // typing() để chạy lại khi chúng đổi; GScrollPanel host chính là phần tử cuộn (overflow:auto).
    afterRenderEffect(() => {
      this.messages();
      this.typing();
      const el = this.scroller()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected send(): void {
    this.sendText(this.draft());
  }

  // Nút suffix: có chữ → gửi; rỗng → mic (ghi âm chỉ là minh hoạ, không làm gì trong demo).
  protected onSuffix(): void {
    if (this.hasText()) this.send();
  }

  protected sendText(text: string): void {
    const t = text.trim();
    if (!t || this.typing()) return;
    this.messages.update((list) => [...list, { id: this.nextId++, role: 'user', text: t }]);
    this.draft.set('');
    this.typing.set(true);
    // Giả lập độ trễ "gọi API" rồi set signal — setTimeout ở đây CHỈ để chờ (an toàn zoneless), khác
    // với dùng setTimeout để cuộn/focus phần tử vừa render.
    setTimeout(() => {
      this.messages.update((list) => [
        ...list,
        { id: this.nextId++, role: 'bot', text: botReply(t) },
      ]);
      this.typing.set(false);
    }, 700);
  }

  // Space trên phần tử role="button" cuộn trang theo mặc định — chặn rồi mới gửi.
  protected onChipSpace(event: Event, text: string): void {
    event.preventDefault();
    this.sendText(text);
  }
}
