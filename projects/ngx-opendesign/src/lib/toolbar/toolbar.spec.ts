import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GToolbar, GToolbarItem } from './toolbar';

@Component({
  imports: [GToolbar, GToolbarItem],
  template: `
    <g-toolbar ariaLabel="Farm commands" [orientation]="orientation()" [wrap]="wrap()">
      @for (item of items(); track item.id) {
        <button
          gToolbarItem
          type="button"
          [attr.data-item-id]="item.id"
          [gToolbarItemDisabled]="item.disabled"
        >
          {{ item.label }}
        </button>
      }
    </g-toolbar>
  `,
})
class ToolbarHost {
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly wrap = signal(false);
  readonly items = signal([
    { id: 'select', label: 'Select', disabled: false },
    { id: 'undo', label: 'Undo', disabled: true },
    { id: 'redo', label: 'Redo', disabled: false },
  ]);
}

async function makeToolbar() {
  const fixture = TestBed.createComponent(ToolbarHost);
  await fixture.whenStable();
  const toolbar = fixture.nativeElement.querySelector('g-toolbar') as HTMLElement;
  const items = () => [...toolbar.querySelectorAll<HTMLButtonElement>('[gToolbarItem]')];
  return { fixture, toolbar, items };
}

describe('GToolbar', () => {
  it('exposes toolbar semantics and one tab stop while keeping disabled commands discoverable', async () => {
    const { toolbar, items } = await makeToolbar();

    expect(toolbar.getAttribute('role')).toBe('toolbar');
    expect(toolbar.getAttribute('aria-label')).toBe('Farm commands');
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
    expect(items().map((item) => item.tabIndex)).toEqual([0, -1, -1]);
    expect(items()[1].getAttribute('aria-disabled')).toBe('true');
    expect(items()[1].disabled).toBe(false);
  });

  it('uses orientation-aware arrows plus Home and End for roving focus', async () => {
    const { fixture, toolbar, items } = await makeToolbar();
    items()[0].focus();

    items()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(document.activeElement).toBe(items()[1]);
    expect(items().map((item) => item.tabIndex)).toEqual([-1, 0, -1]);

    toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await fixture.whenStable();
    expect(document.activeElement).toBe(items()[2]);

    fixture.componentInstance.orientation.set('vertical');
    await fixture.whenStable();
    toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await fixture.whenStable();
    expect(document.activeElement).toBe(items()[1]);

    toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await fixture.whenStable();
    expect(document.activeElement).toBe(items()[0]);
  });

  it('stops at an edge by default and wraps only when requested', async () => {
    const { fixture, toolbar, items } = await makeToolbar();
    items()[2].focus();
    toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(document.activeElement).toBe(items()[2]);

    fixture.componentInstance.wrap.set(true);
    await fixture.whenStable();
    toolbar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(document.activeElement).toBe(items()[0]);
  });

  it('restores the roving tab stop to the nearest item when the active item is removed', async () => {
    const { fixture, items } = await makeToolbar();
    items()[2].focus();
    items()[2].dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    await fixture.whenStable();

    fixture.componentInstance.items.update((items) => items.slice(0, 2));
    await fixture.whenStable();

    expect(items()).toHaveLength(2);
    expect(items().map((item) => item.tabIndex)).toEqual([-1, 0]);
    expect(document.activeElement).toBe(items()[1]);
  });
});
