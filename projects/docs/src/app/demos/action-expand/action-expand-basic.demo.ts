import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GActionExpand, GActionExpandItem, gIconFileText, gIconImage } from 'ngx-opendesign';

@Component({
  selector: 'docs-action-expand-basic-demo',
  imports: [GActionExpand],
  template: `
    <p class="ae-demo__cap">Mặc định — bung sang phải</p>
    <div class="ae-demo">
      <g-action-expand label="Tải xuống" [actions]="downloads" (action)="onPick($event)" />
      <span class="ae-demo__msg">
        @if (picked()) {
          Đã chọn tải: <b>{{ picked() }}</b>
        } @else {
          Rê chuột hoặc Tab vào nút tròn để bung.
        }
      </span>
    </div>

    <p class="ae-demo__cap">
      <code>align="end"</code> — bung sang trái (đặt sát mép phải, vd. góc chart)
    </p>
    <div class="ae-demo ae-demo--right">
      <g-action-expand
        align="end"
        label="Tải xuống"
        [actions]="downloads"
        (action)="onPick($event)"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .ae-demo {
      display: flex;
      align-items: center;
      gap: var(--g-space-4);
    }
    .ae-demo--right {
      justify-content: flex-end;
    }
    .ae-demo__cap {
      margin: var(--g-space-4) 0 var(--g-space-2);
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .ae-demo__cap:first-child {
      margin-top: 0;
    }
    .ae-demo__msg {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionExpandBasicDemo {
  protected readonly downloads: GActionExpandItem[] = [
    { label: 'PDF', value: 'pdf', icon: gIconFileText },
    { label: 'SVG', value: 'svg', icon: gIconImage },
    { label: 'PNG', value: 'png', icon: gIconImage },
  ];
  protected readonly picked = signal('');

  protected onPick(item: GActionExpandItem): void {
    this.picked.set(item.label);
  }
}
