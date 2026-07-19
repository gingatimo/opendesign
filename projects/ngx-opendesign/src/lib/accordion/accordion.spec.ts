import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GAccordion } from './accordion';
import { GAccordionPanel } from './accordion-panel';

@Component({
  imports: [GAccordion, GAccordionPanel],
  template: `
    <g-accordion [multiple]="multiple()">
      <g-accordion-panel><span gAccordionHeader>P1</span>Nội dung 1</g-accordion-panel>
      <g-accordion-panel><span gAccordionHeader>P2</span>Nội dung 2</g-accordion-panel>
    </g-accordion>
  `,
})
class Host {
  multiple = signal(false);
}

function setup() {
  const f = TestBed.createComponent(Host);
  f.detectChanges();
  const headers = f.nativeElement.querySelectorAll(
    '.g-accordion-panel__header',
  ) as NodeListOf<HTMLElement>;
  const panels = f.nativeElement.querySelectorAll('g-accordion-panel') as NodeListOf<HTMLElement>;
  return { f, headers, panels };
}

describe('GAccordion', () => {
  it('header có aria-expanded, mặc định đóng', () => {
    const { headers } = setup();
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
  });

  it('bấm header mở panel; single-open đóng panel khác', () => {
    const { f, headers, panels } = setup();
    headers[0].click();
    f.detectChanges();
    expect(panels[0].classList.contains('g-accordion-panel--open')).toBe(true);
    headers[1].click();
    f.detectChanges();
    expect(panels[1].classList.contains('g-accordion-panel--open')).toBe(true);
    expect(panels[0].classList.contains('g-accordion-panel--open')).toBe(false); // đóng vì single
  });

  it('multiple: nhiều panel mở cùng lúc', () => {
    const { f, headers, panels } = setup();
    f.componentInstance.multiple.set(true);
    f.detectChanges();
    headers[0].click();
    headers[1].click();
    f.detectChanges();
    expect(panels[0].classList.contains('g-accordion-panel--open')).toBe(true);
    expect(panels[1].classList.contains('g-accordion-panel--open')).toBe(true);
  });

  it('region đóng có inert', () => {
    const { panels } = setup();
    const region = panels[0].querySelector('.g-accordion-panel__region') as HTMLElement;
    expect(region.hasAttribute('inert')).toBe(true);
  });
});
