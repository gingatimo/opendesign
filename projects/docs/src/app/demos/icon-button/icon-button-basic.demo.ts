import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GIcon, GIconButton, GLocaleService, gIconPlus, gIconSearch, gIconX } from 'ngx-opendesign';
import { buttonCopyFor } from '../../pages/button-copy';

@Component({
  selector: 'docs-icon-button-basic-demo',
  imports: [GIconButton, GIcon],
  template: `
    <button g-icon-button [attr.aria-label]="demo().add">
      <g-icon [icon]="iconPlus" />
    </button>
    <button g-icon-button variant="primary" [attr.aria-label]="demo().search">
      <g-icon [icon]="iconSearch" />
    </button>
    <button g-icon-button variant="outline" size="lg" [attr.aria-label]="demo().close">
      <g-icon [icon]="iconX" size="lg" />
    </button>
  `,
  styles: `
    :host {
      display: flex;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonBasicDemo {
  private readonly i18n = inject(GLocaleService);

  protected readonly demo = computed(() => buttonCopyFor(this.i18n.tag()).iconButton.demo);
  protected readonly iconPlus = gIconPlus;
  protected readonly iconSearch = gIconSearch;
  protected readonly iconX = gIconX;
}
