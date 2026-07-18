import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GBadge, GStack } from 'ngx-opendesign';

@Component({
  selector: 'docs-stack-basic-demo',
  imports: [GStack, GBadge],
  template: `
    <g-stack gap="3">
      <g-badge>Hàng 1</g-badge>
      <g-badge>Hàng 2</g-badge>
      <g-badge>Hàng 3</g-badge>
    </g-stack>
    <g-stack direction="horizontal" gap="2">
      <g-badge variant="success">Cột 1</g-badge>
      <g-badge variant="warning">Cột 2</g-badge>
      <g-badge variant="danger">Cột 3</g-badge>
    </g-stack>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--g-space-6);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackBasicDemo {}
