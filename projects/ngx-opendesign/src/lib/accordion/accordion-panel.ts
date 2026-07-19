import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  model,
  OnInit,
} from '@angular/core';
import { gNextId } from '../core/id-generator';
import { GIcon } from '../icon/icon';
import { gIconChevronDown } from '../icon/icons';
import { GAccordion, GAccordionPanelRef } from './accordion';

// Một panel gập/mở trong GAccordion. Header là <button> (Enter/Space toggle), nội dung là region có
// nhãn. [(open)] hai chiều. Nội dung header chiếu qua [gAccordionHeader], phần còn lại là nội dung.
@Component({
  selector: 'g-accordion-panel',
  imports: [GIcon],
  template: `
    <button
      type="button"
      class="g-accordion-panel__header"
      [id]="headerId"
      [attr.aria-expanded]="open()"
      [attr.aria-controls]="contentId"
      (click)="toggle()"
      (keydown)="onKeydown($event)"
    >
      <span class="g-accordion-panel__title"><ng-content select="[gAccordionHeader]" /></span>
      <g-icon class="g-accordion-panel__chevron" [icon]="iconChevron" size="sm" />
    </button>
    <div
      class="g-accordion-panel__region"
      role="region"
      [id]="contentId"
      [attr.aria-labelledby]="headerId"
      [attr.inert]="open() ? null : ''"
    >
      <div class="g-accordion-panel__content"><ng-content /></div>
    </div>
  `,
  host: {
    class: 'g-accordion-panel',
    '[class.g-accordion-panel--open]': 'open()',
  },
  styleUrl: './accordion-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GAccordionPanel implements OnInit {
  readonly open = model(false);

  protected readonly headerId = gNextId('g-accordion-header');
  protected readonly contentId = gNextId('g-accordion-content');
  protected readonly iconChevron = gIconChevronDown;

  private readonly accordion = inject(GAccordion);
  private readonly ref: GAccordionPanelRef = { close: () => this.open.set(false) };

  constructor() {
    inject(DestroyRef).onDestroy(() => this.accordion.unregister(this.ref));
  }
  ngOnInit(): void {
    this.accordion.register(this.ref);
    if (this.open()) this.accordion.notifyOpened(this.ref);
  }

  protected toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (next) this.accordion.notifyOpened(this.ref);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const t = event.target as HTMLElement;
    switch (event.key) {
      case 'ArrowDown':
        this.accordion.moveFocus(t, 1);
        event.preventDefault();
        break;
      case 'ArrowUp':
        this.accordion.moveFocus(t, -1);
        event.preventDefault();
        break;
      case 'Home':
        this.accordion.moveFocus(t, 'first');
        event.preventDefault();
        break;
      case 'End':
        this.accordion.moveFocus(t, 'last');
        event.preventDefault();
        break;
    }
  }
}
