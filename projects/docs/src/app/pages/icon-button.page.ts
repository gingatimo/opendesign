import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GLink, GLocaleService } from 'ngx-opendesign';
import { ApiTable } from '../shared/api-table';
import { CodeBlock } from '../shared/code-block';
import { DemoSection } from '../shared/demo-section';
import { IconButtonBasicDemo } from '../demos/icon-button/icon-button-basic.demo';
import { buttonCopyFor } from './button-copy';

@Component({
  imports: [IconButtonBasicDemo, CodeBlock, ApiTable, DemoSection, RouterLink, GLink],
  template: `
    <h1>{{ iconButton().title }}</h1>
    <p>
      {{ iconButton().introPrefix }}
      <a gLink routerLink="/components/icon">{{ iconButton().iconSetLink }}</a>
      {{ iconButton().introSuffix }}
    </p>

    <docs-demo-section>
      <docs-icon-button-basic-demo />
    </docs-demo-section>

    <docs-code-block src="demo-sources/icon-button/icon-button-basic.demo.ts" />

    <h2>{{ iconButton().apiTitle }}</h2>
    <docs-api-table [rows]="iconButton().apiRows" />

    <h2>{{ iconButton().accessibilityTitle }}</h2>
    <ul>
      @for (item of iconButton().accessibility; track $index) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IconButtonPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly iconButton = computed(() => buttonCopyFor(this.i18n.tag()).iconButton);
}
