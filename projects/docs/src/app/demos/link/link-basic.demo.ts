import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLink, GLocaleService } from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-link-basic-demo',
  imports: [GLink],
  template: `
    <p>
      {{ copy().before }}
      <a gLink href="https://example.com">{{ copy().docs }}</a
      >{{ copy().middle }} <a gLink href="/">{{ copy().home }}</a
      >{{ copy().after }}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).link.demo);
}
