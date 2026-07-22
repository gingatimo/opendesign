import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { GFab, GIcon, GLocaleService, gIconPlus } from 'ngx-opendesign';
import { buttonCopyFor } from '../../pages/button-copy';

@Component({
  selector: 'docs-fab-basic-demo',
  imports: [GFab, GIcon],
  template: `
    <p>{{ demo().intro }}</p>
    <button g-fab [attr.aria-label]="demo().add" (click)="count.set(count() + 1)">
      <g-icon [icon]="iconPlus" />
    </button>
    <p>{{ demo().clicked(count()) }}</p>
  `,
  styles: `
    p {
      margin: 0 0 var(--g-space-3);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabBasicDemo {
  private readonly i18n = inject(GLocaleService);

  protected readonly demo = computed(() => buttonCopyFor(this.i18n.tag()).fab.demo);
  protected readonly iconPlus = gIconPlus;
  protected readonly count = signal(0);
}
