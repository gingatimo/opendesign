import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GBadge, GBadgeVariant } from './badge';

@Component({
  imports: [GBadge],
  template: `<g-badge [variant]="variant()">Mới</g-badge>`,
})
class HostComponent {
  readonly variant = signal<GBadgeVariant>('neutral');
}

describe('GBadge', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const badge: HTMLElement = fixture.debugElement.query(By.directive(GBadge)).nativeElement;
    return { fixture, badge };
  }

  it('mặc định variant neutral', () => {
    const { badge } = setup();
    expect(badge.classList).toContain('g-badge');
    expect(badge.classList).toContain('g-badge--neutral');
  });

  it('hiển thị nội dung chiếu vào', () => {
    const { badge } = setup();
    expect(badge.textContent?.trim()).toBe('Mới');
  });

  it('đổi variant qua input', () => {
    const { fixture, badge } = setup();
    fixture.componentInstance.variant.set('danger');
    fixture.detectChanges();
    expect(badge.classList).toContain('g-badge--danger');
    expect(badge.classList).not.toContain('g-badge--neutral');
  });
});
