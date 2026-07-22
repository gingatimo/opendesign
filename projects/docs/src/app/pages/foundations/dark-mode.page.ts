import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService } from 'ngx-opendesign';
import { CodeBlock } from '../../shared/code-block';
import { foundationCopyFor } from './foundation-copy';

@Component({
  imports: [CodeBlock],
  template: `
    <h1>Dark mode</h1>
    <p>{{ darkMode().intro }}</p>

    <h2>{{ darkMode().enableTitle }}</h2>
    <p>{{ darkMode().enableBody }}</p>
    <docs-code-block [code]="darkMode().toggleSnippet" language="typescript" />

    <h2>{{ darkMode().themeServiceTitle }}</h2>
    <p>{{ darkMode().themeServiceBody }}</p>
    <docs-code-block [code]="themeServiceSnippet" language="typescript" />

    <h2>{{ darkMode().colorSchemeTitle }}</h2>
    <p>{{ darkMode().colorSchemeBody }}</p>
    <p>{{ darkMode().colorSchemeIntro }}</p>
    <docs-code-block [code]="darkMode().colorSchemeSnippet" language="scss" />
    <p>{{ darkMode().colorSchemeDecision }}</p>
    <p class="note">{{ darkMode().note }}</p>

    <h2>{{ darkMode().overrideTitle }}</h2>
    <p>{{ darkMode().overrideBody }}</p>
    <docs-code-block [code]="darkMode().overrideSnippet" language="scss" />
  `,
  styles: `
    .note {
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DarkModePage {
  private readonly i18n = inject(GLocaleService);
  protected readonly darkMode = computed(() => foundationCopyFor(this.i18n.tag()).darkMode);

  protected readonly themeServiceSnippet = `import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<'light' | 'dark'>('light');

  toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    const root = this.document.documentElement;
    if (this.theme() === 'dark') {
      root.setAttribute('data-g-theme', 'dark');
    } else {
      root.removeAttribute('data-g-theme');
    }
  }
}`;
}
