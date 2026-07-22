import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  GButton,
  gIconDownload,
  GIcon,
  GLocaleService,
  gIconPlus,
  gIconTrash,
} from 'ngx-opendesign';
import { buttonCopyFor } from '../../pages/button-copy';

@Component({
  selector: 'docs-button-icon-text-demo',
  imports: [GButton, GIcon],
  template: `
    <button g-button>
      <g-icon [icon]="gIconPlus" />
      {{ demo().create }}
    </button>
    <button g-button variant="outline">
      <g-icon [icon]="gIconDownload" />
      {{ demo().download }}
    </button>
    <button g-button variant="danger">
      <g-icon [icon]="gIconTrash" />
      {{ demo().delete }}
    </button>
  `,
  styles: `
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--g-space-3);
      align-items: center;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIconTextDemo {
  private readonly i18n = inject(GLocaleService);

  protected readonly demo = computed(() => buttonCopyFor(this.i18n.tag()).button.demo);
  protected readonly gIconPlus = gIconPlus;
  protected readonly gIconDownload = gIconDownload;
  protected readonly gIconTrash = gIconTrash;
}
