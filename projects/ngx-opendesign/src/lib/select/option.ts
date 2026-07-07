import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { gNextId } from '../core/id-generator';
import { GSelect } from './select';

@Component({
  selector: 'g-option',
  template: `<ng-content />`,
  styles: `
    :host {
      display: block;
      padding: var(--g-space-2) var(--g-space-3);
      border-radius: var(--g-radius-sm);
      font-family: var(--g-font-family);
      font-size: var(--g-font-size-md);
      color: var(--g-text);
      cursor: pointer;
    }

    :host(.g-option--active) {
      background: var(--g-surface);
    }

    :host(.g-option--selected) {
      font-weight: 500;
    }

    :host(.g-option--disabled) {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-option',
    role: 'option',
    '[attr.id]': 'id',
    '[attr.aria-selected]': 'selected()',
    '[class.g-option--active]': 'active()',
    '[class.g-option--selected]': 'selected()',
    '[class.g-option--disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class GOption {
  readonly value = input.required<unknown>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly id = gNextId('g-option');

  private readonly select = inject(GSelect);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly selected = computed(() => this.select.isSelected(this.value()));
  protected readonly active = computed(() => this.select.isActive(this));

  getLabel(): string {
    return this.elementRef.nativeElement.textContent?.trim() ?? '';
  }

  protected onClick(): void {
    if (this.disabled()) return;
    this.select.selectValue(this.value());
  }
}
