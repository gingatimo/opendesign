import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GProgress } from './progress';

@Component({
  imports: [GProgress],
  template: `<g-progress [value]="value()" [indeterminate]="indeterminate()" />`,
})
class HostComponent {
  readonly value = signal(0);
  readonly indeterminate = signal(false);
}

describe('GProgress', () => {
  function setup() {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const progress: HTMLElement = fixture.debugElement.query(By.directive(GProgress)).nativeElement;
    return { fixture, progress };
  }

  it('role progressbar, aria value đầy đủ khi determinate', () => {
    const { fixture, progress } = setup();
    fixture.componentInstance.value.set(40);
    fixture.detectChanges();
    expect(progress.getAttribute('role')).toBe('progressbar');
    expect(progress.getAttribute('aria-valuenow')).toBe('40');
    expect(progress.getAttribute('aria-valuemin')).toBe('0');
    expect(progress.getAttribute('aria-valuemax')).toBe('100');
  });

  it('bar rộng đúng theo value', () => {
    const { fixture, progress } = setup();
    fixture.componentInstance.value.set(40);
    fixture.detectChanges();
    const bar = progress.querySelector('.g-progress__bar') as HTMLElement;
    expect(bar.style.width).toBe('40%');
  });

  it('kẹp value ngoài khoảng: âm về 0, >100 về 100', () => {
    const { fixture, progress } = setup();
    fixture.componentInstance.value.set(-20);
    fixture.detectChanges();
    expect(progress.getAttribute('aria-valuenow')).toBe('0');

    fixture.componentInstance.value.set(150);
    fixture.detectChanges();
    expect(progress.getAttribute('aria-valuenow')).toBe('100');
  });

  it('value là NaN: kẹp về 0 thay vì render thanh đầy do CSS drop NaN%', () => {
    const { fixture, progress } = setup();
    fixture.componentInstance.value.set(NaN);
    fixture.detectChanges();
    expect(progress.getAttribute('aria-valuenow')).toBe('0');
    const bar = progress.querySelector('.g-progress__bar') as HTMLElement;
    expect(bar.style.width).toBe('0%');
  });

  it('indeterminate: bỏ aria-valuenow, có class indeterminate', () => {
    const { fixture, progress } = setup();
    fixture.componentInstance.value.set(40);
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();
    expect(progress.getAttribute('aria-valuenow')).toBeNull();
    expect(progress.classList).toContain('g-progress--indeterminate');
  });

  it('có aria-label mặc định theo gói ngôn ngữ khi consumer không đặt', () => {
    const { progress } = setup();
    expect(progress.getAttribute('aria-label')).toBe('Progress');
  });
});
