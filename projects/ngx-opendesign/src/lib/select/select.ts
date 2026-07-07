import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { gNextId } from '../core/id-generator';
import { GIcon } from '../icon/icon';
import { gIconChevronDown } from '../icon/icons';
import { GOption } from './option';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'g-select',
  imports: [CdkConnectedOverlay, GIcon],
  template: `
    <div class="g-select__trigger-content">
      @if (selectedLabel()) {
        <span>{{ selectedLabel() }}</span>
      } @else {
        <span class="g-select__placeholder">{{ placeholder() }}</span>
      }
    </div>

    <g-icon class="g-select__arrow" [icon]="gIconChevronDown" />

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="elementRef"
      [cdkConnectedOverlayOpen]="open()"
      [cdkConnectedOverlayWidth]="triggerWidth()"
      [cdkConnectedOverlayPositions]="positions"
      cdkConnectedOverlayHasBackdrop
      cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
      (backdropClick)="close()"
      (detach)="close()"
    >
      <div class="g-select__panel" role="listbox" [attr.id]="listboxId">
        <ng-content />
      </div>
    </ng-template>
  `,
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-select',
    role: 'combobox',
    tabindex: '0',
    'aria-haspopup': 'listbox',
    '[attr.aria-expanded]': 'open()',
    '[attr.aria-disabled]': 'disabled() ? "true" : null',
    '[attr.aria-controls]': 'listboxId',
    '[attr.aria-activedescendant]': 'activeDescendantId()',
    '[class.g-select--disabled]': 'disabled()',
    '[class.g-select--open]': 'open()',
    '(click)': 'onTriggerClick()',
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'onTouchedFn()',
  },
})
export class GSelect implements ControlValueAccessor {
  readonly placeholder = input('');
  /** Hàm so sánh option value (tham số 1) với giá trị đang bind của control (tham số 2). */
  readonly compareWith = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);

  protected readonly open = signal(false);
  protected readonly triggerWidth = signal(0);
  protected readonly activeIndex = signal(-1);
  protected readonly disabled = signal(false);
  protected readonly positions = POSITIONS;
  protected readonly listboxId = gNextId('g-select-listbox');
  protected readonly gIconChevronDown = gIconChevronDown;

  private readonly valueSignal = signal<unknown>(undefined);
  private readonly optionsList = contentChildren(GOption);

  private onChange: (value: unknown) => void = () => undefined;
  protected onTouchedFn: () => void = () => undefined;

  private typeaheadBuffer = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngControl = inject(NgControl, { optional: true, self: true });

  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  protected readonly selectedLabel = computed(() => {
    const value = this.valueSignal();
    if (value === undefined || value === null) return '';
    const match = this.optionsList().find((o) => this.compareWith()(o.value(), value));
    return match ? match.getLabel() : '';
  });

  isSelected(value: unknown): boolean {
    return this.compareWith()(value, this.valueSignal());
  }

  isActive(option: GOption): boolean {
    return this.optionsList()[this.activeIndex()] === option;
  }

  protected readonly activeDescendantId = computed(() => {
    if (!this.open()) return null;
    const active = this.optionsList()[this.activeIndex()];
    return active ? active.id : null;
  });

  selectValue(value: unknown): void {
    this.valueSignal.set(value);
    this.onChange(value);
    this.onTouchedFn();
    this.close();
  }

  close(): void {
    this.open.set(false);
    this.activeIndex.set(-1);
  }

  protected onTriggerClick(): void {
    if (this.disabled()) return;
    if (this.open()) {
      this.close();
    } else {
      this.openPanel();
    }
  }

  private openPanel(): void {
    this.triggerWidth.set(this.elementRef.nativeElement.offsetWidth);
    const currentIndex = this.optionsList().findIndex((o) => this.isSelected(o.value()));
    this.activeIndex.set(currentIndex >= 0 ? currentIndex : 0);
    this.open.set(true);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    // Cmd/Ctrl/Alt + chữ cái là phím tắt hệ thống (copy, reload, bôi đậm...),
    // không phải ý định gõ typeahead — bỏ qua để tránh chọn nhầm option.
    const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

    if (!this.open()) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.openPanel();
        return;
      }
      if (!hasModifier && event.key.length === 1) {
        this.handleTypeaheadWhileClosed(event.key);
      }
      return;
    }

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveActive(-1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.commitActive();
        break;
      default:
        if (!hasModifier && event.key.length === 1) {
          this.handleTypeaheadWhileOpen(event.key);
        }
    }
  }

  private moveActive(direction: 1 | -1): void {
    const list = this.optionsList();
    if (list.length === 0) return;
    const next = (this.activeIndex() + direction + list.length) % list.length;
    this.activeIndex.set(next);
  }

  private commitActive(): void {
    const option = this.optionsList()[this.activeIndex()];
    if (option && !option.disabled()) {
      this.selectValue(option.value());
    }
  }

  private handleTypeaheadWhileClosed(char: string): void {
    const match = this.findTypeaheadMatch(char);
    if (match) {
      this.selectValue(match.value());
    }
  }

  private handleTypeaheadWhileOpen(char: string): void {
    const match = this.findTypeaheadMatch(char);
    if (match) {
      this.activeIndex.set(this.optionsList().indexOf(match));
    }
  }

  private findTypeaheadMatch(char: string): GOption | undefined {
    this.typeaheadBuffer += char.toLowerCase();
    clearTimeout(this.typeaheadTimer);
    this.typeaheadTimer = setTimeout(() => {
      this.typeaheadBuffer = '';
    }, 500);
    return this.optionsList().find(
      (o) => !o.disabled() && o.getLabel().toLowerCase().startsWith(this.typeaheadBuffer),
    );
  }

  writeValue(value: unknown): void {
    this.valueSignal.set(value);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
