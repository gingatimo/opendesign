import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ToastBasicDemo } from '../demos/toast/toast-basic.demo';
import { ToastPositionDemo } from '../demos/toast/toast-position.demo';
import { overlayCopyFor } from './overlay-copy';

@Component({
  imports: [ToastBasicDemo, ToastPositionDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-toast-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/toast/toast-basic.demo.ts" />

    <h2>{{ page().positionTitle }}</h2>
    <p>{{ page().positionIntro }}</p>

    <docs-demo-section>
      <docs-toast-position-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/toast/toast-position.demo.ts" />

    <h2>{{ page().apiTitle }}</h2>
    <docs-api-table [rows]="page().apiRows" />

    <h2>{{ page().accessibilityTitle }}</h2>
    <ul>
      @for (item of page().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ToastPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => overlayCopyFor(this.i18n.tag()).toast);
}
