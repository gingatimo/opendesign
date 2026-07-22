import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { StepperBasicDemo } from '../demos/stepper/stepper-basic.demo';
import { StepperVerticalDemo } from '../demos/stepper/stepper-vertical.demo';
import { navigationCopyFor } from './navigation-copy';

@Component({
  imports: [StepperBasicDemo, StepperVerticalDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-stepper-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/stepper/stepper-basic.demo.ts" />

    <h2>{{ page().verticalTitle }}</h2>
    <p>{{ page().verticalIntro }}</p>
    <docs-demo-section>
      <docs-stepper-vertical-demo />
    </docs-demo-section>
    <docs-code-block src="demo-sources/stepper/stepper-vertical.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    <ul>
      @for (item of page().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
    <p>{{ page().testNote }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StepperPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => navigationCopyFor(this.i18n.tag()).stepper);
}
