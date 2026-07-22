import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  GActionExpand,
  GActionExpandItem,
  GLocaleService,
  gIconFileText,
  gIconImage,
} from 'ngx-opendesign';
import { buttonCopyFor } from '../../pages/button-copy';

@Component({
  selector: 'docs-action-expand-basic-demo',
  imports: [GActionExpand],
  template: `
    <p class="ae-demo__cap">{{ demo().defaultCaption }}</p>
    <div class="ae-demo">
      <g-action-expand [label]="demo().label" [actions]="downloads" (action)="onPick($event)" />
      <span class="ae-demo__msg">
        @if (picked()) {
          {{ demo().picked(picked()) }}
        } @else {
          {{ demo().empty }}
        }
      </span>
    </div>

    <p class="ae-demo__cap">
      {{ demo().endCaption }}
    </p>
    <div class="ae-demo ae-demo--right">
      <g-action-expand
        align="end"
        [label]="demo().label"
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
  private readonly i18n = inject(GLocaleService);

  protected readonly demo = computed(() => buttonCopyFor(this.i18n.tag()).actionExpand.demo);
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
