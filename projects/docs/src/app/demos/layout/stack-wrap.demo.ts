import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GChip, GStack } from 'ngx-opendesign';

@Component({
  selector: 'docs-stack-wrap-demo',
  imports: [GStack, GChip],
  template: `
    <g-stack direction="horizontal" [gap]="2" [wrap]="true" align="center">
      @for (tag of tags; track tag) {
        <g-chip>{{ tag }}</g-chip>
      }
    </g-stack>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackWrapDemo {
  protected readonly tags = [
    'Angular',
    'Signals',
    'Standalone',
    'Zoneless',
    'OnPush',
    'Design System',
    'Accessibility',
    'Tree-shakable',
    'TypeScript',
    'CSS Grid',
  ];
}
