import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { G_RADIO_GROUP, GRadioGroup } from './radio-group';

@Component({
  selector: 'g-radio',
  template: `
    <span class="g-radio__dot" [class.g-radio__dot--checked]="checked()"></span>
    <span class="g-radio__label"><ng-content /></span>
  `,
  styleUrl: './radio.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-radio',
    role: 'radio',
    '[attr.aria-checked]': 'checked()',
    '[attr.tabindex]': 'tabIndexValue()',
    '[attr.aria-disabled]': 'effectiveDisabled() ? "true" : null',
    '[class.g-radio--disabled]': 'effectiveDisabled()',
    '[class.g-radio--invalid]': 'groupInvalid()',
    '(click)': 'select()',
    '(keydown.arrowright)': 'onArrow($event, 1)',
    '(keydown.arrowdown)': 'onArrow($event, 1)',
    '(keydown.arrowleft)': 'onArrow($event, -1)',
    '(keydown.arrowup)': 'onArrow($event, -1)',
    '(keydown.space)': 'onSpace($event)',
  },
})
export class GRadio {
  readonly value = input.required<unknown>();
  readonly disabled = input(false, { transform: booleanAttribute });

  private readonly group = inject<GRadioGroup>(G_RADIO_GROUP);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly checked = computed(() => this.group.isSelected(this.value()));
  protected readonly effectiveDisabled = computed(
    () => this.disabled() || this.group.isGroupDisabled(),
  );
  // Nhóm invalid (bắt buộc chọn nhưng chưa chọn + đã touched) → tô đỏ mọi nút tròn cho tới khi chọn.
  protected readonly groupInvalid = computed(() => this.group.isInvalid());
  protected readonly tabIndexValue = computed(() => {
    if (this.group.isGroupDisabled()) return -1;
    if (this.checked()) return 0;
    if (this.group.hasCheckedRadio()) return -1;
    return this.group.isFirst(this) ? 0 : -1;
  });

  focusSelf(): void {
    this.elementRef.nativeElement.focus();
  }

  protected select(): void {
    if (this.disabled() || this.group.isGroupDisabled()) return;
    this.group.selectValue(this.value());
  }

  protected onSpace(event: Event): void {
    event.preventDefault();
    this.select();
  }

  protected onArrow(event: Event, direction: 1 | -1): void {
    event.preventDefault();
    this.group.moveSelection(this.value(), direction);
  }
}
