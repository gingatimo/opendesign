import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

// Một dòng trong terminal. `kind` quyết định màu: command (sáng), output (xám), success (xanh lá),
// error (đỏ).
export interface GTerminalLine {
  text: string;
  kind?: 'command' | 'output' | 'success' | 'error';
}

// Khung TERMINAL — UI giả lập cửa sổ terminal thật: thanh tiêu đề (3 chấm đèn giao thông + tên), vùng
// log mono cuộn được (tô màu theo `kind`), và dòng nhập lệnh có ký hiệu prompt. Nền tối CỐ ĐỊNH (không
// đổi theo theme sáng/tối — terminal luôn tối). Data-driven qua `[lines]`; gõ lệnh + Enter phát
// `(command)`, consumer tự nối vào `lines`. Đặt `interactive="false"` để chỉ hiển thị (bỏ ô nhập).
@Component({
  selector: 'g-terminal',
  template: `
    <div class="g-terminal__bar">
      <span class="g-terminal__dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="g-terminal__title">{{ title() }}</span>
    </div>

    <div #body class="g-terminal__body" role="log" [attr.aria-label]="title()">
      @for (line of lines(); track $index) {
        <div class="g-terminal__line" [attr.data-kind]="line.kind ?? 'output'">{{ line.text }}</div>
      }
    </div>

    @if (interactive()) {
      <div class="g-terminal__prompt">
        <span class="g-terminal__caret" aria-hidden="true">{{ prompt() }}</span>
        <input
          class="g-terminal__input"
          type="text"
          spellcheck="false"
          autocomplete="off"
          autocapitalize="off"
          [value]="draft()"
          (input)="draft.set($any($event.target).value)"
          (keydown.enter)="onSubmit($event)"
          [attr.aria-label]="title() + ' — nhập lệnh'"
        />
      </div>
    }
  `,
  styleUrl: './terminal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'g-terminal' },
})
export class GTerminal {
  // Các dòng log đang hiển thị.
  readonly lines = input<readonly GTerminalLine[]>([]);
  readonly title = input('Terminal');
  readonly prompt = input('$');
  // Có ô nhập lệnh hay không.
  readonly interactive = input(true, { transform: booleanAttribute });
  // Phát lệnh khi người dùng gõ + Enter (component tự xoá ô nhập). Consumer tự nối kết quả vào `lines`.
  // Tên 'run' (không phải 'command') vì 'command' nay là DOM event chuẩn (invoker API).
  readonly run = output<string>();

  protected readonly draft = signal('');
  private readonly body = viewChild<ElementRef<HTMLElement>>('body');

  constructor() {
    // Có dòng mới → cuộn xuống đáy (sau render, zoneless — dùng afterRenderEffect).
    afterRenderEffect(() => {
      this.lines();
      const el = this.body()?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }

  protected onSubmit(e: Event): void {
    // Bỏ qua Enter khi bộ gõ (IME tiếng Việt/CJK) đang ghép ký tự — Enter đó CHỈ xác nhận ký tự, không
    // phải để chạy lệnh; nếu không sẽ chạy 2 lần (một lúc composing, một lúc thật).
    if ((e as KeyboardEvent).isComposing) return;
    const c = this.draft().trim();
    if (!c) return;
    this.run.emit(c);
    this.draft.set('');
  }
}
