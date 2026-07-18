import { booleanAttribute, ChangeDetectionStrategy, Component, input, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'g-step',
  // Nội dung bọc trong ng-template để GStepper chỉ render bước active (gương GTab).
  template: `<ng-template #content><ng-content /></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GStep {
  readonly label = input.required<string>();
  readonly optional = input(false, { transform: booleanAttribute });
  readonly content = viewChild.required<TemplateRef<unknown>>('content');
}
