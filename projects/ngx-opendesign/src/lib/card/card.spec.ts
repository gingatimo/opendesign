import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GCard, GCardFooter, GCardHeader } from './card';

@Component({
  imports: [GCard, GCardHeader, GCardFooter],
  template: `
    <g-card>
      <div gCardHeader>Tiêu đề</div>
      <p>Nội dung thẻ.</p>
      <div gCardFooter>Chân thẻ</div>
    </g-card>
  `,
})
class HostComponent {}

describe('GCard', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const card: HTMLElement = fixture.debugElement.query(By.directive(GCard)).nativeElement;
    return { fixture, card };
  }

  it('có class g-card, chiếu nội dung vào', () => {
    const { card } = setup();
    expect(card.classList).toContain('g-card');
    expect(card.textContent).toContain('Nội dung thẻ.');
  });

  it('không đặt role (bề mặt thuần tuý, không phải landmark)', () => {
    const { card } = setup();
    expect(card.getAttribute('role')).toBeNull();
  });

  it('gCardHeader và gCardFooter gắn đúng class', () => {
    const { fixture } = setup();
    const header: HTMLElement = fixture.debugElement.query(By.directive(GCardHeader)).nativeElement;
    const footer: HTMLElement = fixture.debugElement.query(By.directive(GCardFooter)).nativeElement;
    expect(header.classList).toContain('g-card__header');
    expect(footer.classList).toContain('g-card__footer');
  });
});
