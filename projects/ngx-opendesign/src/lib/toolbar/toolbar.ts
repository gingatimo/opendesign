import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';

export type GToolbarOrientation = 'horizontal' | 'vertical';

@Directive({
  selector: '[gToolbarItem]',
  host: {
    class: 'g-toolbar__item',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '(click)': 'onClick($event)',
  },
})
export class GToolbarItem {
  readonly disabled = input(false, {
    alias: 'gToolbarItemDisabled',
    transform: booleanAttribute,
  });

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);

  setTabIndex(value: 0 | -1): void {
    this.element.nativeElement.tabIndex = value;
  }

  focus(): void {
    this.element.nativeElement.focus();
  }

  contains(target: EventTarget | null): boolean {
    return target instanceof Node && this.element.nativeElement.contains(target);
  }

  protected onClick(event: MouseEvent): void {
    if (!this.disabled()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}

@Component({
  selector: 'g-toolbar',
  template: `<ng-content />`,
  styleUrl: './toolbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-toolbar',
    role: 'toolbar',
    '[attr.aria-label]': 'ariaLabel()',
    '[attr.aria-orientation]': 'orientation()',
    '[class.g-toolbar--vertical]': 'orientation() === "vertical"',
    '(focusin)': 'onFocusIn($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class GToolbar {
  readonly ariaLabel = input.required<string>();
  readonly orientation = input<GToolbarOrientation>('horizontal');
  readonly wrap = input(false, { transform: booleanAttribute });

  private readonly items = contentChildren(GToolbarItem, { descendants: true });
  private readonly activeIndex = signal(0);
  private readonly pendingFocus = signal(false);

  constructor() {
    effect(() => {
      const items = this.items();
      const requested = this.activeIndex();
      const next = items.length === 0 ? 0 : Math.min(requested, items.length - 1);
      untracked(() => {
        if (requested !== next) {
          this.activeIndex.set(next);
          this.pendingFocus.set(true);
        }
        this.setTabStops(items, next);
      });
    });
    afterRenderEffect(() => {
      if (!this.pendingFocus()) return;
      this.items()[this.activeIndex()]?.focus();
      this.pendingFocus.set(false);
    });
  }

  protected onFocusIn(event: FocusEvent): void {
    const index = this.items().findIndex((item) => item.contains(event.target));
    if (index >= 0) {
      this.activate(index, false);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const items = this.items();
    if (items.length === 0) return;
    const focusedIndex = items.findIndex((item) => item.contains(event.target));
    const current = focusedIndex >= 0 ? focusedIndex : this.activeIndex();
    let next: number | null = null;
    switch (event.key) {
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = items.length - 1;
        break;
      case 'ArrowRight':
        if (this.orientation() === 'horizontal') next = this.offset(current, 1, items.length);
        break;
      case 'ArrowLeft':
        if (this.orientation() === 'horizontal') next = this.offset(current, -1, items.length);
        break;
      case 'ArrowDown':
        if (this.orientation() === 'vertical') next = this.offset(current, 1, items.length);
        break;
      case 'ArrowUp':
        if (this.orientation() === 'vertical') next = this.offset(current, -1, items.length);
        break;
      default:
        return;
    }
    if (next === null) return;
    event.preventDefault();
    this.activate(next, true);
  }

  private activate(index: number, focus: boolean): void {
    const items = this.items();
    const item = items[index];
    if (!item) return;
    this.activeIndex.set(index);
    this.setTabStops(items, index);
    if (focus) item.focus();
  }

  private offset(current: number, delta: -1 | 1, length: number): number {
    const candidate = current + delta;
    if (candidate >= 0 && candidate < length) return candidate;
    if (!this.wrap()) return current;
    return candidate < 0 ? length - 1 : 0;
  }

  private setTabStops(items: readonly GToolbarItem[], activeIndex: number): void {
    items.forEach((item, index) => item.setTabIndex(index === activeIndex ? 0 : -1));
  }
}
