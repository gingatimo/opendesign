import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { TokenTable } from '../../shared/token-table';
import { foundationCopyFor } from './foundation-copy';

@Component({
  imports: [TokenTable],
  template: `
    <h1>{{ colors().title }}</h1>
    <p>{{ colors().intro }}</p>

    <h2>{{ colors().semanticTitle }}</h2>
    <docs-token-table [rows]="colors().semanticRows" preview="color" />

    <h2>{{ colors().stateTitle }}</h2>
    <p>{{ colors().stateBody }}</p>
    <docs-token-table [rows]="colors().stateRows" preview="color" />

    <h2>{{ colors().principlesTitle }}</h2>
    <ul>
      @for (principle of colors().principles; track principle) {
        <li>{{ principle }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColorsPage {
  private readonly i18n = inject(GLocaleService);
  protected readonly colors = computed(() => foundationCopyFor(this.i18n.tag()).colors);
}
