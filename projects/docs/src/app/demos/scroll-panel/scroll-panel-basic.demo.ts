import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GLocaleService, GScrollPanel } from 'ngx-opendesign';
import { layoutCopyFor } from '../../pages/layout-copy';

@Component({
  selector: 'docs-scroll-panel-basic-demo',
  imports: [GScrollPanel],
  template: `
    <g-scroll-panel maxHeight="180px">
      @for (paragraph of copy().paragraphs; track $index) {
        <p>{{ paragraph }}</p>
      }
    </g-scroll-panel>
  `,
  styles: `
    :host {
      display: block;
      max-width: 420px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollPanelBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => layoutCopyFor(this.i18n.tag()).scrollPanel.demo);
}
