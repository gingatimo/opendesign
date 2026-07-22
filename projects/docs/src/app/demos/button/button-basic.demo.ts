import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GButton, GLocaleService } from 'ngx-opendesign';
import { buttonCopyFor } from '../../pages/button-copy';

@Component({
  selector: 'docs-button-basic-demo',
  imports: [GButton],
  template: `
    <button g-button>{{ demo().save }}</button>
    <button g-button variant="secondary">{{ demo().draft }}</button>
    <button g-button variant="outline">{{ demo().cancel }}</button>
    <button g-button variant="ghost">{{ demo().skip }}</button>
    <button g-button variant="danger">{{ demo().delete }}</button>
    <button g-button [loading]="true">{{ demo().saving }}</button>
    <button g-button size="sm">{{ demo().small }}</button>
    <button g-button size="lg">{{ demo().large }}</button>
    <button g-button disabled>{{ demo().disabled }}</button>
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
export class ButtonBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly demo = computed(() => buttonCopyFor(this.i18n.tag()).button.demo);
}
