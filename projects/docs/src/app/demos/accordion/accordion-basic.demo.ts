import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { GAccordion, GAccordionPanel, GLocaleService } from 'ngx-opendesign';
import { navigationCopyFor } from '../../pages/navigation-copy';

@Component({
  selector: 'docs-accordion-basic-demo',
  imports: [GAccordion, GAccordionPanel],
  template: `
    <g-accordion>
      <g-accordion-panel>
        <span gAccordionHeader>{{ copy().whatTitle }}</span>
        <p>
          {{ copy().whatBody }}
        </p>
      </g-accordion-panel>
      <g-accordion-panel [open]="true">
        <span gAccordionHeader>{{ copy().keyboardTitle }}</span>
        <p>
          {{ copy().keyboardBody }}
        </p>
      </g-accordion-panel>
      <g-accordion-panel>
        <span gAccordionHeader>{{ copy().multipleTitle }}</span>
        <p>{{ copy().multipleBody }}</p>
      </g-accordion-panel>
    </g-accordion>
  `,
  styles: `
    :host {
      display: block;
      max-width: 420px;
    }
    p {
      margin: 0;
      color: var(--g-text-muted);
      font-size: var(--g-font-size-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionBasicDemo {
  private readonly i18n = inject(GLocaleService);
  protected readonly copy = computed(() => navigationCopyFor(this.i18n.tag()).accordion.demo);
}
