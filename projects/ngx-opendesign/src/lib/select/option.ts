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
import { GIcon } from '../icon/icon';
import { gIconCheck } from '../icon/icons';
import { GSelect } from './select';

@Component({
  selector: 'g-option',
  imports: [GIcon],
  template: `
    @if (select.multiple()) {
      <span class="g-option__check" aria-hidden="true">
        @if (selected()) {
          <g-icon [icon]="iconCheck" size="sm" />
        }
      </span>
    }
    <span class="g-option__label"><ng-content /></span>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: var(--g-space-2);
      padding: var(--g-space-2) var(--g-space-3);
      border-radius: var(--g-radius-pill);
      font-family: var(--g-font-family);
      font-size: var(--g-font-size-md);
      color: var(--g-text);
      cursor: pointer;
    }

    :host(.g-option--hidden) {
      display: none;
    }

    :host(.g-option--active) {
      background: var(--g-surface);
    }

    :host(:hover:not(.g-option--disabled)) {
      background: var(--g-surface);
    }

    :host(.g-option--selected) {
      font-weight: 500;
    }

    :host(.g-option--disabled) {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .g-option__check {
      flex: none;
      display: inline-flex;
      width: 16px;
      color: var(--g-primary);
    }

    .g-option__label {
      flex: 1;
      min-width: 0;
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
    '[class.g-option--hidden]': 'hidden()',
    '(click)': 'onClick()',
  },
})
export class GOption {
  readonly value = input.required<unknown>();
  readonly disabled = input(false, { transform: booleanAttribute });

  readonly id = gNextId('g-option');
  protected readonly iconCheck = gIconCheck;

  protected readonly select = inject(GSelect);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly selected = computed(() => this.select.isSelected(this.value()));
  protected readonly active = computed(() => this.select.isActive(this));
  protected readonly hidden = computed(() => !this.select.isOptionVisible(this));

  getLabel(): string {
    const label = this.elementRef.nativeElement.querySelector('.g-option__label');
    return (label ?? this.elementRef.nativeElement).textContent?.trim() ?? '';
  }

  protected onClick(): void {
    if (this.disabled()) return;
    this.select.selectValue(this.value());
  }
}
