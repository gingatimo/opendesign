import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GButton } from '../button/button';
import { gIconPackage } from '../icon/icons';
import { GEmptyState, GEmptyStateActions } from './empty-state';

@Component({
  imports: [GEmptyState, GEmptyStateActions, GButton],
  template: `
    <g-empty-state heading="Chưa có thiết bị" description="Kết nối gateway để bắt đầu.">
      <button g-button gEmptyStateActions>Kết nối gateway</button>
    </g-empty-state>
  `,
})
class Host {}

describe('GEmptyState', () => {
  it('render nội dung và action slot mà không tự gán role alert', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const empty = (fixture.nativeElement as HTMLElement).querySelector('g-empty-state');

    expect(empty?.textContent).toContain('Chưa có thiết bị');
    expect(empty?.textContent).toContain('Kết nối gateway để bắt đầu.');
    expect(empty?.querySelector('button')?.textContent).toContain('Kết nối gateway');
    expect(empty?.getAttribute('role')).toBeNull();
    expect(empty?.querySelector('g-icon')).toBeNull();
  });

  it('render icon tuỳ chọn và compact modifier', async () => {
    const fixture = TestBed.createComponent(GEmptyState);
    fixture.componentRef.setInput('heading', 'Trống');
    fixture.componentRef.setInput('icon', gIconPackage);
    fixture.componentRef.setInput('size', 'compact');
    await fixture.whenStable();
    const empty = fixture.nativeElement as HTMLElement;

    expect(empty.querySelector('g-icon')).not.toBeNull();
    expect(empty.classList.contains('g-empty-state--compact')).toBe(true);
  });
});
