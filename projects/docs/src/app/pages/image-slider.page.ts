import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { ImageSliderBasicDemo } from '../demos/image-slider/image-slider-basic.demo';
import { displayCopyFor } from './display-copy';

@Component({
  imports: [ImageSliderBasicDemo, CodeBlock, ApiTable, DemoSection],
  template: `
    <h1>{{ page().title }}</h1>
    <p>{{ page().intro }}</p>

    <docs-demo-section>
      <docs-image-slider-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/image-slider/image-slider-basic.demo.ts" />

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
export default class ImageSliderPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly page = computed(() => displayCopyFor(this.i18n.tag()).imageSlider);
}
