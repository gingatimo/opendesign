import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GAccordion, GAccordionPanel } from 'ngx-opendesign';

@Component({
  selector: 'docs-accordion-basic-demo',
  imports: [GAccordion, GAccordionPanel],
  template: `
    <g-accordion>
      <g-accordion-panel>
        <span gAccordionHeader>OpenDesign là gì?</span>
        <p>
          Một thư viện component Angular với thẩm mỹ hiện đại, xây dựng bằng signal và tuân thủ các
          pattern ARIA.
        </p>
      </g-accordion-panel>
      <g-accordion-panel [open]="true">
        <span gAccordionHeader>Có hỗ trợ bàn phím không?</span>
        <p>
          Có. Header điều hướng bằng
          <code>↑</code>/<code>↓</code>/<code>Home</code>/<code>End</code>, mở/đóng bằng
          <code>Enter</code> hoặc <code>Space</code>.
        </p>
      </g-accordion-panel>
      <g-accordion-panel>
        <span gAccordionHeader>Có thể mở nhiều panel cùng lúc?</span>
        <p>Có, thêm thuộc tính <code>multiple</code> trên <code>g-accordion</code>.</p>
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
export class AccordionBasicDemo {}
