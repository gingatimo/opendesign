import { booleanAttribute, ChangeDetectionStrategy, Component, ElementRef, inject, input } from '@angular/core';

// Tham chiếu tối giản của một panel để GAccordion điều phối mà không phụ thuộc trực tiếp lớp panel.
export interface GAccordionPanelRef {
  close(): void;
}

// Bộ khung accordion: điều phối single-open (đóng panel khác khi mở một panel) trừ khi multiple, và
// điều hướng focus giữa các header (↑↓/Home/End).
@Component({
  selector: 'g-accordion',
  template: `<ng-content />`,
  host: { class: 'g-accordion' },
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--g-border);
      border-radius: var(--g-radius-md);
      overflow: hidden;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GAccordion {
  readonly multiple = input(false, { transform: booleanAttribute });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly panels = new Set<GAccordionPanelRef>();

  register(p: GAccordionPanelRef): void {
    this.panels.add(p);
  }
  unregister(p: GAccordionPanelRef): void {
    this.panels.delete(p);
  }
  // Panel vừa mở: nếu không cho phép nhiều, đóng các panel còn lại.
  notifyOpened(opened: GAccordionPanelRef): void {
    if (this.multiple()) return;
    for (const p of this.panels) {
      if (p !== opened) p.close();
    }
  }

  // Điều hướng focus giữa các nút header bằng bàn phím.
  moveFocus(current: HTMLElement, dir: 1 | -1 | 'first' | 'last'): void {
    const headers = [
      ...this.el.nativeElement.querySelectorAll<HTMLElement>('.g-accordion-panel__header'),
    ];
    const i = headers.indexOf(current);
    if (i < 0 || headers.length === 0) return;
    let next: number;
    if (dir === 'first') next = 0;
    else if (dir === 'last') next = headers.length - 1;
    else next = (i + dir + headers.length) % headers.length;
    headers[next]?.focus();
  }
}
