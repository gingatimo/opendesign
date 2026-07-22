import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {
  GActionMenu,
  GActionMenuItem,
  GActionMenuPlacement,
  GLocaleService,
  gIconCopy,
  gIconEdit,
  gIconTrash,
} from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-action-menu-basic-demo',
  imports: [GActionMenu],
  template: `
    <p class="am-demo__cap">{{ copy().defaultCaption }}</p>
    <div class="am-demo">
      <g-action-menu [label]="copy().actionLabel" [items]="items()" (action)="onPick($event)" />
      <span class="am-demo__msg">
        @if (picked()) {
          {{ copy().selected }} <b>{{ picked() }}</b>
        } @else {
          {{ copy().prompt }}
        }
      </span>
    </div>

    <p class="am-demo__cap">{{ copy().labelCaption }}</p>
    <nav class="am-demo__nav">
      <span class="am-demo__link">{{ copy().home }}</span>
      <g-action-menu
        variant="label"
        [label]="copy().products"
        [items]="products()"
        (action)="onPick($event)"
      />
      <g-action-menu
        variant="label"
        [label]="copy().supportLabel"
        [items]="support()"
        (action)="onPick($event)"
      />
    </nav>

    <p class="am-demo__cap">{{ copy().placementCaption }}</p>
    <div class="am-demo__corners">
      @for (p of placements; track p) {
        <g-action-menu
          [placement]="p"
          [label]="p"
          [items]="items()"
          variant="label"
          (action)="onPick($event)"
        />
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .am-demo {
      display: flex;
      align-items: center;
      gap: var(--g-space-4);
    }
    .am-demo__cap {
      margin: var(--g-space-4) 0 var(--g-space-2);
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .am-demo__cap:first-child {
      margin-top: 0;
    }
    .am-demo__msg {
      font-size: var(--g-font-size-sm);
      color: var(--g-text-muted);
    }
    .am-demo__nav {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
    }
    .am-demo__corners {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-2);
    }
    .am-demo__link {
      display: inline-flex;
      align-items: center;
      height: var(--g-control-md);
      padding: 0 var(--g-space-3);
      border-radius: var(--g-radius-pill);
      font-size: var(--g-font-size-md);
      color: var(--g-text);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).actionMenu.demo);
  protected readonly items = computed<GActionMenuItem[]>(() => [
    { ...this.copy().items[0], icon: gIconEdit },
    { ...this.copy().items[1], icon: gIconCopy },
    { ...this.copy().items[2], icon: gIconTrash },
  ]);
  protected readonly products = computed<GActionMenuItem[]>(() => this.copy().productsItems);
  protected readonly support = computed<GActionMenuItem[]>(() => this.copy().supportItems);
  protected readonly placements: GActionMenuPlacement[] = [
    'bottom-left',
    'bottom-right',
    'top-left',
    'top-right',
  ];
  protected readonly picked = signal('');

  protected onPick(item: GActionMenuItem): void {
    this.picked.set(item.label);
  }
}
