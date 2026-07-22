import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  inject,
  input,
  model,
} from '@angular/core';
import { gNextId } from '../core/id-generator';
import { GLocaleService } from '../core/locale';
import { GIcon } from '../icon/icon';
import { gIconCheck } from '../icon/icons';
import { GStep } from './step';

// Wizard: thanh bước (ol + aria-current) + render nội dung bước active (ngTemplateOutlet, chỉ active
// instantiate — gương GTabs). Header bấm được (non-linear); consumer tự gắn nút Tiếp/Quay lại qua
// [(activeStep)].
@Component({
  selector: 'g-stepper',
  imports: [NgTemplateOutlet, GIcon],
  template: `
    <ol class="g-stepper__list">
      @for (step of steps(); track $index) {
        <li
          class="g-stepper__step"
          [class.g-stepper__step--completed]="$index < active()"
          [class.g-stepper__step--active]="$index === active()"
          [class.g-stepper__step--upcoming]="$index > active()"
          [attr.aria-current]="$index === active() ? 'step' : null"
        >
          <button
            type="button"
            class="g-stepper__header"
            [id]="headerId($index)"
            (click)="select($index)"
            [attr.aria-label]="headerAriaLabel(step, $index)"
            [attr.aria-controls]="$index === active() ? panelId($index) : null"
          >
            <span class="g-stepper__indicator" aria-hidden="true">
              @if ($index < active()) {
                <g-icon [icon]="iconCheck" size="sm" />
              } @else {
                {{ $index + 1 }}
              }
            </span>
            <span class="g-stepper__label">
              {{ step.label() }}
              @if (step.optional()) {
                <span class="g-stepper__optional"> ({{ t().stepper.optional }})</span>
              }
            </span>
          </button>
          @if (orientation() === 'vertical' && $index === active()) {
            <div
              class="g-stepper__panel"
              role="group"
              [id]="panelId($index)"
              [attr.aria-labelledby]="headerId($index)"
            >
              <ng-container [ngTemplateOutlet]="step.content()" />
            </div>
          }
        </li>
      }
    </ol>
    @if (orientation() === 'horizontal') {
      <div
        class="g-stepper__panel"
        role="group"
        [id]="panelId(active())"
        [attr.aria-labelledby]="headerId(active())"
      >
        @if (activeStepRef(); as ref) {
          <ng-container [ngTemplateOutlet]="ref.content()" />
        }
      </div>
    }
  `,
  styleUrl: './stepper.scss',
  host: { class: 'g-stepper', '[class.g-stepper--vertical]': `orientation() === 'vertical'` },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GStepper {
  readonly activeStep = model(0);
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly steps = contentChildren(GStep);
  protected readonly iconCheck = gIconCheck;
  private readonly i18n = inject(GLocaleService);
  protected readonly t = this.i18n.strings;

  // Liên kết ARIA: panel nội dung có role="group" + aria-labelledby trỏ về header của bước, header
  // active có aria-controls trỏ tới panel (gương cách GTabs nối tab↔tabpanel). Id ổn định qua gNextId.
  private readonly headerIdPrefix = gNextId('g-step-header');
  private readonly panelIdPrefix = gNextId('g-step-panel');

  // Clamp index ngoài khoảng về 0 (giống GTabs.activeIndex) để luôn có đúng một bước active hợp lệ.
  protected readonly active = computed(() => {
    const n = this.steps().length;
    const a = this.activeStep();
    return a >= 0 && a < n ? a : 0;
  });
  protected readonly activeStepRef = computed(() => this.steps()[this.active()] ?? null);

  protected select(index: number): void {
    this.activeStep.set(index);
  }

  protected headerId(index: number): string {
    return `${this.headerIdPrefix}-${index}`;
  }

  protected panelId(index: number): string {
    return `${this.panelIdPrefix}-${index}`;
  }

  protected headerAriaLabel(step: GStep, index: number): string {
    const state =
      index < this.active()
        ? this.t().stepper.completed
        : index === this.active()
          ? this.t().stepper.current
          : this.t().stepper.upcoming;
    const optional = step.optional() ? `, ${this.t().stepper.optional}` : '';
    return this.t().stepper.header(index + 1, step.label(), optional, state);
  }
}
