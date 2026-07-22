import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ProgressBasicDemo } from '../demos/progress/progress-basic.demo';
import { ProgressCircleDemo } from '../demos/progress/progress-circle.demo';
import { displayCopyFor } from './display-copy';

@Component({
  imports: [ProgressBasicDemo, ProgressCircleDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-progress-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/progress/progress-basic.demo.ts" />

    <h2>{{ page().circleTitle }}</h2>
    <p>{{ page().circleIntro }}</p>

    <docs-demo-section>
      <docs-progress-circle-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/progress/progress-circle.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().circleApiTitle }}</h2>
    <docs-api-table [rows]="page().circleApiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    <ul>
      @for (item of page().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProgressPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => displayCopyFor(this.i18n.tag()).progress);
}
